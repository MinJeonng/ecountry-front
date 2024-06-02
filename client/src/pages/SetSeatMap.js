import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Template from '../components/Template';
import SeatMap from '../components/SeatMap';
import { PageHeader } from '../components/Headers';
import { ChatBotBtn } from '../components/Btns';

export default function SetSeatMap() {
  const { id } = useParams();

  const [columns, setColumns] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isSeatMapVisible, setIsSeatMapVisible] = useState(false);

  const setSeatStatus = (columnId, rowIndex, studentId) => {
    const newSeat = {
      colNum: columnId,
      rowNum: rowIndex,
      studentId: studentId,
      isOwner: true,
    };

    setTableRows(
      [
        ...tableRows.filter(
          (seat) => !(seat.colNum === columnId && seat.rowNum === rowIndex)
        ),
        newSeat,
      ].sort((a, b) => a.colNum - b.colNum)
    );
    setIsEditing(true); // 수정이 이루어졌음을 표시
  };

  //   const getStudent = async () => {
  //     // 가짜 학생 데이터
  //     const fakeStudentData = [
  //       { id: 1, name: 'John Doe' },
  //       { id: 2, name: 'Jane Doe' },
  //       { id: 3, name: 'Alice Smith' },
  //       { id: 4, name: 'Bob Johnson' },
  //     ];

  //     // 가짜 데이터를 사용하여 학생 목록 설정
  //     setStudentList(fakeStudentData);
  //   };

  //   const getSeat = async () => {
  //     const fakeColumns = [
  //       { columnId: 1, label: '1열', rowCount: 2 },
  //       { columnId: 2, label: '2열', rowCount: 1 },
  //       { columnId: 3, label: '3열', rowCount: 3 },
  //     ];

  //     setColumns(fakeColumns);
  //   };

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

  const updateSeat = () => {
    console.log('수정된 값:', tableRows);
    setIsEditing(false); // 수정이 완료됐음을 표시
    setIsSeatMapVisible(false);
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
      childrenTop={<PageHeader>{'자리 배치표'}</PageHeader>}
      childrenBottom={
        <>
          <ChatBotBtn />
          <div className="seat-title">
            <button className="seat-user">사용자</button>
            <button className="seat-owner">소유주</button>
          </div>

          {/* 사용자 */}
          <div className="preview">
            {columns && columns.length > 0 ? (
              columns.map((column, columnIndex) => (
                <div className="seating-map" key={columnIndex}>
                  <div className="column-num">{column.label}</div>{' '}
                  {/* 수정: cloumn-num -> column-num */}
                  <div className="row-container">
                    {Array.from({ length: column.rowCount }, (_, rowIndex) => (
                      <div key={rowIndex}>
                        <select
                          className="cell-input"
                          value={
                            tableRows.find(
                              (row) =>
                                row.colNum === column.columnId &&
                                row.rowNum === rowIndex
                            )?.studentId || ''
                          }
                          onChange={(e) =>
                            setSeatStatus(
                              column.columnId,
                              rowIndex,
                              parseInt(e.target.value)
                            )
                          }
                        >
                          <option value="">선택하세요</option>
                          {studentList.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div>새로운 자리 배치표를 설정해주세요</div>
            )}
          </div>

          {/* 소유주 */}
          <div className="preview">
            {columns && columns.length > 0 ? (
              columns.map((column, columnIndex) => (
                <div className="seating-map" key={columnIndex}>
                  <div className="column-num">{column.label}</div>
                  <div className="row-container">
                    {Array.from({ length: column.rowCount }, (_, rowIndex) => (
                      <div key={rowIndex}>
                        <select
                          className="cell-input"
                          value={
                            tableRows.find(
                              (row) =>
                                row.colNum === column.columnId &&
                                row.rowNum === rowIndex
                            )?.studentId || ''
                          }
                          onChange={(e) =>
                            setSeatStatus(
                              column.columnId,
                              rowIndex,
                              parseInt(e.target.value)
                            )
                          }
                        >
                          <option value="">선택하세요</option>
                          {studentList.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div>새로운 자리 배치표를 설정해주세요</div>
            )}
          </div>

          {isEditing && ( // 수정이 이루어졌을 때만 완료 버튼 보여주기
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
              <SeatMap columns={columns} />
            </div>
          )}
        </>
      }
    />
  );
}
