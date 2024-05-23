import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import '../styles/setting.scss';
import { ConfirmBtn } from './Btns';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const MyAccount = styled.div`
  border: none;
  border-radius: 10px;
  background: #edeef1;
  height: auto;
  padding: 30px;
`;
const SavingComponent = styled.div`
  border: none;
  border-radius: 10px;
  background: #edeef1;
  height: auto;
  padding: 30px;
  margin-top: 20px;
`;
const AccountName = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  span {
    font-weight: 500;
    color: #666666;
    font-size: 16px;
    gap: 5px;
  }
  .accountName {
    font-weight: 500;
    color: #000;
    font-size: 16px;
    gap: 5px;
    display: flex;
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
  border: 1px solid #d2e4d2;
  border-radius: 10px;
  background: ${(props) => (props.clicked ? '#bacd92' : '#d2e4d2')};
  padding: 5px 0;
  color: #1a2a01;
  font-size: 15px;
  font-weight: 700;
  transition: background-color 0.3s;
`;

//입출금통장
function CheckingAccount({ account }) {
  const { id } = useParams();
  const [isAccordion, setIsAccordion] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [user, setUser] = useState(''); //내 통장
  const [amount, setAmount] = useState(''); //내 잔액
  const [depositUser, setDepositUser] = useState(''); //받는 사람
  const [transferAmount, setTransferAmount] = useState(''); //이체금액
  const [transList, setTransList] = useState([]); //이체가능리스트

  const handleTransfer = async () => {
    // 이체하시겠습니까? alert 문 하고 그다음에 이체되게..
    //그때 alert에 이름 나오고 ~님에게 이체하겠냐 물어보기
    if (depositUser && transferAmount) {
      const isConfirmed = window.confirm(
        `${depositUser}님에게 ${transferAmount}를 이체하시겠습니까?`
      );
      if (isConfirmed) {
        try {
          const res = await axios({
            method: 'POST',
            url: `${process.env.REACT_APP_HOST}/api/bank`,
            headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': '69420',
            },
          });
          // if(res.data.re)
        } catch {}

        // toast('이체가 완료되었습니다.', {
        //   autoClose: 1300,
        // });
      }
    } else {
      alert('이체 정보를 모두 입력해주세요.');
    }
  };

  //이체 가능 리스트
  const transferList = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_HOST}/api/bank/students/${id}`,
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });
      if (res.data.success) {
        console.log(res.data.result);
        setTransList(res.data.result);
      } else {
        console.log(res.data.result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    transferList();
  }, []);

  const handleBtn = () => {
    setIsAccordion(!isAccordion);
    setIsClicked(!isClicked);
  };
  return (
    <>
      <ToastContainer />
      <MyAccount>
        <AccountName>
          {/* account.accountName */}
          <div className="accountName">
            {/* 입출금<span>통장</span> */}
            {account.accountName}
          </div>
        </AccountName>
        <Balance>
          {/* 단위 불러오는 api도 필요 */}
          {/* account.balance */}
          <span>{account.balance} 미소</span>
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
            value={depositUser}
            onChange={(e) => setDepositUser(e.target.value)}
          >
            <option value="" selected disabled></option>
            {transList.map((student) => {
              <option key={student.id} value={student.id}>
                {/* 나중에 출석번호까지 db업데이트되면 */}
                {student.name}
              </option>;
            })}
          </select>
          <div className="set-title">이체 금액</div>
          <div className="container">
            <input
              className="set-input"
              type="number"
              min="0"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
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

//적금통장
function SavingAccount({ account }) {
  const [isAccordion, setIsAccordion] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [user, setUser] = useState('');
  const [savingAmount, setSavingAmount] = useState('');

  const handleBtn = () => {
    setIsAccordion(!isAccordion);
    setIsClicked(!isClicked);
  };
  const handleSaving = () => {
    //
  };
  return (
    <>
      <SavingComponent>
        <AccountName>
          <div className="accountName">
            {/* {account.accountName} */}
            적금
            <span>통장</span>
          </div>
          {/* 적금 며칠남았는지 그것도 */}
          <span>D-~`</span>
        </AccountName>
        <Balance>
          {/* 단위 불러오는 api도 필요 */}
          {/* {account.balance} */}
          <span>0 미소</span>
        </Balance>
        <Btn>
          <TransferBtn onClick={handleBtn} clicked={isClicked}>
            적금하기
          </TransferBtn>
          <TransferBtn onClick={() => navigator('')}>거래내역</TransferBtn>
        </Btn>
      </SavingComponent>
      {isAccordion && (
        <form className="box-style">
          <div className="set-title">이체 금액</div>
          <div className="container">
            <input
              className="set-input"
              type="number"
              min="0"
              value={savingAmount}
              onChange={(e) => setSavingAmount(e.target.value)}
            />
            {/* 나중에 끝에 단위도 붙여주기 */}
            {/* <span className='unit'></span> */}
          </div>
          <ConfirmBtn
            onClick={handleSaving}
            btnName="적금"
            width="100%"
            backgroundColor="#61759f"
          ></ConfirmBtn>
        </form>
      )}
    </>
  );
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
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (res.data.success) {
          console.log(res.data.result);
          const result = Array.isArray(res.data.result)
            ? res.data.result
            : [res.data.result];
          setAccounts(result);

          // const divisions = res.data.result.map(account => account.division);
          // const checkingAccount = divisions.includes('0')
          // const savingAccount = divisions.includes('1')
          // setBothDivisionsExist(checkingAccount && savingAccount)
        }
      } catch (error) {
        console.log('데이터 불러오는데 실패', error);
        if (error.response) {
          console.error('서버 응답 데이터:', error.response.data);
        }
      }
    };
    getData();
  }, [id]);
  return (
    <>
      {accounts.map((account) => (
        <div key={account.id}>
          {account.division === '입출금통장' && (
            <CheckingAccount account={account} />
          )}
          {account.division === '적금통장' && (
            <SavingAccount account={account} />
          )}
        </div>
      ))}
      {/* {bothDivisionsExist && (
        <div>0,1둘다 존재</div>
      )} */}
      {/* <CheckingAccount /> */}
      <SavingAccount />
    </>
  );
}
