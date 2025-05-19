// src/contexts/auth.js
// 인증 관련 함수 및 유틸리티

/**
 * 로그인 함수
 * @param {string} username - 사용자 아이디
 * @param {string} password - 비밀번호
 * @returns {Promise} 로그인 결과 Promise
 */
export const loginUser = (username, password) => {
  // 실제 구현에서는 API 호출
  return new Promise((resolve, reject) => {
    // 임시 인증 로직 (테스트용)
    if (username === 'testuser' && password === 'password123') {
      const user = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        fullName: '홍길동',
        profileImage: 'https://via.placeholder.com/150',
        phoneNumber: '010-1234-5678'
      };
      
      const token = 'dummy_token_' + Math.random().toString(36).substring(2);
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      resolve(user);
    } else {
      reject(new Error('아이디 또는 비밀번호가 올바르지 않습니다.'));
    }
  });
};

/**
 * 로그아웃 함수
 */
export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

/**
 * 회원가입 함수
 * @param {Object} userData - 회원가입 정보
 * @returns {Promise} 회원가입 결과 Promise
 */
export const registerUser = (userData) => {
  // 실제 구현에서는 API 호출
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = {
        id: Date.now(),
        username: userData.username,
        email: userData.email,
        fullName: userData.fullName,
        profileImage: 'https://via.placeholder.com/150',
        phoneNumber: userData.phoneNumber
      };
      
      const token = 'dummy_token_' + Math.random().toString(36).substring(2);
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      resolve(user);
    }, 1000);
  });
};

/**
 * 사용자 정보 업데이트 함수
 * @param {Object} currentUser - 현재 사용자 정보
 * @param {Object} updatedData - 업데이트할 정보
 * @returns {Promise} 업데이트 결과 Promise
 */
export const updateProfile = (currentUser, updatedData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedUser = { ...currentUser, ...updatedData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      resolve(updatedUser);
    }, 1000);
  });
};

/**
 * 저장된 사용자 정보 가져오기
 * @returns {Object|null} 사용자 정보 또는 null
 */
export const getSavedUser = () => {
  try {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      return JSON.parse(savedUser);
    }
    
    return null;
  } catch (error) {
    console.error('사용자 정보 파싱 오류:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return null;
  }
};