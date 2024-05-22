import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import '../styles/seat.scss';

import Template from '../components/Template';
import SeatMap from '../components/SeatMap';
import StudentSeatMap from '../components/StudentSeatMap';
import OwnerSeatMap from './OwnerSeatMap';

// 자리배치도
export function SetSeat() {
  const { id } = useParams();

  const [columns, setColumns] = useState([]);
  const [studentsTableRows, setStudentsTableRows] = useState([]);
  const [ownersTableRows, setOwnersTableRows] = useState([]);

  const [studentList, setStudentList] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [showStudentMap, setShowStudentMap] = useState(true);
  const [isSeatMapVisible, setIsSeatMapVisible] = useState(false);

  const setSeatStatus = (columnId, rowIndex, studentId, isOwner) => {
    const newSeat = {
      colNum: columnId,
      rowNum: rowIndex,
      studentId: studentId,
      isOwner: isOwner, // 소유하고 있으면 true, 소유하지 않았으면 false
    };

    if (isOwner) {
      setOwnersTableRows((prevRows) => {
        return [
          ...prevRows.filter(
            (seat) => !(seat.colNum === columnId && seat.rowNum === rowIndex)
          ),
          newSeat,
        ].sort((a, b) => a.colNum - b.colNum);
      });
    } else {
      setStudentsTableRows((prevRows) => {
        return [
          ...prevRows.filter(
            (seat) => !(seat.colNum === columnId && seat.rowNum === rowIndex)
          ),
          newSeat,
        ].sort((a, b) => a.colNum - b.colNum);
      });
    }

    setIsEditing(true);
  };

  // const getSeat = async () => {
  //   const fakeColumns = [
  //     { columnId: 1, label: '1열', rowCount: 2 },
  //     { columnId: 2, label: '2열', rowCount: 1 },
  //     { columnId: 3, label: '3열', rowCount: 3 },
  //   ];

  //   setColumns(fakeColumns);
  // };

  const getSeat = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/seat/${id}`,
    });

    console.log('Columns:', res.data.result);
    setColumns(res.data.result);
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
    console.log('Students:', res.data.result);
    setStudentList(res.data.result);
  };

  const updateSeat = () => {
    // 학생들의 자리 정보와 소유주들의 자리 정보
    const finalSeatRows = [...studentsTableRows, ...ownersTableRows];

    // 중복된 항목 제거
    const uniqueSeatRows = finalSeatRows.filter((seat, index, self) => {
      const isUnique =
        self.findIndex(
          (s) =>
            s.colNum === seat.colNum &&
            s.rowNum === seat.rowNum &&
            s.studentId === seat.studentId
        ) === index;
      return isUnique;
    });

    uniqueSeatRows.sort((a, b) => {
      if (a.colNum !== b.colNum) {
        return a.colNum - b.colNum;
      }

      return a.rowNum - b.rowNum;
    });

    // 최종 배열 출력
    console.log('최종 배열:', uniqueSeatRows);

    setIsEditing(false);
    setIsSeatMapVisible(false);
  };

  const selectChangeUser = (columnId, rowIndex) => (e) => {
    const studentId = parseInt(e.target.value);
    const isOwner = false;
    setSeatStatus(columnId, rowIndex, studentId, isOwner);
  };

  const selectChangeOwner = (columnId, rowIndex) => (e) => {
    const studentId = parseInt(e.target.value);
    const isOwner = true;
    setSeatStatus(columnId, rowIndex, studentId, isOwner);
  };

  const toggleEdit = () => {
    setIsSeatMapVisible(!isSeatMapVisible);
  };

  const deleteAll = () => {
    setColumns([]);
    setIsSeatMapVisible(false);
  };

  useEffect(() => {
    getSeat();
    getStudent();
  }, []);

  return (
    <Template
      childrenTop={<div className="top-title">자리 배치표</div>}
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

          {showStudentMap ? (
            // 사용자
            <StudentSeatMap
              columns={columns}
              studentTableRows={studentsTableRows}
              selectChangeUser={selectChangeUser}
              studentList={studentList}
            />
          ) : (
            // 소유자
            <OwnerSeatMap
              columns={columns}
              ownerTableRows={ownersTableRows}
              selectChangeOwner={selectChangeOwner}
              studentList={studentList}
            />
          )}
          {isEditing && (
            <button className="blue-btn" onClick={updateSeat}>
              완료
            </button>
          )}

          <button className="blue-btn" onClick={toggleEdit}>
            수정
          </button>
          {isSeatMapVisible && (
            <div className="seat-map-container">
              <button className="blue-btn" onClick={deleteAll}>
                삭제
              </button>
              {/* 배치표 추가 */}
              <SeatMap columns={columns} />
            </div>
          )}
        </>
      }
    />
  );
}
