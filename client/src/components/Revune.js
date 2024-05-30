import { Flex } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
`;

export default function Revune() {
  //국고, 화폐단위,
  const { id } = useParams();
  const [selectedName, setSelectedName] = useState('');
  const [taxList, setTaxList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [treasury, setTreasury] = useState(0);
  const [unit, setUnit] = useState('');
  const [showList, setShowList] = useState([]);

  const [displayedValue, setDisplayedValue] = useState(0);

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
    console.log(res.data.result);
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
    console.log(res.data.result);
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

  useEffect(() => {
    // 학생 검색 기능
    // selectedName과 withdrawId가 일치하는 데이터만 showData에 담기
    if (selectedName) {
      console.log(selectedName);
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
    getTreasury();
    getStudent();
    getTax();
  }, []);
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

  return (
    <>
      <TreasuryBox>
        {/* 국고, 화폐단위 */}
        <p style={{ fontSize: '15px' }}>국고</p>
        <div className="pList">
          <p style={{ fontSize: '35px', fontWeight: 'bold' }}>
            {displayedValue}
          </p>
          <p style={{ fontSize: '16px', paddingTop: '13px' }}>{unit}</p>
        </div>
      </TreasuryBox>
      <div
        style={{
          width: '100%',
          minHeight: '150px',
          border: '1px solid #B9C0BE',
          borderRadius: '9px',
          padding: '5%',
          boxSizing: 'border-box',
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
    </>
  );
}
