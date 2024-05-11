import { useState } from 'react';
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

  return (
    <>
      <BoxStyle className="headerBg">
        <header>
          <IcoMenuRight onClick={() => setShowSideMenu(!showSideMenu)} />
        </header>
      </BoxStyle>
      {showSideMenu && (
        <SideMenuComponent func={() => setShowSideMenu(false)} />
      )}
    </>
  );
}
