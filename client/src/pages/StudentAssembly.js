import React from 'react';
import Template from '../components/Template';
import { PageHeader } from '../components/Headers';
import { StudentAssemblyLawList } from '../components/StudentAssemblyLawList';

export function StudentAssembly({ position }) {
  return (
    <>
      <Template
        childrenTop={<PageHeader>{position}</PageHeader>}
        childrenBottom={
          <>
            {/* 법 리스트 */}
            {position == '국회' && <StudentAssemblyLawList />}
          </>
        }
      />
    </>
  );
}
