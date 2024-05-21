import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Template from '../components/Template';
import '../styles/seat.scss';

// 자리배치도
export function SetSeat() {
  const { id } = useParams();

  // 열과 행의 정보를 담는 state
  const [columns, setColumns] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [editType, setEditType] = useState('student');
  const [isEditing, setIsEditing] = useState(false);

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

  const edit = (columnId, rowId, event, type) => {
    const newValue = event.target.value;
    const updatedTableRows = tableRows.map((row) => {
      if (row.columnId === columnId && row.rowId === rowId) {
        return { ...row, [type]: newValue };
      }
      return row;
    });
    setTableRows(updatedTableRows);
    setIsEditing(true); // 편집 중 상태로 설정
  };

  const focus = () => {
    setIsEditing(true);
  };

  const userClick = () => {
    setEditType('student');
  };

  const ownerClick = () => {
    setEditType('owner');
  };

  const updateSeat = () => {
    console.log('수정된 값:', tableRows);
    setIsEditing(false); // 편집 상태를 종료
  };

  const addRow = () => {
    if (!selectCol) {
      alert('열을 선택해주세요.');
      return;
    }

    const maxRowIdInSelectedColumn = Math.max(
      0,
      ...tableRows
        .filter((row) => row.columnId === parseInt(selectCol))
        .map((row) => parseInt(row.rowId))
    );
    const newRowId = maxRowIdInSelectedColumn + 1;
    const newTableRow = {
      columnId: parseInt(selectCol),
      rowId: `${newRowId}`,
      ownerId: '',
      studentsId: '',
    };
    setTableRows([...tableRows, newTableRow]);
    console.log(`행이 ${selectCol}에 추가됨`);
    setIsEditing(true); // 편집 중 상태로 설정
  };

  const addCol = () => {
    const newColumnId = columns.length + 1;
    setColumns([...columns, { id: newColumnId, rowNum: newColumnId }]);
    console.log('새 열이 추가됨');
    setIsEditing(true); // 편집 중 상태로 설정
  };

  useEffect(() => {
    getSeat();
  }, []);

  return (
    <Template
      childrenTop={<div>자리 배치표</div>}
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
          {editType === 'student' && (
            <form className="preview">
              {columns.map((column, columnIndex) => (
                <div className="seating-map" key={columnIndex}>
                  <div className="column-num">{column.rowNum}열</div>
                  <div className="row-container">
                    {tableRows
                      .filter((row) => row.columnId === column.id)
                      .map((row) => (
                        <div key={row.rowId} className="cell-container">
                          <input
                            type="text"
                            className="cell-input"
                            value={row.studentsId || ''}
                            onChange={(event) =>
                              edit(column.id, row.rowId, event, 'studentsId')
                            }
                            onFocus={focus}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </form>
          )}
          {editType === 'owner' && (
            <form className="preview">
              {columns.map((column, columnIndex) => (
                <div className="seating-map" key={columnIndex}>
                  <div className="column-num">{column.rowNum}열</div>
                  <div className="row-container">
                    {tableRows
                      .filter((row) => row.columnId === column.id)
                      .map((row) => (
                        <div key={row.rowId} className="cell-container">
                          <input
                            type="text"
                            className="cell-input"
                            value={row.ownerId || ''}
                            onChange={(event) =>
                              edit(column.id, row.rowId, event, 'ownerId')
                            }
                            onFocus={focus}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </form>
          )}
          {isEditing && (
            <button className="blue-btn" onClick={updateSeat}>
              완료
            </button>
          )}
          <div className="editCell-input">
            <button className="cell-btn" onClick={addCol}>
              +
            </button>
            <div className="columnSelect-input">
              <label className="columSelect" htmlFor="columnSelect">
                행 추가:{' '}
              </label>
              <select
                id="columnSelect"
                value={selectCol}
                onChange={(e) => setSelectCol(e.target.value)}
              >
                <option value="">열 선택</option>
                {columns.map((column) => (
                  <option key={column.id} value={column.id}>
                    {column.rowNum}열
                  </option>
                ))}
              </select>
              <button className="cell-btn" onClick={addRow}>
                +
              </button>
            </div>
          </div>
        </div>
      }
    />
  );
}
