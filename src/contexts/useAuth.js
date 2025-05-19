// marketai-frontend/src/contexts/useAuth.js
import { useContext } from 'react';
import AuthContext from './AuthContext';

// 컨텍스트 사용을 위한 훅
export default function useAuth() {
  return useContext(AuthContext);
}