import React, { useEffect, useState } from 'react';
import '../styles/intro.css';
import { Link } from 'react-router-dom';

export default function Intro() {
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    document.querySelector('.background').style.backgroundColor = '#FCFFE0';
    const timer = setTimeout(() => {
      setButtonVisible(true);
    }, 3000);

    // 컴포넌트가 언마운트될 때 타이머 제거
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="background">
        <div className="logo-wrap">
          <img
            src={`${process.env.PUBLIC_URL}/images/logo-defaultImg.jpg`}
            alt="로고"
          />
          {/* <span className="logo-title">자라나라 경제나라</span> */}
        </div>
        {buttonVisible && (
          <div className="button-wrap">
            <Link to="/login">
              <button className="big-button">로그인</button>
            </Link>
            <Link to="/signup">
              <button className="big-button">회원가입</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
