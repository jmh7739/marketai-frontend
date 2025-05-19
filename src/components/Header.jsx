// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // 검색 핸들러
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };
  
  // 로그아웃 핸들러
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  // 모바일 메뉴 토글
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // 알림 토글
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  
  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = () => {
      setShowNotifications(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  
  return (
    <header className="header">
      <div className="header-container">
        {/* 로고 */}
        <Link to="/" className="logo">
          <img src="/logo.png" alt="MarketAI" className="logo-image" />
          <span className="logo-text">MarketAI</span>
        </Link>
        
        {/* 검색창 */}
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="상품명, 카테고리 등 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
        
        {/* 사용자 메뉴 */}
        <div className="user-menu">
          {isAuthenticated ? (
            <>
              <div className="notification-container" onClick={(e) => e.stopPropagation()}>
                <button className="notification-button" onClick={toggleNotifications}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="notification-badge">3</span>
                </button>
                
                {/* 알림 드롭다운 */}
                {showNotifications && (
                  <div className="notification-dropdown">
                    <h3 className="notification-header">알림</h3>
                    <div className="notification-list">
                      <div className="notification-item unread">
                        <div className="notification-icon bid">🔔</div>
                        <div className="notification-content">
                          <p className="notification-text">
                            <strong>아이폰 14 Pro</strong> 상품에 새로운 입찰이 있습니다.
                          </p>
                          <span className="notification-time">10분 전</span>
                        </div>
                      </div>
                      <div className="notification-item unread">
                        <div className="notification-icon won">🏆</div>
                        <div className="notification-content">
                          <p className="notification-text">
                            <strong>애플 워치 SE</strong> 경매에서 낙찰되었습니다.
                          </p>
                          <span className="notification-time">1시간 전</span>
                        </div>
                      </div>
                      <div className="notification-item">
                        <div className="notification-icon message">✉️</div>
                        <div className="notification-content">
                          <p className="notification-text">
                            <strong>user123</strong>님이 메시지를 보냈습니다.
                          </p>
                          <span className="notification-time">어제</span>
                        </div>
                      </div>
                    </div>
                    <Link to="/notifications" className="view-all-notifications">
                      모든 알림 보기
                    </Link>
                  </div>
                )}
              </div>
              
              <Link to="/my-account" className="user-profile">
                <img 
                  src={currentUser.profileImage || "https://via.placeholder.com/40"} 
                  alt={currentUser.username} 
                  className="user-avatar"
                />
                <span className="user-name">{currentUser.username}</span>
              </Link>
              
              <button className="logout-button" onClick={handleLogout}>
                로그아웃
              </button>
              
              <Link to="/products/create" className="sell-button">
                판매하기
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-button login">로그인</Link>
              <Link to="/register" className="auth-button register">회원가입</Link>
            </>
          )}
        </div>
        
        {/* 모바일 메뉴 버튼 */}
        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      
      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-search">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">검색</button>
            </form>
          </div>
          
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              <li><Link to="/category/1">전자제품</Link></li>
              <li><Link to="/category/2">패션의류</Link></li>
              <li><Link to="/category/3">스포츠용품</Link></li>
              <li><Link to="/category/4">가구/인테리어</Link></li>
              <li><Link to="/category/5">도서/음반</Link></li>
              <li><Link to="/category/6">게임/취미</Link></li>
            </ul>
          </nav>
          
          <div className="mobile-user-menu">
            {isAuthenticated ? (
              <>
                <Link to="/my-account" className="mobile-menu-item">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>내 계정</span>
                </Link>
                <Link to="/my-bids" className="mobile-menu-item">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>내 입찰</span>
                </Link>
                <Link to="/notifications" className="mobile-menu-item">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span>알림</span>
                </Link>
                <Link to="/products/create" className="mobile-menu-item">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>판매하기</span>
                </Link>
                <div className="mobile-menu-item" onClick={handleLogout}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>로그아웃</span>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="mobile-menu-item">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>로그인</span>
                </Link>
                <Link to="/register" className="mobile-menu-item">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <span>회원가입</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;