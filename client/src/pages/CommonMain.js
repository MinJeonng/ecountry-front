//공통 메인페이지
import { useState, useEffect, useContext } from 'react';
import {
  CommonMainDesktopHeader,
  CommonMainHeader,
} from '../components/Headers';
import { GetName } from '../components/MainProfile';
import CommonMainNews from '../components/CommonMainNews';
import Template from '../components/Template';
import MenuList from '../components/MenuList';
import ScheduleList from '../components/ScheduleList';
import PcInvestment from '../components/PcInvestment';

import '../styles/common_main.scss';
import styled from 'styled-components';
import { ManagerTopHeader } from './ManagerDashBoard';
import { useNavigate, useParams } from 'react-router-dom';
import { OwnAccount } from '../components/StudentBank';

import { StudentIdCard } from '../components/StudentIdCard';

import { ChatBotBtn, LoginBtn } from '../components/Btns';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { authFunc, confirmCountry } from '../hooks/Functions';

export const CommonMainDashboard = styled.div`
  padding: 35px 40px 10px 310px;
  box-sizing: border-box;
  .main-title {
    font-size: 20px;
    font-weight: 500;
    color: #333;
    margin-bottom: 35px;
  }
  .firstContainer {
    display: flex;
    justify-content: space-between;
  }
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 60px;
  width: 100%;
`;

export const BlockLine = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 70px;
  margin-bottom: 40px;
  .Box {
    border: 1px solid #eff4f0;
    background: #d9d9d924;
    border-radius: 10px;
    box-shadow: 1.5px 2.99px 5.98px #eff4f0;
    padding: 20px;
    cursor: pointer;
    &.firstBox {
      width: 190px;
      height: 90px;
    }
    &.firstManagerBox {
      width: 200px;
      height: 9%;
    }
    &.secondBox {
      width: 230px;
      height: 90px;
    }
    &.thirdBox {
      width: 470px;
      height: 200px;
    }
    &.fourthBox {
      width: 370px;
      height: 200px;
    }
    &.fifthBox {
      width: 540px;
      height: 360px;
    }
    &.sixthBox {
      width: 360px;
      height: 360px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }
`;

export function CommonMain() {
  const { id } = useParams();

  const [loginBtn, setLoginBtn] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth);

  const showItem = () => {
    setIsShow(true);
  };

  useEffect(() => {
    window.addEventListener('resize', () => setInnerWidth(window.innerWidth));
    if (authFunc()) {
      confirmCountry(id, userInfo, showItem);
    } else {
      setLoginBtn(true);
    }
  }, []);
  return (
    <>
      <ToastContainer />
      {loginBtn && <LoginBtn />}
      {isShow && innerWidth <= 1160 && (
        <>
          <Template
            childrenTop={
              <>
                <CommonMainHeader />
                <div className="mainProfile">
                  <GetName />
                </div>
              </>
            }
            childrenBottom={
              <>
                <div className="mainContent">
                  <CommonMainNews />
                  <ScheduleList />
                  <MenuList />
                  <PcInvestment />
                  <ChatBotBtn />
                </div>
              </>
            }
          />
        </>
      )}
      {isShow && innerWidth > 1160 && (
        <>
          <CommonMainDesktopHeader />
          <ChatBotBtn />

          <Container>
            <ManagerTopHeader>
              <StudentIdCard />
              <CommonMainHeader />
            </ManagerTopHeader>

            {/* 대시보드 내용 */}
            <CommonMainDashboard>
              <div className="main-title">Dashboard</div>
              <BlockLine>
                <div className="Box firstBox">
                  <GetName />
                </div>
                {userInfo.isStudent && (
                  <div
                    className="Box secondBox"
                    onClick={() => navigate(`/${id}/bank`)}
                  >
                    <OwnAccount />
                  </div>
                )}
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
