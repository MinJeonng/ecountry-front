import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

import '../styles/setting.scss';

export function StudentAssemblyLawList() {
  const { id } = useParams();
  const [laws, setLaws] = useState([]);

  const getRules = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/rule/${id}`,
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
      },
    });
    // console.log(res.data.result);
    setLaws(res.data.result);
  };

  useEffect(() => {
    getRules();
  }, []);

  return (
    <>
      <div className="student-wrap">
        <ToastContainer />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div
            className="newsHead"
            style={{ color: '#333', marginBottom: '10px' }}
          >
            기본 법
          </div>
        </div>
        <div
          style={{ borderBottom: '2px solid #bacd92', marginBottom: '7%' }}
        ></div>
        {laws.length !== 0 ? (
          <div className="newsInfo">
            {laws.map((law, index) => (
              <div
                className="display"
                key={index}
                style={{ fontSize: '14px', marginBottom: '10px' }}
              >
                <div className="lawList">
                  <span>{index + 1}항.</span> {law.rule}
                </div>
              </div>
            ))}
          </div>
        ) : (
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
        )}
      </div>
    </>
  );
}
