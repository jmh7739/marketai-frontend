// marketai-frontend/src/api/auth.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// API 인스턴스 생성
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 인증 API 함수
export const authAPI = {
  // 인증 코드 발송
  sendVerificationCode: async (phone) => {
    try {
      const response = await api.post('/auth/send-verification', { phone });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  // 인증 코드 확인
  verifyCode: async (phone, code) => {
    try {
      const response = await api.post('/auth/verify-code', { phone, code });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  // 회원가입
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  // 로그인
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  // 로그아웃
  logout: () => {
    localStorage.removeItem('token');
  }
};

export default api;