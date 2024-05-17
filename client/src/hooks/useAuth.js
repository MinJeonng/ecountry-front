import axios from 'axios';
import { useState } from 'react';

export default function useAuth() {
  const [userInfo, setUserInfo] = useState(0);

  const confirmAuth = async () => {
    if (localStorage.getItem('token')) {
      try {
        const res = await axios({
          method: 'GET',
          url: `http://localhost:8080/api/user/auth`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(res.data);
        // 토큰이 유효하지 않으면 localStorage 삭제
        res.data.success
          ? setUserInfo(res.data.result)
          : localStorage.removeItem('token');
      } catch {
        localStorage.removeItem('token');
      }
    }
  };

  // 로그인 상태가 유효한 경우 user의 id값 반환,
  // 비로그인 상태인 경우 0 반환
  return [userInfo, confirmAuth];
}
