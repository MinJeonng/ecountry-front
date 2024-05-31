//공통 메인페이지
import { CommonMainHeader } from '../components/Headers';
import { GetName } from '../components/MainProfile';
import CommonMainNews from '../components/CommonMainNews';
import Template from '../components/Template';
import MenuList from '../components/MenuList';
import ScheduleList from '../components/ScheduleList';
import PcInvestment from '../components/PcInvestment';

import '../styles/common_main.scss';
import styled from 'styled-components';

const Container = styled.div`
  padding: 10%;
`;

export function CommonMain() {
  return (
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
            <div
              className="mainContent"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '5%',
              }}
            >
              <div
                className="news"
                style={{ width: '100%', marginBottom: '5% ' }}
              >
                <CommonMainNews />
              </div>
              <div
                className="schedule"
                style={{ width: '100%', marginBottom: '5% ' }}
              >
                <ScheduleList />
              </div>
              <div
                className="menu"
                style={{ width: '100%', marginBottom: '5% ' }}
              >
                <MenuList />
              </div>
              <div
                className="invest"
                style={{ width: '100%', marginBottom: '5% ' }}
              >
                <PcInvestment />
              </div>
            </div>
          </>
        }
      />
    </>
  );
}
