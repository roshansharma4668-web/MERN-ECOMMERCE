import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import toast, { Toaster } from 'react-hot-toast';
import { Package, Trash2, PlusCircle, Edit } from 'lucide-react'; // Edit icon add kiya

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/api/products');
      setProducts(data);
      setLoading(false);
    } catch (err) {
      toast.error('Failed to fetch products');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/api/products/${id}`);
        toast.success('Product Deleted');
        fetchProducts(); 
      } catch (err) {
        toast.error('Failed to delete product');
      }
    }
  };

  if (loading) return <div className="text-center mt-20 font-medium">Loading products...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Toaster position="top-center" />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
          <Package className="h-8 w-8 mr-3 text-blue-600" /> Manage Products
        </h1>
        <Link to="/admin/product/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center">
          <PlusCircle className="h-5 w-5 mr-2" /> Add New
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product._id.substring(0, 8)}...</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600">₹{product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.category}</td>
                  
                  {/* UPDATE: Action column mein Edit aur Delete dono buttons hain */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center space-x-3">
                    <Link 
                      to={`/admin/product/edit/${product._id}`}
                      className="text-blue-500 hover:text-blue-700 bg-blue-50 p-2 rounded-full transition-colors"
                      title="Edit Product"
                    >
                      <Edit className="h-5 w-5" />
                    </Link>
                    
                    <button 
                      onClick={() => deleteHandler(product._id)}
                      className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-full transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}