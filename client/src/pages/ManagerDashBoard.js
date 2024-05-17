import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import '../styles/manager_dash.scss';
import styled from 'styled-components';
import ProfileImage from '../components/ProfileImage';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'antd';
import Template from '../components/Template';
import { ManagerMainHeader } from '../components/Headers';
import MainProfile from '../components/MainProfile';
import MainNews from '../components/MainNews';
import { SetNewsList } from '../components/NewsDetail';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
// import '..styles/toast.css';

import { MainDashboard } from '../components/ManagerDashboard';

export default function ManagerDashBoard() {
  const { pathname } = useLocation();
  return (
    <>
      <Template
        childrenTop={
          <>
            {/* 토스트는 최상위에다가만 표시 */}
            <ToastContainer />
            <ManagerMainHeader />
            <div className="managerInfo">
              <div className="InfoPart1">
                <div className="MainProfileBox">
                  <MainProfile />
                </div>
                <div className="countryUrl">
                  {/* 링크 수정 필요 */}
                  <CopyToClipboard
                    text={`${process.env.REACT_APP_BASEURL}${pathname}`}
                    onCopy={() =>
                      toast('클립보드에 링크가 복사되었어요.', {
                        autoClose: 1300,
                      })
                    }
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon-copy.png`}
                      alt="복사"
                    />
                  </CopyToClipboard>

                  <Link
                    to={`/country`}
                    className="countryLink"
                    style={{ color: '#777' }}
                  >
                    국가 url(밑에 있는걸로)
                  </Link>
                  {/* {`/country/${country.id}`} */}
                </div>
              </div>

              <Button
                style={{
                  fontSize: '15px',
                  backgroundColor: '#D9D9D9',
                }}
              >
                <Link
                  to="/setting/schoolInfo"
                  style={{ color: 'black', fontWeight: '700' }}
                >
                  초기세팅수정
                </Link>
              </Button>
            </div>
          </>
        }
        childrenBottom={
          <>
            {/* <MainNews /> */}
            {/* <SetNewsList /> */}
            <MainDashboard />
          </>
        }
      />
    </>
  );
}
