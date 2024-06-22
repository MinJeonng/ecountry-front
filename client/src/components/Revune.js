import { Flex } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getOnlyDate } from '../hooks/Functions';
import styled from 'styled-components';

const FineList = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
  .infoList {
    display: flex;
    justify-content: space-evenly;
    border-radius: 10px;
    background: #e2e8ae;
    padding: 11px;
    margin-bottom: 15px;
    span {
      text-align: center;
      font-size: 0.9rem;
      font-weight: bold;
      color: #666666;
    }
    img {
      width: 20px;
      height: 40px;
      align-items: center;
      display: flex;
    }
    .spanList {
      display: flex;
      flex-direction: column;
    }
    .taxSpan {
      padding-top: 6px;
    }
  }
`;

const TreasuryBox = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  color: #093030;
  font-weight: 500;
  border-radius: 14px;
  width: 100%;
  margin-bottom: 15px;
  padding: 0 10px;
  box-sizing: border-box;
  /* background: #e3ead5; */
  .treasuryBox {
    .pList {
      display: flex;
      gap: 4px;
      align-items: baseline;
    }
  }
  .revenueList {
    cursor: pointer;
    &::after {
      content: '';
      display: inline-block;
      width: 10px;
      height: 10px;
      border-left: 2px solid #999;
      border-bottom: 2px solid #999;
      transform: rotate(-45deg);
      position: relative;
      left: 10px;
      top: -2px;
      transition: all 0.3s ease-in-out;
    }
    &.open::after {
      transform: rotate(-225deg);
      top: 4px;
    }
  }
`;
const TreasuryBoxTwo = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  color: #093030;
  font-weight: 500;
  border-radius: 14px;
  width: 100%;
  margin-bottom: 10%;
  padding-left: 10px;
  /* background: #e3ead5; */
  .pList {
    display: flex;
    gap: 4px;
    align-items: center;
    height: 20px;
  }
  span {
    margin-bottom: 10px;
  }
  @media (min-width: 1160px) {
    padding-left: 0;
  }
`;
const TaxLawBox = styled.div`
  position: relative;
  max-height: 0;
  overflow: hidden;
  transition: all 0.4s ease-in-out;
  .taxLawBox {
    display: block;
    padding: 10px 0;
    border-top: 1px solid #ddd;
    .division {
      text-align: center;
      margin-bottom: 10px;
    }
    .taxLaw {
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      border: 1px solid #75a47f;
      border-radius: 10px;
      margin-bottom: 15px;
      .money {
        font-weight: 700;
      }
    }
  }
  &.open {
    max-height: 1000px;
    .taxLawBox {
    }
  }
`;
export default function Revune() {
  //국고, 화폐단위,
  const { id } = useParams();
  const location = useLocation();
  const [selectedName, setSelectedName] = useState('');
  const [taxList, setTaxList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [treasury, setTreasury] = useState(0);
  const [unit, setUnit] = useState('');
  const [showList, setShowList] = useState([]);
  const [taxLaw, setTaxLaw] = useState([]);

  const [displayedValue, setDisplayedValue] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const shouldRender =
    innerWidth <= 1160 ||
    (innerWidth > 1160 && location.pathname === `/${id}/revenue`);

  const nameSelect = (e) => {
    setSelectedName(e.target.value);
  };

  const getStudent = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/bank/students/${id}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    });
    setStudentList(res.data.result);
    // console.log(res.data.result);
  };

  const getTax = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/tax/penalty/${id}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    });
    // console.log(res.data.result);
    setTaxList(res.data.result);
    setShowList(res.data.result);
  };

  const getTreasury = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/tax/treasury/${id}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    });
    setTreasury(res.data.result.treasury);
    const res2 = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/bank/unit/${id}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    });
    setUnit(res2.data.result.unit);
  };

  //세법리스트 보여주기
  const getTaxLaw = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/tax/${id}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    });
    // console.log(res.data.result);
    setTaxLaw(res.data.result);
  };

  useEffect(() => {
    // 학생 검색 기능
    // selectedName과 withdrawId가 일치하는 데이터만 showData에 담기
    if (selectedName) {
      // console.log(selectedName);
      const newList = [];
      taxList.forEach((tax) => {
        if (tax.withdrawId == selectedName) {
          newList.push(tax);
        }
      });
      setShowList(newList);
    } else {
      setShowList([...taxList]);
    }
  }, [selectedName]);

  useEffect(() => {
    const duration = 666;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const value = Math.floor(progress * treasury);

      setDisplayedValue(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [treasury]);

  useEffect(() => {
    getTreasury();
    getStudent();
    getTax();
    getTaxLaw();
  }, []);

  useEffect(() => {
    window.addEventListener(`resize`, () => setInnerWidth(window.innerWidth));
    return () =>
      window.removeEventListener(`resize`, () =>
        setInnerWidth(window.innerWidth)
      );
  }, []);

  return (
    <>
      {shouldRender && (
        <>
          <div className="pc-wrap">
            <TreasuryBox>
              {/* 국고, 화폐단위 */}
              <div className="treasuryBox">
                <p style={{ fontSize: '15px', margin: '0 0 4px 0' }}>국고</p>
                <div className="pList">
                  <p
                    style={{
                      fontSize: '35px',
                      fontWeight: 'bold',
                      margin: 0,
                      lineHeight: 1,
                    }}
                  >
                    {displayedValue}
                  </p>
                  <p
                    style={{ fontSize: '16px', margin: 0, paddingTop: '13px' }}
                  >
                    {unit}
                  </p>
                </div>
              </div>
              <div
                className={`revenueList ${isOpen ? 'open' : 'close'}`}
                onClick={() => setIsOpen(!isOpen)}
              >
                세법 확인하기
              </div>
            </TreasuryBox>
            <TaxLawBox className={isOpen ? 'open' : 'close'}>
              <div className="taxLawBox">
                <div className="division">매달 부과</div>
                {taxLaw?.map((data) => {
                  if (data.division < 3) {
                    return (
                      <div className="taxLaw">
                        <p>{data.name}</p>
                        <p>
                          <span className="money">{data.tax}</span>
                          {unit}
                        </p>
                      </div>
                    );
                  }
                })}
              </div>
              <div className="taxLawBox">
                <div className="division">과태료</div>
                {taxLaw?.map((data) => {
                  if (data.division === 3) {
                    return (
                      <div className="taxLaw">
                        <p>{data.name}</p>
                        <p>
                          <span className="money">{data.tax}</span>
                          {unit}
                        </p>
                      </div>
                    );
                  }
                })}
              </div>
            </TaxLawBox>
            <div
              style={{
                width: '100%',
                minHeight: '150px',
                border: '1px solid #B9C0BE',
                borderRadius: '9px',
                padding: '5%',
                boxSizing: 'border-box',
                overflowX: 'hidden',
                overflowY: 'scroll',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ fontSize: '17px' }}>과태료</span>
                {/* 학생 리스트 */}
                <div
                  style={{
                    width: '100px',
                  }}
                >
                  <select
                    style={{
                      width: '100px',
                      padding: '0 5%',
                      border: '0.5px solid #999999',
                      borderRadius: '7px',
                      fontSize: '12px',
                      height: '27px',
                      color: '#777777',
                    }}
                    id="name"
                    value={selectedName}
                    onChange={nameSelect}
                  >
                    <option value="" selected>
                      전체 보기
                    </option>
                    {studentList.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name}({student.rollNumber})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div
                style={{
                  width: '100%',
                  borderBottom: '1px solid #777777',
                  marginTop: '5px',
                  marginBottom: '6%',
                }}
              ></div>
              {/* 여기서부터 과태료 리스트 */}
              {showList.map((tax) => (
                <>
                  <FineList>
                    <div className="infoList">
                      <div className="spanList">
                        <span>
                          {studentList.map((student) =>
                            student.id === tax.withdrawId
                              ? `${student.name}(${student.rollNumber})`
                              : null
                          )}
                        </span>
                        <span style={{ fontSize: '0.7rem' }}>
                          {getOnlyDate(tax.createdAt)}
                        </span>
                      </div>
                      <img
                        src={`${process.env.PUBLIC_URL}/images/icon-line.png`}
                        alt="구분선"
                      />
                      <span className="taxSpan">{tax.memo}</span>
                      <img
                        src={`${process.env.PUBLIC_URL}/images/icon-line.png`}
                        alt="구분선"
                      />
                      <span className="taxSpan">
                        {tax.transaction} {unit}
                      </span>
                    </div>
                  </FineList>
                </>
              ))}
            </div>
          </div>
        </>
      )}
      {innerWidth >= 1160 && location.pathname === `/${id}/manager` && (
        <>
          <TreasuryBoxTwo>
            {/* 국고, 화폐단위 */}
            <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>국고</span>
            <div
              className="pList"
              style={{
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <p
                style={{
                  fontSize: '35px',
                  fontWeight: 'bold',
                  paddingRight: '5px',
                }}
              >
                {displayedValue}
              </p>
              <p style={{ fontSize: '16px', paddingTop: '12px' }}>{unit}</p>
            </div>
          </TreasuryBoxTwo>
        </>
      )}
    </>
  );
}
