import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './ProductForm.css';

const ProductForm = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'electronics',
    startingPrice: '',
    reservePrice: '',
    duration: '3',
    images: []
  });

  useEffect(() => {
    // 로그인하지 않은 사용자는 로그인 페이지로 리디렉션
    if (!currentUser) {
      navigate('/login', { state: { from: '/sell' } });
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      setError('최대 5개의 이미지만 업로드할 수 있습니다.');
      return;
    }

    // 간단한 이미지 미리보기 구현
    const imagePromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then(images => {
      setFormData({
        ...formData,
        images
      });
      setError('');
    });
  };

  const validateForm = () => {
    if (!formData.title.trim()) return '상품명을 입력해주세요.';
    if (!formData.description.trim()) return '상품 설명을 입력해주세요.';
    if (isNaN(formData.startingPrice) || Number(formData.startingPrice) <= 0) 
      return '유효한 시작 가격을 입력해주세요.';
    if (formData.reservePrice && (isNaN(formData.reservePrice) || Number(formData.reservePrice) <= Number(formData.startingPrice))) 
      return '예약 가격은 시작 가격보다 높아야 합니다.';
    if (formData.images.length === 0) return '최소 한 개의 이미지를 업로드해주세요.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      // 여기서 실제 API 호출 대신 더미 데이터에 추가하는 로직을 구현합니다.
      // 프로덕션 환경에서는 API를 호출해야 합니다.
      
      // 더미 상품 ID 생성 (실제 구현에서는 서버에서 받아야 함)
      const newProductId = Math.floor(Math.random() * 10000).toString();
      
      // 경매 종료 시간 계산
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + parseInt(formData.duration));
      
      // 현재 시간 기준으로 시작
      const now = new Date();
      
      const newProduct = {
        id: newProductId,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        startingPrice: Number(formData.startingPrice),
        currentPrice: Number(formData.startingPrice),
        reservePrice: formData.reservePrice ? Number(formData.reservePrice) : null,
        seller: {
          id: currentUser.id,
          name: currentUser.displayName || '판매자',
          rating: currentUser.rating || 4.5
        },
        images: formData.images,
        bids: [],
        endTime: endDate.toISOString(),
        startTime: now.toISOString(),
        watchers: 0,
        status: 'active'
      };
      
      // localStorage에 상품 추가 (실제로는 API 호출)
      const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
      localStorage.setItem('products', JSON.stringify([...existingProducts, newProduct]));
      
      // 성공 시 상품 상세 페이지로 이동
      navigate(`/product/${newProductId}`);
    } catch (err) {
      setError('상품 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
      console.error('상품 등록 오류:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form-container">
      <h1>상품 등록</h1>
      <p className="form-subtitle">경매에 올릴 상품 정보를 입력해주세요</p>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="title">상품명 *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="상품명을 입력하세요"
            maxLength={100}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category">카테고리 *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="electronics">전자제품</option>
            <option value="fashion">패션/의류</option>
            <option value="beauty">뷰티/미용</option>
            <option value="home">홈/리빙</option>
            <option value="books">도서/음반/DVD</option>
            <option value="toys">장난감/취미</option>
            <option value="sports">스포츠/레저</option>
            <option value="automotive">자동차/오토바이</option>
            <option value="collectibles">수집품/예술품</option>
            <option value="other">기타</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="description">상품 설명 *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="상품의 상태, 특징, 구매 이력 등을 자세히 설명해주세요"
            rows={6}
            maxLength={2000}
            required
          />
          <div className="char-count">{formData.description.length}/2000</div>
        </div>
        
        <div className="price-duration-container">
          <div className="form-group">
            <label htmlFor="startingPrice">시작 가격 (₩) *</label>
            <input
              type="number"
              id="startingPrice"
              name="startingPrice"
              value={formData.startingPrice}
              onChange={handleChange}
              placeholder="1000"
              min="100"
              step="100"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="reservePrice">예약 가격 (₩) <span className="optional">선택사항</span></label>
            <input
              type="number"
              id="reservePrice"
              name="reservePrice"
              value={formData.reservePrice}
              onChange={handleChange}
              placeholder="최소 판매 희망가격"
              min="100"
              step="100"
            />
            <p className="field-help">예약 가격 미만으로는 판매되지 않습니다</p>
          </div>
          
          <div className="form-group">
            <label htmlFor="duration">경매 기간 *</label>
            <select
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            >
              <option value="1">1일</option>
              <option value="3">3일</option>
              <option value="5">5일</option>
              <option value="7">7일</option>
              <option value="10">10일</option>
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="images">상품 이미지 *</label>
          <div className="image-upload-container">
            <div className="image-upload-box">
              <input
                type="file"
                id="images"
                name="images"
                onChange={handleImageChange}
                accept="image/*"
                multiple
                className="file-input"
              />
              <div className="upload-placeholder">
                <i className="fas fa-cloud-upload-alt"></i>
                <p>이미지를 여기에 끌어다 놓거나 클릭하여 업로드하세요</p>
                <p className="upload-help">최대 5개 이미지, 이미지당 5MB 이하</p>
              </div>
            </div>
            
            {formData.images.length > 0 && (
              <div className="image-preview-container">
                {formData.images.map((image, index) => (
                  <div key={index} className="image-preview">
                    <img src={image} alt={`Preview ${index}`} />
                    <button
                      type="button"
                      className="remove-image"
                      onClick={() => {
                        const newImages = [...formData.images];
                        newImages.splice(index, 1);
                        setFormData({...formData, images: newImages});
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate('/')}
            disabled={loading}
          >
            취소
          </button>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? '처리 중...' : '경매 등록하기'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;