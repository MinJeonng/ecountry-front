import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Template from '../components/Template';

import '../styles/login.scss';
import { PageHeader } from '../components/Headers';
import { handleKeyDown, handleKeyDownNext } from '../hooks/Functions';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Login() {
  const [userId, setUserId] = useState('');
  const [pw, setPw] = useState('');
  const navigate = useNavigate();
  const passwordRef = useRef(null);

  const loginFunc = async () => {
    await axios
      .post(`${process.env.REACT_APP_HOST}/api/user/login`, { userId, pw })
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem('token', res.data.result.token);
          toast.success('환영합니다!');
          setTimeout(() => {
            navigate('/country');
          }, 1300);
        } else {
          toast('아이디 또는 비밀번호가 틀렸습니다.', {
            autoClose: 1300,
          });
        }
      });
  };

  const testLongin = async (isStudent) => {
    const successFunc = (result, url) => {
      localStorage.setItem('token', result.token);
      toast.success('환영합니다!');
      setTimeout(() => {
        navigate(url);
      }, 1300);
    };
    const falseFunc = () => {
      toast.error('다시 시도해주세요', {
        autoClose: 1300,
      });
    };
    if (!isStudent) {
      const res = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_HOST}/api/user/login`,
        data: { userId: 'test', pw: '1234' },
      });
      if (res.data.success) {
        successFunc(res.data.result, '/country');
      } else {
        falseFunc();
      }
    } else {
      const res = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_HOST}/api/student/user/1`,
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
        },
        data: { rollNumber: 7, name: '테스트 국민', pw: '1234' },
      });
      console.log(res.data.success);
      if (res.data.success) {
        successFunc(res.data.result, '/1/main');
      } else {
        falseFunc();
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <Template
        isAuthPage={true}
        isAuthPage2={true}
        childrenTop={
          <>
            <PageHeader>{'관리자 로그인'}</PageHeader>
          </>
        }
        childrenBottom={
          <>
            <div className="login-wrap">
              <form className="box-style">
                <div className="user-login-title">아이디</div>
                <input
                  className="user-login"
                  type="text"
                  onChange={(e) => setUserId(e.target.value)}
                  onKeyDown={(e) => handleKeyDownNext(e, passwordRef)}
                ></input>
                <div className="user-login-title">비밀번호</div>
                <input
                  ref={passwordRef}
                  className="user-login"
                  type="password"
                  maxLength={4}
                  onChange={(e) => setPw(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, loginFunc)}
                ></input>
                <button className="login-btn" type="button" onClick={loginFunc}>
                  로그인
                </button>
              </form>
              <button type="button" onClick={() => testLongin(false)}>
                테스트 로그인 (선생님)
              </button>
              <button type="button" onClick={() => testLongin(true)}>
                테스트 로그인 (학생)
              </button>
            </div>

            <div className="pc-background-log">
              <div className="pc-left">
                <img
                  className="left-img"
                  src={`${process.env.PUBLIC_URL}/images/sample.jpg`}
                  alt="표지"
                />
              </div>
              <div className="pc-right">
                <div>관리자 로그인</div>
                <form className="login-box-style">
                  <div className="user-login-title">아이디</div>
                  <input
                    className="user-login"
                    type="text"
                    onChange={(e) => setUserId(e.target.value)}
                    onKeyDown={(e) => handleKeyDownNext(e, passwordRef)}
                  ></input>
                  <div className="user-login-title">비밀번호</div>
                  <input
                    ref={passwordRef}
                    className="user-login"
                    type="password"
                    maxLength={4}
                    onChange={(e) => setPw(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, loginFunc)}
                  ></input>
                  <button
                    className="login-btn"
                    type="button"
                    onClick={loginFunc}
                  >
                    로그인
                  </button>
                </form>
                <Link to="/">
                  <button className="navi-pre-btn">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon-back.png`}
                      alt="뒤로가기"
                    />
                  </button>
                </Link>
              </div>
            </div>
          </>
        }
      ></Template>
    </>
  );
}
