import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Package, Clock, CheckCircle } from 'lucide-react';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/api/orders/myorders');
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userInfo, navigate]);

  if (loading) return <div className="text-center mt-20 text-xl font-medium">Loading your orders...</div>;
  if (error) return <div className="text-center mt-20 text-red-500 font-medium">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center">
        <Package className="h-8 w-8 mr-3 text-blue-600" /> My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
          <p className="text-gray-500 text-lg mb-6">You haven't placed any orders yet.</p>
          <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors inline-block">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
              
              {/* Order Header / Summary */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Order ID</p>
                  <p className="text-sm font-bold text-gray-900">{order._id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Date Placed</p>
                  <p className="text-sm font-bold text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total Amount</p>
                  <p className="text-sm font-black text-blue-600">₹{order.totalPrice}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Payment</p>
                  <p className="text-sm font-bold text-gray-900">{order.paymentMethod}</p>
                </div>
              </div>
              
              {/* Order Items & Status */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 text-lg">Items in this order:</h3>
                  <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold shadow-sm border ${order.isDelivered ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                    {order.isDelivered ? <><CheckCircle className="h-4 w-4 mr-1.5"/> Delivered</> : <><Clock className="h-4 w-4 mr-1.5"/> Processing</>}
                  </span>
                </div>
                <ul className="divide-y divide-gray-100">
                  {order.orderItems.map((item, index) => (
                    <li key={index} className="py-4 flex items-center">
                      <img src={item.image || 'https://via.placeholder.com/50'} alt={item.title} className="h-16 w-16 rounded-md object-contain border border-gray-200 p-1" />
                      <div className="ml-4 flex-1">
                        <Link to={`/product/${item._id}`} className="text-base font-bold text-gray-900 hover:text-blue-600 transition-colors">
                          {item.title}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">Qty: <span className="font-medium">{item.qty}</span> × ₹{item.price}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">₹{item.qty * item.price}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}