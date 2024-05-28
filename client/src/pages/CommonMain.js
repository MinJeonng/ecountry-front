//공통 메인페이지
import { CommonMainHeader } from '../components/Headers';
import { AddJobSkills, GetName } from '../components/MainProfile';
import CommonMainNews from '../components/CommonMainNews';
import Template from '../components/Template';
import '../styles/common_main.scss';
import MenuList from '../components/MenuList';
import ScheduleList from '../components/ScheduleList';

export function CommonMain() {
  return (
    <>
      <Template
        childrenTop={
          <>
            <CommonMainHeader />
            <div className="mainProfile">
              <GetName />
              {/* <AddJobSkills /> */}
            </div>
          </>
        }
        childrenBottom={
          <>
            <div className="mainContent">
              <CommonMainNews />
              <ScheduleList />
              <MenuList />
            </div>
          </>
        }
      />
    </>
  );
}
