import React from 'react';
import styled from 'styled-components';

const BgTop = styled.div`
  @media (max-width: 1159px) {
    background: linear-gradient(to left, #75a47f, #bacd92);
    height: 300px;
    position: relative;
  }

  @media (min-width: 1160px) {
    background: none;

    &.auth-page2 {
      width: 250px;
    }
  }
`;

const BgBottom = styled.div`
  @media (max-width: 1159px) {
    position: relative;
    margin-top: -125px;
    padding: 40px 30px 90px;
    background-color: #ffffff;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
  }

  @media (min-width: 1160px) {
    width: 970px;
    margin: 0 auto;

    &.auth-page {
      width: 100%;
      margin: 0;
    }
  }
`;

export default function Template({
  childrenTop,
  childrenBottom,
  isAuthPage,
  isAuthPage2,
}) {
  return (
    <>
      <BgTop className={isAuthPage2 ? 'auth-page2' : ''}>{childrenTop}</BgTop>
      <BgBottom className={isAuthPage ? 'auth-page' : ''}>
        {childrenBottom}
      </BgBottom>
    </>
  );
}
