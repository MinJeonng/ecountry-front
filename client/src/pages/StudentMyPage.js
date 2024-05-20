import React from 'react';

import Template from '../components/Template';
import '../styles/studentMypage.scss';
import StudentIdCard from '../components/StudentIdCard';

export default function StudentMyPage() {
  return (
    <Template
      childrenTop={<div className="top-title">마이페이지</div>}
      childrenBottom={
        <>
          <button>비밀번호 변경</button>
          <StudentIdCard />
        </>
      }
    />
  );
}
