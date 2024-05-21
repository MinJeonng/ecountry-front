import axios from 'axios';
import { useState } from 'react';

export default function useAuth({ id }) {
  const [userInfo, setUserInfo] = useState(0);
  const [available, setAvaiable] = useState(false);

  const confirmAuth = async () => {
    if (localStorage.getItem('token')) {
      try {
        const res = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_HOST}/api/user/auth`,
          headers: {
            'Content-Type': `application/json`,
            'ngrok-skip-browser-warning': '69420',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(res.data);
        // 토큰이 유효하지 않으면 localStorage 삭제
        res.data.success
          ? setUserInfo(res.data.result)
          : localStorage.removeItem('token');

        if (id && !res.data.result.isStudent) {
          const res2 = await axios({
            method: 'GET',
            url: `${process.env.REACT_APP_HOST}/api/user`,
            headers: {
              'Content-Type': `application/json`,
              'ngrok-skip-browser-warning': '69420',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          res2.data.result.forEach((country) => {
            if (country.id == id) {
              setAvaiable(true);
            }
          });
        } else if (id && res.data.result.isStudent) {
          const res3 = await axios({
            method: 'GET',
            url: `${process.env.REACT_APP_HOST}/api/user/info`,
            headers: {
              'Content-Type': `application/json`,
              'ngrok-skip-browser-warning': '69420',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          console.log(res3);
        }
      } catch {
        localStorage.removeItem('token');
      }
    }
  };

  // 로그인 상태가 유효한 경우 user의 id값 반환,
  // 비로그인 상태인 경우 0 반환
  return [userInfo, confirmAuth];
}
