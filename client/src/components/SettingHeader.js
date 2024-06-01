import React from 'react';
import '../styles/settingHeader.scss';

export function SettingHeader({ position, positions }) {
  // const positions = [
  //   '학교 정보 입력',
  //   '국가 정보 입력',
  //   '학생 정보 입력',
  //   '자리배치도',
  //   '직업리스트',
  //   '기본 법 제정',
  //   '세법 제정',
  //   '자리임대료 설정',
  //   '과태료 설정',
  // ];

  return (
    <header>
      <img
        className="header-logo"
        src={`${process.env.PUBLIC_URL}/images/logo-defaultImg.jpg`}
        alt="로고"
      />
      <nav>
        <ul className="header-menu">
          {positions.map((pos) => (
            <li key={pos} className={pos === position ? 'active' : ''}>
              {pos}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
