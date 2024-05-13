import styled from 'styled-components';
import React, { useState } from 'react';

const StyledConfirmBtn = styled.div`
  display: flex;
  justify-content: center;
  .confirmBtn {
    border: none;
    color: blue;
    font-size: 16px;
  }
`;

export function ConfirmBtn({ onClick, btnName }) {
  const handleClick = (e) => {
    e.preventDefault(); // 기본 동작 방지
    onClick(); // 부모 컴포넌트에서 전달된 onClick 함수 실행
  };

  return (
    <>
      <StyledConfirmBtn>
        <button className="confirmBtn" onClick={handleClick} type="button">
          {btnName}
        </button>
      </StyledConfirmBtn>
    </>
  );
}

export function NextBtn({ onClick, width }) {
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
        type="button"
      >
        다음
      </button>
    </>
  );
}
