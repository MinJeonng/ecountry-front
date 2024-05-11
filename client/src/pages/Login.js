
import Background from '../components/Background';

import InputContainer from '../components/InputContainer';

export default function Login() {
  const inputContainer = (
    <InputContainer>
      <div>내용입력하기</div>
    </InputContainer>
  );
  return (
    <>
      <Background main={inputContainer} />
    </>
  );
}
