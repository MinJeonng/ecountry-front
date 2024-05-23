import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Button } from 'antd';
import styled from 'styled-components';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { useParams } from 'react-router-dom';

const Name = styled.div`
  box-sizing: border-box;
  font-size: 25px;
  color: #333;
  font-weight: 700;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: flex-start;
`;

const ProfileName = styled.div`
  position: relative;
  top: 5px;
  left: 20px;
  font-size: 25px;
  color: #333;
  font-weight: 700;
`;
const LogoutBtn = styled.button`
  position: relative;
  left: 20px;
  border-radius: 5px;
  border: none;
  text-align: center;
  font-size: 13px;
  color: #6184c7;
  padding: 3px 10px;
  margin-top: 5px;
`;

export function MainProfile() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useAuth(id);
  const [Image, setImage] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  );
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');

  const fileInput = useRef(null);
  const onChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      //업로드 취소할 시
      setImage(
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
      );
      return;
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const getUserName = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_HOST}/api/user/info`,
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.data.success) {
        setName(res.data.result.name);
      } else {
        console.error(res.data.message);
      }
    } catch (error) {
      console.error('로그인 요청 실패:', error);
    }
  };

  useEffect(() => {
    setUserInfo();
  }, []);

  useEffect(() => {
    if (userInfo.authority) {
      getUserName();
    }
  }, [userInfo]);

  return (
    <>
      <Avatar
        src={Image}
        style={{ marginRight: '10px', cursor: 'pointer' }}
        size={64}
        onClick={() => {
          fileInput.current.click();
        }}
      />
      <input
        type="file"
        style={{ display: 'none' }}
        accept="image/jpg,image/png,image/jpeg"
        name="profile_img"
        onChange={onChange}
        ref={fileInput}
      />
      <Name>{name}</Name>
      {/* 이름 옆에 직업을 넣어주는 것도 고려 */}
    </>
  );
}

export function GetName() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useAuth(id);
  const [name, setName] = useState('');
  const getUserName = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_HOST}/api/user/info`,
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.data.success) {
        setName(res.data.result.name);
      } else {
        console.error(res.data.message);
      }
    } catch (error) {
      console.error('로그인 요청 실패:', error);
    }
  };
  const logoutFunc = () => {
    if (!window.confirm('로그아웃 하시겠습니까?')) {
      return;
    }
    localStorage.removeItem('token');
    window.location.href = `/${id}/login`;
  };
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setUserInfo();
    }
  }, []);

  useEffect(() => {
    setUserInfo();
  }, []);

  useEffect(() => {
    if (userInfo.authority) {
      getUserName();
    }
  }, [userInfo]);
  return (
    <ProfileContainer>
      <ProfileName>{name}</ProfileName>
      <LogoutBtn onClick={logoutFunc}>로그아웃</LogoutBtn>
    </ProfileContainer>
  );
}
