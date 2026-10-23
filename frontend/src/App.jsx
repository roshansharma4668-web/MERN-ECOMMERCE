import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import OrderSuccess from './pages/OrderSuccess';
import MyOrders from './pages/MyOrders';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductCreate from './pages/admin/ProductCreate';
import AdminOrders from './pages/admin/AdminOrders';
import ProductList from './pages/admin/ProductList';
import AdminUsers from './pages/admin/AdminUsers';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/ordersuccess" element={<OrderSuccess />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<ProductList />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/product/new" element={<ProductCreate />} />
            <Route path="/myorders" element={<MyOrders />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}