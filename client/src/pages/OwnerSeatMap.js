import React from 'react';

export default function OwnerSeatMap({
  columns,
  ownerTableRows,
  selectChangeOwner,
  studentList,
}) {
  return (
    <div className="preview">
      {columns && columns.length > 0 ? (
        columns.map((column, columnIndex) => (
          <div className="seating-map" key={columnIndex}>
            <div className="column-num">{column.label}</div>{' '}
            <div className="row-container">
              {Array.from({ length: column.rowCount }).map((_, rowIndex) => (
                <div key={rowIndex}>
                  <select
                    className="cell-input"
                    value={
                      ownerTableRows.find(
                        (row) =>
                          row.colNum === column.columnId &&
                          row.rowNum === rowIndex
                      )?.studentId || ''
                    }
                    onChange={selectChangeOwner(column.columnId, rowIndex)}
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
        <div className="non-seat">새로운 자리 배치표를 설정해주세요</div>
      )}
    </div>
  );
}
