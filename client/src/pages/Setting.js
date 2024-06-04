import React, { useEffect, useState } from 'react';
import { SettingHeader } from '../components/SettingHeader';

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

import '../styles/_input_common.scss';
import '../styles/setting.scss';
import '../styles/settingPc.scss';
import '../styles/_button_common.scss';
import { PageHeader } from '../components/Headers';
import Footer from '../components/Footer';

export default function Setting({ position }) {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', () => setInnerWidth(window.innerWidth));
  }, []);

  const settingPositions = [
    '학교 정보 입력',
    '국가 정보 입력',
    '학생 정보 입력',
    '자리배치도',
    '직업리스트',
    '기본 법 제정',
    '세법 제정',
    '자리임대료 설정',
    '과태료 설정',
  ];
  return (
    <>
      <SettingHeader position={position} positions={settingPositions} />
      <Template
        // {innerWidth ? }
        // isAuthPage2={true}
        childrenTop={<PageHeader>{position}</PageHeader>}
        childrenBottom={
          <>
            {position === '학교 정보 입력' && <Setting1 />}
            {position === '국가 정보 입력' && <Setting2 />}
            {position === '학생 정보 입력' && <Setting3 />}
            {position === '자리배치도' && <Setting4 />}
            {position === '직업리스트' && <Setting5 />}
            {position === '기본 법 제정' && <Setting6 />}
            {position === '세법 제정' && <Setting7 />}
            {position === '자리임대료 설정' && <Setting8 />}
            {position === '과태료 설정' && <Setting9 />}
          </>
        }
      />
      {/* <Footer /> */}
    </>
  );
}
