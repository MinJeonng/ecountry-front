//국민리스트
import { SetPeopleList } from '../components/PeopleList';
import Template from '../components/Template';

import '../styles/_input_common.scss';
import '../styles/setting.scss';
import '../styles/_button_common.scss';
import { PageHeader } from '../components/Headers';
import { useParams } from 'react-router-dom';
import { ManagerHeader } from '../components/ManagerHeader';
import { ChatBotBtn, LoginBtn } from '../components/Btns';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { authFunc, confirmCountry } from '../hooks/Functions';
import { ToastContainer } from 'react-toastify';

export default function PeopleList({ position }) {
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
            <PageHeader path={`/${id}/manager`}>{'국민 리스트'}</PageHeader>
          }
          childrenBottom={
            <>
              <SetPeopleList />
              <ChatBotBtn />
            </>
          }
        />
      )}
    </>
  );
}
