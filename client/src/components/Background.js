import React, { useState } from 'react';

import Setting1 from './Setting1';
import Setting2 from './Setting2';
import Setting3 from './Setting3';
import Setting4 from './Setting4';
import Setting5 from './Setting5';
import Setting6 from './Setting6';
import Setting7 from './Setting7';
import Setting8 from './Setting8';
import Setting9 from './Setting9';

export default function Background() {
  // Setting 컴포넌트들 배열(0부터 8까지)
  const settings = [
    Setting1,
    Setting2,
    Setting3,
    Setting4,
    Setting5,
    Setting6,
    Setting7,
    Setting8,
    Setting9,
  ];

  // 현재 컴포넌트 인덱스
  const [currentIndex, setCurrentIndex] = useState(0);

  const switchSetting = () => {
    // 다음 컴포넌트로 전환
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  // 현재 인덱스에 해당하는 컴포넌트를 렌더링합니다.
  const CurrentSetting = settings[currentIndex];

  return (
    <div className="wrap">
      <div className="bgTop"></div>
      <div className="bgBottom">
        <CurrentSetting />
        <div className="navi-btn">
          <button className="next-button">이전</button>
          <button className="next-button" onClick={switchSetting}>
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
