import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Template from '../components/Template';

// 자리배치도
export function SetSeat() {
  const { id } = useParams();

  // 열과 행의 정보를 담는 state
  const [columns, setColumns] = useState([]);
  const [tableRows, setTableRows] = useState([]);

  const [editType, setEditType] = useState('student');
  const [isEditing, setIsEditing] = useState(false);

  const [selectCol, setSelectCol] = useState('');

  // const getSeat = async () => {
  //   const res = await axios({
  //     method: 'GET',
  //     url: `http://localhost:8080/api/seat/${id}`,
  //   });
  //   console.log(res.data.result);
  //   setColumns(res.data.result);
  // };

  const getSeat = () => {
    // 임시 데이터
    const dummyColumns = [
      { id: 1, rowNum: 1, colNum: 3 },
      { id: 2, rowNum: 2, colNum: 3 },
      { id: 3, rowNum: 3, colNum: 2 },
    ];

    const dummyTableRows = [
      { columnId: 1, rowId: '1', ownerId: '홍길동', studentsId: '임꺽정' },
      { columnId: 1, rowId: '2', ownerId: '홍길동', studentsId: '홍길동' },
      { columnId: 1, rowId: '3', ownerId: '', studentsId: '1' },
      { columnId: 2, rowId: '1', ownerId: '', studentsId: '1' },
      { columnId: 2, rowId: '2', ownerId: '', studentsId: '1' },
      { columnId: 2, rowId: '3', ownerId: '', studentsId: '1' },
      { columnId: 3, rowId: '1', ownerId: '', studentsId: '1' },
      { columnId: 3, rowId: '2', ownerId: '', studentsId: '1' },
      { columnId: 3, rowId: '3', ownerId: '', studentsId: '1' },
    ];

    setColumns(dummyColumns);
    setTableRows(dummyTableRows);
  };

  // 각 열의 자리수만큼 셀 생성
  const makeSeat = (rowNum, colNum) => {
    let result = [];
    for (let i = 1; i <= colNum; i++) {
      result.push(i);
    }
    return result;
  };

  const edit = (columnId, rowId, event, type) => {
    const newValue = event.target.value;
    // 변경된 값 반영
    const updatedTableRows = tableRows.map((row) => {
      if (row.columnId === columnId && row.rowId === rowId) {
        return { ...row, [type]: newValue };
      }
      return row;
    });
    setTableRows(updatedTableRows);
    event.target.classList.add('focused');
  };

  const focus = () => {
    setIsEditing(true);
  };

  const blur = () => {
    setIsEditing(false);
  };

  const userClick = () => {
    setEditType('student');
  };

  const ownerClick = () => {
    setEditType('owner');
  };

  const updateSeat = () => {
    // 여기에서 수정된 값 업데이트 처리
    console.log('수정된 값:', tableRows);
  };

  const addRow = () => {
    if (!selectCol) {
      alert('열을 선택해주세요.');
      return;
    }

    const maxRowIdInSelectedColumn = Math.max(
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
  };

  const addCol = () => {
    const newColumnId = columns.length + 1;
    const newColNum = `${newColumnId}열`;
    setColumns([...columns, { id: newColumnId, colNum: newColNum }]);
    console.log('새 열이 추가됨');
  };

  useEffect(() => {
    getSeat();
  }, []);

  console.log('tableRows:', tableRows);

  return (
    <Template
      childrenTop={<div>자리 배치표</div>}
      childrenBottom={
        <div>
          <div>
            {/* 사용자 클릭 시 */}
            <div onClick={userClick}>사용자</div>
            {/* 소유주 클릭 시 */}
            <div onClick={ownerClick}>소유주</div>
          </div>
          {/* 학생 ID 수정 폼 */}
          {editType === 'student' && (
            <form className="preview">
              {columns.map((column, columnIndex) => (
                <div className="seating-map" key={columnIndex}>
                  <div className="column-num">{column.rowNum}열</div>
                  <div className="row-container">
                    {makeSeat(column.rowNum, column.colNum).map((col) => (
                      <div key={col} className="cell-container">
                        <input
                          type="text"
                          className="cell-input"
                          value={
                            tableRows.find(
                              (row) =>
                                row.columnId === column.id &&
                                row.rowId === col.toString()
                            )?.studentsId || ''
                          }
                          onChange={(event) =>
                            edit(column.id, col.toString(), event, 'studentsId')
                          }
                          onFocus={focus}
                          onBlur={blur}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </form>
          )}
          {/* 학생 ID 수정 완료 버튼 */}
          {isEditing && (
            <button className="blue-btn" onClick={updateSeat}>
              완료
            </button>
          )}
          {/* 소유주 ID 수정 폼 */}
          {editType === 'owner' && (
            <form className="preview">
              {columns.map((column, columnIndex) => (
                <div className="seating-map" key={columnIndex}>
                  <div className="column-num">{column.rowNum}열</div>
                  <div className="row-container">
                    {makeSeat(column.rowNum, column.colNum).map((col) => (
                      <div key={col} className="cell-container">
                        <input
                          type="text"
                          className="cell-input"
                          value={
                            tableRows.find(
                              (row) =>
                                row.columnId === column.id &&
                                row.rowId === col.toString()
                            )?.ownerId || ''
                          }
                          onChange={(event) =>
                            edit(column.id, col.toString(), event, 'ownerId')
                          }
                          onFocus={focus}
                          onBlur={blur}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </form>
          )}
          {/* 소유주 ID 수정 완료 버튼 */}
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
