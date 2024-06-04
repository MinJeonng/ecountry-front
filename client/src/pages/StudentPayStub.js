import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { authFunc } from '../hooks/Functions';

const MenuContainer = styled.div`
  border: 1px solid #a7d2e4;
  border-radius: 10px;
  height: auto;
  margin-bottom: 20px;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  h3 {
    margin-bottom: 4px;
  }
  p {
    font-size: 14px;
  }
`;

export function StudentPayStub() {
  const { id } = useParams();

  const [paysStub, setPaysStub] = useState([]);

  const getPay = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/bank/paystub`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    });
    if (res.data.success) {
      setPaysStub(res.data.result);
    }
  };

  const totalAmount = () => {
    let total = 0;
    paysStub.forEach((item) => {
      total += item.value;
    });
    return total;
  };

  useEffect(() => {
    if (authFunc()) {
      getPay();
    }
  }, []);

  return (
    <>
      {paysStub.length > 0 ? (
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
      ) : (
        <MenuContainer>
          <p>발급된 월급 명세서가 없습니다.</p>
        </MenuContainer>
      )}
    </>
  );
}
