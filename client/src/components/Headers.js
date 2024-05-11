import { useEffect, useState } from 'react';
import { ReactComponent as IcoMenuRight } from '../images/icon-sideMenu.svg';
import styled from 'styled-components';
import { SideMenuComponent } from './SideMenu';

const BoxStyle = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;
  padding: 25px 0 0 30px;
`;

export function ManagerMainHeader() {
  const [showSideMenu, setShowSideMenu] = useState(false);
  useEffect(() => {
    console.log('showSideMenu 상태 변경됨:', showSideMenu);
  }, [showSideMenu]);
  const closeFunc = () => {
    setShowSideMenu(false);
  };

  return (
    <>
      <BoxStyle className="headerBg">
        <header>
          {/* Ico안뜸 확인 */}
          <IcoMenuRight
            onClick={() => {
              console.log('메뉴 열기 전 showSideMenu 상태:', showSideMenu); // 로그 추가
              setShowSideMenu(true);
              console.log('메뉴 열기 후 showSideMenu 상태:', showSideMenu);
            }}
          />
        </header>
      </BoxStyle>
      {showSideMenu && <SideMenuComponent func={closeFunc} />}
    </>
  );
}
