import { useEffect, useState } from 'react';
import { ReactComponent as IcoMenuRight } from '../images/icon-sideMenu.svg';
import { ReactComponent as ArrowLeft } from '../images/ico-arr-left.svg';
import styled from 'styled-components';
import { SideMenuComponent } from './SideMenu';
import { useNavigate } from 'react-router-dom';
import Template from './Template';

const BoxStyle = styled.div`
  /* position: sticky; */
  top: 0;
  left: 0;
  z-index: 100;
  padding: 25px 0 0 30px;
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
