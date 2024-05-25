import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCommaInput } from '../hooks/Utils';
import { ConfirmBtn } from './Btns';
import axios from 'axios';

export default function JobListManager() {
  const { id } = useParams();
  const [inputValue, handleInputChange] = useCommaInput();

  const [selectedJob, setSelectedJob] = useState('');
  const [customJob, setCustomJob] = useState('');
  const [standardValue, setStandardValue] = useState('');
  const [jobRoleValue, setJobRoleValue] = useState('');
  const [jobsDisplay, setJobsDisplay] = useState([]);
  const [countValue, setCountValue] = useState('');
  const [selectedJobIndex, setSelectedJobIndex] = useState(null);
  const [jobSkill, setJobSkill] = useState([]); //skill 번호
  const [selectedJobSkill, setSelectedJobSkill] = useState('');
  const [unit, setUnit] = useState('');

  useEffect(() => {
    if (selectedJobSkill !== '') {
      setJobSkill([...jobSkill, Number(selectedJobSkill)]);
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
        skills: jobSkill,
      };
      setJobsDisplay(updatedJobs);
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
    setJobSkill([job.skills]);
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
  const deleteSkill = (index) => {
    const updatedSkill = [...jobSkill];
    updatedSkill.splice(index, 1);
    setJobSkill(updatedSkill);
  };

  //단위 불러오기
  const getUnit = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_HOST}/api/bank/unit/${id}`,
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });
      if (res.data.success) {
        setUnit(res.data.result);
      }
    } catch (error) {
      console.log('화폐단위 불러오는데 실패', error);
    }
  };
  useEffect(() => {
    getUnit();
  }, []);

  return (
    <div className="setting-wrap">
      <div>
        {jobsDisplay.map((job, index) => (
          <div
            className="display"
            key={index}
            onClick={() => selectInput(job, index)}
          >
            {job.selectValue === '직접입력' ? job.customValue : job.selectValue}{' '}
            {job.count}명
            {/* <button
              className="updateBtn"
              key={index}
              onClick={() => selectInput(job, index)}
            >
              수정
            </button> */}
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
            <option value="" disabled selected style={{ color: '#a5a5a5' }}>
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
            <option value="" disabled selected style={{ color: '#a5a5a5' }}>
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
            />
            <span className="unit">{unit.unit}</span>
          </div>
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
        <ConfirmBtn
          onClick={addJob}
          btnName="확인"
          backgroundColor="#bacd92"
        ></ConfirmBtn>
      </form>
    </div>
  );
}
