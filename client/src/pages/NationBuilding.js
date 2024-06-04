import React from 'react';

import { Link } from 'react-router-dom';

export default function NationBuilding() {
  return (
    <div>
      <div className="background2">
        <div className="logo-wrap">
          <img
            src={`${process.env.PUBLIC_URL}/images/logo-defaultImg.jpg`}
            alt="로고"
          />
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

      <div className="pc-background-log">
        <div className="pc-left">
          <img
            className="left-img"
            src={`${process.env.PUBLIC_URL}/images/sample.jpg`}
            alt="표지"
          />
        </div>
        <div className="pc-right">
          <div className="logo-wrap">
            <img
              src={`${process.env.PUBLIC_URL}/images/logo-defaultImg.jpg`}
              alt="로고"
            />
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
    </div>
  );
}
