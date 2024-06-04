import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import '../styles/seat.scss';

import Template from '../components/Template';
import SeatMap from '../components/SeatMap';
import StudentSeatMap from '../components/StudentSeatMap';
import { PageHeader } from '../components/Headers';
import { ManagerHeader } from '../components/ManagerHeader';
import { ChatBotBtn } from '../components/Btns';
import { getExpire } from '../hooks/Functions';

// 자리배치도
export function SetSeat() {
  const { id } = useParams();

  const [columns, setColumns] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [showStudentMap, setShowStudentMap] = useState(true);
  const [isSeatMapVisible, setIsSeatMapVisible] = useState(false);
  const [seatList, setSeatList] = useState([]);

  const getSeat = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/seat/${id}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    });

    console.log('Columns:', res.data.result);
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
    console.log(res);
    console.log(res.data.result);
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

  const changeList = async (row, col, studentId) => {
    let isExist = false;
    let data = [];

    seatList?.map((seat) => {
      if (seat.rowNum == row && seat.colNum == col) {
        isExist = true;
        if (showStudentMap) {
          console.log('사용자');
          data = [
            {
              id: seat.id,
              ownerId: seat.ownerId,
              studentId: studentId,
              rowNum: row,
              colNum: col,
            },
          ];
        } else {
          console.log('소유자');
          data = [
            {
              id: seat.id,
              ownerId: studentId,
              studentId: seat.studentId,
              rowNum: row,
              colNum: col,
            },
          ];
        }
      }
    });
    if (!isExist) {
      if (showStudentMap) {
        console.log('소유자');
        data = [
          {
            ownerId: null,
            studentId: studentId,
            rowNum: row,
            colNum: col,
            countryId: id,
          },
        ];
      } else {
        console.log('사용자');
        data = [
          {
            ownerId: studentId,
            studentId: null,
            rowNum: row,
            colNum: col,
            countryId: id,
          },
        ];
      }
      console.log(data);
      const res = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_HOST}/api/seat/status`,
        data,
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
        },
      });
      console.log(res.data);
    } else {
      console.log(data);
      const res = await axios({
        method: 'PATCH',
        url: `${process.env.REACT_APP_HOST}/api/seat/status`,
        data,
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
        },
      });
      console.log(res.data);
    }
    getStatus();
  };

  const toggleEdit = () => {
    setIsSeatMapVisible(!isSeatMapVisible);
  };

  useEffect(() => {
    console.log(seatList);
  }, [seatList]);

  useEffect(() => {
    getSeat();
    getStudent();
    getStatus();
  }, []);

  return (
    <>
      <ManagerHeader />
      <Template
        isAuthPage2={true}
        childrenTop={<PageHeader>{'자리 배치표'}</PageHeader>}
        childrenBottom={
          <div>
            <div className="pc-seat-top">
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

              <StudentSeatMap
                columns={columns}
                seatlist={seatList}
                changelist={changeList}
                studentlist={studentList}
                isuser={showStudentMap}
              />

              <button className="blue-btn" onClick={toggleEdit}>
                자리 배치 수정
              </button>
              {isSeatMapVisible && (
                <div className="seat-map-container">
                  {/* 배치표 추가 */}
                  <SeatMap columns={columns} />
                </div>
              )}
              <ChatBotBtn />
            </div>
          </div>
        }
      />
    </>
  );
}
