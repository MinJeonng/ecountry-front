import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Template from '../components/Template';

import '../styles/login.scss';
import { PageHeader } from '../components/Headers';
import { handleKeyDown, handleKeyDownNext } from '../hooks/Functions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

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
          alert('환영합니다!');
          navigate('/country');
        } else {
          toast('아이디 또는 비밀번호가 틀렸습니다.', {
            autoClose: 1300,
          });
        }
      });
  };

  return (
    <Template
      childrenTop={
        <>
          <PageHeader>{'관리자 로그인'}</PageHeader>
        </>
      }
      childrenBottom={
        <div className="setting-wrap">
          {/* <div>
            <div>로그인</div>
            <ul className="title-list">
              <li>아이디와 비밀번호를 입력하세요.</li>
            </ul>
          </div> */}
          <form className="box-style">
            <div className="user-login-title">아이디</div>
            <input
              className="user-login"
              type="text"
              onChange={(e) => setUserId(e.target.value)}
              onKeyDown={handleKeyDownNext}
            ></input>
            <div className="user-login-title">비밀번호</div>
            <input
              ref={passwordRef}
              className="user-login"
              type="password"
              maxLength={4}
              onChange={(e) => setPw(e.target.value)}
              onKeyDown={handleKeyDown}
            ></input>
            <button className="login-btn" type="button" onClick={loginFunc}>
              로그인
            </button>
          </form>
        </div>
      }
    ></Template>
  );
}
