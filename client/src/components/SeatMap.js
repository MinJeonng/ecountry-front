import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function SeatMap() {
  const seatingMapState = useSelector((state) => state.setting4);

  const [columns, setColumns] = useState([
    { id: 1, label: '1열', rowCount: '' },
    { id: 2, label: '2열', rowCount: '' },
  ]);

  useEffect(() => {
    if (seatingMapState?.columns?.length > 0) {
      setColumns(seatingMapState.columns);
    }
  }, [seatingMapState]);

  const addColumn = () => {
    const newColumn = {
      id: columns.length + 1,
      label: `${columns.length + 1}열`,
      rowCount: '',
    };
    setColumns([...columns, newColumn]);
  };

  const removeColumn = (id) => {
    setColumns(columns.filter((column) => column.id !== id));
  };

  const rowCountChange = (id, rowCount) => {
    setColumns(
      columns.map((column) => {
        if (column.id === id) {
          return { ...column, rowCount };
        }
        return column;
      })
    );
  };

  const saveSeatData = async () => {
    const dataToSend = columns.map((column) => ({
      rowNum: column.id,
      colNum: column.rowCount,
    }));

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_HOST}/api/seat`,
        dataToSend,
        {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
          },
        }
      );

      console.log('자리 배치 등록 결과 :', res.data.success);
    } catch (error) {
      console.error('자리 배치 등록 실패 :', error);
    }
  };

  return (
    <div className="setting-wrap">
      <div className="title-list">
        <div>자리 배치도</div>
        <ul className="title-list">
          <li>교실 내의 자리 배치를 설정하세요&#46;</li>
        </ul>
      </div>

      <form className="box-style">
        {columns.map((column) => (
          <div className="seat-count" key={column.id}>
            <div className="seat-colum">{column.label}</div>
            <div className="seat-count-select">
              <input
                className="seat-count-input"
                type="number"
                onChange={(e) => rowCountChange(column.id, e.target.value)}
                value={column.rowCount}
                placeholder="자리 수"
              />
              <div className="unit">명</div>
            </div>
          </div>
        ))}
        <div className="add-remove-btn">
          <button className="circle-btn" type="button" onClick={addColumn}>
            &#43;
          </button>
          {columns.length > 2 && (
            <button
              className="circle-btn"
              type="button"
              onClick={() => removeColumn(columns[columns.length - 1].id)}
            >
              &#45;
            </button>
          )}
        </div>
        <button className="blue-btn" onClick={saveSeatData}>
          저장
        </button>
      </form>
    </div>
  );
}
