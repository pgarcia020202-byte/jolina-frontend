import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
  uploadProfilePicture: (formData) => api.post('/auth/profile-picture', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

// Posts API
export const postsAPI = {
  getAll: () => api.get('/posts'),
  getById: (id) => api.get(`/posts/${id}`),
  create: (postData) => api.post('/posts', postData),
  update: (id, postData) => api.put(`/posts/${id}`, postData),
  delete: (id) => api.delete(`/posts/${id}`),
  like: (id) => api.post(`/posts/${id}/like`),
  uploadImage: (id, formData) => api.post(`/posts/${id}/image`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

// Comments API
export const commentsAPI = {
  getByPost: (postId) => api.get(`/comments/post/${postId}`),
  create: (postId, commentData) => api.post(`/comments/post/${postId}`, commentData),
  update: (id, commentData) => api.put(`/comments/${id}`, commentData),
  delete: (id) => api.delete(`/comments/${id}`),
};

// Admin API
export const adminAPI = {
  getUsers: () => api.get('/admin/users'),
  updateUserStatus: (id, status) => api.put(`/admin/users/${id}/status`, { status }),
  getPosts: () => api.get('/admin/posts'),
  removePost: (id) => api.put(`/admin/posts/${id}/remove`),
  restorePost: (id) => api.put(`/admin/posts/${id}/restore`),
  uploadProfilePic: (formData) => api.post('/admin/upload-profile-pic', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getStats: () => api.get('/admin/stats'),
};

export default api;
