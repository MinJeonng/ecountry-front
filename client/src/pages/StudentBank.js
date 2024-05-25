import { PageHeader } from '../components/Headers';
import { OwnAccount } from '../components/StudentBank';
import Template from '../components/Template';
import { TransHistory } from '../components/StudentBankTransHistory';

export default function StudentBank({ position }) {
  return (
    <>
      <Template
        childrenTop={
          <>
            <PageHeader>{position}</PageHeader>
          </>
        }
        childrenBottom={
          <>
            {position === '은행' && <OwnAccount />}
            {position === '거래 내역' && <TransHistory />}
            {/* {나중에 적금 추가} */}
          </>
        }
      />
    </>
  );
}
