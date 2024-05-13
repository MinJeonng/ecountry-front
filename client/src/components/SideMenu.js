import styled from 'styled-components';
import { ReactComponent as IcoClose } from '../images/icon-close.svg';
import { useNavigate } from 'react-router-dom';

const SideBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  min-width: 320px;
  width: 100%;
  height: 100%;
  z-index: 200;
  box-sizing: border-box;
  background: #fff;
  .btnClose {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 24px;
    /* z-index: 100; */
  }
  img {
    width: 20px;
  }
  .bankBox {
    width: 50px;
    height: 50px;
    background-color: #f5f6fc;
    border-radius: 5px;
  }
  .blogIcons {
    padding: 15px 20px;
    border-bottom: 1px solid #eaf1ea;
    box-sizing: border-box;
    @media (min-width: 1160px) {
      display: flex;
      align-items: center;
    }
    svg {
      margin-right: 10px;
    }
    .iconBox {
      display: flex;
      width: 100%;
      box-sizing: border-box;
      padding-left: 4px;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

export function SideMenuComponent({ func }) {
  return (
    <>
      {/* <ContainerBoard>
      <ManagerBoard>
        {position === '은행' && <SetBank />}
        {position === '투자' && <SetInvestment />}
      </ManagerBoard>
    </ContainerBoard> */}
      <SideBox>
        <div className="sideBox">
          {/* 닫기버튼 문제해결하기 */}
          <IcoClose
            className="btnClose changeStroke"
            onClick={func}
            style={{ cursor: 'pointer' }}
          />
          <div className="bankBox">
            <img src={`${process.env.PUBLIC_URL}/images/icon-bank.png`} />
          </div>
        </div>
      </SideBox>
    </>
  );
}
