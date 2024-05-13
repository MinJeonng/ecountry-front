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
          <button className="big-button">
            <Link to="/setting/schoolInfo">국가 생성</Link>
          </button>
          <button className="big-button">
            <Link to="/user/countryList">국가 목록</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
