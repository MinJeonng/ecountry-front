import React from 'react';
import styled from 'styled-components';

const BgTop = styled.div`
  background: linear-gradient(to left, #75a47f, #bacd92);
  height: 300px;
  position: relative;
`;
const PageName = styled.div`
  height: 30px;
`;

const BgBottom = styled.div`
  position: relative;
  margin-top: -100px;
  padding: 40px 30px 70px;
  background-color: #ffffff;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
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
