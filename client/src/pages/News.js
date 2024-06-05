//뉴스

import Template from '../components/Template';
import { SetPostWrite } from '../components/PostWrite';
import { SetNewsDetail } from '../components/NewsDetail';
import { SetNewsRead } from '../components/NewsRead';
import { CommonMainDesktopHeader, PageHeader } from '../components/Headers';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { ChatBotBtn, LoginBtn, NewsPostBtn } from '../components/Btns';
import axios from 'axios';

import { StudentHeader } from '../components/StudentHeader';

import { authFunc, confirmCountry, getExpire } from '../hooks/Functions';
import { useSelector } from 'react-redux';

export function SetNews({ position }) {
  const { id } = useParams();
  const [isAuth, setIsAuth] = useState(false);
  const [isWrite, setIsWrite] = useState(false);
  const [loginBtn, setLoginBtn] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.auth);

  const confirmStudent = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/user/info`,
      headers: {
        Authorization: `Bearer ${getExpire()}`,
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

  const showItem = () => {
    setIsShow(true);
  };

  const mountFunc = () => {
    if (!userInfo.isStudent) {
      setIsAuth(true);
    } else {
      confirmStudent();
    }
  };
  useEffect(() => {
    if (userInfo) {
      if (authFunc()) {
        confirmCountry(id, userInfo, mountFunc);
      }
    }
  }, [userInfo]);
  useEffect(() => {
    console.log(isWrite);
  }, [isWrite]);

  useEffect(() => {
    if (authFunc()) {
      confirmCountry(id, userInfo, showItem);
    } else {
      setLoginBtn(true);
    }
  }, [userInfo]);
  useEffect(() => {
    if (localStorage.getItem('postId')) {
      setIsWrite(true);
    }
  }, []);
  return (
    <>
      {/* <StudentHeader /> */}
      <CommonMainDesktopHeader />
      <ToastContainer />
      {loginBtn && <LoginBtn />}
      {isShow && (
        <Template
          isAuthPage2={true}
          childrenTop={
            <>
              <PageHeader>{position}</PageHeader>
            </>
          }
          childrenBottom={
            <>
              {/* 뉴스 전체 리스트 */}
              {position == '뉴스 리스트' && !isWrite && <SetNewsDetail />}
              {/* 뉴스 작성 페이지 */}
              {position === '뉴스 글 등록' && isWrite && (
                <SetPostWrite />
                // <Practice />
              )}
              {/* 글 하나 있는거 */}
              {position === '뉴스' && <SetNewsRead auth={isAuth} />}
              {position === '뉴스' && isAuth && !isWrite && (
                <NewsPostBtn func={setIsWrite} />
              )}
              {position === '뉴스' && !isWrite && <ChatBotBtn />}
            </>
          }
        />
      )}
    </>
  );
}
