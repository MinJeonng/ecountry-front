import styled from 'styled-components';
import React from 'react';

const BoxStyle = styled.div`
  width: calc(100% - 40px);
  background-color: #f5f6f6;
  margin: 20px;
  height: 300px;
  border-radius: 18px;
  box-sizing: border-box;
  z-index: 10;
  position: relative;
`;

function InputContainer() {
  return <BoxStyle></BoxStyle>;
}
export default InputContainer;
