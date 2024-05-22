import '../styles/manager_dash.scss';
import { Link, useLocation, useParams } from 'react-router-dom';
import Template from '../components/Template';
import { MainProfile } from '../components/MainProfile';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
// import '..styles/toast.css';

import { MainDashboard } from '../components/ManagerDashboard';

export default function ManagerDashBoard() {
  const { pathname } = useLocation();
  const { id } = useParams();
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
