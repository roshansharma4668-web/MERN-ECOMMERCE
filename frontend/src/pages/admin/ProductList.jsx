import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';
import toast, { Toaster } from 'react-hot-toast';
import { Package, ArrowLeft, Save } from 'lucide-react';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
    stock: ''
  });

  // Apni categories yahan customize kar sakte hain
  const categories = ['Electronics', 'Laptops', 'Smartphones', 'Accessories', 'Clothing', 'Home Appliances'];

  // 1. Component load hote hi product ka purana data fetch karna
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/api/products/${id}`);
        setFormData({
          title: data.title || '',
          price: data.price || '',
          description: data.description || '',
          category: data.category || categories[0],
          image: data.image || '',
          stock: data.stock || ''
        });
        setLoading(false);
      } catch (err) {
        toast.error('Failed to load product data');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Form submit hone par Update API call karna
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      // Dhyan dein: Yahan standard REST route /api/products/:id use kiya gaya hai
      await api.put(`/api/products/${id}`, formData);
      toast.success('Product updated successfully!');
      setTimeout(() => navigate('/admin/products'), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update product');
      setIsUpdating(false);
    }
  };

  if (loading) return <div className="text-center mt-20 font-medium text-gray-600">Loading product details...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Toaster position="top-center" />
      
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
          <Package className="h-8 w-8 mr-3 text-blue-600" /> Update Product
        </h1>
        <Link to="/admin/products" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors font-medium">
          <ArrowLeft className="h-5 w-5 mr-1" /> Back to Products
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100 p-8">
        <form onSubmit={submitHandler} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Product Title</label>
              <input 
                required 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                placeholder="e.g. Apple iPhone 15 Pro Max"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" 
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Price (₹)</label>
              <input 
                required 
                type="number" 
                name="price" 
                value={formData.price} 
                onChange={handleChange} 
                placeholder="e.g. 75000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" 
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Stock Quantity</label>
              <input 
                required 
                type="number" 
                name="stock" 
                value={formData.stock} 
                onChange={handleChange} 
                placeholder="e.g. 10"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" 
              />
            </div>

            {/* Category Dropdown */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-white cursor-pointer"
              >
                <option value="" disabled>Select a category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
              <input 
                required 
                type="text" 
                name="image" 
                value={formData.image} 
                onChange={handleChange} 
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" 
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Product Description</label>
              <textarea 
                required 
                name="description" 
                rows="4"
                value={formData.description} 
                onChange={handleChange} 
                placeholder="Enter detailed product description..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none" 
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <button 
              type="submit" 
              disabled={isUpdating}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-bold text-white transition-colors ${isUpdating ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {isUpdating ? 'Saving Changes...' : (
                <>
                  <Save className="h-5 w-5 mr-2" /> Update Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}