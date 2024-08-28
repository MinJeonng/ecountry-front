import { AddSavings } from '../components/BankManager';
import Template from '../components/Template';

import '../styles/_input_common.scss';
import '../styles/setting.scss';
import '../styles/_button_common.scss';
import { CommonMainDesktopHeader, PageHeader } from '../components/Headers';
import { ManagerHeader } from '../components/ManagerHeader';
import { ChatBotBtn, LoginBtn } from '../components/Btns';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { authFunc, confirmCountry } from '../hooks/Functions';

export default function SetBank({ position }) {
  const { id } = useParams();
  const [loginBtn, setLoginBtn] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const userInfo = useSelector((state) => state.auth);

  const showItem = () => {
    setIsShow(true);
  };

  useEffect(() => {
    if (authFunc()) {
      confirmCountry(id, userInfo, showItem, true);
    } else {
      setLoginBtn(true);
    }
  }, [userInfo]);

  return (
    <>
      <ToastContainer />
      <ManagerHeader />

      {loginBtn && <LoginBtn />}
      {isShow && (
        <Template
          isAuthPage2={true}
          childrenTop={
            <PageHeader path={`/${id}/manager`}>{position}</PageHeader>
          }
          childrenBottom={
            <>
              {/* 이동 */}
              {position === '적금 상품' && <AddSavings />}
              <ChatBotBtn />
            </>
          }
        />
      )}
    </>
  );
}
