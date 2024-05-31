import React, { Children, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Template from '../components/Template';
import { PageHeader } from '../components/Headers';
import {
  chatBotList,
  handleKeyDown,
  handleKeyDownNext,
} from '../hooks/Functions';
import { ToastContainer, toast } from 'react-toastify';

export function ChangePassword() {
  const { id } = useParams();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  const navigate = useNavigate();

  const confirmNewPwRef = useRef(null);

  const handleChangePassword = async () => {
    const res = await axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_HOST}/api/student/user`,
      data: { pw: newPassword },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    });
    if (res.data.success) {
      toast.success('비밀번호 변경이 완료되었습니다.', { autoClose: 1300 });
      setTimeout(() => {
        localStorage.removeItem('token');
        navigate(`/${id}/login`);
      }, 1300);
    } else {
      console.log(res.data.message);
      toast.error('비밀번호 변경에 실패했습니다.');
    }
  };

  const handlePrevPage = () => {
      navigate(`/${id}/mypage`);
    };
  return (
    <>
      <ToastContainer />
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
              onKeyDown={(e) => handleKeyDownNext(e, confirmNewPwRef)}
            ></input>
            <div className="user-signup-title">새 비밀번호 확인</div>
            <input
              ref={confirmNewPwRef}
              className="user-signup"
              type="password"
              maxLength={4}
              onChange={(e) => setConfirmPw(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, handleChangePassword)}
            ></input>
            {confirmPw === newPassword || (
              <div className="pw-error">비밀번호가 일치하지 않습니다.</div>
            )}
            <div className="btns">
              <button className="change-btn" onClick={handleChangePassword}>
                변경
              </button>
              <button className="cancelChange-btn" onClick={handlePrevPage}>
                취소
              </button>
            </div>
          </div>
        }
      />
    </>
  );
}
