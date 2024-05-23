import { useState } from 'react';
import Template from '../components/Template';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/Headers';

export default function Login() {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [pw, setPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const navigate = useNavigate();

  const signupFunc = async () => {
    if (pw !== confirmPw) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    await axios
      .post(`${process.env.REACT_APP_HOST}/api/user/signup`, {
        name: name,
        userId: userId,
        pw: pw,
      })
      .then((res) => {
        alert(res.data.message);
        if (res.data.success) {
          navigate('/login');
        }
      });
  };

  return (
    <Template
      childrenTop={<PageHeader>{'회원가입'}</PageHeader>}
      childrenBottom={
        <div className="setting-wrap">
          <div>
            {/* <div>회원가입</div> */}
            <ul className="title-list">
              <li>본인의 계정을 생성하세요.</li>
              <li>이름과 4자리의 비밀번호를 작성하세요.</li>
            </ul>
          </div>
          <form className="box-style">
            <div className="user-signup-title">이름</div>
            <input
              className="user-signup"
              type="text"
              onChange={(e) => setName(e.target.value)}
            ></input>
            <div className="user-signup-title">아이디</div>
            <input
              className="user-signup"
              type="text"
              onChange={(e) => setUserId(e.target.value)}
            ></input>
            <div className="user-signup-title">비밀번호</div>
            <input
              className="user-signup"
              type="password"
              maxLength={4}
              onChange={(e) => setPw(e.target.value)}
            ></input>
            <div className="user-signup-title">비밀번호 확인</div>
            <input
              className="user-signup"
              type="password"
              maxLength={4}
              onChange={(e) => setConfirmPw(e.target.value)}
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
