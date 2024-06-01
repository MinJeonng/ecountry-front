import { useEffect, useState } from 'react';
import { ReactComponent as IcoMenuRight } from '../images/icon-sideMenu.svg';
import { ReactComponent as ArrowLeft } from '../images/ico-arr-left.svg';
import { ReactComponent as Alarm } from '../images/icon-alarm.svg';
import styled from 'styled-components';
import { AlarmComponent, SideMenuComponent } from './SideMenu';
import { useNavigate, useParams } from 'react-router-dom';
import Template from './Template';
import axios from 'axios';

const CommonHeader = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const AlarmHeader = styled.div`
  gap: 10px;
  display: flex;
  position: relative;
  /* top: 25px;
  right: 20px; */
  margin-right: 30px;
  margin-top: 25px;
  &.new {
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 3px;
      right: 5px;
      background: #b62c2c;
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }
  }
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
  const [showAlarm, setShowAlarm] = useState(false);
  const [alarmCount, setAlarmCount] = useState(0);

  const getAlarmCount = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_HOST}/api/student/notice/count`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
        },
      });
      if (res.data.success) {
        if (res.data.result) {
          console.log(res.data.result.count);
          setAlarmCount(res.data.result.count);
        }
      } else {
        setAlarmCount(0);
      }
    } catch {
      setAlarmCount(0);
    }
  };

  const closeFunc = () => {
    setShowSideMenu(false);
    setShowAlarm(false);
  };

  useEffect(() => {
    getAlarmCount();
  }, []);

  return (
    <CommonHeader>
      <BoxStyle className="headerBg">
        <HeaderStyle>
          <IcoMenuRight onClick={() => setShowSideMenu(true)} />
        </HeaderStyle>
      </BoxStyle>
      {showSideMenu && <SideMenuComponent func={closeFunc} />}
      <AlarmHeader className={alarmCount > 0 ? 'new' : null}>
        <Alarm onClick={() => setShowAlarm(true)} />
      </AlarmHeader>
      {showAlarm && <AlarmComponent func={closeFunc} />}
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
