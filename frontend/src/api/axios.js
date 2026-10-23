import axios from 'axios';

const api = axios.create({
  
  baseURL: 'https://aapka-render-api-url.onrender.com', 
  withCredentials: true
});

export default api;