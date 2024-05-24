import React from 'react';
import Template from '../components/Template';
import JobListManager from '../components/JobListManager';

export default function JobList() {
  return <Template childrenBottom={<JobListManager />}></Template>;
}
