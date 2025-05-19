// marketai-frontend/src/components/PhoneVerification.jsx
import React, { useState } from 'react';
import './PhoneVerification.css';

const PhoneVerification = ({ onVerified, initialPhone = '' }) => {
  const [phone, setPhone] = useState(initialPhone);
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // 전화번호 형식 검사
  const isValidPhone = (phoneNumber) => {
    const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    return phoneRegex.test(phoneNumber);
  };

  // 하이픈 자동 추가
  const formatPhoneNumber = (value) => {
    if (!value) return value;
    
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
  };

  // 인증 코드 발송
  const handleSendCode = async () => {
    if (!isValidPhone(phone)) {
      setError('유효한 전화번호를 입력해주세요.');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      // 백엔드 연동: 현재는 서버가 실행되지 않으므로 모의 응답 사용
      // 실제로는 아래 코드 대신 API 호출해야 함
      // const response = await api.post('/api/auth/send-verification', { phone });
      
      // 모의 응답 (백엔드 연동 시 교체)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCodeSent(true);
      setCountdown(180); // 3분 카운트다운 시작
      
      // 카운트다운 타이머
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
    } catch (error) {
      // 여기서 error 변수 사용
      setError('인증 코드 발송에 실패했습니다. 다시 시도해주세요.');
      console.error('인증 코드 발송 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  // 인증 코드 확인
  const handleVerifyCode = async () => {
    if (!code || code.length < 4) {
      setError('유효한 인증 코드를 입력해주세요.');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      // 백엔드 연동: 현재는 서버가 실행되지 않으므로 모의 응답 사용
      // 실제로는 아래 코드 대신 API 호출해야 함
      // const response = await api.post('/api/auth/verify-code', { phone, code });
      
      // 모의 응답 (백엔드 연동 시 교체)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 테스트 용도로 '000000' 코드는 항상 성공으로 처리
      if (code === '000000') {
        setIsVerified(true);
        if (onVerified) onVerified(phone, true);
      } else {
        setError('유효하지 않은 인증 코드입니다.');
      }
    } catch (error) {
      // 여기서 error 변수 사용
      setError('인증 코드 확인에 실패했습니다. 다시 시도해주세요.');
      console.error('인증 코드 확인 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  // 전화번호 입력 핸들러
  const handlePhoneChange = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedPhoneNumber);
  };

  return (
    <div className="phone-verification">
      <div className="form-group">
        <label htmlFor="phone">전화번호</label>
        <div className="input-with-button">
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="010-0000-0000"
            disabled={codeSent || isVerified}
            className={isVerified ? "verified" : ""}
          />
          {!codeSent && !isVerified && (
            <button 
              onClick={handleSendCode} 
              disabled={loading || !isValidPhone(phone)}
              className="send-button"
            >
              {loading ? '발송 중...' : '인증번호 발송'}
            </button>
          )}
        </div>
      </div>
      
      {codeSent && !isVerified && (
        <div className="form-group">
          <label htmlFor="code">
            인증번호 {countdown > 0 && `(${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, '0')})`}
          </label>
          <div className="input-with-button">
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="인증번호 입력"
              maxLength="6"
            />
            <button 
              onClick={handleVerifyCode} 
              disabled={loading || code.length < 4 || countdown === 0}
              className="verify-button"
            >
              {loading ? '확인 중...' : '확인'}
            </button>
          </div>
          {countdown === 0 && (
            <div className="resend">
              <button onClick={handleSendCode} disabled={loading} className="resend-button">
                인증번호 재발송
              </button>
            </div>
          )}
        </div>
      )}
      
      {isVerified && (
        <div className="verified-message">
          <span className="verified-icon">✓</span> 전화번호 인증이 완료되었습니다.
        </div>
      )}
      
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default PhoneVerification;