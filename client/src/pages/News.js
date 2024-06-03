//뉴스

import Template from '../components/Template';
import { SetPostWrite } from '../components/PostWrite';
import { SetNewsDetail } from '../components/NewsDetail';
import { SetNewsRead } from '../components/NewsRead';
import { PageHeader } from '../components/Headers';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { ChatBotBtn, NewsPostBtn } from '../components/Btns';
import axios from 'axios';
import { authFunc, confirmCountry } from '../hooks/Functions';

export function SetNews({ position }) {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useAuth(id);
  const [isAuth, setIsAuth] = useState(false);
  const [isWrite, setIsWrite] = useState(false);
  const navigate = useNavigate();

  const confirmStudent = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/user/info`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    });
    if (res.data.success) {
      console.log(res.data.result);
      if (res.data.result.skills?.includes(2)) {
        setIsAuth(true);
      }
    }
  };

  const mountFunc = () => {
    if (!userInfo.isStudent) {
      setIsAuth(true);
    } else {
      confirmStudent();
    }
  };
  useEffect(() => {
    confirmCountry(id, userInfo, mountFunc);
  }, [userInfo]);
  useEffect(() => {
    console.log(isWrite);
  }, [isWrite]);
  useEffect(() => {
    if (localStorage.getItem('postId')) {
      setIsWrite(true);
    }
    if (authFunc()) {
      setUserInfo();
    }
  }, []);
  return (
    <>
      <ToastContainer />
      <Template
        childrenTop={
          <>
            <PageHeader>{position}</PageHeader>
          </>
        }
        childrenBottom={
          <>
            {/* 뉴스 리스트 */}
            {position == '뉴스' && !isWrite && <SetNewsDetail />}
            {/* 뉴스 작성 페이지 */}
            {position === '뉴스' && isWrite && (
              <SetPostWrite />
              // <Practice />
            )}
            {position === '읽기' && <SetNewsRead auth={isAuth} />}
            {isAuth && !isWrite && <NewsPostBtn func={setIsWrite} />}
            {!isWrite && <ChatBotBtn />}
          </>
        }
      />
    </>
  );
}
