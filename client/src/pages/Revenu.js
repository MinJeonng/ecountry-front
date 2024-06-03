//국세청
import React from 'react';
import Template from '../components/Template';
import Revune from '../components/Revune';

import { PageHeader } from '../components/Headers';
import { ChatBotBtn } from '../components/Btns';
import { StudentHeader } from '../components/StudentHeader';

export default function Revenu({ position }) {
  return (
    <>
      <StudentHeader />
      <Template
        isAuthPage2={true}
        childrenTop={<PageHeader>{position}</PageHeader>}
        childrenBottom={
          <>
            {position === '국세청' && <Revune />}
            <ChatBotBtn />
          </>
        }
      />
    </>
  );
}
