import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Template from '../components/Template';
import '../styles/countryList.scss';
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
        url: `${process.env.REACT_APP_HOST}/api/user`,
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
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
          {countryList.length === 0 ? (
            <div className="country-list">
              <div className="country-list-title">
                아직 생성된 국가가 없습니다.
              </div>
              <button className="goCountry-btn" onClick={goSetting}>
                생성하기
              </button>
            </div>
          ) : (
            countryList.map((data) => (
              <div className="country-list">
                <div>
                  <div className="country-list-title">{data.name}</div>
                  <div className="country-list-detail">{`${data.school} ${data.grade}학년 ${data.classroom}반`}</div>
                </div>

                <button
                  className="goCountry-btn"
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
