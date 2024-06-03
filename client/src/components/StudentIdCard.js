import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import { confirmCountry, profileImageUpload } from '../hooks/Functions';
import { ref } from 'firebase/storage';
import { storage } from '../config/Firebase';

const Name = styled.div`
  box-sizing: border-box;
  font-size: 14px;
  color: #333;
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
  const [countryName, setCountryName] = useState('');

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const updateProfile = async (imageUrl) => {
    try {
      const res = await axios({
        method: 'PATCH',
        url: `${process.env.REACT_APP_HOST}/api/student/user/img/${id}`,
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: {
          img: imageUrl,
        },
      });
      console.log(res.data);
      if (res.data.success) {
        console.log(res.data.success);
        toast.success('프로필 변경이 완료되었습니다.', { autoClose: 1300 });
        getUserInfo();
      } else {
        toast.error('다시 시도해주세요.', { autoClose: 1300 });
      }
    } catch (error) {
      toast.error('다시 시도해주세요.', { autoClose: 1300 });
    }
  };

  const onChange = (e) => {
    const fileInputRef = ref(storage, `profileImages/${userInfo.id}`);
    profileImageUpload(e, userInfo.id, fileInputRef, updateProfile);
  };

  const getCountryInfo = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_HOST}/api/country/${id}`,
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
        },
      });
      if (res.data.success) {
        setCountryName(res.data.result?.name);
      } else {
        console.error(res.data.message);
      }
    } catch (error) {
      console.error('국가 정보 요청 실패:', error);
    }
  };

  const getUserInfo = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_HOST}/api/user/info`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
        },
      });
      console.log(res.data.success);

      if (res.data.success) {
        const user = res.data.result;
        setName(user.name);
        setJob(user.job);
        setRating(user.rating);
        if (user.img) {
          setImage(user.img);
        }
      } else {
        console.error(res.data.message);
      }
    } catch (error) {
      console.error('사용자 정보 요청 실패:', error);
    }
  };

  const mountFunc = () => {
    getUserInfo();
    getCountryInfo();
  };

  useEffect(() => {
    console.log(Image);
  }, [Image]);

  useEffect(() => {
    if (userInfo) {
      confirmCountry(id, userInfo, mountFunc);
    }
  }, [userInfo]);

  useEffect(() => {
    setUserInfo();
  }, []);

  return (
    <div className="idCard-wrap">
      <ToastContainer />
      <div className="idCard-list">
        <div className="idCard-detail">
          <div className="idCard-detail-title">신분증</div>
          <Name>{name}</Name>
          <div className="idCard-detail-list">
            <div className="idCard-detail-content">{job}</div>
          </div>
          <div className="idCard-detail-list">
            <div className="idCard-detail-content">{rating}등급</div>
          </div>
        </div>

        <img
          src={Image}
          style={{
            cursor: 'pointer',
            width: 90,
            height: 90,
            borderRadius: 8,
          }}
          onClick={() => {
            fileInputRef.current.click();
          }}
        />

        <input
          type="file"
          style={{ display: 'none' }}
          accept="image/jpg,image/png,image/jpeg"
          name="profile_img"
          onChange={onChange}
          ref={fileInputRef}
        />
      </div>
      <div className="country-name">{countryName}</div>
    </div>
  );
}
