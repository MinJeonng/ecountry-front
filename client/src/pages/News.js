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
import { NewsPostBtn } from '../components/Btns';
import axios from 'axios';

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

  useEffect(() => {
    if (userInfo.authority === false) {
      toast.error('접근 권한이 없습니다.', { autoClose: 1300 });
      navigate('/country');
    }
    if (userInfo.authority === true) {
      if (!userInfo.isStudent) {
        setIsAuth(true);
      } else {
        confirmStudent();
      }
    }
  }, [userInfo]);
  useEffect(() => {
    console.log(isWrite);
  }, [isWrite]);
  useEffect(() => {
    if (localStorage.getItem('postId')) {
      setIsWrite(true);
    }
    if (localStorage.getItem('token')) {
      setUserInfo();
    } else {
      toast.error('로그인 후 이용해주세요', { autoClose: 1300 });
      // 선생님 로그인인지 학생 로그인인지 선택하는 버튼
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
            {/* Read 읽기 header는 구현된거 보고 다시 확인 */}
            {position === '읽기' && <SetNewsRead auth={isAuth} />}
            {isAuth && !isWrite && <NewsPostBtn func={setIsWrite} />}
          </>
        }
      />
    </>
  );
}
