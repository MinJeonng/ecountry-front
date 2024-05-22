import React from 'react';

export default function StudentSeatMap({
  columns,
  studentTableRows,
  selectChangeUser,
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
                      studentTableRows.find(
                        (row) =>
                          row.colNum === column.columnId &&
                          row.rowNum === rowIndex
                      )?.studentId || ''
                    }
                    onChange={selectChangeUser(column.columnId, rowIndex)}
                  >
                    <option className="cell-input-value" value="">
                      사용자
                    </option>
                    {studentList.map((item) => (
                      <option className="cell-input-value" key={item.id} value={item.id}>
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