import React, { useRef, useState } from 'react';

import Template from '../components/Template';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PageHeader } from '../components/Headers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { setExpire } from '../hooks/Functions';
import useAuth from '../hooks/useAuth';
import { handleKeyDown, handleKeyDownNext } from '../hooks/Functions';

export default function StudentLogin() {
  const [userAuth, setUserAuth] = useAuth();
  const { id } = useParams();
  const [rollNumber, setRollNumber] = useState();
  const [userId, setUserId] = useState('');
  const [pw, setPw] = useState('');
  const userIdRef = useRef('');
  const pwRef = useRef('');

  const loginFunc = async () => {
    const res = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_HOST}/api/student/user/${id}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
      data: { rollNumber, name: userId, pw },
    });
    if (res.data.success) {
      setExpire(res.data.result.token);
      setUserAuth(res.data.result.token);
      toast('환영합니다!');
      window.location.href = `/${id}/main`;
    } else {
      toast.error('입력하신 정보가 틀렸습니다.', {
        autoClose: 1300,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <Template
        isAuthPage={true}
        isAuthPage2={false}
        childrenTop={
          <PageHeader path={`/${id}/signup`}>{'국민 로그인'}</PageHeader>
        }
        childrenBottom={
          <>
            <div className="login-wrap">
              <div className="box-style">
                <div className="user-login-title">출석번호</div>
                <input
                  className="user-login"
                  type="number"
                  min={1}
                  onChange={(e) => setRollNumber(e.target.value)}
                  onKeyDown={(e) => handleKeyDownNext(e, userIdRef)}
                ></input>
                <div className="user-login-title">이름</div>
                <input
                  ref={userIdRef}
                  className="user-login"
                  type="text"
                  onChange={(e) => setUserId(e.target.value)}
                  onKeyDown={(e) => handleKeyDownNext(e, pwRef)}
                ></input>
                <div className="user-login-title">비밀번호</div>
                <input
                  ref={pwRef}
                  className="user-login"
                  type="password"
                  maxLength={4}
                  onChange={(e) => setPw(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, loginFunc)}
                ></input>
                <button className="login-btn" type="button" onClick={loginFunc}>
                  로그인
                </button>
              </div>
              <div className="pwFind-info">
                <div className="pwFind-text">비밀번호 잊은 사람은?</div>
                <div className="pwFind-text">담임 선생님께!</div>
              </div>
            </div>

            <div className="pc-background-log">
              <div className="pc-left">
                <img
                  className="left-img"
                  src={`${process.env.PUBLIC_URL}/images/1.jpg`}
                  alt="표지"
                />
              </div>
              <div className="pc-right">
                <div>국민 로그인</div>
                <div className="login-box-style">
                  <div className="user-login-title">출석번호</div>
                  <input
                    className="user-login"
                    type="number"
                    min={1}
                    onChange={(e) => setRollNumber(e.target.value)}
                    onKeyDown={(e) => handleKeyDownNext(e, userIdRef)}
                  ></input>
                  <div className="user-login-title">이름</div>
                  <input
                    ref={userIdRef}
                    className="user-login"
                    type="text"
                    onChange={(e) => setUserId(e.target.value)}
                    onKeyDown={(e) => handleKeyDownNext(e, pwRef)}
                  ></input>
                  <div className="user-login-title">비밀번호</div>
                  <input
                    ref={pwRef}
                    className="user-login"
                    type="password"
                    maxLength={4}
                    onChange={(e) => setPw(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, loginFunc)}
                  ></input>
                  <button
                    className="login-btn"
                    type="button"
                    onClick={loginFunc}
                  >
                    로그인
                  </button>
                </div>
                <div className="pwFind-info">
                  <div className="pwFind-text">비밀번호 잊은 사람은?</div>
                  <div className="pwFind-text">담임 선생님께!</div>
                </div>
              </div>
            </div>
          </>
        }
      />
    </>
  );
}
