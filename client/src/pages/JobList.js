import React, { useEffect, useState } from 'react';
import Template from '../components/Template';
import JobListManager from '../components/JobListManager';
import { PageHeader } from '../components/Headers';
import { ManagerHeader } from '../components/ManagerHeader';
import { ChatBotBtn, LoginBtn } from '../components/Btns';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authFunc, confirmCountry } from '../hooks/Functions';
import { ToastContainer } from 'react-toastify';

export default function JobList() {
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
      {loginBtn && <LoginBtn />}
      <ManagerHeader />
      {isShow && (
        <Template
          isAuthPage2={true}
          childrenTop={<PageHeader>{'직업 설정'}</PageHeader>}
          childrenBottom={
            <>
              <JobListManager />
              <ChatBotBtn />
            </>
          }
        ></Template>
      )}
    </>
  );
}
