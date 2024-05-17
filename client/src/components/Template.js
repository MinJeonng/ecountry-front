import React from 'react';
import styled from 'styled-components';

const BgTop = styled.div`
  background: linear-gradient(to left, #75a47f, #bacd92);
  height: 100vh;
  position: relative;
`;
const PageName = styled.div`
  height: 30px;
`;

const BgBottom = styled.div`
  padding: 40px;
  background-color: #ffffff;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  position: absolute;
  top: 200px;
  left: 0;
  right: 0;
  bottom: 0;
`;

export default function Template({ childrenTop, childrenBottom }) {
  return (
    <>
      <BgTop>{childrenTop}</BgTop>
      {/* <PageName>{childrenTop}</PageName> */}
      <BgBottom>{childrenBottom}</BgBottom>
    </>
  );
}
