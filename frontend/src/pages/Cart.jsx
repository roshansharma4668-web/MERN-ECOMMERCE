import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';

export default function Cart() {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Price Calculation Logic
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = Number((subtotal * 0.18).toFixed(2)); 
  const shipping = subtotal > 50000 ? 0 : 500; 
  const total = subtotal + tax + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="bg-gray-50 p-8 rounded-full mb-6">
          <ShoppingBag className="h-20 w-20 text-gray-400" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">Looks like you haven't added anything to your cart yet. Go ahead & explore top categories.</p>
        <Link to="/" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg flex items-center">
          <ArrowLeft className="h-5 w-5 mr-2" /> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Cart Items List */}
        <div className="lg:col-span-8">
          <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100">
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item._id} className="p-6 flex flex-col sm:flex-row items-center hover:bg-gray-50 transition-colors">
                  <img src={item.image || 'https://via.placeholder.com/150'} alt={item.title} className="w-24 h-24 object-contain rounded-md border border-gray-200" />
                  
                  <div className="ml-0 sm:ml-6 flex-1 w-full mt-4 sm:mt-0">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        <Link to={`/product/${item._id}`} className="hover:text-blue-600">{item.title}</Link>
                      </h3>
                      <p className="text-lg font-bold text-gray-900">₹{item.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                        <button onClick={() => addToCart(item, item.qty > 1 ? item.qty - 1 : 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg">-</button>
                        <span className="px-4 py-1 font-medium text-sm text-gray-900 border-x border-gray-300">{item.qty}</span>
                        <button onClick={() => addToCart(item, item.qty < item.stock ? item.qty + 1 : item.stock)} className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg">+</button>
                      </div>
                      
                      <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors flex items-center text-sm font-medium">
                        <Trash2 className="h-4 w-4 mr-1" /> Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="flow-root">
              <dl className="space-y-4 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <dt>Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items)</dt>
                  <dd className="font-medium text-gray-900">₹{subtotal}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>Tax Estimate (18% GST)</dt>
                  <dd className="font-medium text-gray-900">₹{tax}</dd>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                  <dt>Shipping</dt>
                  <dd className="font-medium text-gray-900">{shipping === 0 ? <span className="text-green-600">Free</span> : `₹${shipping}`}</dd>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <dt className="text-base font-bold text-gray-900">Order Total</dt>
                  <dd className="text-xl font-black text-gray-900">₹{total}</dd>
                </div>
              </dl>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-bold flex items-center justify-center transition-colors shadow-md"
            >
              Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}