import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Template from '../components/Template';
// 자리배치도
export function SetSeat() {
  // 임의의 값 설정
  const columns = [
    { id: 1, label: '1열' },
    { id: 2, label: '2열' },
    { id: 3, label: '3열' },
    { id: 4, label: '4열' },
    { id: 5, label: '5열' },
  ];
  const initialTableRows = [
    { columnId: 1, rowId: '1', value: '1' },
    { columnId: 1, rowId: '2', value: '2' },
    { columnId: 1, rowId: '3', value: '3' },
    { columnId: 1, rowId: '4', value: '4' },
    { columnId: 2, rowId: '1', value: '1' },
    { columnId: 2, rowId: '2', value: '2' },
    { columnId: 3, rowId: '1', value: '1' },
    { columnId: 3, rowId: '2', value: '2' },
    { columnId: 4, rowId: '1', value: '1' },
    { columnId: 4, rowId: '2', value: '2' },
    { columnId: 5, rowId: '1', value: '1' },
    { columnId: 5, rowId: '2', value: '2' },
  ];

  const [tableRows, setTableRows] = useState(initialTableRows);

  // const columns = useSelector((state) => state.setting4.columns);
  // const tableRows = useSelector((state) => state.setting4.tableRows);

  useEffect(() => {
    console.log('Columns:', columns);
    console.log('Table Rows:', tableRows);
  }, [columns, tableRows]);

  // 각 셀의 값을 변경하는 함수
  const cellEdit = (columnId, rowId, event) => {
    const newValue = event.target.value;
    // 변경된 값을 상태에 반영
    const updatedTableRows = tableRows.map((row) => {
      if (row.columnId === columnId && row.rowId === rowId) {
        return { ...row, value: newValue };
      }
      return row;
    });
    setTableRows(updatedTableRows);
  };

  return (
    <Template
      childrenTop={<div>자리 배치표</div>}
      childrenBottom={
        <form className="preview">
          {columns.map((column, columnIndex) => (
            <div className="seating-map" key={columnIndex}>
              <div className="cloumn-num">{column.label}</div>
              <div className="row-container">
                {tableRows
                  .filter((row) => row.columnId === column.id)
                  .map((row, rowIndex) => (
                    <input
                      key={rowIndex}
                      type="text"
                      className="cell-input"
                      value={row.value}
                      onChange={(event) =>
                        cellEdit(column.id, row.rowId, event)
                      }
                    />
                  ))}
              </div>
            </div>
          ))}
        </form>
      }
    />
  );
}
