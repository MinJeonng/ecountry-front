import React, { useEffect, useState } from 'react';
import { AddInvestment } from '../components/InvestmentManager';
import { CheckInvestment } from '../components/Investment';
import Template from '../components/Template';
import { CommonMainDesktopHeader, PageHeader } from '../components/Headers';
import { ManagerHeader } from '../components/ManagerHeader';
import { StudentHeader } from '../components/StudentHeader';

import '../styles/_input_common.scss';
import '../styles/setting.scss';
import '../styles/_button_common.scss';

import { ChatBotBtn, LoginBtn } from '../components/Btns';
import { useSelector } from 'react-redux';
import { authFunc, confirmCountry, errorMsg } from '../hooks/Functions';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export default function SetInvestment({ position }) {
  const { id } = useParams();
  const [loginBtn, setLoginBtn] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const userInfo = useSelector((state) => state.auth);

  const showItem = () => {
    setIsShow(true);
  };

  useEffect(() => {
    if (position === '투자 상품 관리' && userInfo?.isStudent) {
      errorMsg('선생님만 접근 가능한 페이지입니다.', `/${id}/main`);
      return;
    }
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
      {position === '투자 상품 관리' ? (
        <ManagerHeader />
      ) : (
        <CommonMainDesktopHeader />
      )}
      {isShow && (
        <Template
          isAuthPage2={true}
          childrenTop={
            <>
              <PageHeader>{position}</PageHeader>
            </>
          }
          childrenBottom={
            <>
              {position === '투자 상품 관리' && <AddInvestment />}
              {position === '투자 상품 확인' && <CheckInvestment />}
              <ChatBotBtn />
            </>
          }
        />
      )}
    </>
  );
}
