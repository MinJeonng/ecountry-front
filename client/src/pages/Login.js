import Template from '../components/Template';

import '../styles/login.scss';

export default function Login() {
  return (
    <Template
      childrenBottom={
        <div>
          <div>
            <div>로그인</div>
            <ul className="title-list">
              <li>이름과 비밀번호를 입력하세요.</li>
            </ul>
          </div>
          <form className="box-style">
            <div className="user-name user-login-title">이름</div>
            <input type="text" className="user-name-input user-login"></input>
            <div className="user-pw user-login-title">비밀번호</div>
            <input
              type="password"
              className="user-pw-input user-login"
              maxLength={4}
            ></input>
            <button className="login-btn">로그인</button>
          </form>
        </div>
      }
    ></Template>
  );
}
