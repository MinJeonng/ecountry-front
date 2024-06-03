import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
    text-align: center;

    border-radius: 10px;
    padding: 20px 0;
    cursor: pointer;
    flex: 1;
    min-width: 120px;
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

  .blueBox {
    background: #e9f2f3;
    box-shadow: 1px 2px #e5f3f5;
  }
  .skyblueBox {
    background: #e9f2f3;
    box-shadow: 1px 2px #e5f3f5;
  }
`;

export function MainDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => setInnerWidth(window.innerWidth));
  }, []);

  return (
    <>
      {innerWidth <= 1100 ? (
        <>
          <SideBox>
            <div className="sideBox">
              <MainDashboardBox>
                <div
                  className="skyblueBox"
                  onClick={() => navigate(`/${id}/manager/bank`)}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon-bank-color.png`}
                    alt="은행"
                  />
                  <p>은행</p>
                </div>
                <div
                  className="blueBox"
                  onClick={() => navigate(`/${id}/manager/investment`)}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon-investment-color.png`}
                    alt="투자"
                  />
                  <p>투자</p>
                </div>

                <div
                  className="skyblueBox"
                  onClick={() => navigate(`/${id}/manager/peopleList`)}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon-board-color.png`}
                    alt="국민 리스트"
                  />
                  <p>국민 리스트</p>
                </div>
                <div
                  className="blueBox"
                  onClick={() => navigate(`/${id}/manager/assembly`)}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon-assembly-color.png`}
                    alt="국회"
                  />
                  <p>국회</p>
                </div>
                <div
                  className="skyblueBox"
                  onClick={() => navigate(`/${id}/manager/jobList`)}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon-user-color.png`}
                    alt="직업설정"
                  />
                  <p>직업 설정</p>
                </div>

                <div
                  className="blueBox"
                  onClick={() => navigate(`/${id}/manager/seatMap`)}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon-seats-color.png`}
                    alt="자리 배치도"
                  />
                  <p>자리 배치도</p>
                </div>

                <div
                  className="skyblueBox"
                  onClick={() => navigate(`/${id}/manager/taxLawList`)}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon-tax-color.png`}
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
      ) : (
        //pc버전임 여기 수정하기
        <>
          <SideBox>
            <div className="sideBox"></div>
          </SideBox>
        </>
      )}
    </>
  );
}
