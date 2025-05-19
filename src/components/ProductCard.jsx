// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

// 타이머 형식 변환
const formatTimeLeft = (endTime) => {
  const now = new Date();
  const end = new Date(endTime);
  const diff = end - now;
  
  if (diff <= 0) return '종료됨';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) {
    return `${days}일 ${hours}시간`;
  } else if (hours > 0) {
    return `${hours}시간 ${minutes}분`;
  } else {
    return `${minutes}분`;
  }
};

// 가격 형식 변환
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductCard = ({ product, showBidStatus = false, showCountdown = false }) => {
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image-container">
        <img src={product.imageUrl} alt={product.title} className="product-image" />
        
        {/* 경매 상태 뱃지 */}
        {product.auctionType === 'auction' && (
          <span className="auction-badge">경매</span>
        )}
        {product.auctionType === 'buy-now' && (
          <span className="buy-now-badge">즉시구매</span>
        )}
        
        {/* 남은 시간 카운트다운 */}
        {showCountdown && (
          <div className="countdown-badge">
            {formatTimeLeft(product.endTime)}
          </div>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        
        <div className="product-price-info">
          <span className="product-price">
            ₩{formatPrice(product.currentPrice)}
          </span>
          
          {product.auctionType === 'auction' && (
            <span className="bid-count">
              입찰 {product.bidCount}
            </span>
          )}
        </div>
        
        {/* 내 입찰 상태 */}
        {showBidStatus && (
          <div className={`bid-status ${product.isHighestBidder ? 'highest' : 'outbid'}`}>
            {product.isHighestBidder ? '최고 입찰자' : '입찰 중'}
          </div>
        )}
        
        <div className="product-meta">
          <span className="product-condition">{product.condition}</span>
          <span className="product-time-left">{formatTimeLeft(product.endTime)}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;