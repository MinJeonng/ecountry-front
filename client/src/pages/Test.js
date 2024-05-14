import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';

export default function Test() {
  const [userInfo, setUserInfo] = useAuth();
  useEffect(() => {
    setUserInfo();
  }, []);
  return (
    <>
      <div>사용자 인증 테스트</div>
      <div>
        result: {userInfo.isStudent ? '학생' : '선생'}{' '}
        {userInfo.id === 0 ? '사용자 인증 실패' : `id ${userInfo.id}`}
      </div>
    </>
  );
}
