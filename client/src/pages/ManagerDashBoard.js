import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Template from '../components/Template';
import { MainProfile } from '../components/MainProfile';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '../styles/manager_dash.scss';

import { MainDashboard } from '../components/ManagerDashboard';
import styled from 'styled-components';
import { ChatBotBtn, LoginBtn } from '../components/Btns';
import { useEffect, useState } from 'react';
import { ManagerHeader } from '../components/ManagerHeader';
import {
  authFunc,
  confirmCountry,
  errorMsg,
  getExpire,
} from '../hooks/Functions';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../store/userInfoReducer';

const Btns = styled.button`
  border-radius: 11px;
  border: none;
  text-align: center;
  font-size: 13px;
  color: #606060;
  padding: 14px 20px;
  margin-top: 5px;
  box-shadow: 1px 1.3px #c0bebe;
  height: 32px;
  display: flex;
  align-items: center;
  text-wrap: nowrap;
  img {
    width: 16px;
    height: 16px;
  }
`;
export const ManagerTopHeader = styled.div`
  display: flex;
  height: 56px;
  border-bottom: 1px solid #d9d9d9;
  width: 100vw;
  align-items: center;
  justify-content: flex-end;
`;

export default function ManagerDashBoard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [loginBtn, setLoginBtn] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.auth);

  const logoutFunc = () => {
    if (!window.confirm('로그아웃 하시겠습니까?')) {
      return;
    }
    localStorage.clear();
    dispatch(auth(null));
    window.location.href = `/login`;
  };
  const movetoCountryList = () => {
    navigate(`/countryList`);
  };

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

  useEffect(() => {
    window.addEventListener(`resize`, () => setInnerWidth(window.innerWidth));
  }, []);

  return (
    <>
      <ToastContainer />
      {/* //pc버전 왼쪽 헤더 */}
      <ManagerHeader />
      {loginBtn && <LoginBtn />}
      {isShow && (
        <Template
          childrenTop={
            <>
              {innerWidth <= 1160 ? (
                <>
                  <div className="managerInfo">
                    <div className="InfoPart1">
                      <div className="MainProfileBox">
                        <MainProfile />
                      </div>
                      <div className="countryUrl">
                        <span>국가 홈페이지 주소</span>
                        <div className="clipboard">
                          <CopyToClipboard
                            text={`${process.env.REACT_APP_BASEURL}/${id}/main`}
                            onCopy={() =>
                              toast('클립보드로 복사했습니다.', {
                                autoClose: 1300,
                              })
                            }
                          >
                            <img
                              src={`${process.env.PUBLIC_URL}/images/icon-copy.png`}
                              alt="복사"
                            />
                          </CopyToClipboard>

                          <Link
                            to={`${process.env.REACT_APP_BASEURL}/${id}/main`}
                            className="countryLink"
                            style={{ color: '#777' }}
                          >
                            {`http://13.125.85.110/${id}/main`}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="BtnsClass">
                      <Btns onClick={logoutFunc}>
                        로그아웃
                        <img
                          src={`${process.env.PUBLIC_URL}/images/icon-sign-out.png`}
                          alt="복사"
                        />
                      </Btns>
                      <Btns onClick={movetoCountryList}>국가 리스트</Btns>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <ManagerTopHeader>
                    <div className="BtnsClass">
                      <Btns onClick={movetoCountryList}>국가 리스트</Btns>
                      <Btns onClick={logoutFunc}>
                        로그아웃
                        <img
                          src={`${process.env.PUBLIC_URL}/images/icon-sign-out.png`}
                          alt="로그아웃"
                        />
                      </Btns>
                    </div>
                  </ManagerTopHeader>
                </>
              )}
            </>
          }
          childrenBottom={
            <>
              <MainDashboard />
              <ChatBotBtn />
            </>
          }
        />
      )}
    </>
  );
}
