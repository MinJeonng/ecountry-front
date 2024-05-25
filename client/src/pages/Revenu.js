//국세청
import React from 'react';
import Template from '../components/Template';
import Revune from '../components/Revune';
import RevenuCollect from '../components/RevenuCollect';
import { PageHeader } from '../components/Headers';

export default function Revenu({ position }) {
  return (
    <>
      <Template
        childrenTop={<PageHeader>{position}</PageHeader>}
        childrenBottom={
          <>
            {position === '국세청' && <Revune />}
            {position === '과태료징수' && <RevenuCollect />}
          </>
        }
      />
    </>
  );
}
