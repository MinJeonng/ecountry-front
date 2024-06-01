import React from 'react';
import '../styles/settingHeader.scss';

export function PcHeader() {
  return (
    <header>
      <img
        className="header-logo"
        src={`${process.env.PUBLIC_URL}/images/logo-defaultImg.jpg`}
        alt="로고"
      />
      <nav>
        <ul className="header-menu">
          <li></li>
          {/* {positions.map((pos) => (
            <li key={pos} className={pos === position ? 'active' : ''}>
              {pos}
            </li>
          ))} */}
        </ul>
      </nav>
    </header>
  );
}
