import styled from 'styled-components';
import React, { useState } from 'react';
import '../styles/_button_common.scss';
import { ReactComponent as IcoWrite } from '../images/ico-write.svg';

const StyledConfirmBtn = styled.div`
  display: flex;
  justify-content: center;
`;

const BtnBox = styled.div`
  position: fixed;
  width: 50px;
  bottom: 0;
  right: 40px;
  display: block;
  z-index: 170;
  button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-bottom: 15px;
    border: 2px solid #75a47f;
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
        className="next-button"
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
    <BtnBox>
      <button onClick={() => navigate(path)}>
        <IcoWrite stroke={'#75a47f'} />
      </button>
    </BtnBox>
  );
}
