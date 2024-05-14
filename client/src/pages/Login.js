import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Template from '../components/Template';

import '../styles/background.scss';
import '../styles/login.scss';

export default function Login() {
  const [userId, setUserId] = useState('');
  const [pw, setPw] = useState('');
  const navigate = useNavigate();

  const loginFunc = async () => {
    await axios
      .post('http://localhost:8080/api/user/login', { userId, pw })
      .then((res) => {
        alert(res.data.message);
        if (res.data.success) {
          localStorage.setItem('token', res.data.result);
          navigate('/user/country');
        } else {
        }
      });
  };
  return (
    <Template
      childrenBottom={
        <div className="setting-wrap">
          <div>
            <div>로그인</div>
            <ul className="title-list">
              <li>아이디와 비밀번호를 입력하세요.</li>
            </ul>
          </div>
          <form className="box-style">
            <div className="user-login-title">아이디</div>
            <input
              className="user-login"
              type="text"
              onChange={(e) => setUserId(e.target.value)}
            ></input>
            <div className="user-login-title">비밀번호</div>
            <input
              className="user-login"
              type="password"
              maxLength={4}
              onChange={(e) => setPw(e.target.value)}
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
