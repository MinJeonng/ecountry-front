import { Flex } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOnlyDate } from '../hooks/Functions';

export default function Revune() {
  //국고, 화폐단위,
  const { id } = useParams();
  const [selectedName, setSelectedName] = useState('');
  const [taxList, setTaxList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [treasury, setTreasury] = useState(0);
  const [unit, setUnit] = useState('');
  const [showList, setShowList] = useState([]);

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

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#093030',
            fontWeight: '500',
            borderRadius: '14px',
            padding: '5% 0',
            width: '100%',
            marginBottom: '10%',
            backgroundColor: '#e3ead5',
          }}
        >
          {/* 국고, 화폐단위 */}
          <p style={{ fontSize: '18px' }}>국고</p>
          <p style={{ fontSize: '16px' }}>
            {treasury} {unit}
          </p>
        </div>
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
            <div
              style={{
                width: '100%',
                backgroundColor: '#D9D9D9',
                marginBottom: '10px',
                borderRadius: '14px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                boxSizing: 'border-box',
                padding: '2%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                  width: '33.3%',
                  borderRight: '0.8px solid #888888',
                  boxSizing: 'border-box',
                  padding: '1%',
                  justifyContent: 'center',
                  height: '100%',
                }}
              >
                <span style={{ fontSize: '0.9rem' }}>
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
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                  width: '33.3%',
                  borderRight: '0.8px solid #888888',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <span
                  style={{
                    fontSize: '0.9rem',
                  }}
                >
                  {tax.memo}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                  width: '33.3%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <span style={{ width: '33.3%' }}>
                  {tax.transaction} {unit}
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* 여기까지 */}
      </div>
    </>
  );
}
