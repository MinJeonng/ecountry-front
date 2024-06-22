import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import '../styles/seat.scss';

import Template from '../components/Template';
import { PageHeader } from '../components/Headers';
import { ManagerHeader } from '../components/ManagerHeader';
import { ChatBotBtn, LoginBtn } from '../components/Btns';
import { authFunc, confirmCountry, getExpire } from '../hooks/Functions';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

// 자리배치도
export function StudentSeat() {
  const { id } = useParams();

  const [loginBtn, setLoginBtn] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [columns, setColumns] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [showStudentMap, setShowStudentMap] = useState(true);
  const [seatList, setSeatList] = useState([]);

  const userInfo = useSelector((state) => state.auth);

  const getSeat = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/seat/${id}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    });

    // console.log('Columns:', res.data.result);
    setColumns(res.data.result);
  };

  const getStatus = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/seat/status/${id}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    });
    // console.log(res);
    // console.log(res.data.result);
    setSeatList(res.data.result);
  };

  const getStudent = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/student/${id}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
        Authorization: `Bearer ${getExpire()}`,
      },
    });
    setStudentList(res.data.result);
  };

  const mountFunc = () => {
    getSeat();
    getStudent();
    getStatus();
    setIsShow(true);
  };

  useEffect(() => {
    if (authFunc()) {
      confirmCountry(id, userInfo, mountFunc, true);
    } else {
      setLoginBtn(true);
    }
  }, []);

  return (
    <>
      <ToastContainer />
      {loginBtn && <LoginBtn />}
      <ManagerHeader />
      {isShow && (
        <Template
          isAuthPage2={true}
          childrenTop={<PageHeader>{'자리 배치표'}</PageHeader>}
          childrenBottom={
            <div>
              <div className="pc-seat-top">
                <div className="seat-wrap ">
                  <ul className="title-list">
                    <li>교실 내의 자리 배치 현황입니다&#46;</li>
                  </ul>
                </div>
                <div className="seat-title">
                  <button
                    className={`seat-user ${showStudentMap ? 'active' : ''}`}
                    onClick={() => setShowStudentMap(true)}
                  >
                    사용자
                  </button>
                  <button
                    className={`seat-owner ${!showStudentMap ? 'active' : ''}`}
                    onClick={() => setShowStudentMap(false)}
                  >
                    소유자
                  </button>
                </div>

                <StudentSMap
                  columns={columns}
                  seatlist={seatList}
                  studentlist={studentList}
                  isuser={showStudentMap}
                />

                <ChatBotBtn />
              </div>
            </div>
          }
        />
      )}
    </>
  );
}

export function StudentSMap({ columns, seatlist, studentlist, isuser }) {
  const getId = (row, col) => {
    let result = '';
    if (seatlist?.length > 0) {
      seatlist.forEach((seat) => {
        if (seat.rowNum === row && seat.colNum === col) {
          if (isuser) {
            if (seat.studentId) {
              const student = studentlist.find(
                (student) => student.id === seat.studentId
              );
              result = student ? student.name : '';
            }
          } else {
            if (seat.ownerId) {
              const owner = studentlist.find(
                (student) => student.id === seat.ownerId
              );
              result = owner ? owner.name : '';
            }
          }
        }
      });
    }
    return result;
  };

  return (
    <div className="preview">
      {columns && columns.length > 0 ? (
        columns.map((column) => (
          <div className="seating-map" key={column.rowNum}>
            <div className="column-num">{column.rowNum}열</div>{' '}
            <div className="row-container">
              {Array.from({ length: column.colNum }).map((_, columnIndex) => (
                <div className="cell-input" key={columnIndex}>
                  {console.log(getId(column.rowNum, columnIndex + 1) || '')}
                  <div className="cell-value">
                    {getId(column.rowNum, columnIndex + 1) || ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="non-seat">새로운 자리 배치표를 기다리세요</div>
      )}
    </div>
  );
}
