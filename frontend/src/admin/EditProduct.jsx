import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
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

  const categories = ['Electronics', 'Laptops', 'Smartphones', 'Accessories', 'Clothing', 'Home Appliances'];

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

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
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
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Product Title</label>
              <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Price (₹)</label>
              <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Stock Quantity</label>
              <input required type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 bg-white">
                {categories.map((cat, index) => <option key={index} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
              <input required type="text" name="image" value={formData.image} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Product Description</label>
              <textarea required name="description" rows="4" value={formData.description} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 resize-none" />
            </div>
          </div>
          <button type="submit" disabled={isUpdating} className="w-full py-3 px-4 rounded-lg font-bold text-white transition-colors bg-blue-600 hover:bg-blue-700">
            {isUpdating ? 'Saving Changes...' : 'Update Product'}
          </button>
        </form>
      </div>
    </div>
  );
}