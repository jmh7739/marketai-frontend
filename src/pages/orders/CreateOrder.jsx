// src/pages/orders/CreateOrder.jsx

import { useState } from 'react';
import { api } from '../../api';
import { useParams, useNavigate } from 'react-router-dom';

export default function CreateOrder() {
  const { productId } = useParams();
  const nav = useNavigate();
  const [error, setError] = useState('');

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/orders', { productId: Number(productId) });
      nav('/orders');
    } catch (err) {
      setError(err.response?.data?.error || '주문 생성 실패');
    }
  };

  return (
    <div>
      <h2>주문 생성</h2>
      <p>상품 ID: {productId}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={onSubmit}>
        <button type="submit">주문하기</button>
      </form>
    </div>
  );
}
