import React from 'react';
import Template from '../components/Template';
import JobListManager from '../components/JobListManager';
import { PageHeader } from '../components/Headers';
import { ManagerHeader } from '../components/ManagerHeader';

export default function JobList() {
  return (
    <>
      <ManagerHeader />
      <Template
        isAuthPage2={true}
        childrenTop={<PageHeader>{'직업 설정'}</PageHeader>}
        childrenBottom={<JobListManager />}
      ></Template>
    </>
  );
}
