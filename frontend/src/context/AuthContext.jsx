import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Local storage se user data load karna refresh ke baad
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUserInfo(userData);
    localStorage.setItem('userInfo', JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      await api.post('/api/auth/logout'); 
    } catch (err) {
      console.error(err);
    }
    
    setUserInfo(null);
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems'); 
    window.location.href = '/login'; 
  };
  return (
    <AuthContext.Provider value={{ userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};