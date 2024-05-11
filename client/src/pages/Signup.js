import Template from '../components/Template';

export default function Login() {
  return (
    <Template
      childrenBottom={
        <div>
          <div>
            <div>회원가입</div>
            <ul className="title-list">
              <li>본인의 계정을 생성하세요.</li>
              <li>이름과 4자리의 비밀번호를 작성하세요.</li>
            </ul>
          </div>
          <form className="box-style">
            <div className="user-signup-title">이름</div>
            <input type="text" className="user-signup"></input>
            <div className="user-signup-title">비밀번호</div>
            <input
              type="password"
              className="user-signup"
              maxLength={4}
            ></input>
            <div className="user-signup-title">비밀번호 확인</div>
            <input
              type="password"
              className="user-signup"
              maxLength={4}
            ></input>

            <button className="signup-btn">회원가입</button>
          </form>
        </div>
      }
    ></Template>
  );
}
