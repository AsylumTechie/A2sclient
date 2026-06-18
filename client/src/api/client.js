import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

export const getStats = () => api.get('/stats');
export const getServices = (params) => api.get('/services', { params });
export const getServiceBySlug = (slug) => api.get(`/services/${slug}`);
export const getCategories = () => api.get('/services/categories');
export const submitContact = (data) => api.post('/contact', data);
export const submitInquiry = (data) => api.post('/inquiries', data);
export const createPaymentOrder = (data) => api.post('/payments/create-order', data);
export const verifyPayment = (data) => api.post('/payments/verify', data);

export default api;
