import React, { useEffect, useState } from 'react';
import '../styles/intro.scss';
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

      <div className="pc-background">
        <div className="pc-left">
          <img
            className="left-img"
            src={`${process.env.PUBLIC_URL}/images/sample.jpg`}
            alt="표지"
          />
        </div>
        <div className="pc-right">
          <div className="logo-wrap">
            <img
              src={`${process.env.PUBLIC_URL}/images/logo-defaultImg.jpg`}
              alt="로고"
            />
          </div>
          <div className="pc-info">
            <div className="pc-info1">
              자라나라 경제나라와 함께하는 <br />
              경제 개념 기르기!
            </div>
            <div className="pc-info2">
              해당 웹사이트는 옥효진 선생님의 '세금내는 아이들'을 참고하여
              만들어졌습니다.
            </div>
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
    </div>
  );
}
