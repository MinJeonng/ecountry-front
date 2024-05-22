import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

const SideMenuBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #f8f5f5;
  z-index: 100;
  overflow: scroll;
  .btnClose {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 24px;
  }
  .sideBox {
    margin: 70px 20px 0 20px;
  }
`;

const DashboardBox = styled.div`
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
  .scheduleBox {
    background: #eeffdd;
  }
  .peopleListBox {
    background: #ddf6ff;
  }
  .taxService {
    background: #ddf6;
  }
  .mypage {
    background: #eeffdd;
  }
`;

export function SideMenuComponent({ func }) {
  //여기에 링크는 다 다시해야함
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <SideMenuBox>
        <div className="sideBox">
          <img
            src={`${process.env.PUBLIC_URL}/images/icon-close.png`}
            className="btnClose changeStroke"
            onClick={func}
            style={{ cursor: 'pointer' }}
            alt="닫기"
          />
          <DashboardBox>
            <div className="bankBox" onClick={() => navigate(``)}>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-bank.png`}
                alt="은행"
              />
              <p>은행</p>
            </div>
            <div className="investmentBox" onClick={() => navigate(``)}>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-investmentPng.png`}
                alt="투자"
              />
              <p>투자</p>
            </div>

            <div className="peopleListBox" onClick={() => navigate(``)}>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-create-list.png`}
                alt="국민 리스트"
              />
              <p>국민 리스트</p>
            </div>
            <div className="assemblyBox" onClick={() => navigate(``)}>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-capitol.png`}
                alt="국회"
              />
              <p>국회</p>
            </div>

            <div className="newsBox" onClick={() => navigate(``)}>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-news.png`}
                alt="뉴스"
              />
              <p>뉴스</p>
            </div>
            <div className="boardPeopleBox" onClick={() => navigate(``)}>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-board.png`}
                alt="국민 신문고"
              />
              <p>국민 신문고</p>
            </div>

            <div className="seatBox" onClick={() => navigate(``)}>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-seat.png`}
                alt="자리 배치도"
              />
              <p>자리 배치도</p>
            </div>
            <div className="taxService" onClick={() => navigate(``)}>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-tax.png`}
                alt="국세청"
              />
              <p>국세청</p>
            </div>
            {/* <div className="scheduleBox">
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-schedule.png`}
                alt="시간표"
              />
              <p>시간표</p>
            </div> */}
            <div className="mypage" onClick={navigate(`/${id}/mypage`)}>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-user.png`}
                alt="마이페이지"
              />
              <p>마이페이지</p>
            </div>
            <div style={{ visibility: 'hidden' }}>
              <img />
              <p></p>
            </div>
          </DashboardBox>
        </div>
      </SideMenuBox>
    </>
  );
}
