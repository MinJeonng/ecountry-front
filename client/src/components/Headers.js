import { useEffect, useState } from 'react';
import { ReactComponent as IcoMenuRight } from '../images/icon-sideMenu.svg';
import { ReactComponent as ArrowLeft } from '../images/ico-arr-left.svg';
import { ReactComponent as Alarm } from '../images/icon-alarm.svg';
import styled from 'styled-components';
import { AlarmComponent, SideMenuComponent } from './SideMenu';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
  const userInfo = useSelector((state) => state.auth);

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
          // console.log(res.data.result.count);
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
            {userInfo.isStudent && (
              <>
                <AlarmHeader className={alarmCount > 0 ? 'new' : null}>
                  <Alarm onClick={() => setShowAlarm(true)} />
                </AlarmHeader>
                {showAlarm && <AlarmComponent func={closeFunc} />}
              </>
            )}
          </CommonHeader>
        </>
      ) : (
        <>
          {userInfo.isStudent && (
            <>
              <AlarmHeader className={alarmCount > 0 ? 'new' : null}>
                <Alarm onClick={() => setShowAlarm(true)} />
              </AlarmHeader>
              {showAlarm && <AlarmComponent func={closeFunc} />}
            </>
          )}
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
      case '투자 상품 관리':
        return `/${id}/manager`;
      case '투자 상품 확인':
        return `/${id}/main`;
      case '뉴스 리스트':
        return `/${id}/main`;
      case '뉴스':
        return `/${id}/news`;
      case '뉴스 글 등록':
        return `/${id}/news/read/${id}`;
      case '거래 내역':
        return `/${id}/bank`;
      case '은행':
        return `/${id}/main`;
      case '세법 관리':
        return `/${id}/manager`;
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
  const location = useLocation();
  const studentInfoList = useSelector(
    (state) => state.studentInfo.studentInfoList
  );
  const userInfo = useSelector((state) => state.auth);

  const handleNavigation = (path) => {
    navigate(path);
  };

  // useEffect(() => {
  //   // 페이지 경로가 변경될 때 로컬 스토리지에서 skillId를 삭제
  //   localStorage.removeItem('skillId');
  // }, [location]);

  const positions = [
    { name: '홈', path: `/${id}/main` },
    { name: '투자', path: `/${id}/investment` },
    { name: '뉴스', path: `/${id}/news` },
    { name: '국회', path: `/${id}/assembly` },
    { name: '국민 신문고', path: `/${id}/boardPeople` },
    // { name: '자리 배치도', path: `/${id}/seatMap` },
    { name: '국세청', path: `/${id}/revenue` },
    { name: '마이페이지', path: `/${id}/mypage` },
  ];

  if (userInfo.isStudent) {
    positions.splice(1, 0, { name: '은행', path: `/${id}/bank` });
  }

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

  const storedSkillId = localStorage.getItem('skillId');

  return (
    <header>
      <img
        className="header-logo"
        src={`${process.env.PUBLIC_URL}/images/logo-defaultImg.jpg`}
        alt="로고"
      />
      <img
        className="header-logo2"
        src={`${process.env.PUBLIC_URL}/images/logo-text.png`}
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
          {skillBasedLinks.length > 0 && (
            <>
              {skillBasedLinks.map(({ text, link, key }) => (
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
              ))}
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export function SkillHeader() {
  const { id } = useParams();
  const navigate = useNavigate();
  const studentInfoList = useSelector(
    (state) => state.studentInfo.studentInfoList
  );
  const userInfo = useSelector((state) => state.auth);
  // const [selectedSkill, setSelectedSkill] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedSkillState, setSelectedSkillState] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleNavigation = (path) => {
    navigate(path);
  };
  const positions = [
    { name: '홈', path: `/${id}/main` },
    { name: '투자', path: `/${id}/investment` },
    { name: '뉴스', path: `/${id}/news` },
    { name: '국회', path: `/${id}/assembly` },
    { name: '국민 신문고', path: `/${id}/boardPeople` },
    // { name: '자리 배치도', path: `/${id}/seatMap` },
    { name: '국세청', path: `/${id}/revenue` },
    { name: '마이페이지', path: `/${id}/mypage` },
  ];

  if (userInfo.isStudent) {
    positions.splice(1, 0, { name: '은행', path: `/${id}/bank` });
  }

  const skillMappings = {
    0: {
      text: <>은행원 (월급지급)</>,
      link: `/${id}/skills`,
      state: 0,
    },
    1: {
      text: <>은행원 (적금관리)</>,
      link: `/${id}/skills`,
      state: 1,
    },

    3: {
      text: <>국세청 (세금 징수)</>,
      link: `/${id}/skills`,
      state: 3,
    },
    4: {
      text: <>신용 관리 등급 위원회</>,
      link: `/${id}/skills`,
      state: 4,
    },
    5: {
      text: <>국회 (법 제정)</>,
      link: `/${id}/skills`,
      state: 5,
    },
  };
  // const skillBasedLinks = studentInfoList.skills
  //   ? studentInfoList.skills
  //       .map((skill) =>
  //         skillMappings[skill] ? { ...skillMappings[skill], key: skill } : null
  //       )
  //       .filter(Boolean)
  //   : [];

  const skillBasedLinks = studentInfoList.skills
    ? studentInfoList.skills
        .map((skill) =>
          skillMappings[skill] ? { ...skillMappings[skill], key: skill } : null
        )
        .filter(
          (item) =>
            item &&
            (selectedSkillState === null || item.state === selectedSkillState) // 현재 선택된 state와 일치하는 항목만 포함
        )
    : [];
  const storedSkillId = localStorage.getItem('skillId');
  // console.log(storedSkillId);

  const handleSkillClick = (key, link, state, index) => {
    setSelectedSkill(key);
    // setSelectedSkillState(state); // 선택된 기능의 state를 설정
    localStorage.setItem('skillId', key);
    navigate(link);
    setSelectedSkillState(index);
  };
  selectedSkillState;
  return (
    <header>
      <img
        className="header-logo"
        src={`${process.env.PUBLIC_URL}/images/logo-defaultImg.jpg`}
        alt="로고"
      />
      <img
        className="header-logo2"
        src={`${process.env.PUBLIC_URL}/images/logo-text.png`}
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
          {skillBasedLinks.length > 0 && (
            <>
              {skillBasedLinks.map(({ text, link, key, state, index }) => (
                <li
                  key={key}
                  className={
                    window.location.pathname === link ||
                    storedSkillId === String(key)
                      ? 'active'
                      : ''
                  }
                  style={{
                    display:
                      selectedSkill === null || selectedSkill === key
                        ? 'block'
                        : 'none',
                  }}
                >
                  <div
                    onClick={() => handleSkillClick(key, link, state, index)}
                  >
                    {text}
                  </div>
                </li>
              ))}
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
