import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/scssList.scss';

import Template from '../components/Template';
import axios from 'axios';
import { PageHeader } from '../components/Headers';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function CountryList() {
  const navigate = useNavigate();
  const [countryList, setCountryList] = useState([]);
  const [countryInfo, setCountryInfo] = useState('');

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
        console.log(res.data.result);
      }
      if (res.data.success) {
        setCountryInfo(res.data.result.id);
      }
    };
    getList();
  }, []);

  //국가 삭제
  const deleteCountry = async (countryInfo) => {
    const res = await axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_HOST}/api/country/${countryInfo}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
      data: {
        id: countryInfo,
      },
    });
    if (res.data.success) {
      setCountryList(
        countryList.filter((country) => country.id !== countryInfo)
      );
      if (window.confirm('국가를 삭제하시겠습니까?')) {
        toast('삭제되었습니다.', {
          autoClose: 1300,
        });
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <Template
        childrenTop={<PageHeader path={'/country'}>{'국가 리스트'}</PageHeader>}
        childrenBottom={
          <div>
            {countryList.length === 0 ? (
              <div className="box-style">
                <div>아직 생성된 국가가 없습니다.</div>
                <button className="frist-next-button" onClick={goSetting}>
                  생성하기
                </button>
              </div>
            ) : (
              countryList.map((data) => (
                // box-style
                <div className="countryList" key={data.id}>
                  <div>
                    <div className="countryName">{data.name}</div>
                    <div className="countryInfo">{`${data.school} ${data.grade}학년 ${data.classroom}반`}</div>
                  </div>
                  <div className="btnList">
                    <button
                      className="mobile-select-small-btn"
                      onClick={() => goCountry(data.id)}
                    >
                      설정하기
                    </button>
                    <button
                      className="mobile-delete-small-btn"
                      onClick={() => deleteCountry(data.id)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        }
      />
    </>
  );
}
