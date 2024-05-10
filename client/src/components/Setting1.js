import React, { useState } from 'react';

import '../styles/_input_common.scss';
import '../styles/background.scss';
import '../styles/Setting1.scss';

export default function Setting1() {
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
