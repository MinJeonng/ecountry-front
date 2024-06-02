import React from 'react';
import Template from '../components/Template';
import JobListManager from '../components/JobListManager';
import { PageHeader } from '../components/Headers';
import { ManagerHeader } from '../components/ManagerHeader';
import { ChatBotBtn } from '../components/Btns';

export default function JobList() {
  return (
    <>
      <ManagerHeader />
       <Template
      childrenTop={<PageHeader>{'직업 설정'}</PageHeader>}
      childrenBottom={
        <>
          <JobListManager />
          <ChatBotBtn />
        </>
      }
    ></Template>
    </>
  );
}
