import { useRef, useState } from 'react';
import Template from '../components/Template';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/Headers';
import { toast } from 'react-toastify';

export default function Login() {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [pw, setPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const signupFunc = async () => {
    if (pw !== confirmPw) {
      toast('비밀번호가 일치하지 않습니다.');
      return;
    }

    await axios
      .post(`${process.env.REACT_APP_HOST}/api/user/signup`, {
        name: name,
        userId: userId,
        pw: pw,
      })
      .then((res) => {
        toast(res.data.message);
        if (res.data.success) {
          navigate('/login');
        }
      });
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      } else {
        signupFunc();
      }
    }
  };

  return (
    <Template
      childrenTop={<PageHeader>{'회원가입'}</PageHeader>}
      childrenBottom={
        <div className="setting-wrap signup-wrap">
          {/* <div>회원가입</div> */}
          <ul className="title-list signup-title-list">
            <li>본인의 계정을 생성하세요.</li>
            <li>이름과 4자리의 비밀번호를 작성하세요.</li>
          </ul>
          <form className="box-style">
            <div className="user-signup-title">이름</div>
            <input
              className="user-signup"
              type="text"
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => handleKeyDown(0, e)}
              ref={(el) => (inputRefs.current[0] = el)}
            ></input>
            <div className="user-signup-title">아이디</div>
            <input
              className="user-signup"
              type="text"
              onChange={(e) => setUserId(e.target.value)}
              onKeyDown={(e) => handleKeyDown(1, e)}
              ref={(el) => (inputRefs.current[1] = el)}
            ></input>
            <div className="user-signup-title">비밀번호</div>
            <input
              className="user-signup"
              type="password"
              maxLength={4}
              onChange={(e) => setPw(e.target.value)}
              onKeyDown={(e) => handleKeyDown(2, e)}
              ref={(el) => (inputRefs.current[2] = el)}
            ></input>
            <div className="user-signup-title">비밀번호 확인</div>
            <input
              className="user-signup"
              type="password"
              maxLength={4}
              onChange={(e) => setConfirmPw(e.target.value)}
              onKeyDown={(e) => handleKeyDown(3, e)}
              ref={(el) => (inputRefs.current[3] = el)}
            ></input>
            {confirmPw === pw || (
              <div className="pw-error">비밀번호가 일치하지 않습니다.</div>
            )}
            <button className="signup-btn" type="button" onClick={signupFunc}>
              회원가입
            </button>
          </form>
        </div>
      }
    ></Template>
  );
}
