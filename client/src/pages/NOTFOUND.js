import React from 'react';
import Template from '../components/Template';
import styled from 'styled-components';

const NotFoundText = styled.div`
  text-align: center;
  font-weight: 700;
  font-size: 20px;
`;

export default function NOTFOUND() {
  return (
    <>
      <Template
        childrenBottom={<NotFoundText>페이지를 찾을 수 없습니다.</NotFoundText>}
      />
    </>
  );
}
