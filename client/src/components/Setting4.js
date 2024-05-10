import React from 'react';

import Background from './Background';

import '../styles/background.scss';
import '../styles/setting4.scss';

export default function Setting4() {
  const titleContent = (
    <div className="title-list">
      <div>자리 배치도</div>
      <ul className="title-list">
        <li>교실 내의 자리 배치를 설정하세요&#46;</li>
      </ul>
    </div>
  );

  return (
    <div>
      <Background main={titleContent} />
    </div>
  );
}
