import { AddSavings } from '../components/BankManager';
import Template from '../components/Template';

import '../styles/_input_common.scss';
import '../styles/setting.scss';
import '../styles/_button_common.scss';
import { PageHeader } from '../components/Headers';
import { ManagerHeader } from '../components/ManagerHeader';
import { ChatBotBtn } from '../components/Btns';
import { useParams } from 'react-router-dom';

export default function SetBank({ position }) {
  const { id } = useParams();

  return (
    <>
      <ManagerHeader />
      <Template
        isAuthPage2={true}
        childrenTop={
          <PageHeader path={`/${id}/manager`}>{position}</PageHeader>
        }
        childrenBottom={
          <>
            {position === '적금 상품' && <AddSavings />}
            <ChatBotBtn />
          </>
        }
      />
    </>
  );
}
