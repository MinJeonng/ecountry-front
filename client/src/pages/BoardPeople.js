//국민신문고
import Template from '../components/Template';
import { BoardPeopleList } from '../components/BoardPeople';
import { BoardPeopleWrite } from '../components/BoardPeopleWrite';
import { BoardPeopleRead } from '../components/BoardPeopleRead';
import { PageHeader } from '../components/Headers';
import { useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import { LoginBtn } from '../components/Btns';
import { authFunc, confirmCountry } from '../hooks/Functions';
export function SetBoardPeople({ position }) {
  const { id } = useParams();
  const [loginBtn, setLoginBtn] = useState(false);
  const [userInfo, setUserInfo] = useAuth(id);

  useEffect(() => {
    if (userInfo) {
      confirmCountry(id, userInfo, null);
    }
  }, [userInfo]);

  useEffect(() => {
    if (authFunc()) {
      setUserInfo();
    } else {
      setLoginBtn(true);
    }
  }, []);

  return (
    <>
      <ToastContainer />
      {loginBtn && <LoginBtn />}
      <Template
        childrenTop={
          <>
            <PageHeader>{position}</PageHeader>
          </>
        }
        childrenBottom={
          <>
            {position === '신문고' && <BoardPeopleList />}
            {position === '신문고 글쓰기' && <BoardPeopleWrite />}
            {position === '신문고 리스트' && (
              <BoardPeopleRead userinfo={userInfo} />
            )}
          </>
        }
      />
    </>
  );
}
