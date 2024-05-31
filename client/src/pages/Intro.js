import React, { useEffect, useState } from 'react';
import '../styles/intro.scss';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const IntroBackGround = styled.div`
  background: #fcffe0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export default function Intro() {
  return (
    <div>
      <IntroBackGround>
        <div className="logo-wrap">
          <img
            src={`${process.env.PUBLIC_URL}/images/logo-defaultImg.jpg`}
            alt="로고"
          />
        </div>
        <div className="button-wrap">
          <Link to="/login">
            <button className="big-button">로그인</button>
          </Link>
          <Link to="/signup">
            <button className="big-button">회원가입</button>
          </Link>
        </div>
      </IntroBackGround>

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
              자라나라 경제나라와 함께하는 경제 개념 기르기!
            </div>
            <div className="pc-info2">
              해당 웹사이트는 옥효진 선생님의 '세금내는 아이들'을 <br />
              참고하여 만들어졌습니다.
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
