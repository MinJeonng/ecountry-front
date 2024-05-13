import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCommaInput } from '../hooks/Utils';
import { ConfirmBtn } from './SettingBtn';

import '../styles/_input_common.scss';
import '../styles/background.scss';

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
      <div className="title-list">
        <div>반 정보 입력</div>
      </div>
      <ul className="title-list">
        <li>학교, 학년, 반 정보를 입력하세요&#46;</li>
      </ul>

      <form className="box-style">
        <div className="select-school">
          <div className="select-student-id-title set-title">초등학교</div>
          <input className="select-school-name" type="text" />
        </div>

        <div className="select-student-id">
          <div className="select-student-id-title set-title">학년</div>
          <select id="grade" value={selectedGrade} onChange={gradeSelect}>
            <option value=""></option>
            {grades.map((grade, index) => (
              <option key={index} value={grade}>
                {grade}
              </option>
            ))}
          </select>

          <div className="select-student-id-title set-title">반</div>
          <select id="class" value={selectedClass} onChange={classSelect}>
            <option value=""></option>
            {classes.map((classItem, index) => (
              <option key={index} value={classItem}>
                {classItem}
              </option>
            ))}
          </select>
        </div>
      </form>
      <button className="frist-next-button" onClick={nextSetting}>
        다음
      </button>
    </div>
  );
}

export function Setting2() {
  // const [students, setStudents] = useState([]);
  // const [password, setPassword] = useState('');
  const days = Array.from({ length: 31 }, (_, index) => index + 1);
  const navigate = useNavigate();
  const beforeSetting = () => {
    navigate('/setting/schoolInfo');
  };
  const nextSetting = () => {
    navigate('/setting/studentInfo');
  };

  // const addStudentInfo = () => {
  //   setStudents([...students, { attendanceNumber: '', name: '' }]);
  // };

  return (
    <div>
      <div className="title-list">
        <div>국가 이름 &#47; 화폐 단위 &#47; 금여 지급일 설정</div>
      </div>
      <ul className="title-list">
        <li>국가의 이름과 화폐 단위&#44; 급여 지급일을 설정하세요&#46;</li>
      </ul>
      <form className="box-style">
        <div className="set-country">
          <div className="set-country-title set-title">국가 이름</div>
          <input className="set-country-detail" type="text" />
        </div>

        <div className="set-country-title set-title">화폐 단위</div>
        <input className="set-country-detail" type="text" />

        <div className="set-country-title set-title">급여 지급일</div>
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
      </form>
      <div className="navi-btn">
        <button className="next-button" onClick={beforeSetting}>
          이전
        </button>
        <button className="next-button" onClick={nextSetting}>
          다음
        </button>
      </div>
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
  const [attendanceNumber, setAttendanceNumber] = useState('');
  const [name, setName] = useState('');
  const [correct, setCorrect] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleCheck = () => {
    if (attendanceNumber && name) {
      setAttendees([...attendees, { attendanceNumber, name }]);
      setAttendanceNumber('');
      setName('');
    } else {
      alert('출석번호와 이름을 모두 입력해주세요.');
    }
  };

  const deleteAttendee = (index) => {
    const updatedAttendees = [...attendees];
    updatedAttendees.splice(index, 1);
    setAttendees(updatedAttendees);
    setAttendanceNumber('');
    setName('');
  };

  const correctAttendee = (index) => {
    const { attendanceNumber, name } = attendees[index];
    setAttendanceNumber(attendanceNumber);
    setName(name);
    setCorrect(true);
    setSelectedIndex(index);
  };

  const updateAttendee = () => {
    const updatedAttendees = [...attendees];
    updatedAttendees[selectedIndex] = { attendanceNumber, name };
    setAttendees(updatedAttendees);
    setAttendanceNumber('');
    setName('');
    setSelectedIndex(null);
    setCorrect(!correct);
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
    } else {
      alert('파일을 선택해주세요.');
    }
  };

  return (
    <>
      <div className="title-list">
        <div>학생 파일 업로드</div>
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
      <button className="blue-btn" onClick={() => setDirectInput(!directInput)}>
        {directInput ? '파일 업로드' : '직접 입력'}
      </button>

      {directInput ? (
        <div className="box-style">
          <div>출석번호</div>
          <input
            type="number"
            placeholder="출석번호"
            value={attendanceNumber}
            onChange={(e) => setAttendanceNumber(e.target.value)}
          />
          <div>이름</div>
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {correct ? (
            <button onClick={updateAttendee}>수정</button>
          ) : (
            <button onClick={handleCheck}>확인</button>
          )}

          {attendees.length > 0 && (
            <ul>
              {attendees.map((attendee, index) => (
                <li key={index} onClick={() => correctAttendee(index)}>
                  {attendee.attendanceNumber} - {attendee.name}
                  <button onClick={() => deleteAttendee(index)}>지우기</button>
                </li>
              ))}
            </ul>
          )}

          <button onClick={beforeSetting}>이전</button>
          <button onClick={nextSetting}>다음</button>
        </div>
      ) : (
        <form className="box-style">
          <div>여기에 엑셀 예시가 들어가야함</div>

          <input type="file" onChange={handleFileChange} accept=".xlsx,.xls" />
          <button onClick={handleUpload}>업로드</button>
        </form>
      )}
      <div className="navi-btn">
        <button className="next-button" onClick={beforeSetting}>
          이전
        </button>
        <button className="next-button" onClick={nextSetting}>
          다음
        </button>
      </div>
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

      <form className="box-style">
        {columns.map((column) => (
          <div className="seat-count" key={column.id}>
            <div className="seat-colum">{column.label}</div>
            <div className="seat-count-select">
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

        <div>
          <button className="blue-btn" type="button" onClick={showTable}>
            미리보기
          </button>
        </div>

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
      </form>

      <div className="navi-btn">
        <button className="next-button" onClick={beforeSetting}>
          이전
        </button>
        <button className="next-button" onClick={nextSetting}>
          다음
        </button>
      </div>
    </div>
  );
}

export function Setting5() {
  const navigate = useNavigate();
  const [inputValue, handleInputChange] = useCommaInput();

  const [selectedJob, setSelectedJob] = useState('');
  const [customJob, setCustomJob] = useState('');
  const [standardValue, setStandardValue] = useState('');
  const [jobRoleValue, setJobRoleValue] = useState('');
  const [jobsDisplay, setJobsDisplay] = useState([]);
  const [countValue, setCountValue] = useState('');
  // 현재 선택한 상태 뭔지 저장
  const [selectedJobIndex, setSelectedJobIndex] = useState(null);

  const isCustomInput = selectedJob === '직접입력';
  const jobList = [
    { label: '은행원1(월급지급)', value: '은행원1(월급지급)' },
    { label: '은행원2(적금관리)', value: '은행원2(적금관리)' },
    { label: '기자', value: '기자' },
    { label: '국세청', value: '국세청' },
    { label: '신용등급관리위원회', value: '신용등급관리위원회' },
    { label: '국회', value: '국회' },
    { label: '직접입력', value: '직접입력' },
  ];
  const beforeSetting = () => {
    navigate('/setting/seatingMap');
  };
  const nextSetting = () => {
    navigate('/setting/law');
  };
  const handleCountValue = (e) => {
    setCountValue(e.target.value);
  };
  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedJob(value);
  };

  const handleCustomInputChange = (e) => {
    setCustomJob(e.target.value);
  };
  const handleStandardChange = (e) => {
    setStandardValue(e.target.value);
  };
  const handleJobRoleChange = (e) => {
    setJobRoleValue(e.target.value);
  };

  const addJob = () => {
    const newJob = isCustomInput ? customJob : selectedJob; //직접 선택은 customJob, 나머진 selectedJob
    if (newJob === '') return;

    if (selectedJobIndex !== null) {
      // 이미 목록에 있는 직업을 업데이트
      const updatedJobs = [...jobsDisplay];
      updatedJobs[selectedJobIndex] = {
        label: newJob,
        value: newJob,
        standard: standardValue,
        role: jobRoleValue,
        count: countValue,
        salary: inputValue,
      };
      setJobsDisplay(updatedJobs);
    } else {
      // 새 직업을 목록에 추가
      const newJobsDisplay = [
        ...jobsDisplay,
        {
          label: newJob,
          value: newJob,
          standard: standardValue,
          role: jobRoleValue,
          count: countValue,
          salary: inputValue,
        },
      ];
      setJobsDisplay(newJobsDisplay);
    }

    // 입력 필드 초기화
    setSelectedJob('');
    setCustomJob('');
    setStandardValue('');
    setJobRoleValue('');
    setCountValue('');
    handleInputChange({ target: { value: '' } });
    setSelectedJobIndex(null); // 선택한 직업 인덱스 초기화
  };

  const selectInput = (job, index, e) => {
    setSelectedJob(job.label);
    setCustomJob(e.target.value);
    setStandardValue(job.standard);
    setJobRoleValue(job.role);
    setCountValue(job.count);
    handleInputChange({ target: { value: job.salary.replace(/,/g, '') } }); //숫자만 추출해 전달
    setSelectedJobIndex(index);
    // console.log(setCustomJob(value));
  };

  const resetBtn = () => {
    setSelectedJob('');
    setCustomJob('');
    setStandardValue('');
    setJobRoleValue('');
    setCountValue('');
    handleInputChange({ target: { value: '' } });
    setSelectedJobIndex(null); // 선택한 직업 인덱스 초기화
  };

  const deleteBtn = (index) => (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    const filteredJobs = jobsDisplay.filter((_, i) => i !== index);
    setJobsDisplay(filteredJobs);
    // 초기화
    setSelectedJobIndex(null);
    setSelectedJob('');
    setCustomJob('');
    setStandardValue('');
    setJobRoleValue('');
    setCountValue('');
    handleInputChange({ target: { value: '' } });
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
          <div className="reset">
            <div className="set-title">직업명</div>
            <img
              className="resetBtn"
              src={`${process.env.PUBLIC_URL}/images/icon-reset.png`}
              onClick={resetBtn}
            />
          </div>
          {isCustomInput ? (
            <input
              type="text"
              className="set-input"
              value={customJob}
              onChange={handleCustomInputChange}
            />
          ) : (
            <select
              className="set-input"
              value={selectedJob}
              onChange={handleSelectChange}
            >
              <option value="" disabled selected style={{ color: '#a5a5a5' }}>
                선택 및 입력해주세요
              </option>
              {jobList.map((job) => (
                <option key={job.value} value={job.value}>
                  {job.label}
                </option>
              ))}
            </select>
          )}
          <div className="set-title">급여</div>
          <input
            className="set-input"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          <div className="set-title">인원수</div>
          <div className="container">
            <input
              className="set-input count"
              type="number"
              value={countValue}
              onChange={handleCountValue}
            ></input>
            <span className="unit">명</span>
          </div>
          <div className="set-title">직업의 기준</div>
          <textarea
            rows={3.5}
            className="set-input input-textarea"
            type="text"
            value={standardValue}
            onChange={handleStandardChange}
          />
          <div className="set-title">직업의 역할</div>
          <textarea
            rows={3.5}
            className="set-input input-textarea"
            type="text"
            value={jobRoleValue}
            onChange={handleJobRoleChange}
          />
        </div>
        <ConfirmBtn onClick={addJob}></ConfirmBtn>
      </form>
      <div>
        {jobsDisplay.map((job, index, e) => (
          <div
            className="display"
            key={index}
            onClick={() => selectInput(job, index, e)}
          >
            {job.label} {job.count}명
            <img
              className="deleteBtn"
              src={`${process.env.PUBLIC_URL}/images/icon-delete.png`}
              onClick={deleteBtn(index)}
            />
          </div>
        ))}
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

  const [laws, setLaws] = useState([]); // 법 리스트
  const [detail, setDetail] = useState(''); // 법 내용
  const [correct, setCorrect] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [law, setLaw] = useState('');

  // 법 추가
  const handleAddLaw = () => {
    if (detail.trim() !== '') {
      setLaws([...laws, { detail }]);
      setDetail('');
    }
  };

  const handleEditLaw = (index) => {
    const selectedLaw = laws[index].detail;
    setDetail(selectedLaw); //detail에 입력값 넣어주기
    setSelectedIndex(index);
    setCorrect(true);
  };

  const updateLaw = () => {
    const updatedLaws = [...laws];
    updatedLaws[selectedIndex].detail = detail;
    setLaws(updatedLaws);
    setDetail('');
    setSelectedIndex(null);
    setCorrect(false);
  };

  // 법 삭제
  const handleDeleteLaw = (index) => {
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
        <input
          type="text"
          placeholder="내용"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
        />
        {correct ? (
          <button onClick={updateLaw}>수정</button>
        ) : (
          <button type="button" onClick={handleAddLaw}>
            추가
          </button>
        )}
      </form>
      <ul>
        {laws.map((law, index) => (
          <li
            key={index}
            onClick={() => {
              handleEditLaw(index);
            }}
          >
            {law.detail}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteLaw(index);
              }}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>

      <div className="navi-btn">
        <button className="next-button" onClick={beforeSetting}>
          이전
        </button>
        <button className="next-button" onClick={nextSetting}>
          다음
        </button>
      </div>
    </>
  );
}

export function Setting7() {
  const navigate = useNavigate();
  const [lawNameValue, setLawNameValue] = useState('');
  const [rateValue, setRateValue] = useState('');
  const [customUnit, setCustomUnit] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedTaxLawIndex, setSelectedTaxLawIndex] = useState(null);
  const [taxLawDisplay, setTaxLawDisplay] = useState([]);
  const isCustomUnit = selectedUnit === '화폐단위(직접입력)';
  const unitList = [
    { label: '화폐단위(직접입력)', value: '화폐단위(직접입력)' },
    { label: '%', value: '%' },
  ];
  const handleLawNameValue = (e) => {
    setLawNameValue(e.target.value);
  };

  const handleRateValue = (e) => {
    setRateValue(e.target.value);
  };

  const handleCustomUnit = (e) => {
    setCustomUnit(e.target.value);
  };

  const handleSelectedUnit = (e) => {
    setSelectedUnit(e.target.value);
  };

  const beforeSetting = () => {
    navigate('/setting/law');
  };
  const nextSetting = () => {
    navigate('/setting/seatRental');
  };
  const resetBtn = () => {
    setLawNameValue('');
    setRateValue('');
    setCustomUnit('');
    setSelectedUnit('');
  };

  const addTaxLaw = () => {
    const newTaxLaw = isCustomUnit ? customUnit : selectedUnit;
    if (newTaxLaw === '') return;
    if (selectedTaxLawIndex !== null) {
      const updatedTaxLaws = [...taxLawDisplay];
      updatedTaxLaws[selectedTaxLawIndex] = {
        label: newTaxLaw,
        value: newTaxLaw,
        name: lawNameValue,
        rate: rateValue,
      };
      setTaxLawDisplay(updatedTaxLaws);
    } else {
      const newTaxLawDisplay = [
        ...taxLawDisplay,
        {
          label: newTaxLaw,
          value: newTaxLaw,
          name: lawNameValue,
          rate: rateValue,
        },
      ];
      setTaxLawDisplay(newTaxLawDisplay);
    }
    setCustomUnit('');
    setLawNameValue('');
    setRateValue('');
    setSelectedTaxLawIndex(null);
    setSelectedUnit('');
  };
  const selectInput = (taxLaw, index) => {
    setCustomUnit(taxLaw.label);
    setSelectedUnit(taxLaw.label);
    setRateValue(taxLaw.rate);
    setLawNameValue(taxLaw.name);
    setSelectedTaxLawIndex(index);
  };
  const deleteBtn = (index) => (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    const filteredTaxLaws = taxLawDisplay.filter((_, i) => i !== index);
    setTaxLawDisplay(filteredTaxLaws);
    // 초기화
    setCustomUnit('');
    setLawNameValue('');
    setRateValue('');
    setSelectedTaxLawIndex(null);
    setSelectedUnit('');
  };

  return (
    <>
      <div className="title-list">
        <div>세법 제정</div>
        <ul className="title-list">
          <li>국가에 필수인 세법을 제정하세요&#46;</li>
        </ul>
      </div>

      <form className="box-style">
        <div className="reset">
          <div className="set-title">세금명</div>
          <img
            className="resetBtn"
            src={`${process.env.PUBLIC_URL}/images/icon-reset.png`}
            onClick={resetBtn}
          />
        </div>
        <input
          type="text"
          className="set-input"
          value={lawNameValue}
          onChange={handleLawNameValue}
        />
        <div className="set-title">숫자</div>
        <input
          className="set-input"
          type="number"
          value={rateValue}
          onChange={handleRateValue}
        />
        <div className="set-title">부가 단위</div>
        {isCustomUnit ? (
          <input
            type="text"
            className="set-input"
            value={customUnit}
            onChange={handleCustomUnit}
          />
        ) : (
          <select
            className="set-input"
            value={selectedUnit}
            onChange={handleSelectedUnit}
          >
            <option value="" disabled selected style={{ color: '#a5a5a5' }}>
              선택 및 입력해주세요
            </option>
            {unitList.map((taxLaw) => (
              <option key={taxLaw.value} value={taxLaw.value}>
                {taxLaw.label}
              </option>
            ))}
          </select>
        )}
        <ConfirmBtn onClick={addTaxLaw}></ConfirmBtn>
      </form>
      <div>
        {taxLawDisplay.map((taxLaw, index) => (
          <div
            className="display"
            key={index}
            onClick={() => selectInput(taxLaw, index)}
          >
            {taxLaw.name} {taxLaw.rate}
            {taxLaw.label}
            <img
              className="deleteBtn"
              src={`${process.env.PUBLIC_URL}/images/icon-delete.png`}
              onClick={deleteBtn(index)}
            />
          </div>
        ))}
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
      <div className="title-list">
        <div>자리 임대료</div>
        <ul className="title-list">
          <li>자리 임대료를 설정하세요&#46;</li>
        </ul>
      </div>

      <form className="box-style">
        <div className="set-country">
          <div className="set-country-title set-title">세금 명</div>
          <input className="set-country-detail" type="text" />
        </div>
        <div className="set-country">
          <div className="set-country-title set-title">숫자</div>
          <input className="set-country-detail" type="number" />
        </div>
        <div className="set-country">
          <div className="set-country-title set-title">부가 단위</div>
          <input className="set-country-detail" type="text" />
        </div>
      </form>
      <div className="navi-btn">
        <button className="next-button" onClick={beforeSetting}>
          이전
        </button>
        <button className="next-button" onClick={nextSetting}>
          다음
        </button>
      </div>
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
      <div className="title-list">
        <div>벌금 설정</div>
        <ul className="title-list">
          <li>국가에 필수인 벌금을 제정하세요&#46;</li>
        </ul>
      </div>
      <button onClick={beforeSetting}>이전</button>
    </>
  );
}
