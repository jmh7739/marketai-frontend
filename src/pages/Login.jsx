// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // 로그인 후 리디렉션할 경로
  const from = location.state?.from?.pathname || '/';
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim() || !password) {
      setError('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      
      await login(username, password);
      
      // 로그인 성공 후 리디렉션
      navigate(from, { replace: true });
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>로그인</h1>
          <p>마켓에이아이에 오신 것을 환영합니다!</p>
        </div>
        
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">아이디</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="아이디를 입력하세요"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>
          
          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>아이디 저장</span>
            </label>
            
            <Link to="/forgot-password" className="forgot-password">
              비밀번호 찾기
            </Link>
          </div>
          
          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
        
        <div className="social-login">
          <p>소셜 계정으로 로그인</p>
          <div className="social-buttons">
            <button className="social-button kakao">
              <svg width="18" height="18" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                <path d="M128 36C70.562 36 24 72.713 24 118C24 147.67 44.119 173.423 74.255 186.951C72.794 192.43 65.219 220.275 64.58 223.172C64.58 223.172 64.088 226.571 66.285 227.857C68.483 229.143 70.807 227.455 70.807 227.455C74.465 225.455 107.063 202.997 113.626 198.066C118.296 198.715 123.068 199.033 128 199.033C185.438 199.033 232 162.319 232 117.033C232 71.746 185.438 36 128 36Z" fill="currentColor"/>
              </svg>
              <span>카카오 로그인</span>
            </button>
            <button className="social-button naver">
              <svg width="18" height="18" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5615 10.4828L6.14588 0H0V20H6.43845V9.51724L13.8541 20H20V0H13.5615V10.4828Z" fill="currentColor"/>
              </svg>
              <span>네이버 로그인</span>
            </button>
          </div>
        </div>
        
        <div className="login-footer">
          <p>계정이 없으신가요? <Link to="/register">회원가입</Link></p>
        </div>
      </div>
      
      <div className="login-benefits">
        <h2>마켓에이아이 회원 혜택</h2>
        
        <div className="benefits-list">
          <div className="benefit-item">
            <div className="benefit-icon">🎁</div>
            <div className="benefit-content">
              <h3>신규 가입 혜택</h3>
              <p>회원가입 시 즉시 사용 가능한 3,000원 포인트 증정</p>
            </div>
          </div>
          
          <div className="benefit-item">
            <div className="benefit-icon">🔔</div>
            <div className="benefit-content">
              <h3>관심 상품 알림</h3>
              <p>찜한 상품의 가격 변동과 경매 종료 알림 서비스</p>
            </div>
          </div>
          
          <div className="benefit-item">
            <div className="benefit-icon">💰</div>
            <div className="benefit-content">
              <h3>AI 가격 제안</h3>
              <p>사용자 맞춤형 적정 입찰가 추천 및 분석</p>
            </div>
          </div>
          
          <div className="benefit-item">
            <div className="benefit-icon">🛡️</div>
            <div className="benefit-content">
              <h3>안전 거래 보장</h3>
              <p>안전 결제 시스템과 구매자 보호 정책</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;