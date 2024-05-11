import React, { useState } from 'react';

import '../styles/_input_common.scss';
import '../styles/background.scss';

import { useNavigate } from 'react-router-dom';

// import '../styles/Setting1.scss';
// import '../styles/Setting2.scss';
// import '../styles/setting4.scss';

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
      <div>반 정보 입력</div>
      <ul className="title-list">
        <li>학교, 학년, 반 정보를 입력하세요&#46;</li>
      </ul>

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

        <button onClick={nextSetting}>다음</button>
      </form>
    </div>
  );
}

export function Setting2() {
  const [students, setStudents] = useState([]);
  const [password, setPassword] = useState('');
  const days = Array.from({ length: 31 }, (_, index) => index + 1);
  const navigate = useNavigate();
  const beforeSetting = () => {
    navigate('/setting/schoolInfo');
  };
  const nextSetting = () => {
    navigate('/setting/studentInfo');
  };

  const addStudentInfo = () => {
    setStudents([...students, { attendanceNumber: '', name: '' }]);
  };

  return (
    <div>
      <div>국가 이름 &#47; 화폐 단위 &#47; 금여 지급일 설정</div>
      <ul className="title-list">
        <li>국가의 이름과 화폐 단위&#44; 급여 지급일을 설정하세요&#46;</li>
      </ul>
      <form>
        <div className="set-country">
          <div className="set-country-title">국가 이름</div>
          <input className="set-country-detail" type="text" />
        </div>

        <div className="set-country-title">화폐 단위</div>
        <input className="set-country-detail" type="text" />

        <div className="set-country-title">급여 지급일</div>
        <div className="set-salary">
          <div className="set-salary-text">매월</div>
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
        <button onClick={beforeSetting}>이전</button>
        <button onClick={nextSetting}>다음</button>
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

  const [directInput, setDirectInput] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [password, setPassword] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [attendanceNumber, setAttendanceNumber] = useState(null);
  const [name, setName] = useState('');

  const handleAddAttendee = (e) => {
    e.preventDefault();
    // setAttendees([...attendees, { attendanceNumber: '', name: '' }]);
  };

  const handleChange = (field, value) => {
    const updatedAttendees = [...attendees];
    updatedAttendees[attendees.length - 1][field] = value;
    setAttendees(updatedAttendees);
    console.log(attendees.length);
  };

  const handleCheck = (e) => {
    e.preventDefault();
    handleChange('attendanceNumber', attendanceNumber);
    handleChange('name', name);
  };

  const deleteAttendee = (index) => {
    const updatedAttendees = [...attendees];
    updatedAttendees.splice(index, 1);
    setAttendees(updatedAttendees);
  };

  // 파일이 선택되었을 때
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // 선택된 파일 가져오기
    setSelectedFile(file); // 상태 업데이트
  };

  // 파일 업로드
  const handleUpload = () => {
    if (selectedFile) {
      // 선택된 파일 어떻게 할지!
      console.log('업로드된 파일:', selectedFile);
    } else {
      alert('파일을 선택해주세요.');
    }
  };
  return (
    <>
      <div className="title-wrap">
        <div className="title">학생 파일 업로드</div>
        <ul className="title-list">
          <li>
            아래의 정해진 양식(엑셀)에 따라 학생 파일을 업로드 하세요&#46;
          </li>
          <li>
            만약 엑셀 업로드가 불가할 경우 '직접 입력' 버튼을 눌러 학생 정보를
            기입할 수 있습니다.
          </li>
        </ul>
      </div>
      <button onClick={() => setDirectInput(!directInput)}>
        {directInput ? '파일 업로드' : '직접 입력'}
      </button>
      {directInput ? (
        <>
          <form className="box-style">
            <div>비밀번호</div>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              maxLength={4}
            />
            {/* <div>
              <button onClick={(e) => handleAddAttendee(e)}>추가</button>

              {attendees.map((attendee, index) => (
                <div key={index}>
                  <input
                    type="number"
                    placeholder="출석번호"
                    value={attendee.attendanceNumber}
                    onChange={(e) =>
                      handleChange(index, 'attendanceNumber', e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="이름"
                    value={attendee.name}
                    onChange={(e) =>
                      handleChange(index, 'name', e.target.value)
                    }
                  />
                  <div onClick={(index) => deleteAttendee(index)}>지우기</div>
                </div>
              ))}

              <ul>
                {attendees.map((attendee, index) => (
                  <li key={index}>
                    {attendee.attendanceNumber} - {attendee.name}
                  </li>
                ))}
              </ul>
            </div> */}
            <input
              type="number"
              placeholder="출석번호"
              value={attendanceNumber}
              onChange={(e) => setAttendanceNumber(e.target.value)}
            />
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button onClick={(e) => handleCheck(e)}>확인</button>
            <button onClick={handleAddAttendee}>추가</button>

            {attendees.length > 0 && (
              <>
                <ul>
                  {attendees.map((attendee, index) => (
                    <li key={index}>
                      {attendee.attendanceNumber} - {attendee.name}
                      <div onClick={() => deleteAttendee(index)}>지우기</div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </form>
        </>
      ) : (
        <>
          <form className="box-style">
            <div>여기에 엑셀 예시가 들어가야함</div>

            <input
              type="file"
              onChange={handleFileChange}
              accept=".xlsx,.xls"
            />
            <button onClick={handleUpload}>업로드</button>
          </form>
        </>
      )}
      <button onClick={beforeSetting}>이전</button>
      <button onClick={nextSetting}>다음</button>
    </>
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
      <div className="title-list">
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
      <div className="title-list">
        <div>직업 리스트</div>
        <ul className="title-list">
          <li>국가 내의 다양한 직업과 급여를 설정하세요&#46;</li>
          <li>
            각 직업에 따른 자격기준&#40;신용등급&#41;도 함께 설정하세요&#46;
          </li>
          <li>기본적으로 제공되는 직업 외에 직업을 추가할 수 있습니다&#46;</li>
        </ul>
      </div>

      <form className="box-style">
        <div>
          <div className="set-title">직업명</div>
          <select className="set-input" type="text"></select>
          <div className="set-title">급여</div>
          <input className="set-input" type="text" />
        </div>
      </form>

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

  const [laws, setLaws] = useState([]); // 법 리스트
  const [detail, setDetail] = useState(''); // 법 내용

  //laws구조
  const handleLaw = (e) => {
    e.preventDefault();
    setLaws([...laws, { detail: '' }]);
  };
  //laws-detail 입력
  const handleChange = (index, field, value) => {
    const updatedLaws = laws.map((law, i) => {
      if (i === index) {
        return { ...law, [field]: value };
      }
      return law;
    });
    setLaws(updatedLaws);
  };
  //law 삭제
  const deleteLaw = (index) => {
    const updatedLaws = [...laws];
    updatedLaws.splice(index, 1);
    setLaws(updatedLaws);
  };

  return (
    <>
      <div className="title-list">
        <div>기본법 제정</div>
        <ul className="title-list">
          <li>국가에 필수인 기본법을 제정하세요&#46;</li>
        </ul>
      </div>
      <form className="box-style">
        <button onClick={(e) => handleLaw(e)}>추가</button>
        {laws.map((law, index) => (
          <div>
            {index + 1}항
            <input
              type="text"
              placeholder="내용"
              value={law.detail}
              onChange={(e) => {
                handleChange(index, 'detail', e.target.value);
              }}
            ></input>
            <div onClick={(index) => deleteLaw(index)}>지우기</div>
          </div>
        ))}
      </form>
      <button onClick={beforeSetting}>이전</button>
      <button onClick={nextSetting}>다음</button>
    </>
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
    <>
      <div className="title-wrap">
        <div>세법 제정</div>
        <ul className="title-list">
          <li>국가에 필수인 세법을 제정하세요&#46;</li>
        </ul>
      </div>
      <button onClick={beforeSetting}>이전</button>
      <button onClick={nextSetting}>다음</button>
    </>
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
    <>
      <div className="title-wrap">
        <div>자리 임대료</div>
        <ul className="title-list">
          <li>자리 임대료를 설정하세요&#46;</li>
        </ul>
      </div>
      <button onClick={beforeSetting}>이전</button>
      <button onClick={nextSetting}>다음</button>
    </>
  );
}

export function Setting9() {
  const navigate = useNavigate();
  const beforeSetting = () => {
    navigate('/setting/seatRental');
  };

  return (
    <>
      <div className="title-wrap">
        <div>벌금 설정</div>
        <ul className="title-list">
          <li>국가에 필수인 벌금을 제정하세요&#46;</li>
        </ul>
      </div>
      <button onClick={beforeSetting}>이전</button>
    </>
  );
}
