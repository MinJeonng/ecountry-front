import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/loading.scss';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

export default function Loading({ countryid }) {
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);

  const setInfo = useSelector((state) => state);

  const navigate = useNavigate();

  const errorFunc = (index) => {
    const list = ['학생 등록', '자리 배치', '직업', '규칙', '세법'];
    const msg = () => {
      let result;
      list.forEach((el, count) => {
        if (count < index) {
          if (count === 0) {
            result = el;
          } else {
            result += `, ${el}`;
          }
        }
      });
      return result;
    };

    setLoading(false);
    toast.error(
      index === 0
        ? '국가 생성에 실패하였습니다. 다시 생성해주세요.'
        : `${msg()}설정에 실패하였습니다. 국가 설정에서 다시 등록해주세요.`,
      {
        autoClose: 2500,
      }
    );
    setTimeout(() => {
      navigate(index === 0 ? '/country' : '/countryList');
    }, 2500);
  };

  const registCountry = async () => {
    try {
      console.log(setInfo);
      // 국가 생성
      const res = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_HOST}/api/country`,
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: {
          name: setInfo.setting2.countryName,
          grade: parseInt(setInfo.setting1.schoolGrade),
          classroom: parseInt(setInfo.setting1.schoolClass),
          unit: setInfo.setting2.moneyUnit,
          salaryDate: parseInt(setInfo.setting2.salaryDate),
          school: setInfo.setting1.schoolName,
          eduOfficeCode: setInfo.setting1.eduOfficeCode,
          schoolCode: setInfo.setting1.schoolCode,
        },
      });
      console.log(`국가 생성 : ${res.data.success}`);
      console.log(`국가 생성 결과 : ${res.data.result}`);
      if (!res.data.success) {
        errorFunc(0);
      }

      // 학생 등록(수기)
      if (setInfo.setting3.studentList.length > 0) {
        const data2 = [];
        setInfo.setting3.studentList.forEach((student) => {
          data2.push({
            rollNumber: student.attendanceNumber,
            name: student.name,
            pw: setInfo.setting3.password,
          });
        });
        const res2 = await axios({
          method: 'POST',
          // 국가 생성 후 return된 id 값으로 수정해야함
          // 비밀번호 값 추가
          url: `${process.env.REACT_APP_HOST}/api/student/${res.data.result.id}`,
          headers: {
            'Content-Type': `application/json`,
            'ngrok-skip-browser-warning': '69420',
          },
          data: data2,
        });

        console.log(`학생 등록 : ${res2.data.success}`);
        if (!res2.data.success) {
          errorFunc(1);
        }
      }
      // 자리 배치 등록
      const data3 = [];
      setInfo.setting4.columns.forEach((data) => {
        data3.push({
          rowNum: data.id,
          colNum: data.rowCount,
          countryId: res.data.result.id,
        });
      });
      const res3 = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_HOST}/api/seat`,
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
        },
        data: data3,
      });
      console.log(`자리 배치 : ${res3.data.success}`);
      if (!res3.data.success) {
        errorFunc(2);
      }

      // 직업 리스트 등록
      const data4 = [];
      setInfo.setting5.jobsDisplay.forEach((data) => {
        data4.push({
          limited: parseInt(data.count),
          name:
            data.selectValue === '직접입력'
              ? data.customValue
              : data.selectValue,
          roll: data.role,
          standard: data.standard,
          salary: parseInt(data.salary.replaceAll(',', '')),
          skills: data.skills,
          countryId: res.data.result.id,
        });
      });
      const res4 = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_HOST}/api/job`,
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
        },
        data: data4,
      });
      console.log(`직업 리스트 : ${res4.data.success}`);
      if (!res4.data.success) {
        errorFunc(3);
      }

      // 규칙 리스트 등록
      const data5 = [];
      setInfo.setting6.basicLaw.forEach((data) => {
        data5.push({
          rule: data.detail,
          countryId: res.data.result.id,
        });
      });
      const res5 = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_HOST}/api/rule`,
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
        },
        data: data5,
      });
      console.log(`규칙 리스트 : ${res5.data.success}`);
      if (!res5.data.success) {
        errorFunc(4);
      }
      // 세금 규칙 등록
      const data6 = [];
      setInfo.setting7.taxLaw.forEach((data) => {
        data6.push({
          name: data.name,
          division: data.division,
          tax: parseFloat(data.rate),
          countryId: res.data.result.id,
        });
      });
      const rent = setInfo.setting8;
      data6.push({
        name: rent.taxName ? rent.taxName : '자리 임대료',
        division: rent.division,
        tax: parseInt(rent.fee),
        countryId: res.data.result.id,
      });
      setInfo.setting9.fine.forEach((data) => {
        data6.push({
          name: data.reason,
          division: 3,
          tax: data.fine,
          countryId: res.data.result.id,
        });
      });
      console.log(data6);
      const res6 = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_HOST}/api/tax`,
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
        },
        data: data6,
      });
      console.log(`세법 : ${res6.data.success}`);
      if (!res6.data.success) {
        errorFunc(5);
      } else {
        setDone(true);
        setLoading(false);
        toast.success('국가 설정이 완료되었습니다.', { autoClose: 2500 });
        setTimeout(() => {
          navigate('/countryList');
        }, 2500);
      }
    } catch (e) {
      toast.error('다시 시도해주세요.', { autoClose: 2500 });
      setLoading(false);
      setTimeout(() => {
        navigate('/country');
      }, 2500);
    }
  };

  useEffect(() => {
    registCountry();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="spinner-bg">
        <div className="spinner">
          {loading ? (
            <>
              <img
                className="spinner-img"
                src="/images/icon-diagram-process.gif"
                alt="Spinner"
              />
              <div className="spinner-text">초기 설정</div>
              <div className="spinner-text">적용중...</div>
            </>
          ) : done ? (
            <SetDone />
          ) : (
            <SetFail />
          )}
        </div>
      </div>
    </>
  );
}

export function SetDone() {
  return (
    <div className="spinner">
      <img className="spinner-img" src="/images/icon-like.gif" alt="Done" />
      <div className="spinner-text">초기 설정이</div>
      <div className="spinner-text">완료되었습니다.</div>
    </div>
  );
}

export function SetFail() {
  return (
    <div className="spinner">
      <img className="spinner-img" src="/images/icon-warning.gif" alt="Fail" />
      <div className="spinner-text">초기 설정 실패</div>
      <div className="spinner-text">국가를 다시 생성해주세요.</div>
    </div>
  );
}
