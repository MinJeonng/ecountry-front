import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Template from '../components/Template';
import { PageHeader } from '../components/Headers';

export function ChangePassword() {
  const { id } = useParams();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const navigate = useNavigate();

  //   const handleChangePassword = () => {};

  const handlePrevPage = () => {
    navigate(-1);
  };

  return (
    <Template
      childrenTop={<PageHeader>{'마이페이지'}</PageHeader>}
      childrenBottom={
        <div className="box-style">
          <div className="user-signup-title">새 비밀번호</div>
          <input
            className="user-signup"
            type="password"
            value={newPassword}
            maxLength={4}
            onChange={(e) => setNewPassword(e.target.value)}
          ></input>
          <div className="user-signup-title">새 비밀번호 확인</div>
          <input
            className="user-signup"
            type="password"
            maxLength={4}
            onChange={(e) => setConfirmPw(e.target.value)}
          ></input>
          {confirmPw === newPassword || (
            <div className="pw-error">비밀번호가 일치하지 않습니다.</div>
          )}
          <div className="btns">
            <button className="change-btn">변경</button>
            <button className="cancelChange-btn" onClick={handlePrevPage}>
              취소
            </button>
          </div>
        </div>
      }
    />
  );
}
