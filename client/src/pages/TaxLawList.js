import React from 'react';

import Template from '../components/Template';
import { PageHeader } from '../components/Headers';
import { TaxLaw } from '../components/TaxLaw';
import { ManagerHeader } from '../components/ManagerHeader';

export default function TaxLawList({ position }) {
  return (
    <>
      <ManagerHeader />
      <Template
        isAuthPage2={true}
        childrenTop={<PageHeader>{position}</PageHeader>}
        childrenBottom={<>{position === '세법 관리' && <TaxLaw />}</>}
      />
    </>
  );
}
