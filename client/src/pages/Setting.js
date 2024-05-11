import React from 'react';

import {
  Setting1,
  Setting2,
  Setting3,
  Setting4,
  Setting5,
  Setting6,
  Setting7,
  Setting8,
  Setting9,
} from '../components/Setting';
import Template from '../components/Template';

import '../styles/background.scss';
import '../styles/_input_common.scss';
import '../styles/setting.scss';
import '../styles/_button_common.scss';

export default function Setting({ position }) {
  return (
    <>
      <Template
        childrenBottom={
          <>
            {position === '학교 정보 입력' && <Setting1 />}
            {position === '국가 정보 입력' && <Setting2 />}
            {position === '학생 정보 입력' && <Setting3 />}
            {position === '자리배치도' && <Setting4 />}
            {position === '직업리스트' && <Setting5 />}
            {position === '기본 법 제정' && <Setting6 />}
            {position === '세법' && <Setting7 />}
            {position === '자리임대료' && <Setting8 />}
            {position === '과태료' && <Setting9 />}
          </>
        }
      />
    </>
  );
}
