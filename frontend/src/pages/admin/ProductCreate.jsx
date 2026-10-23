import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { AuthContext } from '../../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { PackagePlus } from 'lucide-react';

export default function ProductCreate() {
  const [formData, setFormData] = useState({
    title: '', price: '', description: '', category: '', stock: '', image: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { userInfo } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const submitHandler = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      await api.post('/api/products', formData);
      toast.success('Product created successfully!');
      setTimeout(() => navigate('/'), 1500); 
    } catch (err) {
      // Yeh catch block miss ho gaya tha
      toast.error(err.response?.data?.message || 'Failed to create product');
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Toaster position="top-center" />
      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center">
          <PackagePlus className="h-8 w-8 mr-3 text-blue-600" /> Create New Product
        </h1>
        
        <form onSubmit={submitHandler} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
              <input required type="text" name="title" onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="e.g. Gaming Laptop" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
              <input required type="number" name="price" onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="999" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
              <input required type="number" name="stock" onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="10" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input required type="text" name="category" onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="Electronics, Clothing, etc." />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input type="text" name="image" onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="https://example.com/image.jpg" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea required name="description" rows="4" onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="Product details here..."></textarea>
            </div>
          </div>
          
          <button type="submit" disabled={isProcessing} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
            {isProcessing ? 'Creating...' : 'Publish Product'}
          </button>
        </form>
      </div>
    </div>
  );
}