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
          <Link to="/login">
            <button className="big-button">로그인</button>
          </Link>

          <Link to="/signup">
            <button className="big-button">회원가입</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
