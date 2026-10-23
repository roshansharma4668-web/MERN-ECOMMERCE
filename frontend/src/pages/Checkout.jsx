import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import toast, { Toaster } from 'react-hot-toast';
import { MapPin, CreditCard, Truck, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Checkout() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!userInfo) {
      toast.error('Please login to checkout');
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: 'India',
    phone: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('COD'); // Default Cash on Delivery
  const [isProcessing, setIsProcessing] = useState(false);

  // Price Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = Number((subtotal * 0.18).toFixed(2));
  const shipping = subtotal > 50000 ? 0 : 500;
  const total = subtotal + tax + shipping;

  const handleInputChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

const placeOrderHandler = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return toast.error('Your cart is empty');

    setIsProcessing(true);
    
    try {
      const orderData = {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: subtotal,
        taxPrice: tax,
        shippingPrice: shipping,
        totalPrice: total,
      };

      await api.post('/api/orders/place', orderData);
      
    } catch (err) {

      toast.error(err.response?.data?.message || 'Failed to place order');
      setIsProcessing(false);
      return; // 
    }

    toast.success('Order placed successfully!');
    
    try {
      if (typeof setCartItems === 'function') {
        setCartItems([]);
      }
      localStorage.removeItem('cartItems');
    } catch (uiError) {
      console.error("Cart clear error:", uiError);
    }
    
    setTimeout(() => navigate('/ordersuccess'), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Toaster position="top-center" />
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Secure Checkout</h1>

      <form onSubmit={placeOrderHandler} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Address & Payment */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Shipping Address Section */}
          <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <MapPin className="h-6 w-6 mr-2 text-blue-600" /> Shipping Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                <input required type="text" name="address" value={shippingAddress.address} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="123 Main St, Apartment, Studio, or Floor" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input required type="text" name="city" value={shippingAddress.city} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="e.g. Ranchi" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                <input required type="text" name="postalCode" value={shippingAddress.postalCode} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="e.g. 834001" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input required type="tel" name="phone" value={shippingAddress.phone} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="10-digit mobile number" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input required type="text" name="country" value={shippingAddress.country} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" readOnly />
              </div>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <CreditCard className="h-6 w-6 mr-2 text-blue-600" /> Payment Method
            </h2>
            <div className="space-y-4">
              <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'COD' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                <input type="radio" name="paymentMethod" value="COD" checked={paymentMethod === 'COD'} onChange={(e) => setPaymentMethod(e.target.value)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                <div className="ml-4 flex-1">
                  <span className="block text-sm font-medium text-gray-900">Cash on Delivery (COD)</span>
                  <span className="block text-sm text-gray-500">Pay when your order arrives</span>
                </div>
                <Truck className="h-6 w-6 text-gray-400" />
              </label>

              <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'Online' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                <input type="radio" name="paymentMethod" value="Online" checked={paymentMethod === 'Online'} onChange={(e) => setPaymentMethod(e.target.value)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                <div className="ml-4 flex-1">
                  <span className="block text-sm font-medium text-gray-900">Pay Online (Razorpay)</span>
                  <span className="block text-sm text-gray-500">Secure UPI, Credit/Debit Card payment</span>
                </div>
                <ShieldCheck className="h-6 w-6 text-gray-400" />
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="flow-root mb-6">
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item._id} className="py-4 flex">
                    <img src={item.image || 'https://via.placeholder.com/50'} alt={item.title} className="h-16 w-16 rounded-md object-contain border border-gray-200" />
                    <div className="ml-4 flex-1 flex flex-col justify-center">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{item.title}</h3>
                      <p className="text-sm text-gray-500">Qty: {item.qty} x ₹{item.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <dl className="space-y-4 text-sm text-gray-600 border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between">
                <dt>Subtotal</dt>
                <dd className="font-medium text-gray-900">₹{subtotal}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt>Tax (18% GST)</dt>
                <dd className="font-medium text-gray-900">₹{tax}</dd>
              </div>
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <dt>Shipping</dt>
                <dd className="font-medium text-gray-900">{shipping === 0 ? <span className="text-green-600">Free</span> : `₹${shipping}`}</dd>
              </div>
              <div className="flex items-center justify-between pt-4">
                <dt className="text-base font-bold text-gray-900">Total Payable</dt>
                <dd className="text-xl font-black text-blue-600">₹{total}</dd>
              </div>
            </dl>

            <button
              type="submit"
              disabled={isProcessing}
              className={`mt-8 w-full px-4 py-3 rounded-lg font-bold flex items-center justify-center transition-colors shadow-md ${isProcessing ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
            >
              {isProcessing ? 'Processing Order...' : 'Confirm Order'} <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}