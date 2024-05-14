import React, { useEffect } from 'react';
import Template from '../components/Template';
import { useSelector } from 'react-redux';

// 자리배치도
export function SetSeat() {
  const columns = useSelector((state) => state.setting4.columns);
  const tableRows = useSelector((state) => state.setting4.tableRows);

  useEffect(() => {
    console.log('Columns:', columns);
    console.log('Table Rows:', tableRows);
  }, [columns, tableRows]);

  return (
    <Template
      childrenTop={<div>자리 배치표</div>}
      childrenBottom={
        <div className="preview">
          {columns.map((column, columnIndex) => (
            <div className="seating-map" key={columnIndex}>
              <div className="cloumn-num">{column.label}</div>
              <div className="row-container">
                {tableRows
                  .filter((row) => row.columnId === column.id)
                  .map((row, rowIndex) => (
                    <div key={rowIndex} className="cell">
                      {row.rowId}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      }
    />
  );
}
