//공통 메인페이지
import { useState, useEffect } from 'react';
import { CommonMainHeader } from '../components/Headers';
import { GetName } from '../components/MainProfile';
import CommonMainNews from '../components/CommonMainNews';
import Template from '../components/Template';
import MenuList from '../components/MenuList';
import ScheduleList from '../components/ScheduleList';
import PcInvestment from '../components/PcInvestment';
// import CommonMainNewsMoblie from '../components/CommonMainNewsMoblie';

import '../styles/common_main.scss';
import styled from 'styled-components';

const Container = styled.div`
  .block {
    width: 100%;
    margin-bottom: 5%;
  }
`;
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
const Block = styled.div`
  width: 50%;
  height: 30%;
`;

export function CommonMain() {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => setInnerWidth(window.innerWidth));
  }, []);
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
            <div className="mainContent">
              <CommonMainNews />
              <ScheduleList />
              <MenuList />
              <PcInvestment />
            </div>
          </>
        }
      />
    </>
  );
}
