// marketai-frontend/src/contexts/authUtils.js
// 로그인 유틸리티 함수
export const loginUser = (userData, token) => {
  localStorage.setItem('user', JSON.stringify(userData));
  localStorage.setItem('token', token);
};

// 로그아웃 유틸리티 함수
export const logoutUser = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};