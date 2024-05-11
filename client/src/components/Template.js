import React from 'react';
import styled from 'styled-components';

const BgTop = styled.div`
  background: linear-gradient(to left, #75a47f, #bacd92);
  height: 100vh;
  position: relative;
`;

const BgBottom = styled.div`
  /* padding: 50px 20px; */
  padding: 40px;
  background-color: #ffffff;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  position: absolute;
  top: 180px;
  left: 0;
  right: 0;
  bottom: 0;
`;

export default function Template({ childrenTop, childrenBottom }) {
  return (
    <>
      <BgTop>{childrenTop}</BgTop>
      <BgBottom>{childrenBottom}</BgBottom>
    </>
  );
}
