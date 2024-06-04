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
import { ChatBotBtn } from '../components/Btns';

const PcContainer = styled.div`
  .block {
    /* width: 50%; */
    display: flex;
    flex-direction: row;
    margin-bottom: 5%;
    /* padding: 5%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
    border-radius: 9px;
  }
  .news {
    width: 100%;
  }
`;
export const CommonMainDashboard = styled.div`
  padding: 30px 40px 10px 290px;
  .main-title {
    /* padding: 20px 30px 10px 280px; */
    font-size: 20px;
    font-weight: 500;
    color: #333;
    margin-bottom: 35px;
  }
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BlockLine = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 50px;

  .firstBox {
    border: 1px solid #eff4f0;
    background: #fff;
    border-radius: 10px;
    width: 100px;
    height: 90px;
    box-shadow: 1.5px 2.99px 5.98px #eff4f0;
    padding: 20px;
  }
  .secondBox {
    border: 1px solid #eff4f0;
    background: #fff;
    border-radius: 10px;
    width: 230px;
    height: 90px;
    box-shadow: 1.5px 2.99px 5.98px #eff4f0;
    padding: 20px;
  }
`;

export function CommonMain() {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    window.addEventListener('resize', () => setInnerWidth(window.innerWidth));
  }, []);
  return (
    <>
      {innerWidth <= 1160 ? (
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
      ) : (
        <>
          <CommonMainDesktopHeader />
          <ChatBotBtn />
          <Container>
            <ManagerTopHeader>
              <CommonMainHeader />
            </ManagerTopHeader>

            {/* 대시보드 내용 */}
            <CommonMainDashboard>
              <div className="main-title">Dashboard</div>
              <BlockLine>
                <div className="firstBox">
                  <GetName />
                </div>
                <div
                  className="secondBox"
                  onClick={() => navigate(`/${id}/bank`)}
                >
                  <OwnAccount />
                </div>
                {/* <div className="firstBox"></div> */}
              </BlockLine>
            </CommonMainDashboard>
          </Container>
        </>
      )}
    </>
  );
}
