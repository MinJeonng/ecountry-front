import React, { useEffect, useState } from 'react';
import { ConfirmBtn } from './Btns';

import '../styles/setting.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { SkillHeader } from './Headers';

export default function RevenueCollect() {
  const { id } = useParams();
  const [accountId, setAccountId] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectTax, setSelectTax] = useState('');
  const [unit, setUnit] = useState('');
  const [transaction, setTransaction] = useState(0);
  const [studentList, setStudentList] = useState([]);
  const [taxList, setTaxList] = useState([]);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener(`resize`, () => setInnerWidth(window.innerWidth));
    return () =>
      window.removeEventListener(`resize`, () =>
        setInnerWidth(window.innerWidth)
      );
  }, []);

  const getStudent = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/bank/students/${id}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    });
    // console.log(res.data.result);
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
    if (
      !window.confirm(
        `${selectedStudent.rollNumber}번 ${selectedStudent.name}에게 ${selectTax} ${transaction}${unit} 을 징수하시겠습니까? `
      )
    ) {
      return;
    }
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
    if (res.data.success) {
      toast.success(
        `${selectedStudent.rollNumber}번 ${selectedStudent.name}에게 ${selectTax} ${transaction}${unit} 을 징수하였습니다. `,
        { autoClose: 1300 }
      );
      const res2 = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_HOST}/api/student/notice/add/${id}`,
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
        },
        data: {
          studentId: [selectedStudent.id],
          content: `${selectTax} ${transaction}${unit} 부과되었습니다.`,
        },
      });
    }
    setAccountId('');
    setSelectedStudent('');
    setSelectTax('');
    setTransaction(0);
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
  const handleAccountId = (e) => {
    setAccountId(e.target.value);
    const student = studentList.find((student) => student.id == e.target.value);
    if (student) {
      setSelectedStudent({
        id: student.id,
        rollNumber: student.rollNumber,
        name: student.name,
      });
    } else {
      setSelectedStudent(null);
    }
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
      {innerWidth >= 1160 && <SkillHeader />}
      <ToastContainer />
      <div className="pc-wrap">
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div
            className="newsHead"
            style={{
              color: '#666666',
              marginBottom: '10%',
              borderBottom: '2px solid #bacd92',
              paddingBottom: '10px',
              width: '-webkit-fill-available',
            }}
          >
            과태료 징수
          </div>
        </div>
        <form className="box-style">
          <div className="set-title">징수 대상자</div>
          <select
            value={accountId}
            onChange={handleAccountId}
            style={{
              width: '100%',
              height: '30px',
              border: 'none',
              backgroundColor: '#f5f6f6',
              borderBottom: '1px solid #e9ae24',
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
      </div>
    </>
  );
}
