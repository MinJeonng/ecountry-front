import { Flex } from 'antd';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Revune() {
  //국고, 화폐단위,
  const { id } = useParams();
  const [selectedName, setSelectedName] = useState('');
  const nameSelect = (e) => {
    setSelectedName(e.target.value);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#093030',
            fontWeight: '500',
            borderRadius: '14px',
            padding: '5% 0',
            width: '100%',
            marginBottom: '10%',
            backgroundColor: '#e3ead5',
          }}
        >
          {/* 국고, 화폐단위 */}
          <p style={{ fontSize: '18px' }}>국고</p>
          <p style={{ fontSize: '16px' }}>10000000 단위</p>
        </div>
        <div
          style={{
            width: '100%',
            minHeight: '150px',
            maxHeight: '300px',
            border: '1px solid #B9C0BE',
            borderRadius: '9px',
            padding: '5%',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontSize: '17px' }}>과태료</span>
            {/* 학생 리스트 */}
            <div
              style={{
                width: '100px',
              }}
            >
              <select
                style={{
                  width: '100px',
                  padding: '0 5%',
                  border: '0.5px solid #999999',
                  borderRadius: '7px',
                  fontSize: '12px',
                  height: '27px',
                  color: '#777777',
                }}
                id="name"
                value={selectedName}
                onChange={nameSelect}
              >
                <option value="" disabled selected>
                  이름
                </option>
                {/* {grades.map((grade, index) => (
                  <option key={index} value={grade}>
                    {grade}
                  </option>
                ))} */}
              </select>
            </div>
          </div>
          <div
            style={{
              width: '100%',
              borderBottom: '1px solid #777777',
              marginTop: '5px',
              marginBottom: '6%',
            }}
          ></div>
          {/* 여기서부터 과태료 리스트 */}
          <div
            style={{
              width: '100%',
              height: '50px',
              backgroundColor: '#D9D9D9',
              marginBottom: '10px',
              borderRadius: '14px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '10px',
                textAlign: 'center',
              }}
            >
              <span>김지혜</span>
              <span style={{ fontSize: '0.7rem' }}>2024.05.25</span>
            </span>
            <div
              style={{ borderRight: '0.8px solid #888888', height: '60%' }}
            ></div>
            <span
              style={{
                maxWidth: '80px',
                fontSize: '0.9rem',
                textAlign: 'center',
              }}
            >
              지각
            </span>
            <div
              style={{ borderRight: '0.8px solid #888888', height: '60%' }}
            ></div>
            <span style={{ marginRight: '10px' }}>100 단위</span>
          </div>
        </div>
        {/* 여기까지 */}
      </div>
    </>
  );
}
