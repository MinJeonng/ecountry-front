import React from 'react';

import { Link } from 'react-router-dom';

export default function NationBuilding() {
  return (
    <div>
      <div className="background2">
        <div className="logo-wrap">
          <span className="logo-img">logo</span>
          <span className="logo-title">자라나라 경제나라</span>
        </div>
        <div className="button-wrap2">
          <Link to="/setting/schoolInfo">
            <button className="big-button">국가 생성</button>
          </Link>

          <Link to="/countryList">
            <button className="big-button">국가 목록</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
