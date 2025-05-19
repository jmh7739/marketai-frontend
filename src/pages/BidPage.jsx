import { useEffect, useState } from 'react';
import { api } from '../api';
import { useParams } from 'react-router-dom';

export default function BidPage() {
  const { productId } = useParams();
  const [product,setProduct] = useState(null);
  const [amount,setAmount]   = useState('');
  const [bids,setBids]       = useState([]);

  useEffect(()=>{
    api.get(`/products/${productId}`).then(r=>setProduct(r.data));
    api.get(`/bids/${productId}`).then(r=>{
      setBids(r.data);
      setAmount((r.data[0]?.amount||product?.startPrice||0)+500);
    });
  },[productId,product]);

  const onSubmit=async e=>{
    e.preventDefault();
    await api.post('/bids',{productId:Number(productId),amount:Number(amount)});
    const r=await api.get(`/bids/${productId}`); setBids(r.data);
  };

  if(!product) return <div>Loading…</div>;
  return (
    <div>
      <h2>{product.title}</h2>
      <p>현재가: {bids[0]?.amount||product.startPrice}</p>
      <form onSubmit={onSubmit}>
        <input type="number" placeholder="입찰 가격" value={amount} onChange={e=>setAmount(e.target.value)}/>
        <button type="submit">입찰하기</button>
      </form>
      <h3>입찰 내역</h3>
      <ul>{bids.map(b=><li key={b.id}>ID:{b.bidderId} – {b.amount}</li>)}</ul>
    </div>
);
}
