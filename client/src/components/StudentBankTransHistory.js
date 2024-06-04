import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const MyAccount = styled.div`
  border: none;
  border-radius: 10px;
  background: #edeef1;
  height: auto;
  padding: 30px;
  margin-bottom: 30px;
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
  margin-bottom: 15px;

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
  span {
    font-weight: 700;
    color: #000;
    font-size: 20px;
  }
`;
const Container = styled.div`
  margin-bottom: 30px;
`;
const CustomDate = styled.div`
  margin-bottom: 10px;
  color: #696565;
  font-size: 13px;
`;

const TransContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  img {
    width: 35px;
    height: 35px;
    padding-right: 20px;
  }
`;

const TransName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .accountInfo {
    display: flex;
    flex-direction: column;
    .name {
      font-size: 17px;
    }
    .memo {
      font-size: 13px;
      color: #686464;
    }
  }
`;
const TransAmount = styled.div`
  font-size: 18px;
  .red {
    color: red;
  }
  .blue {
    color: blue;
  }
`;
const NoneTrans = styled.div`
  text-align: center;
  margin-top: 10px;
  font-size: 18px;
  color: #686464;
`;

//입출금 거래내역
function CheckingAccount({ account, unit }) {
  const { accountId } = useParams();
  const [transList, setTransList] = useState([]);

  useEffect(() => {
    const getTransHistory = async () => {
      try {
        const res = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_HOST}/api/bank/list/${accountId}`,
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
          },
        });
        console.log(res);
        if (res.data.success) {
          console.log('입출금내역', res.data.result);
          setTransList(res.data.result);
        }
      } catch (error) {
        console.log('입출금 내역 불러오기 실패', error);
      }
    };
    getTransHistory();
  }, [accountId]);

  //날짜별로 입출금 내역 정리
  const groupByDate = (transList) => {
    return transList.reduce((acc, curr) => {
      const date = new Date(curr.createdAt);
      // const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const transDate = `${month}월 ${day}일`;
      if (!acc[transDate]) {
        acc[transDate] = [];
      }
      acc[transDate].push(curr);
      return acc;
    }, {});
  };

  // 그룹화된 거래내역을 화면에 표시
  const TransListByDate = ({ transList }) => {
    const groupedTrans = groupByDate(transList);
    console.log('거래내역', groupedTrans);

    if (Object.keys(groupedTrans).length === 0) {
      // groupedTrans가 비어있다면, "거래내역이 없습니다" 메시지를 표시
      return <NoneTrans>거래내역이 없습니다.</NoneTrans>;
    }

    return (
      <>
        {Object.keys(groupedTrans).map((date) => (
          <Container>
            <div key={date}>
              <CustomDate>{date}</CustomDate>
              {groupedTrans[date].map((trans) => (
                // <div key={trans.id}>
                <TransContainer>
                  <TransName key={trans.id}>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon-trans.png`}
                    />
                    <div className="accountInfo">
                      <div className="name">
                        {trans.depositId === account.id
                          ? trans.withdrawName
                          : trans.depositName}
                      </div>
                      <div className="memo"> {trans.memo}</div>
                    </div>
                  </TransName>
                  <TransAmount>
                    <div
                      className={
                        trans.depositId === account.id ? 'blue' : 'red'
                      }
                    >
                      {trans.depositId === account.id
                        ? `+ ${trans.transaction} ${unit.unit}`
                        : `- ${trans.transaction} ${unit.unit}`}
                    </div>
                  </TransAmount>
                </TransContainer>
                // </div>
              ))}
            </div>
          </Container>
        ))}
      </>
    );
  };

  return (
    <>
      <MyAccount>
        <AccountName>
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
      </MyAccount>
      <TransListByDate transList={transList} />
    </>
  );
}

//적금통장
function SavingAccount({ account, unit }) {
  const { accountId } = useParams();
  const [transList, setTransList] = useState([]);

  useEffect(() => {
    const getTransHistory = async () => {
      try {
        const res = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_HOST}/api/bank/list/${accountId}`,
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
          },
        });
        if (res.data.success) {
          console.log('적금통장', res.data.result);
          setTransList(res.data.result);
        }
      } catch (error) {
        console.log('적금 통장 내역 불러오기 실패', error);
      }
    };
    getTransHistory();
  }, [accountId]);

  //날짜별로 적금통장 내역 정리
  const groupByDate = (transList) => {
    return transList.reduce((acc, curr) => {
      const date = new Date(curr.createdAt);
      // const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const transDate = `${month}월 ${day}일`;
      if (!acc[transDate]) {
        acc[transDate] = [];
      }
      acc[transDate].push(curr);
      return acc;
    }, {});
  };

  // 그룹화된 거래내역을 화면에 표시
  const TransListByDate = ({ transList }) => {
    const groupedTrans = groupByDate(transList);
    console.log('거래내역', groupedTrans);

    if (Object.keys(groupedTrans).length === 0) {
      // groupedTrans가 비어있다면, "거래내역이 없습니다" 메시지를 표시
      return <NoneTrans>거래내역이 없습니다.</NoneTrans>;
    }

    return (
      <>
        {Object.keys(groupedTrans).map((date) => (
          <Container>
            <div key={date}>
              <CustomDate>{date}</CustomDate>
              {groupedTrans[date].map((trans) => (
                <div key={trans.id}>
                  <TransContainer>
                    <TransName>
                      <img
                        src={`${process.env.PUBLIC_URL}/images/icon-trans.png`}
                      />
                      <div className="accountInfo">
                        <div className="name">
                          {trans.depositId === account.id
                            ? trans.withdrawName
                            : trans.depositName}
                        </div>
                        <div className="memo"> {trans.memo}</div>
                      </div>
                    </TransName>
                    <TransAmount>
                      <div
                        className={
                          trans.depositId === account.id ? 'blue' : 'red'
                        }
                      >
                        {trans.depositId === account.id
                          ? `+ ${trans.transaction} ${unit.unit}`
                          : `- ${trans.transaction} ${unit.unit}`}
                      </div>
                    </TransAmount>
                  </TransContainer>
                </div>
              ))}
            </div>
          </Container>
        ))}
      </>
    );
  };

  return (
    <>
      <MyAccount>
        <AccountName>
          <div className="accountName">{account.accountName}</div>
        </AccountName>
        <Balance>
          <span>
            {account.balance} {unit.unit}
          </span>
        </Balance>
      </MyAccount>
      <TransListByDate transList={transList} />
    </>
  );
}

export function TransHistory() {
  const { id, accountId } = useParams();
  const [accounts, setAccounts] = useState([]);
  const [unit, setUnit] = useState('');

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
        // console.log(res.data.result);
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
          url: `${process.env.REACT_APP_HOST}/api/bank/${accountId}`,
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
        }
      } catch (error) {
        console.log('데이터 불러오는데 실패', error);
        if (error.response) {
          console.error('서버 응답 데이터:', error.response.data);
        }
      }
    };
    getData();
  }, [setAccounts]);
  return (
    <>
      <div className="pc-wrap">
        {accounts.map((account) => (
          <div key={account.id}>
            {account.division === '입출금통장' && (
              <CheckingAccount account={account} unit={unit} />
            )}
            {account.division === '적금통장' && (
              <SavingAccount account={account} unit={unit} />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
