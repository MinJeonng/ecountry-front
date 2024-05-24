import React from 'react';
import { ConfirmBtn } from './Btns';

import '../styles/setting.scss';

export default function RevenuCollect() {
  // 학생리스트 사유-징수금 선택해서 징수할 수 있게 만들면됨...
  // 학생리스트
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div
          className="newsHead"
          style={{ color: '#666666', marginBottom: '10px' }}
        >
          과태료 징수
        </div>
      </div>
      <div
        style={{ borderBottom: '2px solid #bacd92', marginBottom: '10%' }}
      ></div>
      <form className="box-style">
        <div className="set-title">징수 대상자</div>
        <select
          style={{
            width: '100%',
            height: '30px',
            border: 'none',
            backgroundColor: '#f5f6f6',
            borderBottom: '1px solid #e9ae24',
            paddingBottom: '20px',
            margin: '10px 0 20px 0',
            outline: 'none',
          }}
        ></select>
        <div className="set-title">징수 사유</div>
        <select
          style={{
            width: '100%',
            height: '30px',
            border: 'none',
            backgroundColor: '#f5f6f6',
            borderBottom: '1px solid #e9ae24',
            paddingBottom: '20px',
            margin: '10px 0 20px 0',
            outline: 'none',
          }}
        ></select>
        <div className="set-title">징수 금액</div>
        <div
          style={{
            width: '100%',
            height: '30px',
            border: 'none',
            backgroundColor: '#f5f6f6',
            borderBottom: '1px solid #e9ae24',
            // paddingBottom: '20px',
            margin: '10px 0 20px 0',
            position: 'relative',
          }}
        >
          <span>10000</span>
          <span
            style={{
              color: '#a5a5a5',
              fontSize: '14px',
              position: 'absolute',
              right: 0,
              marginRight: '9%',
            }}
          >
            단위
          </span>
        </div>
      </form>
      <ConfirmBtn btnName="징수" backgroundColor="#61759f"></ConfirmBtn>
    </>
  );
}
