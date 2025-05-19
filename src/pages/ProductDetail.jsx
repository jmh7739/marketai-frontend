// src/pages/ProductDetail.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { formatTimeLeft, formatPrice } from '../utils/formatters';
import './ProductDetail.css';

// 더미 데이터 (나중에 API로 대체)
import { productDetails } from '../data/dummyData';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [bidError, setBidError] = useState('');
  const [showBidConfirm, setShowBidConfirm] = useState(false);
  const [isWatching, setIsWatching] = useState(false);
  const [showDescription, setShowDescription] = useState(true);
  const [showBidHistory, setShowBidHistory] = useState(false);
  const [showSellerInfo, setShowSellerInfo] = useState(false);
  const [showShippingInfo, setShowShippingInfo] = useState(false);
  
  const timerRef = useRef(null);
  
  // 상품 정보 가져오기
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // 실제 구현에서는 API 호출
        // 여기서는 더미 데이터 사용
        const data = productDetails[parseInt(id)];
        
        if (!data) {
          setError('상품을 찾을 수 없습니다.');
        } else {
          setProduct(data);
          
          // 초기 입찰가 설정 (현재가 + 입찰 단위)
          setBidAmount(data.currentPrice + data.bidIncrement);
        }
      } catch (error) {
        console.error('상품 정보 가져오기 실패:', error);
        setError('상품 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);
  
  // 남은 시간 카운트다운
  useEffect(() => {
    if (!product) return;
    
    const updateTimeLeft = () => {
      const timeLeftStr = formatTimeLeft(product.endTime);
      setTimeLeft(timeLeftStr);
      
      // 경매가 종료되었는지 확인
      const now = new Date();
      const end = new Date(product.endTime);
      
      if (now >= end) {
        // 카운트다운 종료
        clearInterval(timerRef.current);
      }
    };
    
    // 초기 설정
    updateTimeLeft();
    
    // 1초마다 업데이트
    timerRef.current = setInterval(updateTimeLeft, 1000);
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [product]);
  
  // 입찰 금액 변경 핸들러
  const handleBidAmountChange = (e) => {
    const value = e.target.value.replace(/,/g, '');
    
    if (/^\d*$/.test(value)) {
      setBidAmount(value);
      setBidError('');
    }
  };
  
  // 입찰 전 유효성 검사
  const validateBid = () => {
    const bidValue = parseInt(bidAmount);
    
    if (!bidValue) {
      setBidError('입찰 금액을 입력해주세요.');
      return false;
    }
    
    if (bidValue <= product.currentPrice) {
      setBidError(`현재 입찰가(${formatPrice(product.currentPrice)}원)보다 높은 금액을 입력해주세요.`);
      return false;
    }
    
    if (bidValue < product.currentPrice + product.bidIncrement) {
      setBidError(`최소 입찰 단위는 ${formatPrice(product.bidIncrement)}원입니다.`);
      return false;
    }
    
    return true;
  };
  
  // 입찰하기 버튼 클릭 핸들러
  const handleBidSubmit = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/product/${id}` } });
      return;
    }
    
    if (!validateBid()) {
      return;
    }
    
    // 입찰 확인 모달 표시
    setShowBidConfirm(true);
  };
  
  // 입찰 확인
  const confirmBid = async () => {
    try {
      // 실제 구현에서는 API 호출
      console.log(`상품 ID: ${id}, 입찰 금액: ${bidAmount}원 입찰 완료`);
      
      // 입찰 성공 시 상품 정보 업데이트 (임시)
      setProduct(prev => ({
        ...prev,
        currentPrice: parseInt(bidAmount),
        bidCount: prev.bidCount + 1,
        bidHistory: [
          { 
            username: 'testuser', 
            amount: parseInt(bidAmount), 
            date: new Date().toISOString() 
          },
          ...prev.bidHistory
        ]
      }));
      
      // 입찰 확인 모달 닫기
      setShowBidConfirm(false);
      
      // 다음 입찰가 설정
      setBidAmount(parseInt(bidAmount) + product.bidIncrement);
    } catch (error) {
      console.error('입찰 실패:', error);
      setBidError('입찰 중 오류가 발생했습니다. 다시 시도해주세요.');
      setShowBidConfirm(false);
    }
  };
  
  // 즉시 구매 핸들러
  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/product/${id}` } });
      return;
    }
    
    // 실제 구현에서는 구매 프로세스로 이동
    navigate(`/checkout/${id}?type=buy-now`);
  };
  
  // 관심 상품 추가/제거 핸들러
  const toggleWatchlist = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/product/${id}` } });
      return;
    }
    
    // 실제 구현에서는 API 호출
    setIsWatching(prev => !prev);
  };
  
  // 탭 변경 핸들러
  const handleTabChange = (tab) => {
    setShowDescription(tab === 'description');
    setShowBidHistory(tab === 'bidHistory');
    setShowSellerInfo(tab === 'sellerInfo');
    setShowShippingInfo(tab === 'shippingInfo');
  };
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>상품 정보를 불러오는 중입니다...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="error-container">
        <h2>오류 발생</h2>
        <p>{error}</p>
        <button 
          className="button"
          onClick={() => navigate('/')}
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }
  
  if (!product) {
    return null;
  }
  
  return (
    <div className="product-detail-container">
      <div className="product-detail-grid">
        {/* 상품 이미지 */}
        <div className="product-images">
          <div className="main-image-container">
            <img 
              src={product.images[activeImage]} 
              alt={product.title} 
              className="main-image" 
            />
          </div>
          
          <div className="thumbnail-gallery">
            {product.images.map((image, index) => (
              <div 
                key={index}
                className={`thumbnail ${index === activeImage ? 'active' : ''}`}
                onClick={() => setActiveImage(index)}
              >
                <img src={image} alt={`썸네일 ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
        
        {/* 상품 정보 */}
        <div className="product-info">
          <div className="product-header">
            <div className="product-badges">
              <span className={`badge ${product.auctionType === 'auction' ? 'auction' : 'buy-now'}`}>
                {product.auctionType === 'auction' ? '경매' : '즉시구매'}
              </span>
              <span className={`badge condition ${product.condition.includes('새 상품') ? 'new' : 'used'}`}>
                {product.condition}
              </span>
            </div>
            <h1 className="product-title">{product.title}</h1>
            <div className="product-meta">
              <span className="product-id">상품 번호: {product.id}</span>
              <span className="view-count">조회수: {product.viewCount}</span>
              <span className="watch-count">관심: {product.watchCount}</span>
            </div>
          </div>
          
          <div className="product-auction-info">
            <div className="auction-status">
              <div className="price-container">
                <div className="current-price-label">현재가</div>
                <div className="current-price">₩{formatPrice(product.currentPrice)}</div>
                <div className="bid-count">{product.bidCount}명 입찰</div>
              </div>
              
              <div className="time-container">
                <div className="time-label">남은시간</div>
                <div className="time-left">{timeLeft}</div>
                <div className="end-date">
                  {new Date(product.endTime).toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })} 마감
                </div>
              </div>
            </div>
            
            {/* 입찰 영역 */}
            {product.auctionType === 'auction' && (
              <div className="bid-container">
                <div className="bid-input-container">
                  <label htmlFor="bidAmount">입찰가</label>
                  <div className="input-with-currency">
                    <span className="currency-symbol">₩</span>
                    <input
                      type="text"
                      id="bidAmount"
                      value={bidAmount.toLocaleString()}
                      onChange={handleBidAmountChange}
                      className={bidError ? 'error' : ''}
                    />
                  </div>
                  {bidError && <div className="bid-error">{bidError}</div>}
                  <div className="bid-hint">
                    최소 입찰 단위: ₩{formatPrice(product.bidIncrement)}
                  </div>
                </div>
                
                <button 
                  className="bid-button"
                  onClick={handleBidSubmit}
                >
                  입찰하기
                </button>
              </div>
            )}
            
            {/* 즉시 구매 영역 */}
            {product.buyNowPrice && (
              <div className="buy-now-container">
                <div className="buy-now-price">
                  즉시 구매가: ₩{formatPrice(product.buyNowPrice)}
                </div>
                <button 
                  className="buy-now-button"
                  onClick={handleBuyNow}
                >
                  즉시 구매하기
                </button>
              </div>
            )}
            
            {/* 관심 상품 추가 */}
            <button 
              className={`watch-button ${isWatching ? 'watching' : ''}`}
              onClick={toggleWatchlist}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill={isWatching ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{isWatching ? '관심 상품에서 삭제' : '관심 상품에 추가'}</span>
            </button>
          </div>
          
          {/* 판매자 정보 요약 */}
          <div className="seller-summary">
            <div className="seller-avatar">
              <img src="https://via.placeholder.com/40" alt={product.seller.username} />
            </div>
            <div className="seller-info">
              <div className="seller-name">{product.seller.username}</div>
              <div className="seller-rating">
                <span className="rating-stars">
                  {'★'.repeat(Math.floor(product.seller.rating))}
                  {'☆'.repeat(5 - Math.floor(product.seller.rating))}
                </span>
                <span className="rating-value">{product.seller.rating.toFixed(1)}</span>
              </div>
            </div>
            <button className="contact-seller-button">
              판매자 문의
            </button>
          </div>
        </div>
      </div>
      
      {/* 상품 상세 정보 탭 */}
      <div className="product-detail-tabs">
        <div className="tabs-header">
          <button 
            className={`tab ${showDescription ? 'active' : ''}`}
            onClick={() => handleTabChange('description')}
          >
            상품 설명
          </button>
          <button 
            className={`tab ${showBidHistory ? 'active' : ''}`}
            onClick={() => handleTabChange('bidHistory')}
          >
            입찰 기록 ({product.bidHistory.length})
          </button>
          <button 
            className={`tab ${showSellerInfo ? 'active' : ''}`}
            onClick={() => handleTabChange('sellerInfo')}
          >
            판매자 정보
          </button>
          <button 
            className={`tab ${showShippingInfo ? 'active' : ''}`}
            onClick={() => handleTabChange('shippingInfo')}
          >
            배송/반품 정보
          </button>
        </div>
        
        <div className="tab-content">
          {/* 상품 설명 탭 */}
          {showDescription && (
            <div className="tab-pane description">
              <div className="description-content">
                <pre>{product.fullDescription}</pre>
              </div>
              
              <div className="product-categories">
                <h3>카테고리</h3>
                <div className="category-tags">
                  {product.categories.map((category, index) => (
                    <span key={index} className="category-tag">{category}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* 입찰 기록 탭 */}
          {showBidHistory && (
            <div className="tab-pane bid-history">
              <h3>입찰 기록</h3>
              
              {product.bidHistory.length === 0 ? (
                <p className="no-bids">아직 입찰 내역이 없습니다.</p>
              ) : (
                <div className="bid-history-list">
                  <div className="bid-history-header">
                    <div className="bidder">입찰자</div>
                    <div className="bid-amount">입찰가</div>
                    <div className="bid-time">입찰 시간</div>
                  </div>
                  
                  {product.bidHistory.map((bid, index) => (
                    <div key={index} className="bid-history-item">
                      <div className="bidder">{bid.username}</div>
                      <div className="bid-amount">₩{formatPrice(bid.amount)}</div>
                      <div className="bid-time">
                        {new Date(bid.date).toLocaleString('ko-KR', {
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* 판매자 정보 탭 */}
          {showSellerInfo && (
            <div className="tab-pane seller-info">
              <h3>판매자 정보</h3>
              
              <div className="seller-detail">
                <div className="seller-profile">
                  <img 
                    src="https://via.placeholder.com/100" 
                    alt={product.seller.username} 
                    className="seller-avatar-large"
                  />
                  <div className="seller-profile-info">
                    <h4>{product.seller.username}</h4>
                    <div className="seller-rating-large">
                      <span className="rating-stars">
                        {'★'.repeat(Math.floor(product.seller.rating))}
                        {'☆'.repeat(5 - Math.floor(product.seller.rating))}
                      </span>
                      <span className="rating-value">{product.seller.rating.toFixed(1)}</span>
                    </div>
                    <div className="seller-stats">
                      <div className="stat-item">
                        <div className="stat-label">판매 횟수</div>
                        <div className="stat-value">{product.seller.totalSales}회</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-label">응답률</div>
                        <div className="stat-value">{product.seller.responseRate}%</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-label">응답 시간</div>
                        <div className="stat-value">{product.seller.responseTime}</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-label">가입일</div>
                        <div className="stat-value">{product.seller.joinDate}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="seller-actions">
                  <button className="contact-seller-button-large">
                    판매자에게 문의하기
                  </button>
                  <button className="view-items-button">
                    판매자의 다른 상품 보기
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* 배송/반품 정보 탭 */}
          {showShippingInfo && (
            <div className="tab-pane shipping-info">
              <h3>배송 정보</h3>
              
              <div className="shipping-options">
                <h4>배송 방법</h4>
                <div className="shipping-options-list">
                  {product.shippingOptions.map((option, index) => (
                    <div key={index} className="shipping-option">
                      <div className="shipping-method">
                        <strong>{option.method}</strong>
                        {option.method === '직거래' && (
                          <span className="location-info"> - {option.location}</span>
                        )}
                      </div>
                      <div className="shipping-price">
                        {option.price > 0 ? `₩${formatPrice(option.price)}` : '무료'}
                      </div>
                      {option.estimatedDelivery && (
                        <div className="delivery-estimate">
                          {option.estimatedDelivery}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="return-policy">
                <h4>반품/교환 정책</h4>
                <p>{product.returnPolicy}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* 입찰 확인 모달 */}
      {showBidConfirm && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>입찰 확인</h3>
              <button 
                className="modal-close"
                onClick={() => setShowBidConfirm(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>다음 금액으로 입찰하시겠습니까?</p>
              <div className="confirm-bid-amount">₩{formatPrice(bidAmount)}</div>
              <p className="confirm-notice">
                입찰 후에는 취소할 수 없으며, 더 높은 입찰자가 나타나지 않으면
                낙찰 시 구매 의무가 발생합니다.
              </p>
            </div>
            <div className="modal-footer">
              <button 
                className="cancel-button"
                onClick={() => setShowBidConfirm(false)}
              >
                취소
              </button>
              <button 
                className="confirm-button"
                onClick={confirmBid}
              >
                입찰 확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;