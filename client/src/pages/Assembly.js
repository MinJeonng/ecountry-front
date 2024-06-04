import Template from '../components/Template';
import { AssemblyLawList } from '../components/AssemblyLawList';
import { PageHeader } from '../components/Headers';
import { ManagerHeader } from '../components/ManagerHeader';
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 5d705fb38cec68b88d14dbf463d0efb1b1f91e52
import { ChatBotBtn, LoginBtn } from '../components/Btns';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { authFunc, confirmCountry } from '../hooks/Functions';
import { ToastContainer } from 'react-toastify';
<<<<<<< HEAD
=======
import { ChatBotBtn } from '../components/Btns';
>>>>>>> 1f0431a1c9e86efacf48bcfa96834ad3fcd2fb28
=======
>>>>>>> 5d705fb38cec68b88d14dbf463d0efb1b1f91e52

//국회
export function SetAssembly({ position }) {
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
          childrenTop={<PageHeader>{position}</PageHeader>}
          childrenBottom={
            <>
              {/* 법 리스트 */}
              {position == '국회' && <AssemblyLawList />}
              <ChatBotBtn />
            </>
          }
        />
      )}
    </>
  );
}
