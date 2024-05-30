import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
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
function CheckingAccount({ account, unit }) {
  const { id, accountId } = useParams(); // 지금 id는 나라id
  const navigate = useNavigate();
  const [isAccordion, setIsAccordion] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [depositUser, setDepositUser] = useState(''); //받는 사람 id
  const [depositUserName, setDepositUserName] = useState('');
  const [transferAmount, setTransferAmount] = useState(''); //이체금액
  const [transList, setTransList] = useState([]); //이체가능리스트
  const [memo, setMemo] = useState('');
  // const filteredTransList = transList.filter((user) => user.id !== token);

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

  //이체하기
  const handleTransfer = async () => {
    if (depositUser && transferAmount) {
      //잔액보다 큰 값 인출 방지
      if (parseInt(transferAmount) > account.balance) {
        toast('출금할 통장의 잔액이 부족합니다.', {
          autoClose: 1300,
        });
        return;
      }
      const isConfirmed = window.confirm(
        `${depositUserName}님에게 ${transferAmount}${unit.unit} 이체하시겠습니까?`
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
            data: {
              transaction: parseInt(transferAmount),
              memo: memo,
              depositId: depositUser, //받는사람
              withdrawId: account.id, //보내는사람
            },
          });
          if (res.data.success) {
            toast('이체가 완료되었습니다.', {
              autoClose: 1300,
            });

            // toast가 닫힌 직후 페이지를 새로고침
            setTimeout(() => {
              window.location.reload();
            }, 1400);
            setDepositUser('');
            setMemo('');
            setTransferAmount('');
            console.log('success', res.data.success);
          } else {
            console.log(res.data.message);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      toast('이체 정보를 모두 입력해주세요.');
    }
  };

  const handleBtn = () => {
    setIsAccordion(!isAccordion);
    setIsClicked(!isClicked);
  };
  const handleDepositUserChange = (e) => {
    const userId = e.target.value;
    setDepositUser(userId);

    const selectedUser = transList.find((user) => user.id === parseInt(userId));
    if (selectedUser) {
      // console.log(selectedUser);
      setDepositUserName(selectedUser.name);
    }
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
          <span>
            {account.balance} {unit.unit}
          </span>
        </Balance>
        <Btn>
          <TransferBtn onClick={handleBtn} clicked={isClicked}>
            이체하기
          </TransferBtn>
          <TransferBtn
            onClick={() => navigate(`/${id}/bank/history/${account.id}`)}
          >
            거래내역
          </TransferBtn>
        </Btn>
      </MyAccount>
      {isAccordion && (
        <form className="box-style">
          <div className="set-title">예금주</div>

          <select
            id="name"
            className="set-input"
            value={depositUser}
            onChange={handleDepositUserChange}
          >
            <option value="" disabled style={{ color: '#a5a5a5' }}>
              예금주를 선택하세요
            </option>
            {transList.map((student) => {
              if (student.id !== account.id) {
                return (
                  <option key={student.id} value={student.id}>
                    {student.rollNumber}번 {student.name}
                  </option>
                );
              }
              return null;
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
            <span className="unit">{unit.unit}</span>
          </div>
          <div className="set-title">메모 (필요 시 작성해주세요)</div>
          <input
            className="set-input"
            type="text"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
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
function SavingAccount({ account, unit, withdrawId, withdrawBalance }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAccordion, setIsAccordion] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [savingAmount, setSavingAmount] = useState('');

  const handleBtn = () => {
    setIsAccordion(!isAccordion);
    setIsClicked(!isClicked);
  };
  //적금하기
  const handleSaving = async () => {
    // console.log(account.id);
    if (savingAmount) {
      if (parseInt(savingAmount) > withdrawBalance) {
        toast('출금할 통장의 잔액을 확인해주세요', {
          autoClose: 1300,
        });
        return;
      }
      try {
        const res = await axios({
          method: 'POST',
          url: `${process.env.REACT_APP_HOST}/api/bank`,
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
          },
          data: {
            transaction: parseInt(savingAmount),
            depositId: account.id, //적금 통장 Id
            withdrawId: withdrawId, //입출금 통장 id
          },
        });
        if (res.data.success) {
          toast('이체가 완료되었습니다.', {
            autoClose: 1300,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1400);
          setSavingAmount('');
          console.log('success', res.data.success);
        } else {
          console.log(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast('이체 금액을 입력해주세요.');
    }
  };
  return (
    <>
      <SavingComponent>
        <AccountName>
          <div className="accountName">
            {account.accountName}

            {/* <span>통장</span> */}
          </div>
          {/* 적금 며칠남았는지 그것도 */}
          {/* <span>D-{accout}</span> */}
        </AccountName>
        <Balance>
          <span>
            {account.balance} {unit.unit}
          </span>
        </Balance>
        <Btn>
          <TransferBtn onClick={handleBtn} clicked={isClicked}>
            적금하기
          </TransferBtn>
          <TransferBtn
            onClick={() => navigate(`/${id}/bank/history/${account.id}`)}
          >
            거래내역
          </TransferBtn>
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
            <span className="unit">{unit.unit}</span>
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
  const [unit, setUnit] = useState('');
  const [withdrawId, setWithdrawId] = useState(null);
  const [withdrawBalance, setWithdrawBalance] = useState('');

  const getUnit = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_HOST}/api/bank/unit/${id}`,
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });
      if (res.data.success) {
        console.log(res.data.result);
        setUnit(res.data.result);
      }
    } catch (error) {
      console.log('화폐단위 불러오는데 실패', error);
    }
  };
  useEffect(() => {
    getUnit();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_HOST}/api/bank`,
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

          const checkingAccount = result.find(
            (account) => account.division === '입출금통장'
          );
          if (checkingAccount) {
            setWithdrawId(checkingAccount.id);
            setWithdrawBalance(checkingAccount.balance);
          }
        }
      } catch (error) {
        console.log('데이터 불러오는데 실패', error);
        if (error.response) {
          console.error('서버 응답 데이터:', error.response.data);
        }
      }
    };
    getData();
  }, []);
  return (
    <>
      {accounts.map((account) => (
        <div key={account.id}>
          {account.division === '입출금통장' && (
            <CheckingAccount account={account} unit={unit} />
          )}
          {account.division === '적금통장' && (
            <SavingAccount
              account={account}
              unit={unit}
              withdrawId={withdrawId}
              withdrawBalance={withdrawBalance}
            />
          )}
        </div>
      ))}
    </>
  );
}
