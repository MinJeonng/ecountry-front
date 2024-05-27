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
    /* width: 160px; */
    flex: 1 1 160px;
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
  .jobListBox {
    background: #e8e8f7;
  }
`;

export function MainDashboard({ func }) {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <SideBox>
        <div className="sideBox">
          <MainDashboardBox>
            <div
              className="bankBox"
              onClick={() => navigate(`/${id}/manager/bank`)}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-bank.png`}
                alt="은행"
              />
              <p>은행</p>
            </div>
            <div
              className="investmentBox"
              onClick={() => navigate(`/${id}/manager/investment`)}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-investmentPng.png`}
                alt="투자"
              />
              <p>투자</p>
            </div>

            <div
              className="peopleListBox"
              onClick={() => navigate(`/${id}/manager/peopleList`)}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-create-list.png`}
                alt="국민 리스트"
              />
              <p>국민 리스트</p>
            </div>
            <div
              className="assemblyBox"
              onClick={() => navigate(`/${id}/manager/assembly`)}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-capitol.png`}
                alt="국회"
              />
              <p>국회</p>
            </div>
            <div
              className="jobListBox"
              onClick={() => navigate(`/${id}/manager/jobList`)}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-job.png`}
                alt="직업설정"
              />
              <p>직업 설정</p>
            </div>

            <div className="newsBox" onClick={() => navigate(`/${id}/news`)}>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-news.png`}
                alt="뉴스"
              />
              <p>뉴스</p>
            </div>
            <div
              className="boardPeopleBox"
              onClick={() => navigate(`/${id}/boardPeople`)}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-board.png`}
                alt="국민 신문고"
              />
              <p>국민 신문고</p>
            </div>

            <div
              className="seatBox"
              onClick={() => navigate(`/${id}/manager/seatMap`)}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-seat.png`}
                alt="자리 배치도"
              />
              <p>자리 배치도</p>
            </div>

            <div
              className="seatBox"
              onClick={() => navigate(`/${id}/manager/taxLawList`)}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-seat.png`}
                alt="세법 관리"
              />
              <p>세법 관리</p>
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
