import Template from '../components/Template';

import '../styles/background.scss';

export default function Login() {
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
            <input type="text"></input>
            <div>비밀번호</div>
            <input type="password" maxLength={4}></input>
            <div>비밀번호 확인</div>
            <input type="password" maxLength={4}></input>
            <button>비밀번호 확인</button>
            <button>회원가입</button>
          </form>
        </>
      }
    ></Template>
  );
}
