import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function StudentPayStub() {
  const { id } = useParams();

  const [paysStub, setPaysStub] = useState([
    {
      title: '적금 만기',
      value: 100,
    },
    {
      title: '월급',
      value: 100,
    },
    {
      title: '자리세',
      value: -100,
    },
    {
      title: '적금 만기',
      value: 100,
    },
    {
      title: '월급',
      value: 100,
    },
    {
      title: '자리세',
      value: -100,
    },
    {
      title: '적금 만기',
      value: 100,
    },
    {
      title: '월급',
      value: 100,
    },
    {
      title: '자리세',
      value: -100,
    },
  ]);

  // 월급 명세서 정보
  const [paysTitle, setPaysTitle] = useState(''); // 명세서 제목
  const [paysValue, setPaysValue] = useState(''); // 명세서 값

  const [unit, setUnit] = useState(''); // 화폐 단위

  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date()); // 현재 월 정보
  const [salaryDate, setSalaryDate] = useState(); // 월급 날짜

  const totalAmount = () => {
    let total = 0;
    paysStub.forEach((item) => {
      total += item.value;
    });
    return total;
  };

  const handlePrevMonth = () => {
    const prevMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1
    );
    setCurrentMonth(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1
    );
    setCurrentMonth(nextMonth);
  };

  return (
    <div className="payStub-wrap">
      <div className="payStub-title">월급 명세서</div>
      <div className="payStub-month-navi">
        <button className="month-btn" onClick={handlePrevMonth}>
          &#60;
        </button>
        <div className="payStub-month">{currentMonth.getMonth() + 1}월</div>
        <button className="month-btn" onClick={handleNextMonth}>
          &#62;
        </button>
      </div>

      <div className="payStub-receipt">
        <div className="payStub-receipt-title">월급 명세서</div>
        {paysStub.map((paysStub, index) => (
          <div className="payStub-item" key={index} value={paysStub.value}>
            <img
              className="payStub-img"
              src={`${process.env.PUBLIC_URL}/images/icon-alarm.png`}
              alt="Alarm Icon"
            />

            <div className="payStub-item-title">{paysStub.title}</div>
            <div
              className="payStub-item-value"
              style={{
                color: paysStub.value < 0 ? 'red' : 'blue',
                fontWeight: '800',
              }}
            >
              {paysStub.value >= 0 ? `+${paysStub.value}` : paysStub.value}
            </div>
          </div>
        ))}

        <div className="payStub-total">
          <div className="total">실수령액</div>
          <div className="total-pay">{totalAmount()}</div>
          <div className="unit">{unit}</div>
        </div>
      </div>
    </div>
  );
}
