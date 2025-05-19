// src/components/Banner.jsx
import React, { useState, useEffect } from 'react';
import './Banner.css';

// 임시 배너 데이터
const banners = [
  {
    id: 1,
    image: 'https://via.placeholder.com/1200x300?text=MarketAI+Special+Event',
    title: '특별 이벤트',
    subtitle: '신규 가입자 20% 할인 쿠폰 증정',
    link: '/event/1'
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/1200x300?text=Premium+Electronics+Auction',
    title: '프리미엄 전자제품 경매',
    subtitle: '최신 애플 제품을 특별한 가격에',
    link: '/event/2'
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/1200x300?text=Limited+Edition+Collection',
    title: '한정판 컬렉션',
    subtitle: '희귀 아이템을 만나보세요',
    link: '/event/3'
  }
];

const Banner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  
  // 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % banners.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // 배너 변경 핸들러
  const handleBannerChange = (index) => {
    setCurrentBanner(index);
  };
  
  // 이전 배너
  const handlePrev = () => {
    setCurrentBanner(prev => 
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };
  
  // 다음 배너
  const handleNext = () => {
    setCurrentBanner(prev => 
      (prev + 1) % banners.length
    );
  };
  
  return (
    <div className="banner-slider">
      <div className="banner-container" style={{ transform: `translateX(-${currentBanner * 100}%)` }}>
        {banners.map(banner => (
          <div key={banner.id} className="banner-slide">
            <img src={banner.image} alt={banner.title} className="banner-image" />
            <div className="banner-content">
              <h2 className="banner-title">{banner.title}</h2>
              <p className="banner-subtitle">{banner.subtitle}</p>
              <a href={banner.link} className="banner-button">자세히 보기</a>
            </div>
          </div>
        ))}
      </div>
      
      {/* 네비게이션 버튼 */}
      <button className="banner-nav prev" onClick={handlePrev}>❮</button>
      <button className="banner-nav next" onClick={handleNext}>❯</button>
      
      {/* 인디케이터 */}
      <div className="banner-indicators">
        {banners.map((_, index) => (
          <button 
            key={index} 
            className={`indicator-dot ${index === currentBanner ? 'active' : ''}`}
            onClick={() => handleBannerChange(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;