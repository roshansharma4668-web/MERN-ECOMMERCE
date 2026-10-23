import { Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';

export default function OrderSuccess() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-12 bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl flex flex-col items-center max-w-lg w-full text-center border border-gray-100">
        <div className="bg-green-100 p-4 rounded-full mb-6">
          <CheckCircle className="h-20 w-20 text-green-500" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Order Successful!</h1>
        <p className="text-gray-600 mb-8 text-lg">
          Thank you for shopping at ShopSphere. Your order has been received and is being processed securely.
        </p>
        
        <div className="flex flex-col w-full space-y-3">
          <Link 
            to="/myorders" 
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center"
          >
            <ShoppingBag className="h-5 w-5 mr-2" /> View My Orders
          </Link>
          <Link 
            to="/" 
            className="w-full bg-white text-gray-900 border border-gray-300 px-6 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            Continue Shopping <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}