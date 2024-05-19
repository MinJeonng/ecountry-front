import { AddInvestment } from '../components/InvestmentManager';
import { CheckInvestment } from '../components/Investment';
import Template from '../components/Template';
import '../styles/background.scss';
import '../styles/_input_common.scss';
import '../styles/setting.scss';
import '../styles/_button_common.scss';

export default function SetInvestment({ position }) {
  return (
    <>
      <Template
        childrenTop={
          <>
            {position === '투자 상품 확인' && (
              <>
                <div
                  style={{
                    position: 'absolute',
                    top: '90px',
                    left: '30px',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon-back.png`}
                    style={{ width: '22%' }}
                  ></img>
                  <div style={{ fontSize: '17px' }}> 투자</div>
                </div>
              </>
            )}
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
