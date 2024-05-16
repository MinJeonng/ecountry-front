import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import '../styles/manager_dash.scss';
import styled from 'styled-components';
import ProfileImage from '../components/ProfileImage';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import Template from '../components/Template';
import { ManagerMainHeader } from '../components/Headers';
import MainProfile from '../components/MainProfile';
import MainNews from '../components/MainNews';
import { SetNewsList } from '../components/NewsDetail';

export default function ManagerDashBoard() {
  return (
    <>
      <Template
        childrenTop={
          <>
            <ManagerMainHeader />
            <div className="managerInfo">
              <div className="InfoPart1">
                <MainProfile />
              </div>

              <Button style={{ fontSize: '15px', backgroundColor: '#D9D9D9' }}>
                <Link to="/setting/schoolInfo">초기세팅수정</Link>
              </Button>
            </div>
          </>
        }
        childrenBottom={
          <>
            {/* <MainNews /> */}
            {/* <SetNewsList /> */}
          </>
        }
      />
    </>
  );
}
