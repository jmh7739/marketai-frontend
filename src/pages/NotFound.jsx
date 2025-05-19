// marketai-frontend/src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">페이지를 찾을 수 없습니다</h2>
        <p className="not-found-message">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>
        <Link to="/" className="not-found-button">
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default NotFound;