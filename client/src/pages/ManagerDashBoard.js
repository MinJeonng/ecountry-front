import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Template from '../components/Template';
import { MainProfile } from '../components/MainProfile';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '../styles/manager_dash.scss';

import { MainDashboard } from '../components/ManagerDashboard';
import styled from 'styled-components';
import { ChatBotBtn } from '../components/Btns';
import { useEffect, useState } from 'react';
import { ManagerHeader } from '../components/ManagerHeader';
import { BlockLine, CommonMainDashboard, Container } from './CommonMain';
import Revune from '../components/Revune';
import CommonMainNews from '../components/CommonMainNews';
import PcInvestment from '../components/PcInvestment';
import ScheduleList from '../components/ScheduleList';
import MenuList from '../components/MenuList';
import { StudentIdCard } from '../components/StudentIdCard';

const Btns = styled.button`
  @media (max-width: 1160px) {
    border-radius: 11px;
    border: none;
    text-align: center;
    font-size: 13px;
    color: #606060;
    padding: 14px 20px;
    margin-top: 5px;
    box-shadow: 1px 1.3px #c0bebe;
    height: 32px;
    display: flex;
    align-items: center;
    text-wrap: nowrap;
    img {
      width: 16px;
      height: 16px;
    }
  }
  @media (min-width: 1160px) {
    display: flex;
    position: relative;
    gap: 10px;
    margin: 10px 30px 10px 0;
    border: none;
    background: none;
    &:hover {
      background: #ddd;
      border-radius: 10px;
      padding: 5px;
    }
  }
`;
export const ManagerTopHeader = styled.div`
  display: flex;
  height: 56px;
  border-bottom: 1px solid #d9d9d9;
  width: 100vw;
  align-items: center;
  justify-content: space-between;
`;

export default function ManagerDashBoard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const logoutFunc = () => {
    if (!window.confirm('로그아웃 하시겠습니까?')) {
      return;
    }
    localStorage.removeItem('token');
    window.location.href = `/login`;
  };
  const movetoCountryList = () => {
    navigate(`/countryList`);
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      toast.error('로그인 후 이용 가능합니다.', { autoClose: 1300 });
      setTimeout(() => navigate('/login'), 1300);
    }
  }, []);
  useEffect(() => {
    window.addEventListener(`resize`, () => setInnerWidth(window.innerWidth));
    return () =>
      window.removeEventListener(`resize`, () =>
        setInnerWidth(window.innerWidth)
      );
  }, []);
  return (
    <>
      <ToastContainer />
      <ChatBotBtn />

      {innerWidth <= 1160 ? (
        <Template
          childrenTop={
            <>
              <div className="managerInfo">
                <div className="InfoPart1">
                  <div className="MainProfileBox">
                    <MainProfile />
                  </div>
                  <div className="countryUrl">
                    <span>국가 홈페이지 주소</span>
                    <div className="clipboard">
                      <CopyToClipboard
                        text={`${process.env.REACT_APP_BASEURL}/${id}/main`}
                        onCopy={() =>
                          toast('클립보드로 복사했습니다.', {
                            autoClose: 1300,
                          })
                        }
                      >
                        <img
                          src={`${process.env.PUBLIC_URL}/images/icon-copy.png`}
                          alt="복사"
                        />
                      </CopyToClipboard>

                      <Link
                        to={`${process.env.REACT_APP_BASEURL}/${id}/main`}
                        className="countryLink"
                        style={{ color: '#777' }}
                      >
                        {`http://13.125.85.110/${id}/main`}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="BtnsClass">
                  <Btns onClick={logoutFunc}>
                    로그아웃
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon-sign-out.png`}
                      alt="복사"
                    />
                  </Btns>
                  <Btns onClick={movetoCountryList}>국가 리스트</Btns>
                </div>
              </div>
            </>
          }
          childrenBottom={
            <>
              <MainDashboard />
            </>
          }
        />
      ) : (
        <>
          <ManagerHeader />
          <Container>
            <ManagerTopHeader>
              <StudentIdCard />
              <Btns onClick={movetoCountryList}>국가 리스트</Btns>
            </ManagerTopHeader>

            <CommonMainDashboard>
              <div className="firstContainer">
                <div className="main-title">Manager Dashboard</div>
                <div className="countryUrl">
                  <span>국가 홈페이지 주소</span>
                  <div className="clipboard">
                    <CopyToClipboard
                      text={`${process.env.REACT_APP_BASEURL}/${id}/main`}
                      onCopy={() =>
                        toast('클립보드로 복사했습니다.', {
                          autoClose: 1300,
                        })
                      }
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/images/icon-copy.png`}
                        alt="복사"
                      />
                    </CopyToClipboard>

                    <Link
                      to={`${process.env.REACT_APP_BASEURL}/${id}/main`}
                      className="countryLink"
                      style={{ color: '#777' }}
                    >
                      {`http://13.125.85.110/${id}/main`}
                    </Link>
                  </div>
                </div>
              </div>

              <BlockLine>
                <div className="Box firstManagerBox">
                  <MainProfile />
                </div>
                <div className="Box secondBox">
                  <Revune />
                </div>
              </BlockLine>
              <BlockLine>
                <div className="Box thirdBox">
                  <CommonMainNews />
                </div>
                <div className="Box fourthBox">
                  <PcInvestment />
                </div>
              </BlockLine>
              <BlockLine>
                <div className="Box fifthBox">
                  <ScheduleList />
                </div>
                <div className="Box sixthBox">
                  <MenuList />
                </div>
              </BlockLine>
            </CommonMainDashboard>
          </Container>
        </>
      )}
    </>
  );
}
