// marketai-frontend/src/contexts/AuthProvider.jsx
import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import { loginUser, logoutUser } from './authUtils';

// 인증 제공자 컴포넌트
export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 초기 로딩 시 사용자 정보 확인
  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보 확인
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // 로그인 함수
  const login = (userData, token) => {
    loginUser(userData, token); // 유틸리티 함수 사용
    setCurrentUser(userData);
  };

  // 로그아웃 함수
  const logout = () => {
    logoutUser(); // 유틸리티 함수 사용
    setCurrentUser(null);
  };

  // 컨텍스트 값
  const value = {
    currentUser,
    login,
    logout,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}