import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Template from '../components/Template';

export default function StudentLogin() {
  const [userId, setUserId] = useState('');
  const [pw, setPw] = useState('');
  const navigate = useNavigate();

  return (
    <Template
      childrenBottom={
        <div className="setting-wrap">
          <div>
            <div>로그인</div>
            <ul className="title-list">
              <li>이름과 비밀번호를 입력하세요.</li>
            </ul>
          </div>
          <form className="box-style">
            <div className="user-login-title">이름</div>
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
            <button className="login-btn" type="button">
              로그인
            </button>
          </form>
          <div className="pwFind-info">
            <div className="pwFind-text">비밀번호 잊은 사람은?</div>
            <div className="pwFind-text">담임 선생님께!</div>
          </div>
        </div>
      }
    />
  );
}
