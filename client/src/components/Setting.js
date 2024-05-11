import React, { useState } from 'react';

import '../styles/_input_common.scss';
import '../styles/background.scss';
// import '../styles/Setting1.scss';
// import '../styles/Setting2.scss';
// import '../styles/setting4.scss';

export function Setting1() {
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
      </form>
    </div>
  );
}

export function Setting2() {
  const days = Array.from({ length: 31 }, (_, index) => index + 1);

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
      </form>
    </div>
  );
}

export function Setting3() {
  return (
    <>
      <div className="title-wrap">
        <div className="title">학생 파일 업로드</div>
        <ul>
          <li>아래의 정해진 양식(엑셀)에 따라 학생 파일을 업로드 하세요.</li>
          <li>
            만약 엑셀 업로드가 불가할 경우 직접 입력 버튼을 눌러 학생 정보를
            기입할 수 있습니다.
          </li>
        </ul>
      </div>
    </>
  );
}

export function Setting4() {
  return (
    <>
      <div className="title-list">
        <div>자리 배치도</div>
        <ul className="title-list">
          <li>교실 내의 자리 배치를 설정하세요&#46;</li>
        </ul>
      </div>
    </>
  );
}

export function Setting5() {
  return (
    <>
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
    </>
  );
}

export function Setting6() {
  return (
    <>
      <div className="title-list">
        <div>기본법 제정</div>
        <ul className="title-list">
          <li>국가에 필수인 기본법을 제정하세요&#46;</li>
        </ul>
      </div>
    </>
  );
}
