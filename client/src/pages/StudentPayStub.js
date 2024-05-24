import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

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

  const totalAmount = () => {
    let total = 0;
    paysStub.forEach((item) => {
      total += item.value;
    });
    return total;
  };

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