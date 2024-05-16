import { AddInvestment } from '../components/InvestmentManager';
import Template from '../components/Template';
import '../styles/background.scss';
import '../styles/_input_common.scss';
import '../styles/setting.scss';
import '../styles/_button_common.scss';

export default function SetInvestment({ position }) {
  return (
    <>
      <Template
        childrenBottom={<>{position === '투자 상품' && <AddInvestment />}</>}
      />
    </>
  );
}
