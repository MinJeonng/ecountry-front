import React from 'react';

import '../styles/studentMypage.scss';
<<<<<<< HEAD
import { StudentIdCard } from '../components/StudentIdCard';
import { PageHeader } from '../components/Headers';
=======

import Template from '../components/Template';
import StudentIdCard from '../components/StudentIdCard';
>>>>>>> 13ccc356f30708563d3f0f0ec1b74e6939bec396

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
