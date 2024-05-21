import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Button } from 'antd';
import styled from 'styled-components';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { useParams } from 'react-router-dom';

const Name = styled.div`
  box-sizing: border-box;
  font-size: 30px;
  color: #333;
  font-weight: bold;
`;

export default function MainProfile() {
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
      console.log(res.data.success);

      if (res.data.success) {
        console.log(res.data.result);
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
    console.log(userInfo);
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
      {/* <Name>홍길동</Name> */}
    </>
  );
}
