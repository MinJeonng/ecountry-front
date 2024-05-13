import { useState } from 'react';
import Template from '../components/Template';

import '../styles/background.scss';
import axios from 'axios';

export default function Login() {
  const [userId, setUserId] = useState('');
  const [pw, setPw] = useState('');

  const loginFunc = async () => {
    await axios
      .post('http://localhost:8080/api/user/login', { userId, pw })
      .then((res) => {
        alert(res.data.message);
        if (res.data.success) {
          localStorage.setItem('token', res.data.result);
        }
      });
  };
  return (
    <Template
      childrenBottom={
        <div>
          <div>
            <div>로그인</div>
            <ul className="title-list">
              <li>아이디와 비밀번호를 입력하세요.</li>
            </ul>
          </div>
          <form className="box-style">
            <div>아이디</div>
            <input
              type="text"
              onChange={(e) => setUserId(e.target.value)}
            ></input>
            <div>비밀번호</div>
            <input
              type="password"
              maxLength={4}
              onChange={(e) => setPw(e.target.value)}
            ></input>
            <button type="button" onClick={loginFunc}>
              로그인
            </button>
          </form>
        </div>
      }
    ></Template>
  );
}
