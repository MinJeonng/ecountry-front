import React, { useEffect, useState } from 'react';
import '../styles/intro.scss';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { setExpire } from '../hooks/Functions';
import { useDispatch } from 'react-redux';
import useAuth from '../hooks/useAuth';

const IntroBackGround = styled.div`
  background: #fcffe0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 1160px) {
    display: none;
  }
`;

export default function Intro() {
  const [userAuth, setUserAuth] = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const testLogin = async (isStudent) => {
    const successFunc = (result, url) => {
      setExpire(result.token);
      setUserAuth(result.token);
      toast.success('환영합니다!');
      setTimeout(() => {
        navigate(url);
      }, 1300);
    };
    const falseFunc = () => {
      toast.error('다시 시도해주세요', {
        autoClose: 1300,
      });
    };
    if (!isStudent) {
      const res = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_HOST}/api/user/login`,
        data: { userId: 'test', pw: '1234' },
      });
      if (res.data.success) {
        successFunc(res.data.result, '/country');
      } else {
        falseFunc();
      }
    } else {
      const res = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_HOST}/api/student/user/1`,
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
        },
        data: { rollNumber: 7, name: '테스트 국민', pw: '1234' },
      });
      // console.log(res.data.success);
      if (res.data.success) {
        successFunc(res.data.result, '/1/main');
      } else {
        falseFunc();
      }
    }
  };

  return (
    <div>
      <ToastContainer />
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
          <button className="big-button" onClick={() => testLogin(false)}>
            테스트 로그인 (선생님)
          </button>
          <button className="big-button" onClick={() => testLogin(true)}>
            테스트 로그인 (학생)
          </button>
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
              자라나라 경제나라와 함께하는 <br />
              경제 개념 기르기!
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
            <button className="big-button" onClick={() => testLogin(false)}>
              테스트 로그인 (선생님)
            </button>
            <button className="big-button" onClick={() => testLogin(true)}>
              테스트 로그인 (학생)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
