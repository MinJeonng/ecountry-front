import { useState } from 'react';
import Template from '../components/Template';
import axios from 'axios';

import '../styles/background.scss';

export default function Login() {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [pw, setPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const signupFunc = async () => {
    if (pw !== confirmPw) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    await axios
      .post('http://localhost:8080/api/user/signup', {
        name: name,
        userId: userId,
        pw: pw,
      })
      .then((res) => alert(res.data.message));
  };
  return (
    <Template
      childrenTop={
        <>
          <div>회원가입</div>
          <ul className='"title-list'>
            <li>본인의 계정을 생성하세요.</li>
            <li>이름과 4자리의 비밀번호를 작성하세요.</li>
          </ul>
        </>
      }
      childrenBottom={
        <>
          <form className="box-style">
            <div>이름</div>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
            ></input>
            <div>아이디</div>
            <input
              type="text"
              onChange={(e) => setUserId(e.target.value)}
            ></input>
            <div>비밀번호</div>
            <input
              type="password"
              maxLength={4}
              onChange={(e) => setPw(e.target.value)}
            ></input>
            <div>비밀번호 확인</div>
            <input
              type="password"
              maxLength={4}
              onChange={(e) => setConfirmPw(e.target.value)}
            ></input>
            {confirmPw === pw || <div>비밀번호가 일치하지 않습니다.</div>}
            <button type="button" onClick={signupFunc}>
              회원가입
            </button>
          </form>
        </>
      }
    ></Template>
  );
}
