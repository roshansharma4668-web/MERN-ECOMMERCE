import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { Package, ShoppingBag, Users, PlusCircle, TrendingUp, IndianRupee } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
      
        const [usersRes, productsRes, ordersRes] = await Promise.all([
          api.get('/api/auth/users'),
          api.get('/api/products'),
          api.get('/api/orders')
        ]);

        const orders = ordersRes.data;
      
        const revenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

        setStats({
          users: usersRes.data.length,
          products: productsRes.data.length,
          orders: orders.length,
          totalRevenue: revenue
        });
        setLoading(false);
      } catch (err) {
        toast.error('Failed to load dashboard statistics');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center">
        <TrendingUp className="h-8 w-8 mr-3 text-blue-600" /> Admin Overview
      </h1>

      {/* Analytics Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-blue-100 text-sm font-medium uppercase tracking-wider mb-1">Total Revenue</p>
              <h3 className="text-3xl font-black">₹{loading ? '...' : stats.totalRevenue.toLocaleString()}</h3>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <IndianRupee className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-purple-100 text-sm font-medium uppercase tracking-wider mb-1">Total Orders</p>
              <h3 className="text-3xl font-black">{loading ? '...' : stats.orders}</h3>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <ShoppingBag className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl shadow-lg text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-orange-100 text-sm font-medium uppercase tracking-wider mb-1">Total Users</p>
              <h3 className="text-3xl font-black">{loading ? '...' : stats.users}</h3>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <Users className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl shadow-lg text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-green-100 text-sm font-medium uppercase tracking-wider mb-1">Total Products</p>
              <h3 className="text-3xl font-black">{loading ? '...' : stats.products}</h3>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <Package className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/admin/products" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center justify-between group">
          <div>
            <p className="text-gray-500 font-medium">Manage</p>
            <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Products</h2>
          </div>
          <Package className="h-8 w-8 text-blue-100 group-hover:text-blue-500 transition-colors" />
        </Link>

        <Link to="/admin/product/new" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center justify-between group">
          <div>
            <p className="text-gray-500 font-medium">Create</p>
            <h2 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">New Product</h2>
          </div>
          <PlusCircle className="h-8 w-8 text-green-100 group-hover:text-green-500 transition-colors" />
        </Link>

        <Link to="/admin/orders" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center justify-between group">
          <div>
            <p className="text-gray-500 font-medium">Track</p>
            <h2 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">All Orders</h2>
          </div>
          <ShoppingBag className="h-8 w-8 text-purple-100 group-hover:text-purple-500 transition-colors" />
        </Link>

        <Link to="/admin/users" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center justify-between group">
          <div>
            <p className="text-gray-500 font-medium">Manage</p>
            <h2 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">Users</h2>
          </div>
          <Users className="h-8 w-8 text-orange-100 group-hover:text-orange-500 transition-colors" />
        </Link>
      </div>
    </div>
  );
}