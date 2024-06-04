import React from 'react';
import Template from '../components/Template';
import { PageHeader } from '../components/Headers';
import { StudentAssemblyLawList } from '../components/StudentAssemblyLawList';
import { ChatBotBtn } from '../components/Btns';
import { StudentHeader } from '../components/StudentHeader';

export function StudentAssembly({ position }) {
  return (
    <>
      <StudentHeader />
      <Template
        isAuthPage2={true}
        childrenTop={<PageHeader>{position}</PageHeader>}
        childrenBottom={
          <>
            {/* 법 리스트 */}
            {position === '국회' && <StudentAssemblyLawList />}
            <ChatBotBtn />
          </>
        }
      />
    </>
  );
}
