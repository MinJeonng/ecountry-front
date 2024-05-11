import React from 'react';
import '../styles/intro.css';
import { Link } from 'react-router-dom';

export default function intro() {
  window.onload = function () {
    document.querySelector('.background').style.backgroundColor = '#FCFFE0';
    setTimeout(() => {
      document.querySelector('.button-wrap').style.visibility = 'visible';
    }, 3000);
  };
  return (
    <div>
      <div className="background">
        <div className="logo-wrap">
          <span className="logo-img">logo</span>
          <span className="logo-title">자라나라 경제나라</span>
        </div>
        <div className="button-wrap">
          <button className="big-button button1">
            <Link to="/user/login">로그인</Link>
          </button>
          <button className="big-button button2">
            <Link to="/user/signup">회원가입</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
