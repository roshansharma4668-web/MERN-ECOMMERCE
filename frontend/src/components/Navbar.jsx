import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, User as UserIcon, Package, ShieldAlert } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import api from '../api/axios';

export default function Navbar() {
  const { userInfo, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/api/auth/logout');
      logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold tracking-wider">RoshanStore</Link>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/cart" className="relative hover:text-gray-300 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {userInfo ? (
              <div className="flex items-center space-x-6">
                {}
                {userInfo.role === 'admin' && (
                  <Link to="/admin/dashboard" className="flex items-center text-sm font-bold text-yellow-400 hover:text-yellow-300 transition-colors">
                    <ShieldAlert className="h-5 w-5 mr-1" />
                    Admin Panel
                  </Link>
                )}

                <Link to="/myorders" className="flex items-center text-sm font-medium hover:text-blue-400 transition-colors">
                  <Package className="h-5 w-5 mr-1" />
                  My Orders
                </Link>
                <span className="flex items-center text-sm font-medium text-gray-300">
                  <UserIcon className="h-5 w-5 mr-1" />
                  {userInfo.name}
                </span>
                <button onClick={handleLogout} className="flex items-center text-sm text-red-400 hover:text-red-300 transition-colors">
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="text-sm font-medium hover:text-gray-300 transition-colors">Login</Link>
                <Link to="/signup" className="text-sm font-medium bg-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}