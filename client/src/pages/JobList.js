import React from 'react';
import Template from '../components/Template';
import JobListManager from '../components/JobListManager';
import { PageHeader } from '../components/Headers';

export default function JobList() {
  return (
    <Template
      childrenTop={<PageHeader>{'직업 설정'}</PageHeader>}
      childrenBottom={<JobListManager />}
    ></Template>
  );
}
