// marketai-frontend/src/pages/ProductCreate.jsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts';
import './ProductCreate.css';

const ProductCreate = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    condition: '새 상품',
    price: '',
    shippingFee: '0',
    images: []
  });
  
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errors, setErrors] = useState({});
  
  // 로그인 상태 확인
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { message: '상품 등록을 위해 로그인이 필요합니다.' } });
    }
  }, [isAuthenticated, navigate]);
  
  // 입력 필드 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // 가격 및 배송비 입력 처리 (숫자만 허용)
    if (name === 'price' || name === 'shippingFee') {
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
  
  // 이미지 업로드 핸들러
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // 최대 5개 이미지 제한
    if (formData.images.length + files.length > 5) {
      setErrors({
        ...errors,
        images: '이미지는 최대 5개까지 업로드 가능합니다.'
      });
      return;
    }
    
    // 이미지 미리보기 생성
    const newImagePreviews = [...imagePreviewUrls];
    const newImages = [...formData.images];
    
    files.forEach(file => {
      // 파일 크기 검사 (10MB 제한)
      if (file.size > 10 * 1024 * 1024) {
        setErrors({
          ...errors,
          images: '이미지 크기는 10MB 이하여야 합니다.'
        });
        return;
      }
      
      // 이미지 타입 검사
      if (!file.type.match('image.*')) {
        setErrors({
          ...errors,
          images: '이미지 파일만 업로드 가능합니다.'
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        newImagePreviews.push(e.target.result);
        setImagePreviewUrls([...newImagePreviews]);
      };
      reader.readAsDataURL(file);
      
      newImages.push(file);
    });
    
    setFormData({
      ...formData,
      images: newImages
    });
    
    // 오류 메시지 초기화
    if (errors.images) {
      setErrors({
        ...errors,
        images: ''
      });
    }
  };
  
  // 이미지 삭제 핸들러
  const handleRemoveImage = (index) => {
    const newImages = [...formData.images];
    const newImagePreviews = [...imagePreviewUrls];
    
    newImages.splice(index, 1);
    newImagePreviews.splice(index, 1);
    
    setFormData({
      ...formData,
      images: newImages
    });
    setImagePreviewUrls(newImagePreviews);
  };
  
  // AI 분석 핸들러
  const handleAnalyze = async () => {
    if (formData.images.length === 0) {
      setErrors({
        ...errors,
        images: '이미지를 먼저 업로드해주세요.'
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      // 실제로는 AI 분석 API 호출
      // 현재는 모의 응답 사용
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 모의 AI 분석 결과
      setFormData({
        ...formData,
        title: formData.title || '애플 아이폰 14 Pro 128GB 실버',
        category: formData.category || '전자제품',
        description: formData.description || 
          '애플 아이폰 14 Pro 128GB 실버 모델입니다. 구매 후 1주일 사용했으며 상태는 매우 좋습니다. 액정 필름과 케이스 함께 드립니다. 직거래 가능합니다.',
        price: formData.price || '1200000'
      });
    } catch (error) {
      console.error('AI 분석 오류:', error);
      setErrors({
        ...errors,
        general: 'AI 분석 중 오류가 발생했습니다. 다시 시도해주세요.'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  // 폼 유효성 검사
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = '상품명을 입력해주세요.';
    if (!formData.description.trim()) newErrors.description = '상품 설명을 입력해주세요.';
    if (!formData.category) newErrors.category = '카테고리를 선택해주세요.';
    if (!formData.price) newErrors.price = '가격을 입력해주세요.';
    if (formData.images.length === 0) newErrors.images = '최소 1개의 이미지를 업로드해주세요.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // 실제로는 상품 등록 API 호출
      // const formDataToSend = new FormData();
      // formDataToSend.append('title', formData.title);
      // formDataToSend.append('description', formData.description);
      // formDataToSend.append('category', formData.category);
      // formDataToSend.append('condition', formData.condition);
      // formDataToSend.append('price', formData.price);
      // formDataToSend.append('shippingFee', formData.shippingFee);
      // formData.images.forEach(image => {
      //   formDataToSend.append('images', image);
      // });
      // const response = await fetch('/api/products', {
      //   method: 'POST',
      //   body: formDataToSend
      // });
      // const data = await response.json();
      
      // 모의 응답 (백엔드 연동 시 교체)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 성공 시 상품 상세 페이지로 이동
      navigate('/products/1', { 
        state: { message: '상품이 성공적으로 등록되었습니다.' } 
      });
    } catch (error) {
      console.error('상품 등록 오류:', error);
      setErrors({
        ...errors,
        general: '상품 등록 중 오류가 발생했습니다. 다시 시도해주세요.'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // 가격 포맷팅
  const formatPrice = (price) => {
    return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '';
  };
  
  return (
    <div className="product-create-container">
      <h1 className="page-title">상품 등록</h1>
      
      {errors.general && <div className="error-alert">{errors.general}</div>}
      
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-section">
          <h2 className="section-title">상품 이미지</h2>
          <p className="section-description">
            최대 5개의 이미지를 등록할 수 있습니다. 첫 번째 이미지가 대표 이미지로 설정됩니다.
          </p>
          
          <div className="image-upload-container">
            <div className="image-grid">
              {/* 이미지 업로드 버튼 */}
              <div 
                className="image-upload-box"
                onClick={() => fileInputRef.current.click()}
              >
                <div className="upload-icon">+</div>
                <span>이미지 추가</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />
              </div>
              
              {/* 이미지 미리보기 */}
              {imagePreviewUrls.map((url, index) => (
                <div key={index} className="image-preview-container">
                  <img 
                    src={url} 
                    alt={`상품 이미지 ${index + 1}`} 
                    className="image-preview"
                  />
                  <button
                    type="button"
                    className="remove-image-button"
                    onClick={() => handleRemoveImage(index)}
                  >
                    ✕
                  </button>
                  {index === 0 && <div className="main-image-badge">대표</div>}
                </div>
              ))}
            </div>
            
            {errors.images && <div className="error-message">{errors.images}</div>}
          </div>
          
          {imagePreviewUrls.length > 0 && (
            <button
              type="button"
              className="analyze-button"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? 'AI 분석 중...' : 'AI로 상품 정보 자동 완성'}
            </button>
          )}
        </div>
        
        <div className="form-section">
          <h2 className="section-title">상품 정보</h2>
          
          <div className="form-group">
            <label htmlFor="title">상품명 *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="상품명을 입력해주세요"
              maxLength={100}
            />
            {errors.title && <div className="error-message">{errors.title}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="category">카테고리 *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">카테고리 선택</option>
              <option value="전자제품">전자제품</option>
              <option value="패션의류">패션의류</option>
              <option value="스포츠용품">스포츠용품</option>
              <option value="가구/인테리어">가구/인테리어</option>
              <option value="도서/음반">도서/음반</option>
              <option value="게임/취미">게임/취미</option>
            </select>
            {errors.category && <div className="error-message">{errors.category}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="condition">상품 상태 *</label>
            <select
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
            >
              <option value="새 상품">새 상품</option>
              <option value="중고 - 상태 매우 좋음">중고 - 상태 매우 좋음</option>
              <option value="중고 - 상태 좋음">중고 - 상태 좋음</option>
              <option value="중고 - 상태 보통">중고 - 상태 보통</option>
              <option value="중고 - 상태 나쁨">중고 - 상태 나쁨</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="price">가격 (원) *</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formatPrice(formData.price)}
              onChange={handleChange}
              placeholder="숫자만 입력해주세요"
            />
            {errors.price && <div className="error-message">{errors.price}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="shippingFee">배송비 (원)</label>
            <input
              type="text"
              id="shippingFee"
              name="shippingFee"
              value={formatPrice(formData.shippingFee)}
              onChange={handleChange}
              placeholder="무료 배송인 경우 0"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">상품 설명 *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="상품에 대한 상세한 설명을 입력해주세요"
              rows={8}
              maxLength={2000}
            ></textarea>
            {errors.description && (
              <div className="error-message">{errors.description}</div>
            )}
            <div className="char-count">
              {formData.description.length}/2000자
            </div>
          </div>
        </div>
        
        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate(-1)}
          >
            취소
          </button>
          <button
            type="submit"
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? '등록 중...' : '상품 등록하기'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductCreate;