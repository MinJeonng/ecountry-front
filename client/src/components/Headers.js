import { useEffect, useState } from 'react';
import { ReactComponent as IcoMenuRight } from '../images/icon-sideMenu.svg';
import { ReactComponent as ArrowLeft } from '../images/ico-arr-left.svg';
import { ReactComponent as Alarm } from '../images/icon-alarm.svg';
import styled from 'styled-components';
import { SideMenuComponent } from './SideMenu';
import { useNavigate } from 'react-router-dom';
import Template from './Template';

const CommonHeader = styled.div`
  display: flex;
  align-items: center;
`;
const AlarmHeader = styled.div`
  gap: 10px;
  display: flex;
  position: relative;
  top: 25px;
  right: 20px;
`;
const BoxStyle = styled.div`
  position: relative;
  top: 25px;
  z-index: 100;
  width: 100%;
  left: 20px;
  /* right: 20px; */
`;
const HeaderStyle = styled.header`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

const PageHeaderBox = styled.div`
  display: flex;
  align-items: center;
  position: sticky;
`;
const Text = styled.div`
  color: #fff;
  font-size: 15px;
`;

export function CommonMainHeader() {
  const [showSideMenu, setShowSideMenu] = useState(false);
  useEffect(() => {
    console.log('showSideMenu 상태 변경됨:', showSideMenu);
  }, [showSideMenu]);
  const closeFunc = () => {
    setShowSideMenu(false);
  };

  return (
    <CommonHeader>
      <BoxStyle className="headerBg">
        <HeaderStyle>
          <IcoMenuRight
            onClick={() => {
              console.log('메뉴 열기 전 showSideMenu 상태:', showSideMenu);
              setShowSideMenu(true);
              console.log('메뉴 열기 후 showSideMenu 상태:', showSideMenu);
            }}
          />
        </HeaderStyle>
      </BoxStyle>
      {showSideMenu && <SideMenuComponent func={closeFunc} />}
      <AlarmHeader>
        <Alarm />
      </AlarmHeader>
    </CommonHeader>
  );
}
//각 페이지마다 이전 페이지로 돌아가기 위한..
// < 은행 이거 만들어서 childrenTop에 적용하기!!!!

//changeFill 다가가면 border약간 티나게 바뀌기
export function PageHeader({ children }) {
  const navigate = useNavigate();
  return (
    <Template
      childrenTop={
        <>
          <PageHeaderBox>
            <header>
              <ArrowLeft
                onClick={() => navigate(-1)}
                className="changeFill"
                style={{ width: '15px' }}
              />
              <Text>{children}</Text>
            </header>
          </PageHeaderBox>
        </>
      }
    />
  );
}
