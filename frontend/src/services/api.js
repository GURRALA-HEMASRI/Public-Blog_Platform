import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ ONLY POSTS API (no auth anywhere)
export const postsAPI = {
  getAll: (params) => api.get('/posts/', { params }),
  getById: (id) => api.get(`/posts/${id}/`),
  create: (data) => api.post('/posts/', data),
  update: (id, data) => api.patch(`/posts/${id}/`, data),
  delete: (id) => api.delete(`/posts/${id}/`),
};

export default api;