import { AddInvestment } from '../components/InvestmentManager';
import { CheckInvestment } from '../components/Investment';
import Template from '../components/Template';

import '../styles/_input_common.scss';
import '../styles/setting.scss';
import '../styles/_button_common.scss';
import { PageHeader } from '../components/Headers';

export default function SetInvestment({ position }) {
  return (
    <>
      <Template
        childrenTop={
          <>
            <PageHeader>{position}</PageHeader>
          </>
        }
        childrenBottom={
          <>
            {position === '투자 상품 관리' && <AddInvestment />}
            {position === '투자 상품 확인' && <CheckInvestment />}
          </>
        }
      />
    </>
  );
}
