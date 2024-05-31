//공통 메인페이지
import { CommonMainHeader } from '../components/Headers';
import { GetName } from '../components/MainProfile';
import CommonMainNews from '../components/CommonMainNews';
import Template from '../components/Template';
import '../styles/common_main.scss';
import MenuList from '../components/MenuList';
import ScheduleList from '../components/ScheduleList';
import PcInvestment from '../components/PcInvestment';

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
