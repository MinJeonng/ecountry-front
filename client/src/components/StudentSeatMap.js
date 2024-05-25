export default function StudentSeatMap({
  columns,
  seatlist,
  changelist,
  studentlist,
  isuser,
}) {
  const getId = (row, col) => {
    let result = '';
    if (seatlist.length > 0) {
      seatlist.forEach((seat) => {
        if (seat.rowNum == row && seat.colNum == col) {
          if (isuser) {
            if (seat.studentId) {
              result = seat.studentId;
            }
          } else {
            if (seat.ownerId) {
              result = seat.ownerId;
            }
          }
        }
      });
    }
    return result;
  };

  return (
    <div className="preview">
      {columns && columns.length > 0 ? (
        columns?.map((column) => (
          <div className="seating-map" key={column.rowNum}>
            <div className="column-num">{column.rowNum}열</div>{' '}
            <div className="row-container">
              {Array.from({ length: column.colNum })?.map((_, columnIndex) => (
                <div key={columnIndex}>
                  <select
                    className="cell-input"
                    value={getId(column.rowNum, columnIndex + 1) || ''}
                    onChange={(e) =>
                      changelist(column.rowNum, columnIndex + 1, e.target.value)
                    }
                  >
                    <option className="cell-input-value" value="">
                      {columnIndex + 1}
                    </option>
                    {studentlist?.map((item) => (
                      <option
                        className="cell-input-value"
                        key={item.id}
                        value={item.id}
                      >
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
