import React, { useEffect, useState } from 'react';
import Template from '../components/Template';
import { PageHeader } from '../components/Headers';
import { StudentAssemblyLawList } from '../components/StudentAssemblyLawList';
import { ChatBotBtn, LoginBtn } from '../components/Btns';
import { StudentHeader } from '../components/StudentHeader';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authFunc, confirmCountry } from '../hooks/Functions';
import { ToastContainer } from 'react-toastify';

export function StudentAssembly({ position }) {
  const { id } = useParams();
  const [loginBtn, setLoginBtn] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const userInfo = useSelector((state) => state.auth);

  const showItem = () => {
    setIsShow(true);
  };

  useEffect(() => {
    if (authFunc()) {
      confirmCountry(id, userInfo, showItem);
    } else {
      setLoginBtn(true);
    }
  }, [userInfo]);
  return (
    <>
      <ToastContainer />
      {loginBtn && <LoginBtn />}
      <StudentHeader />
      {isShow && (
        <Template
          isAuthPage2={true}
          childrenTop={<PageHeader>{position}</PageHeader>}
          childrenBottom={
            <>
              {/* 법 리스트 */}
              {position === '국회' && <StudentAssemblyLawList />}
              <ChatBotBtn />
            </>
          }
        />
      )}
    </>
  );
}
