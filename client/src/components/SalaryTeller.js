import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { ConfirmBtn } from './Btns';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import styled from 'styled-components';

export default function SalaryTeller() {
  const { id } = useParams();
  const [depositUser, setDepositUser] = useState('');
  const [depositUserName, setDepositUserName] = useState('');
  const [memo, setMemo] = useState('');
  const [studentList, setStudentList] = useState([]);
  const [transferSalary, setTransferSalary] = useState(''); //이체금액
  const [unit, setUnit] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState(''); //studentId

  //이체 가능 리스트(입금가능리스트)
  const studentListFunc = async () => {
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
        setStudentList(res.data.result);
      } else {
        console.log(res.data.result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    studentListFunc();
  }, [id]);

  //단위 불러오기
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

  //이체금액 자동으로 띄워주기
  //studentId로 인지해서 가져와야함
  const confirmSalaryFunc = async (studentId) => {
    // console.log(userId);
    // console.log(depositUser);
    if (!studentId) return; // depositUser가 없으면 아무 작업도 하지 않음

    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/bank/salary?studentId=${studentId}`,
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
      },
    });
    if (res.data.success) {
      console.log('success', res.data.success);
      console.log(res.data.result);
      setTransferSalary(res.data.result.value);
    } else {
      console.log(res.data.message);
    }
  };

  useEffect(() => {
    if (selectedStudentId) {
      // 예금주가 선택되었을 때만 월급 정보를 불러옴
      confirmSalaryFunc(selectedStudentId);
    }
  }, [selectedStudentId]);

  //월급 지급하기
  const PaymentSalary = async () => {
    if (depositUser && transferSalary) {
      const isConfirmed = window.confirm(
        `${depositUserName}님에게 ${transferSalary}${unit.unit} 이체하시겠습니까?`
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
              transaction: parseInt(transferSalary),
              memo: memo,
              depositId: depositUser,
              withdrawId: 0, //보내는 사람
            },
          });
          console.log(res);
          if (res.data.success) {
            toast('이체가 완료되었습니다.', {
              autoClose: 1200,
            });
            setDepositUser('');
            setMemo('');
            setTransferSalary('');
            setSelectedStudentId('');
            console.log('success', res.data.success);
          } else {
            console.log(res.data.message);
            toast('송금에 실패했습니다.', {
              autoClose: 1200,
            });
          }
        } catch (error) {
          console.log('이체 요청 실패', error);
          toast('이체 요청 중 오류가 발생했습니다.', {
            autoClose: 1200,
          });
        }
      }
    } else {
      toast('정보를 모두 입력해주세요');
    }
  };
  const handleSelectStudent = (student) => {
    console.log(student);
    if (student) {
      setDepositUser(student.id);
      setDepositUserName(student.name);
      setSelectedStudentId(student.studentId);
    }
  };

  return (
    <>
      <ToastContainer />

      {/* <div className="salary-title">월급 지급</div> */}
      <form className="box-style">
        <div className="set-title">예금주</div>
        <select
          id="name"
          className="set-input"
          value={depositUser}
          onChange={(e) => {
            const selectedStudent = studentList.find(
              (student) => student.id === Number(e.target.value)
            );

            handleSelectStudent(selectedStudent);
          }}
        >
          <option value="" disabled style={{ color: '#a5a5a5' }}>
            예금주를 선택하세요
          </option>
          {studentList.map((student) => {
            return (
              <option key={student.id} value={student.id}>
                {student.rollNumber}번 {student.name}
              </option>
            );
          })}
        </select>
        <div className="set-title">이체 금액</div>
        <div className="container">
          <input
            className="set-input"
            type="number"
            min="0"
            value={transferSalary}
            onChange={(e) => setTransferSalary(e.target.value)}
          />
          {/* {unit.unit} */}
          <span className="unit">{unit.unit}</span>
        </div>
        <div className="set-title">메모(필요 시 입력하세요)</div>
        <input
          className="set-input"
          type="text"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
        <ConfirmBtn
          onClick={PaymentSalary}
          btnName="이체"
          width="100%"
          backgroundColor="#61759f"
        ></ConfirmBtn>
      </form>
    </>
  );
}
