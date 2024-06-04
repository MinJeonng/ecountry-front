import { PageHeader } from '../components/Headers';
import { OwnAccount } from '../components/StudentBank';
import Template from '../components/Template';
import { TransHistory } from '../components/StudentBankTransHistory';
import { ChatBotBtn } from '../components/Btns';
import { StudentHeader } from '../components/StudentHeader';

export default function StudentBank({ position }) {
  return (
    <>
      <StudentHeader />
      <Template
        isAuthPage2={true}
        childrenTop={
          <>
            <PageHeader>{position}</PageHeader>
          </>
        }
        childrenBottom={
          <>
            {position === '은행' && <OwnAccount />}
            {position === '거래 내역' && <TransHistory />}
            <ChatBotBtn />
          </>
        }
      />
    </>
  );
}
