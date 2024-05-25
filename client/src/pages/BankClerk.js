//은행원 페이지

import { PageHeader } from '../components/Headers';
import { SavingTeller } from '../components/SavingTeller';
import Template from '../components/Template';

export default function BankClerk({ position }) {
  return (
    <Template
      childrenTop={<PageHeader>{position}</PageHeader>}
      childrenBottom={<SavingTeller position="은행원 - 적금" />}
    />
  );
}
