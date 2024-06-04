import { PageHeader } from '../components/Headers';
import { OwnAccount } from '../components/StudentBank';
import Template from '../components/Template';
import { TransHistory } from '../components/StudentBankTransHistory';
import { ChatBotBtn, LoginBtn } from '../components/Btns';
import { StudentHeader } from '../components/StudentHeader';
import { ToastContainer } from 'react-toastify';
import { authFunc, confirmCountry } from '../hooks/Functions';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function StudentBank({ position }) {
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
      )}
    </>
  );
}
