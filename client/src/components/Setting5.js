import React from 'react';

import Background from './Background';

import '../styles/background.scss';
import '../styles/setting4.scss';

export default function Setting5() {
  const titleContent = (
    <div className="title-list">
      <div>직업 리스트</div>
      <ul className="title-list">
        <li>국가 내의 다양한 직업과 급여를 설정하세요&#46;</li>
        <li>
          각 직업에 따른 자격기준&#40;신용등급&#41;도 함께 설정하세요&#46;
        </li>
        <li>기본적으로 제공되는 직업 외에 직업을 추가할 수 있습니다&#46;</li>
      </ul>
    </div>
  );

  return (
    <div>
      <Background main={titleContent} />
    </div>
  );
}
