import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { Search, ShoppingBag } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/api/products');
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching products. Make sure backend is running.');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center mt-20 text-xl font-medium">Loading amazing products...</div>;
  }
  
  if (error) {
    return <div className="text-center mt-20 text-red-500 font-medium">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Premium Hero & Search Section */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 rounded-3xl p-10 sm:p-16 mb-12 shadow-2xl text-white flex flex-col items-center text-center relative overflow-hidden">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 tracking-tight relative z-10">
          Welcome to RoshanStore
        </h1>
        <p className="text-lg sm:text-xl text-blue-100 mb-10 max-w-2xl relative z-10">
          Discover the best deals on top-quality products. Shop securely and get fast delivery!
        </p>
        
        <div className="relative w-full max-w-3xl z-10">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for laptops, phones, clothes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-16 pr-6 py-5 bg-white border-2 border-transparent rounded-full shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-transparent text-lg text-gray-900 placeholder-gray-500 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-extrabold text-gray-900 flex items-center">
          <ShoppingBag className="h-7 w-7 mr-3 text-blue-600" /> 
          {searchTerm ? "Search Results for " + searchTerm : "Latest Products"}
        </h2>
        <span className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold border border-blue-100">
          {filteredProducts.length} Items
        </span>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-xl mb-4">No products found matching your search.</p>
          <button 
            onClick={() => setSearchTerm('')} 
            className="text-blue-600 font-bold hover:text-blue-800 transition-colors"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group">
              <div className="relative h-60 bg-gray-50 p-6 flex justify-center items-center overflow-hidden">
                {}
                <img 
                  src={product.image || 'https://via.placeholder.com/300'} 
                  alt={product.title} 
                  className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-2">{product.category}</p>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 leading-tight">
                  <Link to={`/product/${product._id}`} className="hover:text-blue-600 transition-colors">
                    {product.title}
                  </Link>
                </h3>

                {}
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
                  <span className="text-2xl font-black text-gray-900">₹{product.price}</span>
                  <Link 
                    to={`/product/${product._id}`} 
                    className="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors shadow-md"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}