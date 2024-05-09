import React from 'react';

import InputContainer from '../components/InputContainer';

import '../styles/Setting1.scss';
import '../styles/background.scss';
import Background from './Background';

export default function Setting1() {
  return (
    <div>
      <Background />
      <div>반 정보 입력</div>
      <ul className="title-list">
        <li>학교, 학년, 반 정보를 입력하세요&#46;</li>
      </ul>
      <InputContainer />
    </div>
  );
}
