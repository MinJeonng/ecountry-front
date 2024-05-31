import { useEffect, useState } from 'react';
import { ReactComponent as IcoMenuRight } from '../images/icon-sideMenu.svg';
import { ReactComponent as ArrowLeft } from '../images/ico-arr-left.svg';
import { ReactComponent as Alarm } from '../images/icon-alarm.svg';
import styled from 'styled-components';
import { SideMenuComponent } from './SideMenu';
import { useNavigate, useParams } from 'react-router-dom';
import Template from './Template';
import { PcHeader } from './PcHeader';

const CommonHeader = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const AlarmHeader = styled.div`
  gap: 10px;
  display: flex;
  /* position: relative;
  top: 25px;
  right: 20px; */
  padding-right: 30px;
  padding-top: 25px;
`;
const BoxStyle = styled.div`
  z-index: 100;
  width: 100%;
  padding-top: 25px;
  padding-left: 30px;
  /* right: 20px; */
`;
const HeaderStyle = styled.header`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  text-align: center;
  button {
    border: none;
    background: none;
  }
`;

const PageHeaderBox = styled.div`
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-left: 20px;
`;
const Text = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
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
              // console.log('메뉴 열기 전 showSideMenu 상태:', showSideMenu);
              setShowSideMenu(true);
              // console.log('메뉴 열기 후 showSideMenu 상태:', showSideMenu);
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

export function PageHeader({ children, position }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const getPathByPosition = (position) => {
    switch (position) {
      case '신문고':
        return `/${id}/manager`;
      case '신문고 글쓰기':
        return `/${id}/boardPeople`;
      case '신문고 리스트':
        return `/${id}/boardPeople`;
      default:
        return null;
    }
  };

  const path = getPathByPosition(position);

  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', () => setInnerWidth(window.innerWidth));
  }, []);
  return (
    <>
      <Template
        childrenTop={
          <>
            {innerWidth <= 1160 && (
              <PageHeaderBox>
                <HeaderStyle>
                  <button
                    onClick={() => (path ? navigate(path) : navigate(-1))}
                  >
                    <ArrowLeft stroke={'#fff'} />
                  </button>
                  <Text>{children}</Text>
                </HeaderStyle>
              </PageHeaderBox>
            )}
          </>
        }
      />
    </>
  );
}
