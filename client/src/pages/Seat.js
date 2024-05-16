import React, { useState } from 'react';

import Template from '../components/Template';
// 자리배치도
export function SetSeat() {
  // const [columns, setColumns] = useState([
  //   { id: 1, label: '1열' },
  //   { id: 2, label: '2열' },
  //   { id: 3, label: '3열' },
  //   { id: 4, label: '4열' },
  //   { id: 5, label: '5열' },
  // ]);
  // const [tableRows, setTableRows] = useState([
  //   { columnId: 1, rowId: '1', value: '홍길동' },
  //   { columnId: 1, rowId: '2', value: '임꺽정' },
  //   { columnId: 1, rowId: '3', value: '3' },
  //   { columnId: 2, rowId: '1', value: '1' },
  //   { columnId: 2, rowId: '2', value: '2' },
  //   { columnId: 3, rowId: '1', value: '1' },
  //   { columnId: 3, rowId: '2', value: '2' },
  //   { columnId: 4, rowId: '1', value: '1' },
  //   { columnId: 4, rowId: '2', value: '2' },
  //   { columnId: 5, rowId: '1', value: '1' },
  //   { columnId: 5, rowId: '2', value: '2' },
  // ]);

  // 열과 행의 정보를 담는 state
  const [columns, setColumns] = useState([]);
  const [tableRows, setTableRows] = useState([]);

  const [editCell, setEditCell] = useState(null);

  const edit = (columnId, rowId, event) => {
    const newValue = event.target.value;
    // 변경된 값 반영
    const updateTableRows = tableRows.map((row) => {
      if (row.columnId === columnId && row.rowId === rowId) {
        return { ...row, value: newValue };
      }
      return row;
    });
    setTableRows(updateTableRows);
  };

  // 수정 중인 셀의 정보를 설정
  const startEdit = (columnId, rowId) => {
    setEditCell({ columnId, rowId });
  };

  // 수정이 완료되면 값을 업데이트
  const finishEdit = () => {
    if (editCell) {
      setEditCell(null);
      // 수정한 값만 업데이트
      const editedRow = tableRows.find(
        (row) =>
          row.columnId === editCell.columnId && row.rowId === editCell.rowId
      );
    }
  };

  console.log('tableRows:', tableRows);

  return (
    <Template
      childrenTop={<div>자리 배치표</div>}
      childrenBottom={
        <div>
          <form className="preview">
            {columns.map((column, columnIndex) => (
              <div className="seating-map" key={columnIndex}>
                <div className="cloumn-num">{column.label}</div>
                <div className="row-container">
                  {tableRows
                    .filter((row) => row.columnId === column.id)
                    .map((row, rowIndex) => (
                      <div key={rowIndex} className="cell-container">
                        {editCell &&
                        editCell.columnId === column.id &&
                        editCell.rowId === row.rowId ? (
                          // 수정 중인 셀일 경우
                          <input
                            type="text"
                            className="cell-input"
                            value={row.value}
                            onChange={(event) =>
                              edit(column.id, row.rowId, event)
                            }
                          />
                        ) : (
                          // 수정 중이 아닌 셀일 경우
                          <div
                            className="cell-input"
                            onClick={() => startEdit(column.id, row.rowId)}
                          >
                            {row.value}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </form>
          {editCell && (
            <button className="blue-btn" onClick={finishEdit}>
              완료
            </button>
          )}
        </div>
      }
    />
  );
}
