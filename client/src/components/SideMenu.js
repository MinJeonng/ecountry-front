import styled from 'styled-components';
import { ReactComponent as IcoClose } from '../images/icon-close.svg';
import { useLocation, useNavigate } from 'react-router-dom';

const SideBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  min-width: 320px;
  width: 100%;
  height: 100%;
  z-index: 200;
  box-sizing: border-box;
  .btnClose {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 24px;
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
  const location = useLocation();
  return (
    <>
      {/* <ContainerBoard>
      <ManagerBoard>
        {position === '은행' && <SetBank />}
        {position === '투자' && <SetInvestment />}
      </ManagerBoard>
    </ContainerBoard> */}
      <SideBox>
        <IcoClose
          className="btnClose changeStroke"
          onClick={func}
          style={{ cursor: 'pointer' }}
        />
      </SideBox>
    </>
  );
}
