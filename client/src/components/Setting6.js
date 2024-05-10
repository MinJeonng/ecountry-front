import React from 'react';

import Background from './Background';

import '../styles/background.scss';
import '../styles/setting4.scss';

export default function Setting6() {
  const titleContent = (
    <div className="title-list">
      <div>기본법 제정</div>
      <ul className="title-list">
        <li>국가에 필수인 기본법을 제정하세요&#46;</li>
      </ul>
    </div>
  );

  return (
    <div>
      <Background main={titleContent} />
    </div>
  );
}
