import React from 'react';
import { useNavigate } from 'react-router-dom';

import Template from '../components/Template';

export default function CountryList() {
  const navigate = useNavigate();

  const goSetting = () => {
    navigate('/setting/schoolInfo');
  };

  return (
    <Template
      childrenBottom={
        <div>
          <div>국가 리스트</div>
          <div className="box-style">
            <div>아직 생성된 국가가 없습니다.</div>
            <button className="frist-next-button" onClick={goSetting}>
              생성하기
            </button>
          </div>
        </div>
      }
    />
  );
}
