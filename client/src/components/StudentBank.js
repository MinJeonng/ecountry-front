import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import '../styles/setting.scss';
import { ConfirmBtn } from './Btns';

const MyAccount = styled.div`
  border: none;
  border-radius: 10px;
  background: #edeef1;
  height: auto;
  padding: 30px;
`;
const AccountName = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
  gap: 5px;
  span {
    font-weight: 500;
    color: #666666;
    font-size: 16px;
  }
  .accountName {
    font-weight: 500;
    color: #000;
    font-size: 16px;
  }
`;
const Balance = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 14px;
  span {
    font-weight: 700;
    color: #000;
    font-size: 20px;
  }
`;
const Btn = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 10px;
  width: 100%;
`;
const TransferBtn = styled.button`
  flex-grow: 1;
  border: 1px solid #bacd92;
  border-radius: 10px;
  background: ${(props) => (props.clicked ? '#e1e884' : '#bacd92')};
  padding: 5px 0;
  color: #1a2a01;
  font-size: 15px;
  font-weight: 700;
  transition: background-color 0.3s;
`;

function CheckingAccount({ account }) {
  const [isAccordion, setIsAccordion] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [user, setUser] = useState('');
  const [amount, setAmount] = useState('');
  const handleTransfer = () => {
    // 이체하시겠습니까? alert 문 하고 그다음에 이체되게..
    //그때 alert에 이름 나오고 ~님에게 이체하겠냐 물어보기
    // if (user && amount) {
    //   const isConfirmed = window.confirm(`${user}님에게 ${amount}를 이체하시겠습니까?`);
    //   if (isConfirmed) {
    //     // 이체 처리 로직
    //     alert('이체가 완료되었습니다.');
    //   }
    // } else {
    //   alert('이체 정보를 모두 입력해주세요.');
    // }
  };
  const handleBtn = () => {
    setIsAccordion(!isAccordion);
    setIsClicked(!isClicked);
  };
  return (
    <>
      <MyAccount>
        <AccountName>
          {/* account.accountName */}
          <span className="accountName">입출금</span> <span>통장</span>
        </AccountName>
        <Balance>
          {/* 단위 불러오는 api도 필요 */}
          {/* account.balance */}
          <span>1400 미소</span>
        </Balance>
        <Btn>
          <TransferBtn onClick={handleBtn} clicked={isClicked}>
            이체하기
          </TransferBtn>
          <TransferBtn onClick={() => navigator('')}>거래내역</TransferBtn>
        </Btn>
      </MyAccount>
      {isAccordion && (
        <form className="box-style">
          <div className="set-title">예금주</div>

          <select
            id="name"
            className="set-input"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          >
            <option value="" selected disabled></option>
            {/* 국민리스트 받아와서 이름 보이게끔 */}
          </select>
          <div className="set-title">이체 금액</div>
          <div className="container">
            <input
              className="set-input"
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {/* 나중에 끝에 단위도 붙여주기 */}
            {/* <span className='unit'></span> */}
          </div>
          <ConfirmBtn
            onClick={handleTransfer}
            btnName="이체"
            width="100%"
            backgroundColor="#61759f"
          ></ConfirmBtn>
        </form>
      )}
    </>
  );
}
function SavingAccount({ account }) {
  return <>{/* ~~~~{account.id} */}</>;
}

export function OwnAccount() {
  const { id } = useParams();
  const [accounts, setAccounts] = useState([]);
  // const [bothDivisionsExist, setBothDivisionsExist] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_HOST}/api/bank/${id}`,
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
          },
        });
        if (res.data.success) {
          console.log(res.data.result);
          setAccounts(res.data.result);
          // const divisions = res.data.result.map(account => account.division);
          // const checkingAccount = divisions.includes('0')
          // const savingAccount = divisions.includes('1')
          // setBothDivisionsExist(checkingAccount && savingAccount)
        }
      } catch (error) {
        console.log('데이터 불러오는데 실패', error);
      }
    };
    getData();
  }, [id]);
  return (
    <>
      {accounts.map((account) => (
        <div key={account.id}>
          {account.division === '0' && <CheckingAccount account={account} />}
          {account.division === '1' && <SavingAccount account={account} />}
        </div>
      ))}
      {/* {bothDivisionsExist && (
        <div>0,1둘다 존재</div>
      )} */}
      <CheckingAccount />
    </>
  );
}
