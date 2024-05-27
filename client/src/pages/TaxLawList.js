import React from 'react';

import Template from '../components/Template';
import { PageHeader } from '../components/Headers';
import { TaxLaw } from '../components/TaxLaw';

export default function TaxLawList({ position }) {
  return (
    <Template
      childrenTop={<PageHeader>{position}</PageHeader>}
      childrenBottom={<>{position === '세법 관리' && <TaxLaw />}</>}
    />
  );
}
