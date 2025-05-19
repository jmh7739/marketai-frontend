// src/utils/formatters.js

/**
 * 남은 시간을 포맷팅하는 함수
 * @param {string} endTime - ISO 형식의 종료 시간
 * @returns {string} 포맷팅된 남은 시간 문자열
 */
export const formatTimeLeft = (endTime) => {
  const now = new Date();
  const end = new Date(endTime);
  const diff = end - now;
  
  if (diff <= 0) return '경매 종료';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  if (days > 0) {
    return `${days}일 ${hours}시간`;
  } else if (hours > 0) {
    return `${hours}시간 ${minutes}분`;
  } else if (minutes > 0) {
    return `${minutes}분 ${seconds}초`;
  } else {
    return `${seconds}초`;
  }
};

/**
 * 가격을 포맷팅하는 함수
 * @param {number} price - 가격
 * @returns {string} 포맷팅된 가격 문자열
 */
export const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * 날짜를 포맷팅하는 함수
 * @param {string} dateString - ISO 형식의 날짜 문자열
 * @returns {string} 포맷팅된 날짜 문자열
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

/**
 * 남은 시간을 계산하는 함수
 * @param {string} endTime - ISO 형식의 종료 시간
 * @returns {Object} 남은 일, 시간, 분, 초
 */
export const calculateTimeLeft = (endTime) => {
  const now = new Date();
  const end = new Date(endTime);
  const diff = end - now;
  
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isEnded: true };
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds, isEnded: false };
};

/**
 * 문자열이 URL인지 확인하는 함수
 * @param {string} str - 확인할 문자열
 * @returns {boolean} URL 여부
 */
export const isValidUrl = (str) => {
  try {
    new URL(str);
    return true;
  } catch {
    // URL 생성에 실패하면 유효하지 않은 URL
    return false;
  }
};

/**
 * 상품 상태를 포맷팅하는 함수
 * @param {string} condition - 상품 상태
 * @returns {string} 포맷팅된 상품 상태
 */
export const formatCondition = (condition) => {
  const conditionMap = {
    'new': '새 상품',
    'like_new': '거의 새 것',
    'good': '상태 좋음',
    'fair': '사용감 있음',
    'poor': '상태 나쁨'
  };
  
  return conditionMap[condition] || condition;
};

/**
 * 번호 형식의 문자열에 하이픈 추가하는 함수 (전화번호 등)
 * @param {string} value - 숫자로만 이루어진 문자열
 * @returns {string} 하이픈이 추가된 문자열
 */
export const formatNumberWithHyphens = (value, pattern = 'phone') => {
  // 숫자만 추출
  const cleaned = value.replace(/\D/g, '');
  
  if (pattern === 'phone') {
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 7) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    } else {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
    }
  } else if (pattern === 'business') {
    // 사업자등록번호 (000-00-00000)
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 5) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    } else {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}-${cleaned.slice(5, 10)}`;
    }
  }
  
  return cleaned;
};