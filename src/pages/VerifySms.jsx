import { useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';

export default function VerifySms() {
  const [data, setData] = useState({ phone:'', code:'' });
  const nav = useNavigate();
  const onChange = e => setData(d=>({...d,[e.target.name]:e.target.value}));
  const onSubmit = async e => {
    e.preventDefault();
    await api.post('/auth/verify-sms', data);
    nav('/login');
  };
  return (
    <form onSubmit={onSubmit}>
      <h2>SMS 인증</h2>
      <input name="phone" placeholder="Phone" value={data.phone} onChange={onChange} />
      <input name="code"  placeholder="Code"  value={data.code}  onChange={onChange} />
      <button type="submit">Verify</button>
    </form>
  );
}
