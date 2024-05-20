import React from 'react';

export default function StudentIdCard() {
  return (
    <div className="idCard-wrap">
      <div className="idCard-title">신분증</div>
      <div className="idCard-list">
        <div>이미지</div>
        <div className="idCard-detail">
          <div className="idCard-detail-title">홍길동</div>
          <div className="idCard-detail-list">
            <span className="idCard-detail-title">직업</span>
            <span className="idCard-detail-content">직업종류</span>
          </div>
          <div className="idCard-detail-list">
            <span className="idCard-detail-title">신용등급</span>
            <span className="idCard-detail-content">1등급</span>
          </div>
        </div>
      </div>
    </div>
  );
}
