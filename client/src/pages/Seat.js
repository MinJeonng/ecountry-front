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
    { id: 1, columnId: 1, rowId: 1, studentsId: 'A', ownerId: 'X' },
    { id: 2, columnId: 1, rowId: 2, studentsId: 'B', ownerId: 'Y' },
    { id: 3, columnId: 2, rowId: 1, studentsId: 'C', ownerId: 'Z' },
  ]);

  const [editType, setEditType] = useState('student');
  const [isEditing, setIsEditing] = useState(false);
  const [isSeatMapVisible, setIsSeatMapVisible] = useState(false);

  const [tableRows, setTableRows] = useState();

  const [selectCol, setSelectCol] = useState('');
  const [studentList, setStudentList] = useState([
    { id: 1, name: '어쩌구' },
    { id: 2, name: '저쩌구' },
  ]);

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
  };

  const setSeatStatus = () => {
    setTableRows([
      ...tableRows,
      {
        rowNum: '몇열인지 넣어주기',
        colNum: '몇번째줄인지',
        studentId: '학생 아이디값',
        isOwner: true,
      },
    ]);
  };

  const getSeat = async () => {
    const res = await axios({
      method: 'GET',
      url: `http://localhost:8080/api/seat/${id}`,
    });
    console.log(res.data.result);
    setColumns(res.data.result);
  };

  // 편집 함수
  const edit = (columnId, rowId, event, type) => {
    const newValue = event.target.value;
    const updatedColumns = columns.map((column) => {
      if (column.columnId === columnId && column.rowId === rowId) {
        return { ...column, [type]: newValue };
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
  }, []);

  const toggleSeatMap = () => {
    setIsSeatMapVisible(!isSeatMapVisible);
  };

  const deleteAll = () => {
    setColumns([]);
    setIsSeatMapVisible(false);
  };

  const getStudentName = (studentId) => {
    const student = columns.find((column) => column.studentsId === studentId);
    return student ? student.studentsId : '';
  };

  const getOwnerName = (ownerId) => {
    const owner = columns.find((column) => column.ownerId === ownerId);
    return owner ? owner.ownerId : '';
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
            {columns
              .reduce((uniqueColumns, column) => {
                if (!uniqueColumns.includes(column.columnId)) {
                  uniqueColumns.push(column.columnId);
                }
                return uniqueColumns;
              }, [])
              .map((columnId) => (
                <div className="seating-map" key={columnId}>
                  <div className="column-num">{columnId}열</div>
                  <div className="row-container">
                    {columns
                      .filter((column) => column.columnId === columnId)
                      .map((row) => (
                        <div key={row.rowId} className="cell-container">
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
                            {columns.map((item) => (
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
