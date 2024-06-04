import { useEffect, useState } from 'react';
import { ReactComponent as IcoMenuRight } from '../images/icon-sideMenu.svg';
import { ReactComponent as ArrowLeft } from '../images/ico-arr-left.svg';
import { ReactComponent as Alarm } from '../images/icon-alarm.svg';
import styled from 'styled-components';
import { AlarmComponent, SideMenuComponent } from './SideMenu';
import { useNavigate, useParams } from 'react-router-dom';
import Template from './Template';
import axios from 'axios';
import '../styles/settingHeader.scss';
import { useSelector } from 'react-redux';
import { getExpire } from '../hooks/Functions';

const CommonHeader = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const AlarmHeader = styled.div`
  gap: 10px;
  display: flex;
  position: relative;
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
  @media (min-width: 1160px) {
    display: flex;
    position: relative;
    gap: 10px;
    margin: 10px 30px 10px 0;
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
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const getAlarmCount = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_HOST}/api/student/notice/count`,
        headers: {
          Authorization: `Bearer ${getExpire()}`,
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
  useEffect(() => {
    window.addEventListener(`resize`, () => setInnerWidth(window.innerWidth));
  }, []);

  return (
    <>
      {innerWidth <= 1160 ? (
        <>
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
        </>
      ) : (
        <>
          <AlarmHeader className={alarmCount > 0 ? 'new' : null}>
            <Alarm onClick={() => setShowAlarm(true)} />
          </AlarmHeader>
          {showAlarm && <AlarmComponent func={closeFunc} />}
        </>
      )}
    </>
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
export function CommonMainDesktopHeader() {
  const { id } = useParams();
  const navigate = useNavigate();
  const studentInfoList = useSelector(
    (state) => state.studentInfo.studentInfoList
  );

  const handleNavigation = (path) => {
    navigate(path);
  };

  const positions = [
    { name: '홈', path: `/${id}/main` },
    { name: '은행', path: `/${id}/bank` },
    { name: '투자', path: `/${id}/investment` },
    { name: '뉴스', path: `/${id}/news` },
    { name: '국회', path: `/${id}/assembly` },
    { name: '국민 신문고', path: `/${id}/boardPeople` },
    { name: '국세청', path: `/${id}/revenue` },
    { name: '마이페이지', path: `/${id}/mypage` },
  ];

  const skillMappings = {
    0: {
      text: <>은행원 (월급지급)</>,
      link: `/${id}/skills`,
    },
    1: {
      text: <>은행원 (적금관리)</>,
      link: `/${id}/skills`,
    },

    3: {
      text: <>국세청 (세금 징수)</>,
      link: `/${id}/skills`,
    },
    4: {
      text: <>신용 관리 등급 위원회</>,
      link: `/${id}/skills`,
    },
    5: {
      text: <>국회 (법 제정)</>,
      link: `/${id}/skills`,
    },
  };
  const skillBasedLinks = studentInfoList.skills
    ? studentInfoList.skills
        .map((skill) =>
          skillMappings[skill] ? { ...skillMappings[skill], key: skill } : null
        )
        .filter(Boolean)
    : [];

  return (
    <header>
      <img
        className="header-logo"
        src={`${process.env.PUBLIC_URL}/images/logo-defaultImg.jpg`}
        alt="로고"
      />
      <nav>
        <ul className="header-menu">
          {positions.map(({ name, path }) => (
            <li
              key={name}
              className={window.location.pathname === path ? 'active' : ''}
            >
              <div onClick={() => handleNavigation(path)}>{name}</div>
            </li>
          ))}
          <hr width="80%" color="#e2e4e4" height="1px" noshade />
          {studentInfoList.skills &&
            skillBasedLinks.map(({ text, link, key }) => (
              <>
                <li
                  key={key}
                  className={window.location.pathname === link ? 'active' : ''}
                >
                  <div
                    onClick={() => {
                      localStorage.setItem('skillId', key);
                      navigate(link);
                    }}
                  >
                    {text}
                  </div>
                </li>
              </>
            ))}
        </ul>
      </nav>
    </header>
  );
}
