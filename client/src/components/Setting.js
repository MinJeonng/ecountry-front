import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCommaInput } from '../hooks/Utils';
import { ConfirmBtn, NextBtn } from './SettingBtn';
import { useDispatch, useSelector } from 'react-redux';
import {
  schoolInfo,
  countryInfo,
  studnetInfo,
  seatingMap,
  jobsInfo,
  basicLaw,
  taxLaw,
  seatRentalFee,
  Fine,
} from '../store/settingReducer';
import Loading from './Loading';

import '../styles/_input_common.scss';

//Setting1 - 학교 / 반 / 번호 설정
export function Setting1() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [schoolName, setSchoolName] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  const grades = [1, 2, 3, 4, 5, 6];

  const inputSchoolName = (event) => {
    setSchoolName(event.target.value);
  };

  const gradeSelect = (event) => {
    setSelectedGrade(event.target.value);
  };

  const classSelect = (e) => {
    setSelectedClass(e.target.value);
  };

  const nextSetting = () => {
    try {
      if (!selectedClass || !selectedGrade || !schoolName) {
        alert('모든 값을 입력해주세요');
        return;
      }
      navigate('/setting/countryInfo');
      dispatch(
        schoolInfo({
          schoolName: schoolName,
          schoolGrade: selectedGrade,
          schoolClass: selectedClass,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="setting-wrap">
      <div className="title-list">
        <div>반 정보 입력</div>
      </div>
      <ul className="title-list">
        <li>학교, 학년, 반 정보를 입력하세요&#46;</li>
      </ul>

      <form className="box-style">
        <div className="select-school">
          <div className="select-student-id-title set-title">초등학교</div>
          <input
            className="select-school-name"
            type="text"
            value={schoolName}
            onChange={inputSchoolName}
            style={{ imeMode: 'active' }}
          />
        </div>

        <div className="select-student-id">
          <div className="select-student-id-title set-title">학년</div>
          <select id="grade" value={selectedGrade} onChange={gradeSelect}>
            <option value="" disabled selected>
              학년 선택
            </option>
            {grades.map((grade, index) => (
              <option key={index} value={grade}>
                {grade}
              </option>
            ))}
          </select>

          <div className="select-student-id-title set-title">반</div>
          <input
            className="set-input"
            type="number"
            value={selectedClass}
            onChange={classSelect}
            style={{ imeMode: 'active' }}
          />
        </div>
      </form>
      <NextBtn onClick={nextSetting} btnName="다음"></NextBtn>
    </div>
  );
}
//Setting2 - 나라이름 / 화폐단위 / 월급날 설정
export function Setting2() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const days = Array.from({ length: 31 }, (_, index) => index + 1);
  const [countryName, setCountryName] = useState('');
  const [moneyUnit, setMoneyUnit] = useState('');
  const [salaryDate, setSalaryDate] = useState('');
  const beforeSetting = () => {
    navigate('/setting/schoolInfo');
  };

  const nextSetting = () => {
    try {
      if (!countryName || !moneyUnit || !salaryDate) {
        alert('모든 값을 입력해주세요');
        return;
      }
      navigate('/setting/studentInfo');
      dispatch(
        countryInfo({
          countryName: countryName,
          moneyUnit: moneyUnit,
          salaryDate: salaryDate,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleCountryName = (e) => {
    setCountryName(e.target.value);
  };
  const handleMoneyUnit = (e) => {
    setMoneyUnit(e.target.value);
  };
  const handleSalaryDate = (e) => {
    setSalaryDate(e.target.value);
  };

  return (
    <div className="setting-wrap">
      <div className="title-list">
        <div>국가 이름 &#47; 화폐 단위 &#47; 급여 지급일 설정</div>
      </div>
      <ul className="title-list">
        <li>국가의 이름과 화폐 단위&#44; 급여 지급일을 설정하세요&#46;</li>
      </ul>
      <form className="box-style">
        <div className="set-country">
          <div className="set-country-title set-title">국가 이름</div>
          <input
            className="set-country-detail"
            type="text"
            value={countryName}
            onChange={handleCountryName}
            style={{ imeMode: 'active' }}
          />
        </div>

        <div className="set-country-title set-title">화폐 단위</div>
        <input
          className="set-country-detail"
          type="text"
          value={moneyUnit}
          onChange={handleMoneyUnit}
          style={{ imeMode: 'active' }}
        />

        <div className="set-country-title set-title">급여 지급일</div>
        <div className="set-salary container">
          <div className="set-salary-text">매월</div>
          <div className="container">
            <select
              id="day"
              className="selectSalary"
              value={salaryDate}
              onChange={handleSalaryDate}
            >
              <option value="" selected disabled></option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <div className="set-salary-text ">일</div>
          </div>
        </div>
      </form>
      <div className="navi-btn">
        <button className="next-button" onClick={beforeSetting}>
          이전
        </button>
        <NextBtn onClick={nextSetting} width={'40%'} btnName="다음"></NextBtn>
      </div>
    </div>
  );
}
//Setting3 - 학생정보 / 비밀번호
export function Setting3() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const beforeSetting = () => {
    navigate('/setting/countryInfo');
  };
  const nextSetting = () => {
    navigate('/setting/seatingMap');
    dispatch(
      studnetInfo({
        password: password,
        studentList: attendees,
      })
    );
  };

  const [directInput, setDirectInput] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [password, setPassword] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [attendanceNumber, setAttendanceNumber] = useState('');
  const [name, setName] = useState('');
  const [correct, setCorrect] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleCheckBtn = () => {
    setIsEditing(false);
  };

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
    setIsEditing(true);
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
    <div className="setting-wrap">
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
        <div className="setting-wrap">
          <div>
            {attendees.length > 0 &&
              attendees.map((attendee, index) => (
                <div className="display" key={index}>
                  {attendee.attendanceNumber} - {attendee.name}
                  <button
                    className="updateBtn"
                    onClick={() => correctAttendee(index)}
                  >
                    수정
                  </button>
                  <img
                    className="deleteBtn"
                    src={`${process.env.PUBLIC_URL}/images/icon-delete.png`}
                    onClick={() => deleteAttendee(index)}
                  ></img>
                </div>
              ))}
          </div>
          <div className="box-style">
            <div className="set-title">비밀번호</div>
            <input
              className="set-input"
              type="number"
              value={attendanceNumber}
              maxLength={4}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="box-style">
            <div className="set-title">출석번호</div>
            <input
              className="set-input"
              type="number"
              value={attendanceNumber}
              onChange={(e) => setAttendanceNumber(e.target.value)}
            />
            <div className="set-title">이름</div>
            <input
              className="set-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {correct ? ( //수정버튼
              isEditing ? (
                // correct가 true이고, isEditing도 true일 때
                <ConfirmBtn onClick={handleCheckBtn} btnName="확인" />
              ) : (
                // correct가 true이지만, isEditing은 false일 때
                <ConfirmBtn onClick={updateAttendee} btnName="수정" />
              )
            ) : (
              // correct가 false일 때
              <ConfirmBtn onClick={handleCheck} btnName="확인" />
            )}
          </div>
        </div>
      ) : (
        <form className="box-style">
          <div>여기에 엑셀 예시가 들어가야함</div>

          <input type="file" onChange={handleFileChange} accept=".xlsx,.xls" />
          <ConfirmBtn onClick={handleUpload} btnName="업로드"></ConfirmBtn>
        </form>
      )}
      <div className="navi-btn">
        <button className="next-button" onClick={beforeSetting}>
          이전
        </button>
        <NextBtn onClick={nextSetting} width={'40%'} btnName="다음"></NextBtn>
      </div>
    </div>
  );
}
//Setting4 - 자리 배치도
export function Setting4() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const beforeSetting = () => {
    navigate('/setting/studentInfo');
  };

  const nextSetting = () => {
    // 적어도 하나의 열에 대해 rowCount가 설정되었는지 확인
    const isAtLeastOneRowCountSet = columns.some(
      (column) => column.rowCount !== ''
    );

    if (!isAtLeastOneRowCountSet) {
      // 모든 열이 rowCount가 설정되지 않았다면 경고 메시지 표시
      alert('최소 1열에 대해 자리 수를 입력해주세요.');
      return;
    }

    // 조건을 만족하면 다음 페이지로 이동
    try {
      navigate('/setting/jobList');
      dispatch(seatingMap({ columns: columns }));
    } catch (error) {
      console.log(error);
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
        <NextBtn onClick={nextSetting} width={'40%'} btnName="다음"></NextBtn>
      </div>
    </div>
  );
}
//Setting5 - 직업 설정 (1)
export function Setting5() {
  const dispatch = useDispatch();
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
    dispatch(jobsInfo({ jobsDisplay: jobsDisplay }));
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
    if (
      !(customJob || selectedJob) ||
      !standardValue ||
      !jobRoleValue ||
      !countValue ||
      inputValue === ''
    ) {
      alert('모든 값을 입력해주세요.');
      return;
    }

    // 모든 입력값이 유효한 경우
    if (selectedJobIndex !== null) {
      // 이미 목록에 있는 직업을 업데이트
      const updatedJobs = [...jobsDisplay];
      updatedJobs[selectedJobIndex] = {
        customValue: customJob,
        selectValue: selectedJob,
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
          customValue: customJob,
          selectValue: selectedJob,
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

  const selectInput = (job, index) => {
    setSelectedJob(job.selectValue);
    setCustomJob(job.customValue);
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
    <div className="setting-wrap">
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
      <div>
        {jobsDisplay.map((job, index) => (
          <div
            className="display"
            // key={index}
            // onClick={() => selectInput(job, index)}
          >
            {job.selectValue === '직접입력' ? job.customValue : job.selectValue}{' '}
            {job.count}명
            <button
              className="updateBtn"
              key={index}
              onClick={() => selectInput(job, index)}
            >
              수정
            </button>
            <img
              className="deleteBtn"
              src={`${process.env.PUBLIC_URL}/images/icon-delete.png`}
              onClick={deleteBtn(index)}
            />
          </div>
        ))}
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
          <select
            className="set-input"
            value={selectedJob}
            onChange={handleSelectChange}
          >
            <option value="" disabled selected style={{ color: '#a5a5a5' }}>
              선택해주세요
            </option>
            {jobList.map((job) => (
              <option key={job.value} value={job.value}>
                {job.label}
              </option>
            ))}
          </select>
          {isCustomInput && (
            <input
              type="text"
              className="set-input"
              value={customJob}
              onChange={handleCustomInputChange}
              placeholder="직업을 입력해주세요"
              style={{ imeMode: 'active' }}
            />
          )}
          <div className="set-title">급여</div>
          <input
            className="set-input"
            type="text"
            min="0"
            value={inputValue}
            onChange={handleInputChange}
          />
          <div className="set-title">인원수</div>
          <div className="container">
            <input
              className="set-input count"
              type="number"
              min="0"
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
            style={{ imeMode: 'active' }}
          />
          <div className="set-title">직업의 역할</div>
          <textarea
            rows={3.5}
            className="set-input input-textarea"
            type="text"
            value={jobRoleValue}
            onChange={handleJobRoleChange}
            style={{ imeMode: 'active' }}
          />
        </div>
        <ConfirmBtn onClick={addJob} btnName="확인"></ConfirmBtn>
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
//Setting6 - 기본법 설정
export function Setting6() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const beforeSetting = () => {
    navigate('/setting/jobList');
  };
  const nextSetting = () => {
    navigate('/setting/taxLaw');
    dispatch(basicLaw({ basicLaw: laws }));
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
    if (correct) {
      setCorrect(!correct);
    }
    setDetail('');
  };

  return (
    <div className="setting-wrap">
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
          style={{ imeMode: 'active' }}
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
            {index + 1}항.
            <br />
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
    </div>
  );
}
//Setting7 - 세법 설정 (0/1)
export function Setting7() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [lawNameValue, setLawNameValue] = useState('');
  const [rateValue, setRateValue] = useState('');
  const [customUnit, setCustomUnit] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedTaxLawIndex, setSelectedTaxLawIndex] = useState(null);
  const [taxLawDisplay, setTaxLawDisplay] = useState([]);
  const [division, setDivision] = useState(null);
  const moneyUnit = useSelector((state) => state.setting2.moneyUnit);
  const isCustomUnit = selectedUnit === '화폐단위(직접입력)';
  const unitList = [
    { label: moneyUnit, value: moneyUnit },
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
    if (selectedUnit === moneyUnit) {
      setDivision(1);
    } else {
      setDivision(0);
    }
  };

  const beforeSetting = () => {
    navigate('/setting/law');
  };
  const nextSetting = () => {
    navigate('/setting/seatRental');
    dispatch(taxLaw({ taxLaw: taxLawDisplay, division: division }));
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
    <div className="setting-wrap">
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
          style={{ imeMode: 'active' }}
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
        <ConfirmBtn onClick={addTaxLaw} btnName="확인"></ConfirmBtn>
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
    </div>
  );
}
//Setting8 - 자리세 설정(2)
export function Setting8() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const beforeSetting = () => {
    navigate('/setting/taxLaw');
  };
  const nextSetting = () => {
    navigate('/setting/fine');
    dispatch(
      seatRentalFee({
        taxName: taxName,
        fee: fee,
      })
    );
  };
  const moneyUnit = useSelector((state) => state.setting2.moneyUnit);
  const [taxName, setTaxName] = useState('');
  const [fee, setFee] = useState('');
  return (
    <div className="setting-wrap">
      <div className="title-list">
        <div>자리 임대료</div>
        <ul className="title-list">
          <li>자리 임대료를 설정하세요&#46;</li>
        </ul>
      </div>

      <form className="box-style">
        <div className="set-country">
          <div className="set-country-title set-title">세금 명</div>
          <input
            className="set-country-detail"
            type="text"
            value={taxName}
            onChange={(e) => {
              setTaxName(e.target.value);
            }}
            style={{ imeMode: 'active' }}
          />
        </div>
        <div className="set-country">
          <div className="set-country-title set-title">숫자</div>
          <input
            className="set-country-detail"
            type="number"
            value={fee}
            onChange={(e) => {
              setFee(e.target.value);
            }}
          />
        </div>
        <div className="set-country">
          <div className="set-country-title set-title">부가 단위</div>
          <input className="set-country-detail" type="text" value={moneyUnit} />
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
//Setting9 - 벌금 설정 (3)
export function Setting9() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [reasonFine, setReasonFine] = useState('');
  const [fineValue, setFineValue] = useState('');
  const [fineList, setFineList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const moneyUnit = useSelector((state) => state.setting2.moneyUnit);
  const beforeSetting = () => {
    navigate('/setting/seatRental');
  };

  const finishSetting = () => {
    setIsLoading(true);
    dispatch(Fine({ fine: fineList }));
  };

  const handleAddFine = () => {
    if (!reasonFine || !fineValue) {
      alert('모든 값을 입력해주세요');
      return;
    }
    if (selectedIndex !== null) {
      const updatedFine = [...fineList];
      updatedFine[selectedIndex] = {
        reason: reasonFine,
        fine: fineValue,
      };
      setFineList(updatedFine);
    } else {
      const newFineList = [
        ...fineList,
        {
          reason: reasonFine,
          fine: fineValue,
        },
      ];
      setFineList(newFineList);
    }
    setSelectedIndex(null);
    setReasonFine('');
    setFineValue('');
  };
  const selectInput = (fine, index) => {
    setFineValue(fine.fine);
    setReasonFine(fine.reason);
    setSelectedIndex(index);
  };
  const resetBtn = () => {
    setSelectedIndex(null);
    setReasonFine('');
    setFineValue('');
  };
  const deleteBtn = (index) => (e) => {
    e.stopPropagation();
    const filteredFine = fineList.filter((_, i) => i !== index);
    setFineList(filteredFine);
    setSelectedIndex(null);
    setReasonFine('');
    setFineValue('');
  };

  return (
    <div className="setting-wrap">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="setting-wrap">
          <div className="title-list">
            <div>벌금 설정</div>
            <ul className="title-list">
              <li>국가에 필수인 벌금을 제정하세요&#46;</li>
            </ul>
          </div>
          <div>
            {fineList.map((fine, index) => (
              <div className="display">
                {fine.reason}
                {fine.fine}
                <button
                  className="updateBtn"
                  key={index}
                  onClick={() => selectInput(fine, index)}
                >
                  수정
                </button>
                <img
                  className="deleteBtn"
                  src={`${process.env.PUBLIC_URL}/images/icon-delete.png`}
                  onClick={deleteBtn(index)}
                />
              </div>
            ))}
          </div>
          <form className="box-style">
            <div className="reset">
              <div className="set-title">벌금사유</div>
              <img
                className="resetBtn"
                src={`${process.env.PUBLIC_URL}/images/icon-reset.png`}
                onClick={resetBtn}
              />
            </div>
            <input
              className="set-input"
              type="text"
              value={reasonFine}
              onChange={(e) => {
                setReasonFine(e.target.value);
              }}
              style={{ imeMode: 'active' }}
            />

            <div className="set-title">숫자</div>
            <input
              className="set-input"
              type="number"
              min="0"
              value={fineValue}
              onChange={(e) => {
                setFineValue(e.target.value);
              }}
            />

            <div className="set-title">단위</div>

            <input className="set-input" type="text" value={moneyUnit} />

            <ConfirmBtn onClick={handleAddFine} btnName="확인"></ConfirmBtn>
          </form>
          <div className="navi-btn">
            <button className="next-button" onClick={beforeSetting}>
              이전
            </button>
            <NextBtn
              onClick={finishSetting}
              btnName="완료"
              width={'40%'}
            ></NextBtn>
          </div>
        </div>
      )}
    </div>
  );
}
