import { useNavigate, useParams } from 'react-router-dom';

import '../styles/studentMypage.scss';

import Template from '../components/Template';
import { StudentIdCard } from '../components/StudentIdCard';
import { CommonMainDesktopHeader, PageHeader } from '../components/Headers';
import { StudentPayStub } from './StudentPayStub';
import { StudentHeader } from '../components/StudentHeader';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { authFunc, confirmCountry } from '../hooks/Functions';
import { ToastContainer } from 'react-toastify';
import { LoginBtn } from '../components/Btns';
import Footer from '../components/Footer';

export default function StudentMyPage() {
  const { id } = useParams();
  const [loginBtn, setLoginBtn] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth);

  const showItem = () => {
    setIsShow(true);
  };

  const handleChangePassword = () => {
    navigate(`/${id}/changePw`);
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
      {/* <StudentHeader /> */}
      <CommonMainDesktopHeader />

      {isShow && (
        <Template
          isAuthPage2={true}
          childrenTop={

            <PageHeader path={`/${id}/main`}>{'마이페이지'}</PageHeader>

          }
          childrenBottom={
            <>
              <div className="student-wrap">
                <button
                  className="changePassword-btn"
                  onClick={handleChangePassword}
                >
                  비밀번호 변경
                </button>
                <div className="mypage-list">
                  <StudentIdCard />
                  <StudentPayStub />
                </div>
              </div>
            </>
          }
        />
      )}
    </>
  );
}
