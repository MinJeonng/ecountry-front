import styled from 'styled-components';
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

  background: #f8f5f5;
  .btnClose {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 24px;
    /* z-index: 100; */
  }

  .sideBox {
    margin: 50px;
  }
`;

const SideMenuContainer = styled.div`
  display: flex;
  justify-content: space-around;
  /* margin: 80px 80px 20px 80px; */
  margin: 20px;

  div {
    width: 120px;
    height: 120px;
    background-color: #f5f6fc;
    border-radius: 10px;
    padding: 10px;
    margin-right: 4px;
  }
  img {
    width: 50px;
    height: 50px;
  }
  p {
    display: flex;
    justify-content: flex-start;
    margin: 20px 0 0 8px;
    font-weight: 700;
    font-size: 18px;
  }
  .bankBox {
    background: #ffdddd;
  }
  .investmentBox {
    background: #fff6dd;
  }
  .taxServiceBox {
    background: #ddeecc;
  }
  .assemblyBox {
    background: #ddeeff;
  }
  .newsBox {
    background: #fff6dd;
  }
  .boardPeopleBox {
    background: #e8e8f7;
  }
  .seatBox {
    background: #ffffdd;
  }
  .menuBox {
    background: #f6ddff;
  }
  .scheduleBox {
    background: #eeffdd;
  }
  .peopleListBox {
    background: #ddf6ff;
  }
`;

export function SideMenuComponent({ func }) {
  const navigate = useNavigate();
  const handleBank = () => {
    navigate('/manager/bank');
  };
  const handleInvestment = () => {
    navigate('/manager/investment');
  };
  const handleAssembly = () => {
    navigate('/manager/assembly');
  };
  const handleBoardPeople = () => {
    navigate('/manager/boardPeople');
  };
  const handleNews = () => {
    navigate('/manager/news');
  };
  const handlePeopleList = () => {
    navigate('/manager/peopleList');
  };
  const handleSeat = () => {
    navigate('/manager/seat');
  };
  const handleTaxService = () => {
    navigate('/manager/taxService');
  };
  return (
    <>
      <SideBox>
        {/* 나중에 div에 색 넣기 */}
        <img
          src={`${process.env.PUBLIC_URL}/images/icon-close.png`}
          className="btnClose changeStroke"
          onClick={func}
          style={{ cursor: 'pointer' }}
          alt="닫기"
        />
        <div className="sideBox">
          <SideMenuContainer>
            <div className="bankBox" onClick={handleBank}>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-bank.png`}
                alt="은행"
              />
              <p>은행</p>
            </div>
            <div className="investmentBox" onClick={handleInvestment}>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-investmentPng.png`}
                alt="투자"
              />
              <p>투자</p>
            </div>
          </SideMenuContainer>
          <SideMenuContainer>
            <div className="taxServiceBox" onClick={handleTaxService}>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-tax.png`}
                alt="국세청"
              />
              <p>국세청</p>
            </div>
            <div className="assemblyBox" onClick={handleAssembly}>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-capitol.png`}
                alt="국회"
              />
              <p>국회</p>
            </div>
          </SideMenuContainer>
          <SideMenuContainer>
            <div className="newsBox" onClick={handleNews}>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-news.png`}
                alt="뉴스"
              />
              <p>뉴스</p>
            </div>
            <div className="boardPeopleBox" onClick={handleBoardPeople}>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-board.png`}
                alt="국민 신문고"
              />
              <p>국민 신문고</p>
            </div>
          </SideMenuContainer>
          <SideMenuContainer>
            <div className="seatBox" onClick={handleSeat}>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-seat.png`}
                alt="자리 배치도"
              />
              <p>자리 배치도</p>
            </div>
            <div className="menuBox">
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-menu.png`}
                alt="급식표"
              />
              <p>급식표</p>
            </div>
          </SideMenuContainer>
          <SideMenuContainer>
            <div className="scheduleBox">
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-schedule.png`}
                alt="시간표"
              />
              <p>시간표</p>
            </div>
            <div className="peopleListBox" onClick={handlePeopleList}>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-create-list.png`}
                alt="국민 리스트"
              />
              <p>국민 리스트</p>
            </div>
          </SideMenuContainer>
        </div>
      </SideBox>
    </>
  );
}
