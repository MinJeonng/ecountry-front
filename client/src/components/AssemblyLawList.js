import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ConfirmBtn } from './SettingBtn';

import '../styles/lawList.scss';

export function AssemblyLawList() {
  const [laws, setLaws] = useState([
    { id: 1, detail: '법을 잘 지키자' },
    { id: 2, detail: '약속을 잘 지키자' },
    { id: 3, detail: '쿠쿠루삥뽕' },
  ]);
  // const [detail, setDetail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleNewLaw = () => {};

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div
          className="newsHead"
          style={{ color: '#666666', marginBottom: '10px' }}
        >
          국세청
        </div>
      </div>
      <div
        style={{ borderBottom: '2px solid #bacd92', marginBottom: '10%' }}
      ></div>
      {laws.length !== 0 ? (
        <>
          <div className="newsInfo">
            {laws.map((law, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  position: 'relative',
                  marginBottom: '10px',
                  borderRadius: '18px',
                  padding: '5%',
                  alignItems: 'center',
                  border: '0.1px solid gray',
                }}
              >
                <p>{law.id}항.</p>
                <p>{law.detail}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              color: '#666666',
              marginBottom: '20px',
              fontSize: '13px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>제정된 세법이 존재하지 않습니다.</span>
          </div>
          <ConfirmBtn
            onClick={() => {
              handleNewLaw();
            }}
            btnName="제정하기"
            backgroundColor="#61759f"
          ></ConfirmBtn>
        </>
      )}
    </>
  );
}
