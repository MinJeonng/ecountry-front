import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Template from '../components/Template';
import { PageHeader } from '../components/Headers';

export function ChangePassword() {
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
        </>
      }
    />
  );
}
