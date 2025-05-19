// src/pages/orders/OrderList.jsx

import { useEffect, useState } from 'react';
import { api } from '../../api';

export default function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/orders').then(res => setOrders(res.data));
  }, []);

  return (
    <div>
      <h2>내 주문 내역</h2>
      <ul>
        {orders.map(o => (
          <li key={o.id}>
            주문 #{o.id} – 상품 {o.productId} – 금액 {o.amount}원 – 상태 {o.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
