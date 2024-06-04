//국민신문고
import Template from '../components/Template';
import { BoardPeopleList } from '../components/BoardPeople';
import { BoardPeopleWrite } from '../components/BoardPeopleWrite';
import { BoardPeopleRead } from '../components/BoardPeopleRead';
import { PageHeader } from '../components/Headers';

import { StudentHeader } from '../components/StudentHeader';

import { useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import { LoginBtn } from '../components/Btns';
import { authFunc, confirmCountry } from '../hooks/Functions';
import { useSelector } from 'react-redux';

export function SetBoardPeople({ position }) {
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
      <StudentHeader />

      <ToastContainer />
      {loginBtn && <LoginBtn />}

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
              {position === '신문고' && <BoardPeopleList />}
              {position === '신문고 글쓰기' && <BoardPeopleWrite />}
              {position === '신문고 리스트' && <BoardPeopleRead />}
            </>
          }
        />
      )}
    </>
  );
}
