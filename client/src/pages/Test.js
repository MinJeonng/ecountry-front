import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';

export default function Test() {
  const [userId, setUserId] = useAuth();
  useEffect(() => {
    setUserId();
  }, []);
  return (
    <>
      <div>사용자 인증 테스트</div>
      <div>result: {userId === 0 ? '사용자 인증 실패' : `id ${userId}`}</div>
    </>
  );
}
