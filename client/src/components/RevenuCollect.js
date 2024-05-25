import React, { useEffect, useState } from 'react';
import { ConfirmBtn } from './Btns';

import '../styles/setting.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function RevenuCollect() {
  const { id } = useParams();
  const [accountId, setAccountId] = useState('');
  const [selectTax, setSelectTax] = useState('');
  const [unit, setUnit] = useState('');
  const [transaction, setTransaction] = useState(0);
  const [studentList, setStudentList] = useState([]);
  const [taxList, setTaxList] = useState([]);
  // 학생리스트 사유-징수금 선택해서 징수할 수 있게 만들면됨...
  // 학생리스트

  const getStudent = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/bank/students/${id}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    });
    setStudentList(res.data.result);
  };

  const getPenalty = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/tax/penalty/list/${id}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    });
    setTaxList(res.data.result);
  };

  const collectionTax = async () => {
    const res = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_HOST}/api/tax/penalty/${id}`,
      data: {
        transaction,
        memo: selectTax,
        withdrawId: accountId,
      },
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    });
  };

  const getUnit = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/bank/unit/${id}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    });
    setUnit(res.data.result.unit);
  };

  const getTaxMoney = () => {
    taxList.forEach((tax) => {
      if (tax.taxName === selectTax) {
        setTransaction(tax.tax);
      }
    });
  };

  useEffect(() => {
    getTaxMoney();
  }, [selectTax]);

  useEffect(() => {
    getPenalty();
    getStudent();
    getUnit();
  }, []);
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div
          className="newsHead"
          style={{ color: '#666666', marginBottom: '10px' }}
        >
          과태료 징수
        </div>
      </div>
      <div
        style={{ borderBottom: '2px solid #bacd92', marginBottom: '10%' }}
      ></div>
      <form className="box-style">
        <div className="set-title">징수 대상자</div>
        <select
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          style={{
            width: '100%',
            height: '30px',
            border: 'none',
            backgroundColor: '#f5f6f6',
            borderBottom: '1px solid #e9ae24',
            paddingBottom: '20px',
            margin: '10px 0 20px 0',
            outline: 'none',
          }}
        >
          <option value="" disabled>
            대상자 선택
          </option>
          {studentList.map((student) => (
            <option key={student.id} value={student.id}>
              {student.rollNumber}번 {student.name}
            </option>
          ))}
        </select>
        <div className="set-title">징수 사유</div>
        <select
          value={selectTax}
          onChange={(e) => setSelectTax(e.target.value)}
          style={{
            width: '100%',
            height: '30px',
            border: 'none',
            backgroundColor: '#f5f6f6',
            borderBottom: '1px solid #e9ae24',
            paddingBottom: '20px',
            margin: '10px 0 20px 0',
            outline: 'none',
          }}
        >
          <option value="" disabled>
            사유 선택
          </option>
          {taxList.map((tax, index) => (
            <option key={index} value={tax.taxName}>
              {tax.taxName}
            </option>
          ))}
        </select>
        <div className="set-title">징수 금액</div>
        <div
          style={{
            width: '100%',
            height: '30px',
            border: 'none',
            backgroundColor: '#f5f6f6',
            borderBottom: '1px solid #e9ae24',
            // paddingBottom: '20px',
            margin: '10px 0 20px 0',
            position: 'relative',
          }}
        >
          <span>{transaction}</span>
          <span
            style={{
              color: '#a5a5a5',
              fontSize: '14px',
              position: 'absolute',
              right: 0,
              marginRight: '9%',
            }}
          >
            {unit}
          </span>
        </div>
      </form>
      <ConfirmBtn
        btnName="징수"
        backgroundColor="#61759f"
        onClick={collectionTax}
      ></ConfirmBtn>
    </>
  );
}
