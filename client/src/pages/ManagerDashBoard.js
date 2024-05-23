import { Link, useLocation, useParams } from 'react-router-dom';
import Template from '../components/Template';
import { MainProfile } from '../components/MainProfile';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
// import '..styles/toast.css';
import '../styles/manager_dash.scss';

import { MainDashboard } from '../components/ManagerDashboard';
import styled from 'styled-components';

const LogoutBtn = styled.button`
  border-radius: 19px;
  border: none;
  text-align: center;
  font-size: 13px;
  color: #606060;
  padding: 3px 10px;
  margin-top: 5px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  img {
    width: 16px;
    height: 16px;
  }
`;

export default function ManagerDashBoard() {
  const { pathname } = useLocation();
  const { id } = useParams();

  const logoutFunc = () => {
    if (!window.confirm('로그아웃 하시겠습니까?')) {
      return;
    }
    localStorage.removeItem('token');
    window.location.href = `/login`;
  };
  return (
    <>
      <Template
        childrenTop={
          <>
            {/* 토스트는 최상위에다가만 표시 */}
            <ToastContainer />
            <div className="managerInfo">
              <div className="InfoPart1">
                <div className="MainProfileBox">
                  <MainProfile />
                </div>
                <div className="countryUrl">
                  {/* 링크 수정 필요 */}
                  <CopyToClipboard
                    text={`http://localhost:3000/${id}/main`}
                    // text={`${process.env.REACT_APP_BASEURL}/${id}/main`}
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
                    to={`http://localhost:3000/${id}/main`}
                    className="countryLink"
                    style={{ color: '#777' }}
                  >
                    {`http://localhost:3000/${id}/main`}
                  </Link>
                </div>
              </div>
              <LogoutBtn onClick={logoutFunc}>
                로그아웃
                <img
                  src={`${process.env.PUBLIC_URL}/images/icon-sign-out.png`}
                  alt="복사"
                />
              </LogoutBtn>
            </div>
          </>
        }
        childrenBottom={
          <>
            <MainDashboard />
          </>
        }
      />
    </>
  );
}
