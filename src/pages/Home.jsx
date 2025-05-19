// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import CategoryMenu from '../components/CategoryMenu';
import ProductCard from '../components/ProductCard';
import './Home.css';

// 임시 데이터 (나중에 API로 대체)
import { 
  featuredProducts, 
  recommendedProducts, 
  endingSoonProducts,
  popularProducts, 
  newProducts
} from '../data/dummyData';

const Home = () => {
  const [userBids, setUserBids] = useState([]);
  const [loading, setLoading] = useState(true); // isLoading -> loading으로 변경
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // 사용자 인증 상태 및 입찰 정보 가져오기
  useEffect(() => {
    // 실제 구현 시 API 호출로 대체
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // 사용자 입찰 정보 가져오기 (실제로는 API 호출)
      setUserBids(featuredProducts.slice(0, 3));
    }
    
    setLoading(false);
  }, []);
  
  // loading 상태를 사용하는 조건부 렌더링 추가
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>콘텐츠를 불러오는 중입니다...</p>
      </div>
    );
  }
  
  return (
    <div className="home-container">
      <div className="home-layout">
        {/* 왼쪽 카테고리 메뉴 */}
        <aside className="category-sidebar">
          <CategoryMenu />
        </aside>
        
        {/* 메인 콘텐츠 영역 */}
        <main className="main-content">
          {/* 배너 슬라이더 */}
          <section className="banner-section">
            <Banner />
          </section>
          
          {/* 로그인 사용자를 위한 입찰 중인 상품 */}
          {isAuthenticated && (
            <section className="user-bids-section">
              <div className="section-header">
                <h2>내 입찰 중인 상품</h2>
                <Link to="/my-bids" className="view-all">모두 보기</Link>
              </div>
              <div className="product-grid">
                {userBids.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    showBidStatus 
                  />
                ))}
              </div>
            </section>
          )}
          
          {/* 오늘의 추천 경매 */}
          <section className="recommended-section">
            <div className="section-header">
              <h2>오늘의 추천 경매</h2>
              <Link to="/recommended" className="view-all">모두 보기</Link>
            </div>
            <div className="product-grid">
              {recommendedProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                />
              ))}
            </div>
          </section>
          
          {/* 마감 임박 경매 */}
          <section className="ending-soon-section">
            <div className="section-header">
              <h2>마감 임박 경매</h2>
              <Link to="/ending-soon" className="view-all">모두 보기</Link>
            </div>
            <div className="product-grid">
              {endingSoonProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  showCountdown 
                />
              ))}
            </div>
          </section>
          
          {/* 인기 상품 */}
          <section className="popular-section">
            <div className="section-header">
              <h2>인기 상품</h2>
              <Link to="/popular" className="view-all">모두 보기</Link>
            </div>
            <div className="product-grid">
              {popularProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                />
              ))}
            </div>
          </section>
          
          {/* 신규 등록 상품 */}
          <section className="new-products-section">
            <div className="section-header">
              <h2>신규 등록 상품</h2>
              <Link to="/new-products" className="view-all">모두 보기</Link>
            </div>
            <div className="product-grid">
              {newProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;