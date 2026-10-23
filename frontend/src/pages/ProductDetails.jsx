import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext'; // User login check ke liye
import toast, { Toaster } from 'react-hot-toast';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const { userInfo } = useContext(AuthContext); // Current user ka data

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        toast.error('Product not found');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    // Agar user logged in nahi hai, toh use login page par bhej dein
    if (!userInfo) {
      toast.error('Please Login to add items to cart!');
      navigate('/login');
      return;
    }

    addToCart(product, qty);
    toast.success('Added to Cart successfully!');
    navigate('/cart');
  };

  if (loading) return <div className="text-center mt-20 font-medium">Loading...</div>;
  if (!product) return <div className="text-center mt-20">Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Toaster position="top-center" />
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-8">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Products
      </Link>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-1/2 p-8 bg-gray-50 flex justify-center items-center">
          <img src={product.image} alt={product.title} className="max-h-96 object-contain hover:scale-105 transition-transform duration-300" />
        </div>
        
        {/* Details Section */}
        <div className="md:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <p className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">{product.category}</p>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">{product.title}</h1>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">{product.description}</p>
          <div className="text-4xl font-black text-gray-900 mb-6">₹{product.price}</div>
          
          <div className="flex items-center space-x-4 mb-8">
            <span className="font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 font-bold">-</button>
              <span className="px-4 py-2 font-bold border-l border-r border-gray-300">{qty}</span>
              <button onClick={() => setQty(qty < product.stock ? qty + 1 : product.stock)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 font-bold">+</button>
            </div>
          </div>

          <button 
            onClick={addToCartHandler} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors shadow-md flex justify-center items-center text-lg"
          >
            <ShoppingCart className="h-6 w-6 mr-2" />
            {userInfo ? 'Add to Cart' : 'Login to Buy'}
          </button>
        </div>
      </div>
    </div>
  );
}