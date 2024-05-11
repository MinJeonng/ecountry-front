import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Setting1() {
  const navigate = useNavigate();
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  const grades = [1, 2, 3, 4, 5, 6];
  const classes = [1, 2, 3, 4, 5, 6, 7];

  const gradeSelect = (event) => {
    setSelectedGrade(event.target.value);
  };

  const classSelect = (event) => {
    setSelectedClass(event.target.value);
  };

  const nextSetting = () => {
    navigate('/setting/countryInfo');
  };

  return (
    <div>
      <div className="title-wrap">
        <div>반 정보 입력</div>
        <ul className="title-list">
          <li>학교, 학년, 반 정보를 입력하세요&#46;</li>
        </ul>
      </div>

      <form className="box-style">
        <div className="select-school">
          <div className="select-student-id-title">초등학교</div>
          <input className="select-school-name" type="text" />
        </div>

        <div className="select-student-id">
          <div className="select-student-id-title">학년</div>
          <select id="grade" value={selectedGrade} onChange={gradeSelect}>
            <option value=""></option>
            {grades.map((grade, index) => (
              <option key={index} value={grade}>
                {grade}
              </option>
            ))}
          </select>

          <div className="select-student-id-title">반</div>
          <select id="class" value={selectedClass} onChange={classSelect}>
            <option value=""></option>
            {classes.map((classItem, index) => (
              <option key={index} value={classItem}>
                {classItem}
              </option>
            ))}
          </select>
        </div>

        <button
          className="frist-next-button"
          type="submit"
          onClick={nextSetting}
        >
          다음
        </button>
      </form>
    </div>
  );
}

export function Setting2() {
  const days = Array.from({ length: 31 }, (_, index) => index + 1);
  const navigate = useNavigate();
  const beforeSetting = () => {
    navigate('/setting/schoolInfo');
  };
  const nextSetting = () => {
    navigate('/setting/studentInfo');
  };

  return (
    <div>
      <div className="title-wrap">
        <div>국가 이름 &#47; 화폐 단위 &#47; 금여 지급일 설정</div>
        <ul className="title-list">
          <li>국가의 이름과 화폐 단위&#44; 급여 지급일을 설정하세요&#46;</li>
        </ul>
      </div>

      <form className="box-style">
        <div className="set-country">
          <div className="set-country-title">국가 이름</div>
          <input className="set-country-detail" type="text" />
        </div>

        <div className="set-country-title">화폐 단위</div>
        <input className="set-country-detail" type="text" />

        <div className="set-country-title">급여 지급일</div>
        <div className="set-salary">
          <div className="set-salary-text">매월</div>
          <div>
            <select id="day">
              <option value=""></option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <span className="set-salary-text">일</span>
          </div>
        </div>
        <div className="navi-btn">
          <button className="next-button" type="submit" onClick={beforeSetting}>
            이전
          </button>
          <button className="next-button" type="submit" onClick={nextSetting}>
            다음
          </button>
        </div>
      </form>
    </div>
  );
}

export function Setting3() {
  const navigate = useNavigate();
  const beforeSetting = () => {
    navigate('/setting/countryInfo');
  };
  const nextSetting = () => {
    navigate('/setting/seatingMap');
  };
  return (
    <div>
      <div className="title-wrap">
        <div className="title">학생 파일 업로드</div>
        <ul className="title-list">
          <li>
            아래의 정해진 양식(엑셀)에 따라 학생 파일을 업로드 하세요&#46;
          </li>
          <li>
            만약 엑셀 업로드가 불가할 경우 직접 입력 버튼을 눌러 학생 정보를
            기입할 수 있습니다.
          </li>
        </ul>
      </div>

      <div className="navi-btn">
        <button className="next-button" type="submit" onClick={beforeSetting}>
          이전
        </button>
        <button className="next-button" type="submit" onClick={nextSetting}>
          다음
        </button>
      </div>
    </div>
  );
}

export function Setting4() {
  const [columns, setColumns] = useState([
    { id: 1, label: '1열', rowCount: '' },
    { id: 2, label: '2열', rowCount: '' },
  ]);

  const [tableRows, setTableRows] = useState([]);

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

  const showTable = () => {
    const rows = [];
    columns.forEach((column) => {
      const count = parseInt(column.rowCount);
      if (!isNaN(count) && count > 0) {
        for (let i = 0; i < count; i++) {
          rows.push({ columnId: column.id, rowId: i + 1 });
        }
      }
    });
    setTableRows(rows);
  };

  const navigate = useNavigate();
  const beforeSetting = () => {
    navigate('/setting/studentInfo');
  };
  const nextSetting = () => {
    navigate('/setting/jobList');
  };
  return (
    <div>
      <div className="title-wrap">
        <div>자리 배치도</div>
        <ul className="title-list">
          <li>교실 내의 자리 배치를 설정하세요&#46;</li>
        </ul>
      </div>

      <form>
        {columns.map((column) => (
          <div key={column.id}>
            <div>{column.label}</div>
            <select
              value={column.rowCount}
              onChange={(e) => rowCountChange(column.id, e.target.value)}
            >
              <option value=""></option>
              {[...Array(10)].map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
            <div>명</div>
          </div>
        ))}
        <div>
          <button type="button" onClick={addColumn}>
            +
          </button>
          {columns.length > 2 && (
            <button
              type="button"
              onClick={() => removeColumn(columns[columns.length - 1].id)}
            >
              -
            </button>
          )}
        </div>

        <div>
          <button type="button" onClick={showTable}>
            미리보기
          </button>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>1열</th>
                <th>2열</th>
                <th>3열</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>1</td>
                <td>1</td>
              </tr>
              <tr>
                <td>2</td>
                <td>2</td>
                <td>2</td>
              </tr>
              <tr>
                <td>3</td>
                <td>3</td>
              </tr>
              <tr>
                <td>4</td>
                <td>4</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="navi-btn">
          <button className="next-button" type="submit" onClick={beforeSetting}>
            이전
          </button>
          <button className="next-button" type="submit" onClick={nextSetting}>
            다음
          </button>
        </div>
      </form>
    </div>
  );
}

export function Setting5() {
  const navigate = useNavigate();
  const beforeSetting = () => {
    navigate('/setting/seatingMap');
  };
  const nextSetting = () => {
    navigate('/setting/law');
  };
  return (
    <div>
      <div className="title-wrap">
        <div>직업 리스트</div>
        <ul className="title-list">
          <li>국가 내의 다양한 직업과 급여를 설정하세요&#46;</li>
          <li>
            각 직업에 따른 자격기준&#40;신용등급&#41;도 함께 설정하세요&#46;
          </li>
          <li>기본적으로 제공되는 직업 외에 직업을 추가할 수 있습니다&#46;</li>
        </ul>
      </div>

      <form>
        <div className="navi-btn">
          <button className="next-button" type="submit" onClick={beforeSetting}>
            이전
          </button>
          <button className="next-button" type="submit" onClick={nextSetting}>
            다음
          </button>
        </div>
      </form>
    </div>
  );
}

export function Setting6() {
  const navigate = useNavigate();
  const beforeSetting = () => {
    navigate('/setting/jobList');
  };
  const nextSetting = () => {
    navigate('/setting/taxLaw');
  };
  return (
    <div>
      <div className="title-wrap">
        <div>기본법 제정</div>
        <ul className="title-list">
          <li>국가에 필수인 기본법을 제정하세요&#46;</li>
        </ul>
      </div>

      <div className="navi-btn">
        <button className="next-button" type="submit" onClick={beforeSetting}>
          이전
        </button>
        <button className="next-button" type="submit" onClick={nextSetting}>
          다음
        </button>
      </div>
    </div>
  );
}

export function Setting7() {
  const navigate = useNavigate();
  const beforeSetting = () => {
    navigate('/setting/law');
  };
  const nextSetting = () => {
    navigate('/setting/seatRental');
  };
  return (
    <div>
      <div className="title-wrap">
        <div>세법 제정</div>
        <ul className="title-list">
          <li>국가에 필수인 세법을 제정하세요&#46;</li>
        </ul>
      </div>

      <div className="navi-btn">
        <button className="next-button" type="submit" onClick={beforeSetting}>
          이전
        </button>
        <button className="next-button" type="submit" onClick={nextSetting}>
          다음
        </button>
      </div>
    </div>
  );
}

export function Setting8() {
  const navigate = useNavigate();
  const beforeSetting = () => {
    navigate('/setting/taxLaw');
  };
  const nextSetting = () => {
    navigate('/setting/fine');
  };
  return (
    <div>
      <div className="title-wrap">
        <div>자리 임대료</div>
        <ul className="title-list">
          <li>자리 임대료를 설정하세요&#46;</li>
        </ul>
      </div>
      <div className="navi-btn">
        <button className="next-button" type="submit" onClick={beforeSetting}>
          이전
        </button>
        <button className="next-button" type="submit" onClick={nextSetting}>
          다음
        </button>
      </div>
    </div>
  );
}

export function Setting9() {
  const navigate = useNavigate();
  const beforeSetting = () => {
    navigate('/setting/seatRental');
  };

  return (
    <div>
      <div className="title-wrap">
        <div>벌금 설정</div>
        <ul className="title-list">
          <li>국가에 필수인 벌금을 제정하세요&#46;</li>
        </ul>
      </div>
      <button onClick={beforeSetting}>이전</button>
    </div>
  );
}
