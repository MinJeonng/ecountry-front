import React from 'react';

import Template from '../components/Template';
import '../styles/studentMypage.scss';
import { StudentIdCard } from '../components/StudentIdCard';
import { PageHeader } from '../components/Headers';

export default function StudentMyPage() {
  return (
    <Template
      childrenTop={<PageHeader>{'마이페이지'}</PageHeader>}
      childrenBottom={
        <>
          <button>비밀번호 변경</button>
          <StudentIdCard />
        </>
      }
    />
  );
}
