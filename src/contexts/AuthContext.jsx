// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { loginUser, logoutUser, registerUser, updateProfile, getSavedUser } from './auth';

// AuthContext 생성
const AuthContext = createContext(null);

// 인증 제공자 컴포넌트
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // 초기 로그인 상태 확인
  useEffect(() => {
    const checkAuth = () => {
      const user = getSavedUser();
      
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);
  
  // 로그인 함수
  const login = async (username, password) => {
    const user = await loginUser(username, password);
    setCurrentUser(user);
    setIsAuthenticated(true);
    return user;
  };
  
  // 로그아웃 함수
  const logout = () => {
    logoutUser();
    setCurrentUser(null);
    setIsAuthenticated(false);
  };
  
  // 회원가입 함수
  const register = async (userData) => {
    const user = await registerUser(userData);
    setCurrentUser(user);
    setIsAuthenticated(true);
    return user;
  };
  
  // 사용자 정보 업데이트 함수
  const updateUserProfile = async (updatedData) => {
    const updatedUser = await updateProfile(currentUser, updatedData);
    setCurrentUser(updatedUser);
    return updatedUser;
  };
  
  // 제공할 컨텍스트 값
  const value = {
    currentUser,
    isAuthenticated,
    loading,
    login,
    logout,
    register,
    updateUserProfile
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;