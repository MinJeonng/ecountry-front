import React, { useEffect, useRef, useState } from 'react';
import { Avatar } from 'antd';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Name = styled.div`
  box-sizing: border-box;
  font-size: 16px;
  color: #333;
  font-weight: 700;
`;

export function StudentIdCard() {
  const { id } = useParams();

  const [userInfo, setUserInfo] = useAuth(id);
  const [Image, setImage] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  );
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [job, setJob] = useState(null);
  const [rating, setRating] = useState('');

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

  const getUserInfo = async () => {
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
        const user = res.data.result;
        setName(user.name);
        setJob(user.job);
        setRating(user.rating);
      } else {
        console.error(res.data.message);
      }
    } catch (error) {
      console.error('사용자 정보 요청 실패:', error);
    }
  };

  useEffect(() => {
    setUserInfo();
  }, []);

  useEffect(() => {
    if (userInfo.authority) {
      getUserInfo();
    }
  }, [userInfo]);

  return (
    <div className="idCard-wrap">
      <div className="idCard-title">신분증</div>
      <div className="idCard-list">
        <Avatar
          src={Image}
          style={{ cursor: 'pointer' }}
          size={70}
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

        <div className="idCard-detail">
          <Name>{name}</Name>
          <div className="idCard-detail-list">
            <div className="idCard-detail-title">직업</div>
            <div className="idCard-detail-content">{job}</div>
          </div>
          <div className="idCard-detail-list">
            <div className="idCard-detail-title">신용등급</div>
            <div className="idCard-detail-content">{rating}등급</div>
          </div>
        </div>
      </div>
    </div>
  );
}
