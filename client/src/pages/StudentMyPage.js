import React, { useState } from 'react';
import axios from 'axios';

import '../styles/studentMypage.scss';

import Template from '../components/Template';
import { StudentIdCard } from '../components/StudentIdCard';
import { PageHeader } from '../components/Headers';
import { StudentPayStub } from './StudentPayStub';
import { useParams } from 'react-router-dom';

export default function StudentMyPage() {
  const { id } = useParams();

  const [isChangePassword, setIschangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = () => {
    setIschangePassword(true);
  };

  return (
    <Template
      childrenTop={<PageHeader>{'마이페이지'}</PageHeader>}
      childrenBottom={
        <>
          {isChangePassword ? (
            <div className="changePassword-wrap">
              <input
                className="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="새 비밀번호"
              />
              <button className="change-btn">변경</button>
              <button
                className="cancelChange-btn"
                onClick={() => setIschangePassword(false)}
              >
                취소
              </button>
            </div>
          ) : (
            <button
              className="changePassword-btn"
              onClick={handleChangePassword}
            >
              비밀번호 변경
            </button>
          )}
          <StudentIdCard />
          <StudentPayStub />
        </>
      }
    />
  );
}
