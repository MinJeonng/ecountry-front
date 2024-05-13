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

export function ConfirmBtn({ onClick }) {
  const handleClick = (e) => {
    e.preventDefault(); // 기본 동작 방지
    onClick(); // 부모 컴포넌트에서 전달된 onClick 함수 실행
  };

  return (
    <>
      <StyledConfirmBtn>
        <button className="confirmBtn" onClick={handleClick} type="button">
          확인
        </button>
      </StyledConfirmBtn>
    </>
  );
}
