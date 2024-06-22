import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function useConfirm() {
  const { id } = useParams();
  const [isAuth, setIsAuth] = useState();

  const userInfo = useSelector((state) => state.auth);

  const confirmAuth = async () => {
    if (userInfo) {
      if (id) {
        if (userInfo.countryList?.includes(id)) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } else {
        setIsAuth(true);
      }
    } else {
      toast.error('로그인 후 이용해주세요.', { autoClose: 1300 });
    }
    // console.log(userInfo);
  };

  return [isAuth, confirmAuth];
}
