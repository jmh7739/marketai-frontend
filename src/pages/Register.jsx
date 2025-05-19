// src/pages/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phoneNumber: '',
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // 에러 메시지 지우기
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // 아이디 검증
    if (!formData.username.trim()) {
      newErrors.username = '아이디를 입력해주세요.';
    } else if (formData.username.length < 4) {
      newErrors.username = '아이디는 4자 이상이어야 합니다.';
    }
    
    // 이메일 검증
    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요.';
    }
    
    // 비밀번호 검증
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 8자 이상이어야 합니다.';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = '비밀번호는 대문자, 소문자, 숫자를 포함해야 합니다.';
    }
    
    // 비밀번호 확인 검증
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }
    
    // 이름 검증
    if (!formData.fullName.trim()) {
      newErrors.fullName = '이름을 입력해주세요.';
    }
    
    // 휴대폰 번호 검증
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = '휴대폰 번호를 입력해주세요.';
    } else if (!/^\d{3}-\d{3,4}-\d{4}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = '유효한 휴대폰 번호 형식이 아닙니다. (예: 010-1234-5678)';
    }
    
    // 필수 약관 동의 검증
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = '이용약관에 동의해주세요.';
    }
    
    if (!formData.agreePrivacy) {
      newErrors.agreePrivacy = '개인정보 처리방침에 동의해주세요.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        agreeMarketing: formData.agreeMarketing
      });
      
      // 회원가입 성공 후 홈페이지로 이동
      navigate('/');
    } catch (error) {
      console.error('회원가입 실패:', error);
      setErrors(prev => ({
        ...prev,
        general: '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.'
      }));
      setLoading(false);
    }
  };
  
  // 휴대폰 번호 형식 변환 (자동으로 하이픈 추가)
  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 7) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    } else {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
    }
  };
  
  const handlePhoneChange = (e) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    setFormData(prev => ({
      ...prev,
      phoneNumber: formattedNumber
    }));
  };
  
  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h1>회원가입</h1>
          <p>마켓에이아이의 새로운 회원이 되어주세요.</p>
        </div>
        
        {errors.general && (
          <div className="alert alert-error">
            {errors.general}
          </div>
        )}
        
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>기본 정보</h2>
            
            <div className="form-group">
              <label htmlFor="username">아이디 <span className="required">*</span></label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="4자 이상의 아이디를 입력하세요"
                className={errors.username ? 'error' : ''}
              />
              {errors.username && <div className="error-message">{errors.username}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="email">이메일 <span className="required">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">비밀번호 <span className="required">*</span></label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="8자 이상, 대소문자와 숫자 포함"
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <div className="error-message">{errors.password}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">비밀번호 확인 <span className="required">*</span></label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="비밀번호를 다시 입력하세요"
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
            </div>
          </div>
          
          <div className="form-section">
            <h2>개인 정보</h2>
            
            <div className="form-group">
              <label htmlFor="fullName">이름 <span className="required">*</span></label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="이름을 입력하세요"
                className={errors.fullName ? 'error' : ''}
              />
              {errors.fullName && <div className="error-message">{errors.fullName}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="phoneNumber">휴대폰 번호 <span className="required">*</span></label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
                placeholder="010-0000-0000"
                className={errors.phoneNumber ? 'error' : ''}
              />
              {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
            </div>
          </div>
          
          <div className="form-section">
            <h2>약관 동의</h2>
            
            <div className="form-group checkbox">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeAll"
                  checked={
                    formData.agreeTerms &&
                    formData.agreePrivacy &&
                    formData.agreeMarketing
                  }
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setFormData(prev => ({
                      ...prev,
                      agreeTerms: checked,
                      agreePrivacy: checked,
                      agreeMarketing: checked
                    }));
                  }}
                />
                <span>모든 약관에 동의합니다</span>
              </label>
            </div>
            
            <div className="form-group checkbox">
              <label className={`checkbox-label ${errors.agreeTerms ? 'error' : ''}`}>
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                />
                <span>
                  <span className="required">*</span> (필수) 
                  <Link to="/terms" target="_blank" rel="noopener noreferrer"> 이용약관</Link>에 동의합니다
                </span>
              </label>
              {errors.agreeTerms && <div className="error-message">{errors.agreeTerms}</div>}
            </div>
            
            <div className="form-group checkbox">
              <label className={`checkbox-label ${errors.agreePrivacy ? 'error' : ''}`}>
                <input
                  type="checkbox"
                  name="agreePrivacy"
                  checked={formData.agreePrivacy}
                  onChange={handleChange}
                />
                <span>
                  <span className="required">*</span> (필수) 
                  <Link to="/privacy" target="_blank" rel="noopener noreferrer"> 개인정보 처리방침</Link>에 동의합니다
                </span>
              </label>
              {errors.agreePrivacy && <div className="error-message">{errors.agreePrivacy}</div>}
            </div>
            
            <div className="form-group checkbox">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeMarketing"
                  checked={formData.agreeMarketing}
                  onChange={handleChange}
                />
                <span>(선택) 마케팅 정보 수신에 동의합니다</span>
              </label>
            </div>
          </div>
          
          <button
            type="submit"
            className="register-button"
            disabled={loading}
          >
            {loading ? '가입 중...' : '가입하기'}
          </button>
        </form>
        
        <div className="register-footer">
          <p>이미 계정이 있으신가요? <Link to="/login">로그인</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;