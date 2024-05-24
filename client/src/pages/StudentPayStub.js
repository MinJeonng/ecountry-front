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

  const totalAmount = () => {
    let total = 0;
    paysStub.forEach((item) => {
      total += item.value;
    });
    return total;
  };

  return (
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
      </div>
    </div>
  );
}
