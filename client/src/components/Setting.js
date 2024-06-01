import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCommaInput } from '../hooks/Utils';
import { ConfirmBtn, NextBtn } from './Btns';
import { useDispatch, useSelector } from 'react-redux';
import {
  schoolInfo,
  countryInfo,
  studentInfo,
  seatingMap,
  jobsInfo,
  basicLaw,
  taxLaw,
  seatRentalFee,
  Fine,
} from '../store/settingReducer';
import { toast, ToastContainer } from 'react-toastify';
import Loading from './Loading';

import '../styles/_input_common.scss';

import 'react-toastify/dist/ReactToastify.min.css';
import axios from 'axios';
import { ReactComponent as Arrow } from '../images/ico-arr-left.svg';
import { handleKeyDown, handleKeyDownNext } from '../hooks/Functions';

//Setting1 - 학교 / 반 / 번호 설정
export function Setting1() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [schoolName, setSchoolName] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [schoolList, setSchoolList] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);
  const [schoolInfomation, setSchoolInfomation] = useState({});
  const [schoolAddress, setSchoolAddress] = useState('');

  const inputRef = useRef(null);

  const grades = [1, 2, 3, 4, 5, 6];
  const schoolInfoState = useSelector((state) => state.setting1);

  useEffect(() => {
    setSchoolName(schoolInfoState?.schoolName);
    setSelectedGrade(schoolInfoState?.schoolGrade);
    setSelectedClass(schoolInfoState?.schoolClass);
  }, [schoolInfoState]);

  const inputSchoolName = (event) => {
    setSchoolList([]);
    setSchoolAddress(null);
    setSchoolName(event.target.value);
  };

  const gradeSelect = (event) => {
    setSelectedGrade(event.target.value);
  };

  const classSelect = (e) => {
    setSelectedClass(e.target.value);
  };
  const searchFunc = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/school?schoolName=${schoolName}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    });
    setSchoolList(res.data.result);
    setOpenSearch(true);
  };
  const selectSchool = (index) => {
    setOpenSearch(false);
    setSchoolName(schoolList[index].schoolName);
    setSchoolInfomation(schoolList[index]);
    setSchoolAddress(schoolList[index].address);
  };

  const nextSetting = () => {
    try {
      if (!selectedClass || !selectedGrade || !schoolName) {
        toast.error('모든 값을 입력해주세요', {
          autoClose: 1300,
        });
        return;
      }
      navigate('/setting/countryInfo');
      dispatch(
        schoolInfo({
          schoolName: schoolInfomation.schoolName,
          schoolGrade: selectedGrade,
          schoolClass: selectedClass,
          eduOfficeCode: schoolInfomation.eduOfficeCode,
          schoolCode: schoolInfomation.schoolCode,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchSchool = (e) => {
    if (e.key === 'Enter') {
      searchFunc();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      nextSetting();
    }
  };

  return (
    <>
      {' '}
      <ToastContainer />
      <div className="setting-wrap">
        <ul className="title-list">
          <li>학교, 학년, 반 정보를 입력하세요&#46;</li>
        </ul>

        <form className="box-style">
          <div className="select-school">
            <div className="select-student-id-title set-title">초등학교</div>
            <div style={{ marginBottom: '10px' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                }}
              >
                <input
                  className="select-school-name"
                  type="text"
                  value={schoolName}
                  onChange={inputSchoolName}
                  onKeyDown={handleSearchSchool}
                  style={{
                    imeMode: 'active',
                    marginRight: '10px',
                    marginBottom: '0px',
                  }}
                />
                <button
                  className="select-school-btn"
                  type="button"
                  onClick={searchFunc}
                >
                  검색
                </button>
              </div>
              {schoolName && (
                <>
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#555555',
                      marginTop: '5px',
                    }}
                  >
                    {schoolAddress}
                  </div>
                </>
              )}
            </div>
            {openSearch &&
              (schoolList.length === 0 ? (
                <div
                  style={{
                    fontSize: '14px',
                    color: '#666666',
                    marginBottom: '20px',
                  }}
                >
                  검색 결과가 없습니다.
                </div>
              ) : (
                <div style={{ marginBottom: '10px' }}>
                  {schoolList.map((data, index) => (
                    <div
                      style={{
                        marginBottom: '10px',
                        padding: '5px',
                        color: '#555555',
                        borderBottom: '1px solid #bacd92',
                      }}
                      key={index}
                      onClick={() => selectSchool(index)}
                    >
                      <p style={{ fontSize: '14px' }}>{data.schoolName}</p>
                      <p style={{ fontSize: '12px' }}>{data.address}</p>
                    </div>
                  ))}
                </div>
              ))}
          </div>

          <div className="select-student-id">
            <div className="select-student-id-title set-title">학년</div>
            <select id="grade" value={selectedGrade} onChange={gradeSelect}>
              <option value="" disabled>
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
              onKeyDown={handleKeyDown}
              style={{ imeMode: 'active' }}
              min={1}
            />
          </div>
        </form>
        <div className="setting-st">
          <NextBtn onClick={nextSetting} btnName="다음"></NextBtn>
        </div>
      </div>
    </>
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
  const countryInfoState = useSelector((state) => state.setting2);
  const inputRefs = useRef([]);

  useEffect(() => {
    setCountryName(countryInfoState?.countryName);
    setMoneyUnit(countryInfoState?.moneyUnit);
    setSalaryDate(countryInfoState?.salaryDate);
  }, [countryInfoState]);

  const beforeSetting = () => {
    navigate('/setting/schoolInfo');
    dispatch(
      countryInfo({
        countryName: countryName,
        moneyUnit: moneyUnit,
        salaryDate: salaryDate,
      })
    );
  };

  const nextSetting = async () => {
    try {
      if (!countryName || !moneyUnit || !salaryDate) {
        toast.error('모든 값을 입력해주세요', {
          autoClose: 1300,
        });
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

  const handleKeyDown = (index, e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="setting-wrap">
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
              onKeyDown={(e) => handleKeyDown(0, e)}
              ref={(el) => (inputRefs.current[0] = el)}
              style={{ imeMode: 'active' }}
              lang="ko"
            />
          </div>

          <div className="set-country-title set-title">화폐 단위</div>
          <input
            className="set-country-detail"
            type="text"
            value={moneyUnit}
            onChange={handleMoneyUnit}
            onKeyDown={(e) => handleKeyDown(1, e)}
            ref={(el) => (inputRefs.current[1] = el)}
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
                <option value="" disabled></option>
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
    </>
  );
}

//Setting3 - 학생정보 / 비밀번호
export function Setting3() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [directInput, setDirectInput] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [password, setPassword] = useState(null);
  const [checkPassword, setCheckPassword] = useState(false);
  const [attendees, setAttendees] = useState([]);
  const [attendanceNumber, setAttendanceNumber] = useState('');
  const [name, setName] = useState('');
  const [correct, setCorrect] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(true);

  const studentInfoState = useSelector((state) => state.setting3);

  const nameRef = useRef(null);

  useEffect(() => {
    setPassword(studentInfoState?.password);
    setAttendees(studentInfoState?.studentList);
  }, [studentInfoState]);

  const beforeSetting = () => {
    navigate('/setting/countryInfo');
    dispatch(
      studentInfo({
        password: password,
        studentList: attendees,
      })
    );
  };
  const nextSetting = () => {
    if (password !== null || selectedFile) {
      navigate('/setting/seatingMap');
      dispatch(
        studentInfo({
          password: password,
          studentList: attendees,
        })
      );
    } else {
      toast.error('학생들의 초기 비밀번호를 설정하세요', { autoClose: 1300 });
    }
  };
  const handleCheck = () => {
    if (password !== null && password.length === 4) {
      setCheckPassword(true);
    }
    if (checkPassword) {
      if (attendanceNumber && name) {
        setAttendees([...attendees, { attendanceNumber, name }]);
        setAttendanceNumber('');
        setName('');
      } else {
        toast.error('모든 값을 입력해주세요.', { autoClose: 1300 });
      }
    } else {
      toast.error('학생들의 초기 비밀번호를 설정하세요', {
        autoClose: 1300,
      });
    }
  };
  const handleCheckPassword = () => {
    if (password.length !== 4) {
      toast.error('비밀번호를 입력해주세요.', { autoClose: 1300 });
    } else {
      setCheckPassword(true);
    }
  };

  const deleteAttendee = (index) => {
    const updatedAttendees = [...attendees];
    updatedAttendees.splice(index, 1);
    setAttendees(updatedAttendees);
    setAttendanceNumber('');
    setName('');
    setCorrect(false);
    setSelectedIndex(null);
    setIsAccordionOpen(false);
    setIsAddOpen(true);
    setIsAddOpen(true);
  };

  const correctAttendee = (index) => {
    if (selectedIndex === index) {
      setAttendanceNumber('');
      setName('');
      setCorrect(false);
      setSelectedIndex(null);
      setIsAccordionOpen(false);
      setIsAddOpen(true);
    } else {
      const { attendanceNumber, name } = attendees[index];
      setAttendanceNumber(attendanceNumber);
      setName(name);
      setCorrect(true);
      setSelectedIndex(index);
      setIsAccordionOpen(true);
      setIsAddOpen(false);
    }
  };

  const updateAttendee = () => {
    const updatedAttendees = [...attendees];
    updatedAttendees[selectedIndex] = { attendanceNumber, name };
    setAttendees(updatedAttendees);
    setAttendanceNumber('');
    setName('');
    setSelectedIndex(null);
    setCorrect(!correct);
    setIsAddOpen(true);
  };

  // 파일이 선택되었을 때
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // 선택된 파일 가져오기
    setSelectedFile(file); // 상태 업데이트
  };

  // 파일 업로드
  const handleUpload = () => {
    if (selectedFile) {
      toast.success('업로드 완료하였습니다.', { autoClose: 1300 });
    } else {
      toast.error('파일을 선택해주세요.', { autoClose: 1300 });
    }
  };
  //예시 파일 다운로드
  const downloadFile = () => {
    const fileUrl = process.env.PUBLIC_URL + '/files/example.xlsx';
    window.open(fileUrl); // 파일 열기
  };

  return (
    <>
      <ToastContainer />
      <div className="setting-wrap">
        <ul className="title-list">
          <li>
            아래의 정해진 양식(엑셀)에 따라 학생 파일을 업로드 하세요&#46;
          </li>
          <li>
            만약 엑셀 업로드가 불가할 경우 '직접 입력' 버튼을 눌러 학생 정보를
            기입할 수 있습니다.
          </li>
        </ul>

        <button
          className="blue-btn"
          onClick={() => setDirectInput(!directInput)}
        >
          {directInput ? '파일 업로드' : '직접 입력'}
        </button>

        {directInput ? (
          <div className="setting-wrap">
            <div>
              <div className="box-style">
                <div className="set-title">비밀번호</div>
                <ul className="pw-title-list title-list">
                  <li>국민들의 초기 비밀번호를 설정하세요.(4자리)</li>
                  <li>
                    각각의 비밀번호는 국민 개인 계정에서 변경가능하며, 관리자
                    페이지에서 재설정 가능합니다.
                  </li>
                </ul>
                <input
                  className="set-input"
                  type="number"
                  value={password}
                  maxLength={4}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val.length <= 4) {
                      setPassword(val);
                    } else {
                      toast.error('비밀번호는 4자리로 설정해주세요.');
                    }
                  }}
                  onKeyDown={(e) => handleKeyDown(e, handleCheckPassword)}
                />
                {checkPassword && (
                  <div style={{ fontSize: '10px', color: 'red' }}>
                    비밀번호 설정이 완료되었습니다.
                  </div>
                )}

                <ConfirmBtn
                  onClick={handleCheckPassword}
                  btnName="확인"
                  backgroundColor="#bacd92"
                />
              </div>
              {attendees.length > 0 &&
                attendees.map((attendee, index) => (
                  <div key={index}>
                    <div
                      className={`display ${
                        isAccordionOpen && selectedIndex === index
                          ? 'accordion-open'
                          : ''
                      } ${selectedIndex === index ? 'selected' : ''}`}
                      key={index}
                      style={{ color: '#666666' }}
                      onClick={() => correctAttendee(index)}
                    >
                      {attendee.attendanceNumber}번 {attendee.name}
                      <Arrow stroke="#ddd" className="accArrBtn" />
                    </div>
                    {isAccordionOpen && selectedIndex === index && (
                      <>
                        <div
                          className="box-style"
                          style={{ position: 'relative' }}
                        >
                          <img
                            className="deleteBtn"
                            src={`${process.env.PUBLIC_URL}/images/icon-delete.png`}
                            onClick={() => deleteAttendee(index)}
                          ></img>
                          <div className="set-title">출석번호</div>
                          <input
                            className="set-input"
                            type="number"
                            value={attendanceNumber}
                            onChange={(e) =>
                              setAttendanceNumber(e.target.value)
                            }
                            onKeyDown={(e) => handleKeyDownNext(e, nameRef)}
                          />
                          <div className="set-title">이름</div>
                          <input
                            ref={nameRef}
                            className="set-input"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, updateAttendee)}
                          />
                          <ConfirmBtn
                            onClick={updateAttendee}
                            btnName="수정"
                            backgroundColor="#61759f"
                          />
                        </div>
                      </>
                    )}
                  </div>
                ))}
            </div>
            {isAddOpen && (
              <div className="box-style">
                <div className="set-title">출석번호</div>
                <input
                  className="set-input"
                  type="number"
                  value={attendanceNumber}
                  onChange={(e) => setAttendanceNumber(e.target.value)}
                  onKeyDown={(e) => handleKeyDownNext(e, nameRef)}
                />
                <div className="set-title">이름</div>
                <input
                  ref={nameRef}
                  className="set-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, handleCheck)}
                />

                <ConfirmBtn
                  onClick={handleCheck}
                  btnName="확인"
                  backgroundColor="#bacd92"
                />
              </div>
            )}
          </div>
        ) : (
          <form className="box-style">
            <div>
              <button className="studentInfo-upload" onClick={downloadFile}>
                예시 파일 확인
              </button>
            </div>

            <input
              className="studentInfo-input"
              type="file"
              onChange={handleFileChange}
              accept=".xlsx,.xls, .csv"
            />
            <ConfirmBtn
              onClick={handleUpload}
              btnName="업로드"
              backgroundColor="#bacd92"
            ></ConfirmBtn>
          </form>
        )}

        <div className="navi-btn">
          <button className="next-button" onClick={beforeSetting}>
            이전
          </button>
          <NextBtn onClick={nextSetting} width={'40%'} btnName="다음"></NextBtn>
        </div>
      </div>
    </>
  );
}
//Setting4 - 자리 배치도
export function Setting4() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const seatingMapState = useSelector((state) => state.setting4);

  const [columns, setColumns] = useState([
    { id: 1, label: '1열', rowCount: '' },
    { id: 2, label: '2열', rowCount: '' },
  ]);

  const [tableRows, setTableRows] = useState([]);

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
    dispatch(seatingMap({ columns: columns }));
  };

  const nextSetting = () => {
    // 적어도 하나의 열에 대해 rowCount가 설정되었는지 확인
    const isAtLeastOneRowCountSet = columns.some(
      (column) => column.rowCount !== ''
    );

    if (!isAtLeastOneRowCountSet) {
      // 모든 열이 rowCount가 설정되지 않았다면 경고 메시지 표시
      toast.error('최소 1열에 대해 자리 수를 입력해주세요.', {
        autoClose: 1300,
      });
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
    <>
      {' '}
      <ToastContainer />
      <div className="setting-wrap">
        <ul className="title-list">
          <li>교실 내의 자리 배치를 설정하세요&#46;</li>
        </ul>

        <form className="box-style">
          {columns.map((column) => (
            <div className="seat-count" key={column.id}>
              <div className="seat-colum">{column.label}</div>
              <div className="seat-count-select">
                <input
                  className="seat-count-input"
                  type="number"
                  min={0}
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
    </>
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
  const [jobSkill, setJobSkill] = useState([]); //skill 번호
  const [selectedJobSkill, setSelectedJobSkill] = useState('');
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(true);
  const moneyUnit = useSelector((state) => state.setting2.moneyUnit);
  const jobListState = useSelector((state) => state.setting5);

  const headcountRef = useRef(null);
  const standardRef = useRef(null);

  console.log(jobsDisplay);
  useEffect(() => {
    setJobsDisplay(jobListState?.jobsDisplay);
  }, [jobListState]);

  useEffect(() => {
    if (selectedJobSkill !== '') {
      setJobSkill((prevSkills) => [...prevSkills, Number(selectedJobSkill)]);
    }
    setSelectedJobSkill('');
  }, [selectedJobSkill]);

  const isCustomInput = selectedJob === '직접입력';
  const jobList = [
    { label: '은행원', value: '은행원' },
    { label: '기자', value: '기자' },
    { label: '국세청', value: '국세청' },
    { label: '신용등급관리위원회', value: '신용등급관리위원회' },
    { label: '국회', value: '국회' },
    { label: '직접입력', value: '직접입력' },
  ];
  const jobSkillList = [
    { label: '월급 지급', value: 0 },
    { label: '적금 관리(가입/해지)', value: 1 },
    { label: '뉴스 작성', value: 2 },
    { label: '세금 징수', value: 3 },
    { label: '신용 관리', value: 4 },
    { label: '법 관리 ', value: 5 },
  ];
  const beforeSetting = () => {
    navigate('/setting/seatingMap');
    dispatch(jobsInfo({ jobsDisplay: jobsDisplay }));
  };
  const nextSetting = () => {
    navigate('/setting/law');
    dispatch(jobsInfo({ jobsDisplay: jobsDisplay }));
  };
  const handleCountValue = (e) => {
    const val = parseInt(e.target.value);

    if (isNaN(val)) {
      setCountValue('');
      return;
    }

    if (val <= 0) {
      toast.error('1 이상의 숫자를 입력해주세요.');
      return;
    }

    setCountValue(val.toString());
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
  const handleSelectJobSkill = (e) => {
    setSelectedJobSkill(e.target.value);
  };
  const addJob = () => {
    if (
      !(customJob || selectedJob) ||
      !standardValue ||
      !jobRoleValue ||
      !countValue ||
      inputValue === ''
    ) {
      toast.error('모든 값을 입력해주세요.', { autoClose: 1300 });
      return;
    }

    // 모든 입력값이 유효한 경우
    if (selectedIndex !== null) {
      console.log('first');
      // 이미 목록에 있는 직업을 업데이트
      const updatedJobs = [...jobsDisplay];
      updatedJobs[selectedIndex] = {
        customValue: customJob,
        selectValue: selectedJob,
        standard: standardValue,
        role: jobRoleValue,
        count: countValue,
        salary: inputValue,
        skills: jobSkill,
      };
      setJobsDisplay(updatedJobs);
      setIsAddOpen(true);
    } else {
      // 새 직업을 목록에 추가
      const newJob = {
        customValue: customJob,
        selectValue: selectedJob,
        standard: standardValue,
        role: jobRoleValue,
        count: countValue,
        salary: inputValue,
        skills: jobSkill,
      };
      setJobsDisplay((prevJobs) => [...prevJobs, newJob]);
    }

    // 입력 필드 초기화
    setSelectedJob('');
    setCustomJob('');
    setStandardValue('');
    setJobRoleValue('');
    setCountValue('');
    handleInputChange({ target: { value: '' } });
    setJobSkill([]);
    setSelectedIndex(null); // 선택한 직업 인덱스 초기화
  };

  const selectInput = (job, index) => {
    if (index === selectedIndex) {
      setSelectedJob('');
      setCustomJob('');
      setStandardValue('');
      setJobRoleValue('');
      setCountValue('');
      handleInputChange({ target: { value: '' } });
      setJobSkill([]);
      setSelectedIndex(null);
      setIsAccordionOpen(false);
      setIsAddOpen(true);
    } else {
      setSelectedJob(job.selectValue);
      setCustomJob(job.customValue);
      setStandardValue(job.standard);
      setJobRoleValue(job.role);
      setCountValue(job.count);
      handleInputChange({ target: { value: job.salary.replace(/,/g, '') } }); //숫자만 추출해 전달
      setJobSkill(job.skills);
      setSelectedIndex(index);
      setIsAccordionOpen(true);
      setIsAddOpen(false);
    }
  };

  const resetBtn = () => {
    setSelectedJob('');
    setCustomJob('');
    setStandardValue('');
    setJobRoleValue('');
    setCountValue('');
    handleInputChange({ target: { value: '' } });
    setSelectedIndex(null); // 선택한 직업 인덱스 초기화
  };

  const deleteBtn = (index) => (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    const filteredJobs = jobsDisplay.filter((_, i) => i !== index);
    setJobsDisplay(filteredJobs);
    // 초기화
    setSelectedIndex(null);
    setSelectedJob('');
    setCustomJob('');
    setStandardValue('');
    setJobRoleValue('');
    setCountValue('');
    handleInputChange({ target: { value: '' } });
    setIsAddOpen(true);
  };
  const deleteSkill = (index) => {
    const updatedSkill = [...jobSkill];
    updatedSkill.splice(index, 1);
    setJobSkill(updatedSkill);
  };

  return (
    <>
      <ToastContainer />
      <div className="setting-wrap">
        <ul className="title-list">
          <li>국가 내의 다양한 직업과 급여를 설정하세요&#46;</li>
          <li>
            각 직업에 따른 자격기준&#40;신용등급&#41;도 함께 설정하세요&#46;
          </li>
          <li>기본적으로 제공되는 직업 외에 직업을 추가할 수 있습니다&#46;</li>
        </ul>

        <div>
          {jobsDisplay.map((job, index) => (
            <div key={index}>
              <div
                className={`display ${
                  isAccordionOpen && selectedIndex === index
                    ? 'accordion-open'
                    : ''
                } ${selectedIndex === index ? 'selected' : ''}`}
                key={index}
                onClick={() => selectInput(job, index)}
              >
                {job.selectValue === '직접입력'
                  ? job.customValue
                  : job.selectValue}{' '}
                {job.count}명
                <Arrow stroke="#ddd" className="accArrBtn" />
              </div>
              {isAccordionOpen && selectedIndex === index && (
                <form className="box-style">
                  <div>
                    <img
                      style={{ top: '4%' }}
                      className="deleteBtn"
                      src={`${process.env.PUBLIC_URL}/images/icon-delete.png`}
                      onClick={deleteBtn(index)}
                    />
                  </div>
                  <div className="reset">
                    <div className="set-title">직업명</div>
                  </div>
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
                  <select
                    className="set-input"
                    value={selectedJob}
                    onChange={handleSelectChange}
                  >
                    <option value="" disabled style={{ color: '#a5a5a5' }}>
                      선택해주세요
                    </option>
                    {jobList.map((job) => (
                      <option key={job.value} value={job.value}>
                        {job.label}
                      </option>
                    ))}
                  </select>
                  <div className="set-title">직업의 역할(복수선택 가능)</div>
                  <select
                    className="set-input"
                    value={selectedJobSkill}
                    onChange={handleSelectJobSkill}
                    style={{ marginBottom: '0px' }}
                  >
                    <option value="" disabled style={{ color: '#a5a5a5' }}>
                      선택해주세요
                    </option>
                    {jobSkillList.map((skill) => (
                      <option key={skill.value} value={skill.value}>
                        {skill.label}
                      </option>
                    ))}
                  </select>
                  <div style={{ fontSize: '12px', margin: '5px' }}>
                    {jobSkill.length == 0 ? (
                      <div style={{ marginBottom: '20px' }}></div>
                    ) : (
                      <>
                        {jobSkill.map((skill, index) => (
                          <div
                            style={{
                              margin: '5px',
                              padding: '2px',
                              borderBottom: '1px solid rgb(186, 205, 146)',
                              width: 'fit-content',
                              display: 'inline-table',
                            }}
                            key={index}
                            onClick={() => deleteSkill(index)}
                          >
                            {jobSkillList[skill]?.label}
                            <span style={{ paddingLeft: '4px' }}>x</span>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                  <div className="set-title">급여</div>
                  <div className="container">
                    <input
                      className="set-input"
                      type="text"
                      min="0"
                      value={inputValue}
                      onChange={handleInputChange}
                      onKeyDown={(e) => handleKeyDownNext(e, headcountRef)}
                    />
                    <span className="unit">{moneyUnit}</span>
                  </div>
                  <div className="set-title">인원수</div>
                  <div className="container">
                    <input
                      ref={headcountRef}
                      className="set-input count"
                      type="number"
                      min="0"
                      value={countValue}
                      onChange={handleCountValue}
                      onKeyDown={(e) => handleKeyDownNext(e, standardRef)}
                    ></input>
                    <span className="unit">명</span>
                  </div>
                  <div className="set-title">직업의 기준</div>
                  <textarea
                    ref={standardRef}
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

                  <ConfirmBtn
                    onClick={addJob}
                    btnName="수정"
                    backgroundColor="#bacd92"
                  ></ConfirmBtn>
                </form>
              )}
            </div>
          ))}
        </div>

        {isAddOpen && (
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
              <select
                className="set-input"
                value={selectedJob}
                onChange={handleSelectChange}
              >
                <option value="" disabled style={{ color: '#a5a5a5' }}>
                  선택해주세요
                </option>
                {jobList.map((job) => (
                  <option key={job.value} value={job.value}>
                    {job.label}
                  </option>
                ))}
              </select>
              <div className="set-title">직업의 역할(복수선택 가능)</div>
              <select
                className="set-input"
                value={selectedJobSkill}
                onChange={handleSelectJobSkill}
                style={{ marginBottom: '0px' }}
              >
                <option value="" disabled style={{ color: '#a5a5a5' }}>
                  선택해주세요
                </option>
                {jobSkillList.map((skill) => (
                  <option key={skill.value} value={skill.value}>
                    {skill.label}
                  </option>
                ))}
              </select>
              <div style={{ fontSize: '12px', margin: '5px' }}>
                {jobSkill.length === 0 ? (
                  <div style={{ marginBottom: '20px' }}></div>
                ) : (
                  jobSkill.map((skill, index) => (
                    <div
                      style={{
                        margin: '5px',
                        padding: '2px',
                        borderBottom: '1px solid rgb(186, 205, 146)',
                        width: 'fit-content',
                        display: 'inline-table',
                      }}
                      key={index}
                      onClick={() => deleteSkill(index)}
                    >
                      {jobSkillList[skill]?.label}
                      <span style={{ paddingLeft: '4px' }}>x</span>
                    </div>
                  ))
                )}
              </div>
              <div className="set-title">급여</div>
              <div className="container">
                <input
                  className="set-input"
                  type="text"
                  min="0"
                  value={inputValue}
                  onChange={handleInputChange}
                />
                <span className="unit">{moneyUnit}</span>
              </div>
              <div className="set-title">인원수</div>
              <div className="container">
                <input
                  className="set-input count"
                  type="number"
                  min="0"
                  value={countValue}
                  onChange={handleCountValue}
                />
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
            <ConfirmBtn
              onClick={addJob}
              btnName="확인"
              backgroundColor="#bacd92"
            ></ConfirmBtn>
          </form>
        )}

        <form>
          <div className="navi-btn">
            <button
              className="next-button"
              type="submit"
              onClick={beforeSetting}
            >
              이전
            </button>
            <button className="next-button" type="submit" onClick={nextSetting}>
              다음
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
//Setting6 - 기본법 설정
export function Setting6() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [laws, setLaws] = useState([]); // 법 리스트
  const [detail, setDetail] = useState(''); // 법 내용
  const [correct, setCorrect] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(true);
  const basicLawState = useSelector((state) => state.setting6);

  useEffect(() => {
    setLaws(basicLawState?.basicLaw);
  }, [basicLawState]);

  const beforeSetting = () => {
    if (laws.length > 0) {
      navigate('/setting/jobList');
      dispatch(basicLaw({ basicLaw: laws }));
    } else {
      toast.error('기본법을 제정하세요', { autoClose: 1300 });
      return;
    }
  };
  const nextSetting = () => {
    if (laws.length > 0) {
      navigate('/setting/taxLaw');
      dispatch(basicLaw({ basicLaw: laws }));
    } else {
      toast.error('기본법을 제정하세요', { autoClose: 1300 });
      return;
    }
  };

  // 법 추가
  const handleAddLaw = () => {
    if (detail.trim() !== '') {
      setLaws([...laws, { detail }]);
      setDetail('');
    }
  };

  const handleEditLaw = (index) => {
    if (selectedIndex === index) {
      setDetail('');
      setSelectedIndex(null);
      setIsAccordionOpen(false);
      setIsAddOpen(true);
    } else {
      const selectedLaw = laws[index].detail;
      setDetail(selectedLaw); //detail에 입력값 넣어주기
      setSelectedIndex(index);
      setIsAccordionOpen(true);
      setIsAddOpen(false);
    }
  };

  const updateLaw = () => {
    const updatedLaws = [...laws];
    updatedLaws[selectedIndex].detail = detail;
    setLaws(updatedLaws);
    setDetail('');
    setSelectedIndex(null);
    setIsAddOpen(true);
  };

  // 법 삭제
  const handleDeleteLaw = (index) => {
    const updatedLaws = [...laws];
    updatedLaws.splice(index, 1);
    setLaws(updatedLaws);
    setDetail('');
    setIsAddOpen(true);
    setSelectedIndex(null);
    setIsAccordionOpen(false);
  };

  return (
    <div className="setting-wrap">
      <ToastContainer />

      <div className="title-list">
        <ul className="title-list">
          <li>국가에 필수인 기본법을 제정하세요&#46;</li>
        </ul>
      </div>

      <div className="newsInfo">
        {laws.map((law, index) => (
          <div key={index}>
            <div
              className={`display ${
                isAccordionOpen && selectedIndex === index
                  ? 'accordion-open'
                  : ''
              } ${selectedIndex === index ? 'selected' : ''}`}
              key={index}
              onClick={() => {
                handleEditLaw(index);
              }}
              style={{ fontSize: '14px', color: '#666666' }}
            >
              <div className="law-count">{index + 1}항.</div>
              <div className="law-detail">{law.detail}</div>
              <Arrow stroke="#ddd" className="accArrBtn" />
            </div>
            {isAccordionOpen && selectedIndex === index && (
              <form className="box-style">
                <div className="reset">
                  <div className="set-title">{index + 1}항</div>
                  <img
                    className="delete-btn"
                    src={`${process.env.PUBLIC_URL}/images/icon-delete.png`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteLaw(index);
                    }}
                  />
                </div>
                <input
                  className="law-input"
                  type="text"
                  placeholder="기본 법을 입력해주세요"
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                  style={{
                    imeMode: 'active',
                    fontSize: '14px',
                    color: '#666666',
                  }}
                  onKeyDown={(e) => handleKeyDown(e, updateLaw)}
                />
                <button className="edit-btn" type="button" onClick={updateLaw}>
                  수정
                </button>
              </form>
            )}
          </div>
        ))}
      </div>
      {isAddOpen && (
        <div className="box-style">
          <div className="reset"></div>
          <div className="set-title">{laws.length + 1}항</div>
          <input
            className="law-input"
            type="text"
            placeholder="내용"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            style={{ imeMode: 'active', fontSize: '14px', color: '#666666' }}
            onKeyDown={(e) => handleKeyDown(e, handleAddLaw)}
          />
          <ConfirmBtn
            onClick={handleAddLaw}
            btnName="제정하기"
            backgroundColor="#61759f"
          ></ConfirmBtn>
        </div>
      )}

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
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [taxLawDisplay, setTaxLawDisplay] = useState([]);
  const [division, setDivision] = useState(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(true);
  const moneyUnit = useSelector((state) => state.setting2.moneyUnit);
  const isCustomUnit = selectedUnit === '화폐단위(직접입력)';
  const unitList = [
    { label: `${moneyUnit} (화폐단위)`, value: `${moneyUnit}` },

    { label: `% (월급기준)`, value: '%' },
  ];

  const taxLawState = useSelector((state) => state.setting7);

  const priceRef = useRef(null);

  useEffect(() => {
    setTaxLawDisplay(taxLawState?.taxLaw);
  }, [taxLawState]);

  const handleLawNameValue = (e) => {
    setLawNameValue(e.target.value);
  };

  const handleRateValue = (e) => {
    setRateValue(e.target.value);
  };

  const handleCustomUnit = (e) => {
    setCustomUnit(e.target.value);
  };

  const handleSelectChange = (e) => {
    // %는 0 moneyUnit은 1
    const value = e.target.value;
    setSelectedUnit(value);
  };
  useEffect(() => {
    if (selectedUnit === '%') {
      setDivision(0);
      console.log('%, 0');
    } else {
      setDivision(1);
      console.log('unit, 1');
    }
  }, [selectedUnit]);

  const beforeSetting = () => {
    navigate('/setting/law');
    dispatch(taxLaw({ taxLaw: taxLawDisplay }));
  };
  const nextSetting = () => {
    navigate('/setting/seatRental');
    dispatch(taxLaw({ taxLaw: taxLawDisplay }));
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
    if (selectedIndex !== null) {
      const updatedTaxLaws = [...taxLawDisplay];
      updatedTaxLaws[selectedIndex] = {
        label: newTaxLaw,
        value: newTaxLaw,
        name: lawNameValue,
        rate: rateValue,
        division: division,
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
          division: division,
        },
      ];
      setTaxLawDisplay(newTaxLawDisplay);
    }
    setCustomUnit('');
    setLawNameValue('');
    setRateValue('');
    setSelectedIndex(null);
    setSelectedUnit('');
    setIsAccordionOpen(false);
    setIsAddOpen(true);
  };
  const selectInput = (taxLaw, index) => {
    if (selectedIndex === index) {
      setCustomUnit('');
      setLawNameValue('');
      setRateValue('');
      setSelectedIndex(null);
      setSelectedUnit('');
      setIsAccordionOpen(false);
      setIsAddOpen(true);
    }
    setCustomUnit(taxLaw.label);
    setSelectedUnit(taxLaw.label);
    setRateValue(taxLaw.rate);
    setLawNameValue(taxLaw.name);
    setSelectedIndex(index);
    setIsAccordionOpen(true);
    setIsAddOpen(false);
  };
  const deleteBtn = (index) => (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    const filteredTaxLaws = taxLawDisplay.filter((_, i) => i !== index);
    setTaxLawDisplay(filteredTaxLaws);
    // 초기화
    setCustomUnit('');
    setLawNameValue('');
    setRateValue('');
    setSelectedIndex(null);
    setSelectedUnit('');
  };
  return (
    <div className="setting-wrap">
      <ul className="title-list">
        <li>국가에 필수인 세법을 제정하세요&#46;</li>
        <li>부가 단위는 세율을 계산할 시 사용됩니다&#46;</li>
        <li>
          부가 단위는 직접 설정한 화폐단위 혹은 % 로 설정할 수 있습니다&#46;
        </li>
        <li>월마다 부과됩니다&#46;</li>
      </ul>

      <div>
        {taxLawDisplay.map((taxLaw, index) => (
          <div key={index}>
            <div
              className={`display ${
                isAccordionOpen && selectedIndex === index
                  ? 'accordion-open'
                  : ''
              } ${selectedIndex === index ? 'selected' : ''}`}
              key={index}
              onClick={() => selectInput(taxLaw, index)}
              style={{ fontSize: '14px', color: '#666666' }}
            >
              {taxLaw.name} {taxLaw.rate}
              {taxLaw.label}
              <Arrow stroke="#ddd" className="accArrBtn" />
            </div>
            {isAccordionOpen && selectedIndex === index && (
              <form className="box-style">
                <img
                  className="deleteBtn"
                  src={`${process.env.PUBLIC_URL}/images/icon-delete.png`}
                  onClick={deleteBtn(index)}
                />
                <div className="reset">
                  <div className="set-title">세금명</div>
                </div>
                <input
                  type="text"
                  className="set-input"
                  value={lawNameValue}
                  onChange={handleLawNameValue}
                  style={{ imeMode: 'active' }}
                  onKeyDown={(e) => handleKeyDownNext(e, priceRef)}
                />
                <div className="set-title">금액</div>
                <input
                  ref={priceRef}
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
                    onChange={handleSelectChange}
                  >
                    <option value="" disabled style={{ color: '#a5a5a5' }}>
                      선택 및 입력해주세요
                    </option>
                    {unitList.map((taxLaw) => (
                      <option key={taxLaw.value} value={taxLaw.value}>
                        {taxLaw.label}
                      </option>
                    ))}
                  </select>
                )}
                <ConfirmBtn
                  onClick={addTaxLaw}
                  btnName="수정"
                  backgroundColor="#bacd92"
                ></ConfirmBtn>
              </form>
            )}
          </div>
        ))}
      </div>
      {isAddOpen && (
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
            onKeyDown={(e) => handleKeyDownNext(e, priceRef)}
          />
          <div className="set-title">금액</div>
          <input
            ref={priceRef}
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
              onChange={handleSelectChange}
            >
              <option value="" disabled style={{ color: '#a5a5a5' }}>
                선택 및 입력해주세요
              </option>
              {unitList.map((taxLaw) => (
                <option key={taxLaw.value} value={taxLaw.value}>
                  {taxLaw.label}
                </option>
              ))}
            </select>
          )}
          <ConfirmBtn
            onClick={addTaxLaw}
            btnName="확인"
            backgroundColor="#bacd92"
          ></ConfirmBtn>
        </form>
      )}

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
  const moneyUnit = useSelector((state) => state.setting2.moneyUnit);
  const [taxName, setTaxName] = useState(null);
  const [fee, setFee] = useState('');

  const setRentalFeeState = useSelector((state) => state.setting8);

  const taxPrice = useRef(null);

  useEffect(() => {
    setTaxName(setRentalFeeState?.taxName);
    setFee(setRentalFeeState?.fee);
  }, [setRentalFeeState]);
  const beforeSetting = () => {
    navigate('/setting/taxLaw');
    dispatch(
      seatRentalFee({
        taxName: taxName === null ? '자리임대료' : taxName,
        fee: fee,
      })
    );
  };
  const nextSetting = () => {
    navigate('/setting/fine');
    if (taxName === null) {
      setTaxName('자리임대료');
    }
    dispatch(
      seatRentalFee({
        taxName: taxName,
        fee: fee,
      })
    );
  };
  return (
    <div className="setting-wrap">
      <ul className="title-list">
        <li>자리 임대료를 설정하세요&#46;</li>
        <li>월마다 부과됩니다&#46;</li>
      </ul>

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
            placeholder="자리임대료"
            style={{ imeMode: 'active' }}
            onKeyDown={(e) => handleKeyDownNext(e, taxPrice)}
          />
        </div>
        <div className="set-country">
          <div className="set-country-title set-title">금액</div>
          <input
            ref={taxPrice}
            className="set-country-detail"
            type="number"
            value={fee}
            min="0"
            onChange={(e) => {
              setFee(e.target.value);
            }}
            onKeyDown={(e) => handleKeyDown(e, nextSetting)}
          />
        </div>
        <div className="set-country">
          <div className="set-country-title set-title">부가 단위</div>
          <input
            className="set-country-detail"
            type="text"
            value={moneyUnit}
            disabled
          />
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
//Setting9 - 과태료 설정 (3)
export function Setting9() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [reasonFine, setReasonFine] = useState('');
  const [fineValue, setFineValue] = useState('');
  const [fineList, setFineList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(true);
  const moneyUnit = useSelector((state) => state.setting2.moneyUnit);

  const priceRef = useRef(null);

  const beforeSetting = () => {
    navigate('/setting/seatRental');
  };

  const finishSetting = async () => {
    dispatch(Fine({ fine: fineList }));
    setIsLoading(true);
  };

  const handleAddFine = () => {
    if (!reasonFine || !fineValue) {
      toast('모든 값을 입력해주세요');
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
    setReasonFine('');
    setFineValue('');
    setSelectedIndex(null);
    setIsAccordionOpen(false);
    setIsAddOpen(true);
  };
  const selectInput = (fine, index) => {
    if (selectedIndex === index) {
      setSelectedIndex(null);
      setReasonFine('');
      setFineValue('');
      setIsAccordionOpen(false);
      setIsAddOpen(true);
    } else {
      setFineValue(fine.fine);
      setReasonFine(fine.reason);
      setSelectedIndex(index);
      setIsAccordionOpen(true);
      setIsAddOpen(false);
    }
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
        <div>
          <ul className="title-list">
            <li>국가에 필수인 과태료를 제정하세요&#46;</li>
            <li>특수 상황에만 부과됩니다&#46;</li>
          </ul>

          <div>
            {fineList.map((fine, index) => (
              <div key={index}>
                <div
                  className={`display ${
                    isAccordionOpen && selectedIndex === index
                      ? 'accordion-open'
                      : ''
                  } ${selectedIndex === index ? 'selected' : ''}`}
                  onClick={() => selectInput(fine, index)}
                  style={{ fontSize: '13px', color: '#666666' }}
                >
                  {fine.reason} {fine.fine}
                  {moneyUnit}
                  <Arrow stroke="#ddd" className="accArrBtn" />
                </div>
                {isAccordionOpen && selectedIndex === index && (
                  <form className="box-style">
                    <img
                      className="deleteBtn"
                      src={`${process.env.PUBLIC_URL}/images/icon-delete.png`}
                      onClick={deleteBtn(index)}
                    />
                    <div className="reset">
                      <div className="set-title">과태료 사유</div>
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
                      onKeyDown={(e) => handleKeyDownNext(e, priceRef)}
                    />

                    <div className="set-title">금액</div>
                    <input
                      ref={priceRef}
                      className="set-input"
                      type="number"
                      min="0"
                      value={fineValue}
                      onChange={(e) => {
                        setFineValue(e.target.value);
                      }}
                      onKeyDown={(e) => handleKeyDown(e, handleAddFine)}
                    />

                    <div className="set-title">단위</div>

                    <input
                      className="set-input"
                      type="text"
                      value={moneyUnit}
                      disabled
                    />

                    <ConfirmBtn
                      onClick={handleAddFine}
                      btnName="수정"
                      backgroundColor="#bacd92"
                    ></ConfirmBtn>
                  </form>
                )}
              </div>
            ))}
          </div>
          {isAddOpen && (
            <form className="box-style">
              <div className="reset">
                <div className="set-title">과태료 사유</div>
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
                onKeyDown={(e) => handleKeyDownNext(e, priceRef)}
              />
              <div className="set-title">금액</div>
              <input
                ref={priceRef}
                className="set-input"
                type="number"
                min="0"
                value={fineValue}
                onChange={(e) => {
                  setFineValue(e.target.value);
                }}
                style={{ imeMode: 'active' }}
                onKeyDown={(e) => handleKeyDown(e, handleAddFine)}
              />

              <div className="set-title">단위</div>
              <input
                className="set-input"
                type="text"
                value={moneyUnit}
                disabled
              />
              <ConfirmBtn
                onClick={handleAddFine}
                btnName="확인"
                backgroundColor="#bacd92"
              ></ConfirmBtn>
            </form>
          )}
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
