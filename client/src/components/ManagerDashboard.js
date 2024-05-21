import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

const SideBox = styled.div`
  width: 100%;
  height: 100%;

  box-sizing: border-box;
`;

const MainDashboardBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  text-align: center;
  gap: 10px;
  margin-bottom: 15px;
  div {
    width: 160px;
    height: 110px;
    text-align: center;
    background-color: #f5f6fc;
    border-radius: 10px;
    padding: 20px 0;
    cursor: pointer;
    flex: 1;
    min-width: 100px;
  }
  img {
    width: 60px;
    height: 60px;
    margin-top: 5px;
  }
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0 0;
    font-weight: 700;
    font-size: 18px;
    width: 100%;
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
  .peopleListBox {
    background: #ddf6ff;
  }
  .scheduleBox {
    background: #eeffdd;
  }
`;

export function MainDashboard({ func }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleBank = () => {
    navigate(`/${id}/manager/bank`);
  };
  const handleInvestment = () => {
    navigate(`/${id}/manager/investment`);
  };
  const handleAssembly = () => {
    navigate(`/${id}/manager/assembly`);
  };
  const handleBoardPeople = () => {
    navigate(`/${id}/manager/boardPeople`);
  };
  const handleNews = () => {
    navigate(`/${id}/news`);
  };
  const handlePeopleList = () => {
    navigate(`/${id}/manager/peopleList`);
  };
  const handleSeat = () => {
    navigate(`/${id}/manager/seat`);
  };
  const handleTaxService = () => {
    navigate(`/${id}/manager/taxService`);
  };
  return (
    <>
      <SideBox>
        <div className="sideBox">
          <MainDashboardBox>
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
            {/* </MainDashboardBox>
          <MainDashboardBox> */}

            <div className="peopleListBox" onClick={handlePeopleList}>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-create-list.png`}
                alt="국민 리스트"
              />
              <p>국민 리스트</p>
            </div>
            <div className="assemblyBox" onClick={handleAssembly}>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-capitol.png`}
                alt="국회"
              />
              <p>국회</p>
            </div>
            {/* </MainDashboardBox>
          <MainDashboardBox> */}
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
            {/* </MainDashboardBox>
          <MainDashboardBox> */}
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
            {/* </MainDashboardBox>
          <MainDashboardBox> */}
            <div className="scheduleBox">
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-schedule.png`}
                alt="시간표"
              />
              <p>시간표</p>
            </div>
            <div style={{ visibility: 'hidden' }}>
              <img />
              <p></p>
            </div>
          </MainDashboardBox>
        </div>
      </SideBox>
    </>
  );
}
