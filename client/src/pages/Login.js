import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Template from '../components/Template';

import '../styles/login.scss';
import { PageHeader } from '../components/Headers';
import { handleKeyDown, handleKeyDownNext } from '../hooks/Functions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Link } from 'react-router-dom';

export default function Login() {
  const [userId, setUserId] = useState('');
  const [pw, setPw] = useState('');
  const navigate = useNavigate();
  const passwordRef = useRef(null);

  const loginFunc = async () => {
    await axios
      .post(`${process.env.REACT_APP_HOST}/api/user/login`, { userId, pw })
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem('token', res.data.result.token);
          toast('환영합니다!');
          setTimeout(() => {
            navigate('/country');
          }, 2000);
        } else {
          toast('아이디 또는 비밀번호가 틀렸습니다.', {
            autoClose: 1300,
          });
        }
      });
  };

  return (
    <>
      <ToastContainer />
      <Template
        childrenTop={
          <>
            <PageHeader>{'대통령 로그인'}</PageHeader>
          </>
        }
        childrenBottom={
          <>
            <div className="login-wrap">
              <form className="box-style">
                <div className="user-login-title">아이디</div>
                <input
                  className="user-login"
                  type="text"
                  onChange={(e) => setUserId(e.target.value)}
                  onKeyDown={(e) => handleKeyDownNext(e, passwordRef)}
                ></input>
                <div className="user-login-title">비밀번호</div>
                <input
                  ref={passwordRef}
                  className="user-login"
                  type="password"
                  maxLength={4}
                  onChange={(e) => setPw(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, loginFunc)}
                ></input>
                <button className="login-btn" type="button" onClick={loginFunc}>
                  로그인
                </button>
              </form>
            </div>

            <div className="pc-background">
              <div className="pc-left">
                <img
                  className="left-img"
                  src={`${process.env.PUBLIC_URL}/images/sample.jpg`}
                  alt="표지"
                />
              </div>
              <div className="pc-right">
                <div>대통령 로그인</div>
                <form className="login-box-style">
                  <div className="user-login-title">아이디</div>
                  <input
                    className="user-login"
                    type="text"
                    onChange={(e) => setUserId(e.target.value)}
                    onKeyDown={(e) => handleKeyDownNext(e, passwordRef)}
                  ></input>
                  <div className="user-login-title">비밀번호</div>
                  <input
                    ref={passwordRef}
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
                </form>
                <Link to="/">
                  <button className="navi-pre-btn">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon-back.png`}
                      alt="뒤로가기"
                    />
                  </button>
                </Link>
              </div>
            </div>
          </>
        }
      ></Template>
    </>
  );
}
