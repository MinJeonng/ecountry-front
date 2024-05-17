import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Template from '../components/Template';
import axios from 'axios';

export default function CountryList() {
  const navigate = useNavigate();
  const [countryList, setCountryList] = useState([]);
  const goSetting = () => {
    navigate('/setting/schoolInfo');
  };
  const goCountry = (id) => {
    navigate(`/${id}/manager`);
  };

  useEffect(() => {
    const getList = async () => {
      const res = await axios({
        method: 'GET',
        url: `http://localhost:8080/api/user`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(res.data.result);
      if (res.data.result.length > 0) {
        setCountryList(res.data.result);
      }
    };
    getList();
  }, []);

  return (
    <Template
      childrenBottom={
        <div>
          <div>국가 리스트</div>
          {countryList.length === 0 ? (
            <div className="box-style">
              <div>아직 생성된 국가가 없습니다.</div>
              <button className="frist-next-button" onClick={goSetting}>
                생성하기
              </button>
            </div>
          ) : (
            countryList.map((data) => (
              <div className="box-style">
                <div>{data.name}</div>
                <div>{`${data.school} ${data.grade}학년 ${data.classroom}반`}</div>
                <button
                  className="frist-next-button"
                  onClick={() => goCountry(data.id)}
                >
                  설정하기
                </button>
              </div>
            ))
          )}
        </div>
      }
    />
  );
}
