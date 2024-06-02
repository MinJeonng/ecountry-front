import { AddInvestment } from '../components/InvestmentManager';
import { CheckInvestment } from '../components/Investment';
import Template from '../components/Template';
import { PageHeader } from '../components/Headers';
import { ManagerHeader } from '../components/ManagerHeader';

import '../styles/_input_common.scss';
import '../styles/setting.scss';
import '../styles/_button_common.scss';

import { ChatBotBtn } from '../components/Btns';


export default function SetInvestment({ position }) {
  return (
    <>
      <ManagerHeader />
      <Template
        isAuthPage2={true}
        childrenTop={
          <>
            <PageHeader>{position}</PageHeader>
          </>
        }
        childrenBottom={
          <>
            {position === '투자 상품 관리' && <AddInvestment />}
            {position === '투자 상품 확인' && <CheckInvestment />}
            <ChatBotBtn />
          </>
        }
      />
    </>
  );
}
