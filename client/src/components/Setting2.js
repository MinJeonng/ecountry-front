import React from 'react';

import InputContainer from '../components/InputContainer';

import '../styles/Setting2.scss';
import '../styles/background.scss';
import Background from './Background';

export default function Setting2() {
  const days = Array.from({ length: 31 }, (_, index) => index + 1);

  return (
    <div>
      <Background />
      <div>국가 이름 &#47; 화폐 단위 &#47; 금여 지급일 설정</div>
      <ul className="title-list">
        <li>국가의 이름과 화폐 단위&#44; 급여 지급일을 설정하세요&#46;</li>
      </ul>
      <InputContainer />
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

        <button>다음</button>
      </form>
    </div>
  );
}
