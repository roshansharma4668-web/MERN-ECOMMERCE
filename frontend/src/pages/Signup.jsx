import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import toast, { Toaster } from 'react-hot-toast';
import { ShoppingBag } from 'lucide-react';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await api.post('/api/auth/register', { name, email, password });
      login(data);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <Toaster position="top-center" />
      <div className="max-w-4xl w-full flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Left Side - Colorful Branding */}
        <div className="md:w-2/5 bg-blue-600 p-10 text-white flex flex-col justify-between hidden md:flex">
          <div>
            <h2 className="text-3xl font-extrabold mb-4">Looks like you're new here!</h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Sign up with your details to get started and explore amazing deals.
            </p>
          </div>
          <div className="flex justify-center mt-10">
            <ShoppingBag className="h-40 w-40 text-blue-400 opacity-50" />
          </div>
        </div>

        {/* Right Side - Clean Form */}
        <div className="md:w-3/5 p-10 lg:p-14">
          <div className="md:hidden mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-blue-600">ShopSphere</h2>
            <p className="text-gray-500 mt-2">Create your account</p>
          </div>
          
          <form className="space-y-5" onSubmit={submitHandler}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                placeholder="Create a password"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors mt-4"
            >
              {isLoading ? 'Creating Account...' : 'Continue'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Existing User?{' '}
              <Link to="/login" className="font-bold text-blue-600 hover:text-blue-500">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}