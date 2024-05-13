import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Template from './Template';

import '../styles/background.scss';
import '../styles/loading.scss';

export default function Loading() {
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    const doneTimer = setTimeout(() => {
      setDone(true);
    }, 3000);

    const navigateTimer = setTimeout(() => {
      navigate('/manager');
    }, 7000);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(doneTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate]);

  return (
    <Template
      childrenBottom={
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
            ) : (
              <SetDone />
            )}
          </div>
        </div>
      }
    />
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
