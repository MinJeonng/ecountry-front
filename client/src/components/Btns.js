import styled from 'styled-components';
import React, { useState } from 'react';
import '../styles/_button_common.scss';
import { ReactComponent as IcoWrite } from '../images/ico-write.svg';
import { useNavigate } from 'react-router-dom';

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
export function ChatBotBtn({ func }) {
  const navigate = useNavigate();
  return (
    <BtnBox>
      <button
        onClick={() => {
          navigate('/chatbot');
          func(true);
        }}
      >
        <img src={`${process.env.PUBLIC_URL}/images/icon-chatbot.png`} />
      </button>
    </BtnBox>
  );
}
