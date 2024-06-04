import { AddSavings } from '../components/BankManager';
import Template from '../components/Template';

import '../styles/_input_common.scss';
import '../styles/setting.scss';
import '../styles/_button_common.scss';
import { PageHeader } from '../components/Headers';
import { ManagerHeader } from '../components/ManagerHeader';
import { ChatBotBtn } from '../components/Btns';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { getExpire } from '../hooks/Functions';

export default function SetBank({ position }) {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!getExpire()) {
      toast.error('로그인 후 이용 가능합니다.', { autoClose: 1300 });
      setTimeout(() => navigate('/login'), 1300);
    }
  }, []);

  return (
    <>
      <ToastContainer />
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
