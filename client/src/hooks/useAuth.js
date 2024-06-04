import axios from 'axios';
import { useState } from 'react';
import { getExpire } from './Functions';
import { useDispatch } from 'react-redux';
import { auth } from '../store/userInfoReducer';

// props값으로 countryId를 전달하면 사용 가능 여부를 반환
export default function useAuth() {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState(0);

  const confirmAuth = async (token) => {
    if (getExpire()) {
      try {
        const res = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_HOST}/api/user/auth`,
          headers: {
            'Content-Type': `application/json`,
            'ngrok-skip-browser-warning': '69420',
            Authorization: `Bearer ${token ? token : getExpire()}`,
          },
        });
        dispatch(auth(res.data.result));
        setUserInfo(res.data.result);
      } catch {
        localStorage.removeItem('token');
      }
    } else {
      setUserInfo({ id: null, isStudent: null, countryList: null });
    }
  };

  // 로그인 상태가 유효한 경우 user의 id값 반환,
  // 비로그인 상태인 경우 0 반환
  return [userInfo, confirmAuth];
}
