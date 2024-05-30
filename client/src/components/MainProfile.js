import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Button } from 'antd';
import styled from 'styled-components';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { useNavigate, useParams } from 'react-router-dom';
import { setStudentInfoList } from '../store/studentInfoReducer';
import { useDispatch } from 'react-redux';

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
  .btnBox {
    display: flex;
    gap: 10px;
  }
`;
const ToManagerBtn = styled.button`
  border-radius: 11px;
  border: none;
  text-align: center;
  font-size: 13px;
  color: #606060;
  padding: 14px 20px;
  margin-top: 5px;
  height: 32px;
  box-shadow: 1px 1.3px #c0bebe;
  display: flex;
  align-items: center;
`;

const ProfileName = styled.div`
  display: flex;
  padding-top: 5px;
  font-size: 25px;
  color: #333;
  font-weight: 700;
  gap: 10px;
  .job {
    font-size: 15px;
    color: #635f5f;
    padding-top: 15px;
  }
`;
const LogoutBtn = styled.button`
  border-radius: 11px;
  border: none;
  text-align: center;
  font-size: 13px;
  color: #606060;
  padding: 14px 20px;
  margin-top: 5px;
  box-shadow: 1px 1.3px #c0bebe;
  height: 32px;
  display: flex;
  align-items: center;
  img {
    width: 16px;
    height: 16px;
  }
`;

const JobSkillBtn = styled.div`
  padding-right: 30px;
  a {
    //밑에 언더라인 없애기
  }
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
    </>
  );
}

export function GetName() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useAuth(id);
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const dispatch = useDispatch();
  const [isManager, setIsManager] = useState(false);
  const navigate = useNavigate();

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
        setJob(res.data.result.job);
        if (userInfo.isStudent) {
          dispatch(setStudentInfoList(res.data.result));
        } else {
          dispatch(setStudentInfoList({ skills: [0, 1, 2, 3, 4, 5] }));
          setIsManager(true);
        }
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

  // useEffect(() => {
  //   console.log('22222');
  //   setUserInfo();
  // }, []);

  useEffect(() => {
    if (userInfo.authority) {
      getUserName();
    }
  }, [userInfo]);
  const movetoManager = () => {
    navigate(`/${id}/manager`);
  };

  return (
    <ProfileContainer>
      <ProfileName>
        {name} <div className="job">{job}</div>
      </ProfileName>
      <div className="btnBox">
        <LogoutBtn onClick={logoutFunc}>
          로그아웃
          <img
            src={`${process.env.PUBLIC_URL}/images/icon-sign-out.png`}
            alt="복사"
          />
        </LogoutBtn>
        {isManager && (
          <ToManagerBtn onClick={movetoManager}>관리자 페이지</ToManagerBtn>
        )}
      </div>
    </ProfileContainer>
  );
}
