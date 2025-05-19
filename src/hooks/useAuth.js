import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보 가져오기
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    // 실제 구현에서는 API 호출 후 응답으로 받은 사용자 정보를 저장
    setCurrentUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    return Promise.resolve(userData);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    return Promise.resolve();
  };

  const register = (userData) => {
    // 실제 구현에서는 API 호출 후 응답으로 받은 사용자 정보를 저장
    const newUser = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    
    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return Promise.resolve(newUser);
  };

  const value = {
    currentUser,
    login,
    logout,
    register,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;