import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import '../styles/seat.scss';

import Template from '../components/Template';
import SeatMap from '../components/SeatMap';
import StudentSeatMap from '../components/StudentSeatMap';
import { PageHeader } from '../components/Headers';

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
    setSeatList(res.data.result);
  };

  const getStudent = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/student/${id}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    setStudentList(res.data.result);
  };

  const changeList = async (row, col, studentId) => {
    let isExist = false;
    let data = [];
    
      seatList.map((seat) => {
        if (seat.rowNum == row && seat.colNum == col) {
          isExist = true;
          if (showStudentMap) {
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
      const res = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_HOST}/api/seat/status`,
        data,
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
        },
      });
    } else {
      const res = await axios({
        method: 'PATCH',
        url: `${process.env.REACT_APP_HOST}/api/seat/status`,
        data,
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
        },
      });
    }
    getStatus();
  };

  const toggleEdit = () => {
    setIsSeatMapVisible(!isSeatMapVisible);
  };

  useEffect(() => {
    getSeat();
    getStudent();
    getStatus();
  }, []);

  return (
    <Template
      childrenTop={<PageHeader>{'자리 배치표'}</PageHeader>}
      childrenBottom={
        <>
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
        </>
      }
    />
  );
}
