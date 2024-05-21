import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Template from '../components/Template';
import '../styles/seat.scss';
import SeatMap from '../components/SeatMap';

// 자리배치도
export function SetSeat() {
  const { id } = useParams();

  // 열과 행의 정보를 담는 state
  const [columns, setColumns] = useState([
    { columnId: 1, label: '1열', rowCount: 5 },
    { columnId: 2, label: '2열', rowCount: 4 },
    { columnId: 3, label: '3열', rowCount: 6 },
  ]);

  const [tableRows, setTableRows] = useState([]);

  const [studentList, setStudentList] = useState([]);

  const setSeatStatus = (rowNum, colNum, studentId) => {
    setTableRows([
      ...tableRows,
      {
        rowNum: rowNum,
        colNum: colNum,
        studentId: studentId,
        isOwner: true,
      },
    ]);
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

  const getSeat = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/seat/${id}`,
    });

    console.log('Columns:', res.data.result);
    setColumns(res.data.result);
  };

  const [editType, setEditType] = useState('student');
  const [isEditing, setIsEditing] = useState(false);
  const [isSeatMapVisible, setIsSeatMapVisible] = useState(false);

  // 편집 함수
  const edit = (columnId, event, type) => {
    const newValue = event.target.value;
    const updatedColumns = columns.map((column) => {
      if (column.columnId === columnId) {
        // 현재 열을 찾은 후
        return {
          ...column,
          rowCount: type === 'rowCount' ? newValue : column.rowCount,
        };
      }
      return column;
    });
    setColumns(updatedColumns);
    setIsEditing(true);
  };

  const focus = () => {
    setIsEditing(true);
  };

  // 사용자 버튼 클릭 시
  const userClick = () => {
    setEditType('student');
  };

  // 소유주 버튼 클릭 시
  const ownerClick = () => {
    setEditType('owner');
  };

  // 자리 정보 업데이트 함수
  const updateSeat = () => {
    console.log('수정된 값:', columns);
    setIsEditing(false); // 편집 상태를 종료
  };

  useEffect(() => {
    getSeat();
    getStudent();
  }, []);

  const toggleSeatMap = () => {
    setIsSeatMapVisible(!isSeatMapVisible);
  };

  const deleteAll = () => {
    setColumns([]);
    setIsSeatMapVisible(false);
  };

  const getStudentName = (studentId) => {
    const student = studentList.find((student) => student.id === studentId);
    return student ? student.name : '';
  };

  const getOwnerName = (ownerId) => {
    const owner = studentList.find((student) => student.id === ownerId);
    return owner ? owner.name : '';
  };

  return (
    <Template
      childrenTop={<div className="top-title">자리 배치표</div>}
      childrenBottom={
        <div>
          <div className="seat-title">
            <button className="seat-user" onClick={userClick}>
              사용자
            </button>
            <button className="seat-owner" onClick={ownerClick}>
              소유주
            </button>
          </div>
          <form className="preview">
            {columns &&
              columns.length > 0 &&
              columns
                .reduce((uniqueColumns, column) => {
                  if (!uniqueColumns.includes(column.columnId)) {
                    uniqueColumns.push(column.columnId);
                  }
                  return uniqueColumns;
                }, [])
                .map((columnId, index) => (
                  <div className="seating-map" key={index}>
                    <div className="column-num">{columnId}열</div>
                    <div className="row-container">
                      {columns
                        .filter((column) => column.columnId === columnId)
                        .map((row, rowIndex) => (
                          <div key={rowIndex} className="cell-container">
                            <select
                              className="cell-input"
                              value={
                                editType === 'student'
                                  ? row.studentsId
                                  : row.ownerId || ''
                              }
                              onChange={(event) =>
                                edit(
                                  row.columnId,
                                  row.rowId,
                                  event,
                                  editType === 'student'
                                    ? 'studentsId'
                                    : 'ownerId'
                                )
                              }
                              onFocus={focus}
                            >
                              <option value="">선택하세요</option>
                              {studentList.map((item) => (
                                <option
                                  key={item.id}
                                  value={
                                    editType === 'student'
                                      ? item.studentsId
                                      : item.ownerId
                                  }
                                >
                                  {editType === 'student'
                                    ? getStudentName(item.studentsId)
                                    : getOwnerName(item.ownerId)}
                                </option>
                              ))}
                            </select>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
          </form>
          {isEditing && (
            <button className="blue-btn" onClick={updateSeat}>
              완료
            </button>
          )}

          <button onClick={toggleSeatMap}>수정</button>
          {isSeatMapVisible && (
            <div className="seat-map-container">
              <button onClick={deleteAll}>삭제</button>
              <SeatMap columns={columns} />
            </div>
          )}
        </div>
      }
    />
  );
}
