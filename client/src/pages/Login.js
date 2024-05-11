import Template from '../components/Template';

import '../styles/background.scss';

export default function Login() {
  return (
    <Template
      childrenTop={
        <>
          <div>로그인</div>
          <ul className='"title-list'>
            <li>이름과 비밀번호를 입력하세요.</li>
          </ul>
        </>
      }
      childrenBottom={
        <>
          <form className="box-style">
            <div>이름</div>
            <input type="text"></input>
            <div>비밀번호</div>
            <input type="password" maxLength={4}></input>
            <button>로그인</button>
          </form>
        </>
      }
    ></Template>
  );
}
