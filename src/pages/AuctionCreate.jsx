// marketai-frontend/src/pages/AuctionCreate.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts';
import './AuctionCreate.css';

// 임시 데이터
const DUMMY_PRODUCTS = [
  {
    id: 1,
    title: '애플 아이폰 14 Pro 128GB',
    description: '애플 최신 플래그십 스마트폰',
    price: 1250000,
    imageUrl: 'https://via.placeholder.com/300x300?text=iPhone+14+Pro',
    condition: '새 상품',
    seller: '애플스토어',
    createdAt: '2023-01-15'
  }
];

const AuctionCreate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    startingBid: '',
    minBidIncrement: '10000',
    startTime: '',
    endTime: '',
    allowAutoBid: true
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 로그인 상태 확인
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { message: '경매 생성을 위해 로그인이 필요합니다.' } });
    }
  }, [isAuthenticated, navigate]);
  
  // 상품 정보 로드
  useEffect(() => {
    // 실제로는 API에서 데이터를 가져옴
    // const fetchProductDetail = async () => {
    //   try {
    //     const response = await fetch(`/api/products/${id}`);
    //     const data = await response.json();
    //     setProduct(data);
    //     setFormData(prevData => ({
    //       ...prevData,
    //       startingBid: data.price.toString()
    //     }));
    //   } catch (error) {
    //     console.error('상품 상세 로딩 중 오류:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    
    // 임시 데이터 사용
    const loadProductDetail = () => {
      setTimeout(() => {
        const foundProduct = DUMMY_PRODUCTS.find(p => p.id === parseInt(id));
        if (foundProduct) {
          setProduct(foundProduct);
          setFormData(prevData => ({
            ...prevData,
            startingBid: foundProduct.price.toString()
          }));
        }
        setLoading(false);
      }, 800); // 로딩 시뮬레이션
    };
    
    loadProductDetail();
  }, [id]);
  
  // 입력 필드 변경 핸들러
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // 체크박스 처리
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
      return;
    }
    
    // 금액 입력 처리 (숫자만 허용)
    if (name === 'startingBid' || name === 'minBidIncrement') {
      const numericValue = value.replace(/\D/g, '');
      setFormData({
        ...formData,
        [name]: numericValue
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // 오류 메시지 초기화
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  // 현재 시간에서 1시간 후
  const getDefaultStartTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    return now.toISOString().slice(0, 16);
  };
  
  // 현재 시간에서 7일 후
  const getDefaultEndTime = () => {
    const now = new Date();
    now.setDate(now.getDate() + 7);
    return now.toISOString().slice(0, 16);
  };
  
  // 초기 시간 설정
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      startTime: getDefaultStartTime(),
      endTime: getDefaultEndTime()
    }));
  }, []);
  
  // 폼 유효성 검사
  const validateForm = () => {
    const newErrors = {};
    
    // 시작 입찰가 검사
    if (!formData.startingBid) {
      newErrors.startingBid = '시작 입찰가를 입력해주세요.';
    } else if (parseInt(formData.startingBid) <= 0) {
      newErrors.startingBid = '시작 입찰가는 0보다 커야 합니다.';
    }
    
    // 최소 입찰 단위 검사
    if (!formData.minBidIncrement) {
      newErrors.minBidIncrement = '최소 입찰 단위를 입력해주세요.';
    } else if (parseInt(formData.minBidIncrement) <= 0) {
      newErrors.minBidIncrement = '최소 입찰 단위는 0보다 커야 합니다.';
    }
    
    // 시작 시간 검사
    if (!formData.startTime) {
      newErrors.startTime = '경매 시작 시간을 입력해주세요.';
    } else {
      const startTime = new Date(formData.startTime);
      const now = new Date();
      if (startTime <= now) {
        newErrors.startTime = '경매 시작 시간은 현재 시간 이후여야 합니다.';
      }
    }
    
    // 종료 시간 검사
    if (!formData.endTime) {
      newErrors.endTime = '경매 종료 시간을 입력해주세요.';
    } else {
      const endTime = new Date(formData.endTime);
      const startTime = new Date(formData.startTime);
      if (endTime <= startTime) {
        newErrors.endTime = '경매 종료 시간은 시작 시간 이후여야 합니다.';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // 실제로는 경매 생성 API 호출
      // const response = await fetch('/api/auctions', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     product_id: id,
      //     starting_bid: formData.startingBid,
      //     min_bid_increment: formData.minBidIncrement,
      //     start_time: formData.startTime,
      //     end_time: formData.endTime,
      //     allow_auto_bid: formData.allowAutoBid
      //   })
      // });
      // const data = await response.json();
      
      // 모의 응답 (백엔드 연동 시 교체)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 성공 시 상품 상세 페이지로 이동
      navigate(`/products/${id}`, { 
        state: { message: '경매가 성공적으로 등록되었습니다.' } 
      });
    } catch (error) {
      console.error('경매 생성 오류:', error);
      setErrors({
        ...errors,
        general: '경매 등록 중 오류가 발생했습니다. 다시 시도해주세요.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // 가격 포맷팅
  const formatPrice = (price) => {
    return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '';
  };
  
  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>상품 정보를 불러오는 중입니다...</p>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="product-not-found">
        <h2>상품을 찾을 수 없습니다</h2>
        <p>요청하신 상품이 존재하지 않거나 삭제되었습니다.</p>
        <button 
          onClick={() => navigate('/products')}
          className="back-button"
        >
          상품 목록으로 돌아가기
        </button>
      </div>
    );
  }
  
  return (
    <div className="auction-create-container">
      <h1 className="page-title">경매 등록</h1>
      
      {errors.general && <div className="error-alert">{errors.general}</div>}
      
      <div className="product-summary">
        <div className="product-image-container">
          <img 
            src={product.imageUrl} 
            alt={product.title} 
            className="product-image"
          />
        </div>
        <div className="product-info">
          <h2 className="product-title">{product.title}</h2>
          <p className="product-price">상품 가격: ₩{formatPrice(product.price)}</p>
          <p className="product-condition">상태: {product.condition}</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="auction-form">
        <div className="form-group">
          <label htmlFor="startingBid">시작 입찰가 (원) *</label>
          <input
            type="text"
            id="startingBid"
            name="startingBid"
            value={formatPrice(formData.startingBid)}
            onChange={handleChange}
            placeholder="시작 입찰가를 입력해주세요"
          />
          {errors.startingBid && <div className="error-message">{errors.startingBid}</div>}
          <div className="form-hint">
            일반적으로 상품 가격의 60-80%로 설정하는 것이 좋습니다.
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="minBidIncrement">최소 입찰 단위 (원) *</label>
          <input
            type="text"
            id="minBidIncrement"
            name="minBidIncrement"
            value={formatPrice(formData.minBidIncrement)}
            onChange={handleChange}
            placeholder="최소 입찰 단위를 입력해주세요"
          />
          {errors.minBidIncrement && <div className="error-message">{errors.minBidIncrement}</div>}
          <div className="form-hint">
            구매자가 입찰할 때 최소한으로 올려야 하는 금액입니다.
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startTime">경매 시작 시간 *</label>
            <input
              type="datetime-local"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
            />
            {errors.startTime && <div className="error-message">{errors.startTime}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="endTime">경매 종료 시간 *</label>
            <input
              type="datetime-local"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
            />
            {errors.endTime && <div className="error-message">{errors.endTime}</div>}
          </div>
        </div>
        
        <div className="form-group checkbox">
          <input
            type="checkbox"
            id="allowAutoBid"
            name="allowAutoBid"
            checked={formData.allowAutoBid}
            onChange={handleChange}
          />
          <label htmlFor="allowAutoBid">자동 입찰 허용</label>
          <div className="form-hint">
            자동 입찰을 허용하면 구매자가 최대 입찰가를 설정하고 자동으로 입찰할 수 있습니다.
          </div>
        </div>
        
        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate(`/products/${id}`)}
          >
            취소
          </button>
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? '등록 중...' : '경매 등록하기'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuctionCreate;