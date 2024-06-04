import styled from 'styled-components';
import React, { useState } from 'react';
import '../styles/_button_common.scss';
import { ReactComponent as IcoWrite } from '../images/ico-write.svg';
import { useNavigate, useParams } from 'react-router-dom';

const StyledConfirmBtn = styled.div`
  display: flex;
  justify-content: center;
`;

const BtnBox = styled.div`
  position: fixed;
  width: 50px;
  bottom: 0;
  right: 25px;
  display: block;
  z-index: 170;

  button {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin-bottom: 15px;
    border: 1.7px solid #75a47f;
  }
  img {
    display: flex;
    align-items: center;
  }
  @media (min-width: 1370px) {
    right: 50%;
    transform: translateX(670px);
  }
  @media (min-width: 1160px) {
    button {
      width: 55px;
      height: 55px;
      margin-bottom: 20px;
    }
  }
`;

const LoginBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9900;
  .loginBox {
    width: 70%;
    height: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    background: #fff;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    button {
      display: block;
      padding: 10px 0;
      border-radius: 10px;
      border: none;
      color: #fff;
      &.teacher {
        background: #75a47f;
      }
      &.student {
        background: #bacd92;
      }
    }
  }
`;

export function ConfirmBtn({ onClick, btnName, backgroundColor, width }) {
  const handleClick = (e) => {
    e.preventDefault(); // 기본 동작 방지
    onClick(); // 부모 컴포넌트에서 전달된 onClick 함수 실행
  };

  return (
    <>
      <StyledConfirmBtn>
        <button
          className="confirm-btn"
          onClick={handleClick}
          type="button"
          style={{ background: backgroundColor, width: width }}
        >
          {btnName}
        </button>
      </StyledConfirmBtn>
    </>
  );
}

export function NextBtn({ onClick, width, btnName }) {
  const handleClick = (e) => {
    e.preventDefault(); // 기본 동작 방지
    onClick(); // 부모 컴포넌트에서 전달된 onClick 함수 실행
  };
  const buttonStyled = {
    width: width,
  };
  return (
    <>
      <button
        className="frist-next-button"
        onClick={handleClick}
        style={buttonStyled}
        type="submit"
      >
        {btnName}
      </button>
    </>
  );
}

export function NewPostBtn({ navigate, path }) {
  return (
    <BtnBox style={{ bottom: '60px' }}>
      <button onClick={() => navigate(path)}>
        <IcoWrite stroke={'#75a47f'} />
      </button>
    </BtnBox>
  );
}

//뉴스
export function NewsPostBtn({ func }) {
  return (
    <BtnBox style={{ bottom: '60px' }}>
      <button onClick={() => func(true)}>
        <IcoWrite stroke={'#75a47f'} />
      </button>
    </BtnBox>
  );
}

//챗봇
export function ChatBotBtn() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <BtnBox>
      <button
        onClick={() => {
          navigate(`/${id}/chatbot`);
        }}
      >
        <img src={`${process.env.PUBLIC_URL}/images/icon-chatbot.png`} />
      </button>
    </BtnBox>
  );
}

// 로그인 선택
export function LoginBtn() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <LoginBox>
      <div className="loginBox">
        <button
          type="button"
          className="teacher"
          onClick={() => navigate('/login')}
        >
          선생님 로그인 하기
        </button>
        <button
          type="button"
          className="student"
          onClick={() => navigate(`/${id}/login`)}
        >
          학생 로그인 하기
        </button>
      </div>
    </LoginBox>
  );
}
