import React, { useEffect, useRef, useState } from 'react';
import { Avatar } from 'antd';
import styled from 'styled-components';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { useNavigate, useParams } from 'react-router-dom';
import { setStudentInfoList } from '../store/studentInfoReducer';
import { useDispatch, useSelector } from 'react-redux';
import { storage } from '../config/Firebase';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';
import {
  authFunc,
  chatBotList,
  confirmCountry,
  getExpire,
  profileImageUpload,
} from '../hooks/Functions';
import { ToastContainer, toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../store';
import { persistor } from '../';
import { auth } from '../store/userInfoReducer';
import { Btns } from '../pages/ManagerDashBoard';

const Name = styled.div`
  box-sizing: border-box;
  font-size: 22px;
  color: #333;
  font-weight: 700;
  @media (min-width: 1160px) {
    font-size: 20px;
  }
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
  @media (min-width: 1160px) {
    margin-top: 0px;
  }
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
  text-wrap: nowrap;
  img {
    width: 16px;
    height: 16px;
  }
  @media (min-width: 1160px) {
    margin-top: 0px;
  }
`;

export const DesktopContainer = styled.div`
  display: flex;
  flex-direction: column;
  .name {
    font-size: 20px;
    color: #333;
    font-weight: 600;
  }
  .job {
    font-size: 15px;
    color: #606060;
  }
`;
const ProfileInfo = styled.span`
  font-size: 0.9rem;
  color: #31660f;
  margin-top: 10px;
`;
const Container = styled.div`
  display: flex;
  gap: 5px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  div {
    @media (min-width: 1160px) {
      display: flex;
      align-items: center;
    }
  }
`;
const ProfileBtn = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

//관리자 info
export function MainProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [userInfo, setUserInfo] = useAuth(id);
  const fileInputRef = useRef(null);

  const [uploadedImageUrl, setUploadedImageUrl] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  );
  const [name, setName] = useState('');

  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const userInfo = useSelector((state) => state.auth);

  //정보 불러오기
  const getInfo = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_HOST}/api/user/info`,
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
          Authorization: `Bearer ${getExpire()}`,
        },
      });

      if (res.data.success) {
        setName(res.data.result.name);
        if (res.data.result.img) {
          setUploadedImageUrl(res.data.result.img);
        } else {
          setUploadedImageUrl(
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          );
        }
      } else {
        console.error(res.data.message);
      }
    } catch (error) {
      console.error('로그인 요청 실패:', error);
    }
  };

  const updateProfile = async (imageUrl) => {
    try {
      const res = await axios({
        method: 'PATCH',
        url: `${process.env.REACT_APP_HOST}/api/user`,
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
          // Authorization: `Bearer ${getExpire()}`,
        },
        data: {
          id: userInfo.id,
          img: imageUrl,
        },
      });
      if (res.data.success) {
        console.log(res.data.success);
        toast.success('프로필 변경이 완료되었습니다.', { autoClose: 1300 });
        getInfo();
      } else {
        toast.error('다시 시도해주세요.', { autoClose: 1300 });
      }
    } catch (error) {
      toast.error('다시 시도해주세요.', { autoClose: 1300 });
    }
  };

  const handleImageUpload = async (e) => {
    const fileInputRef = ref(storage, `profileImages/${userInfo.id}`);
    profileImageUpload(e, userInfo.id, fileInputRef, updateProfile);
  };
  const logoutFunc = () => {
    if (!window.confirm('로그아웃 하시겠습니까?')) {
      return;
    }
    localStorage.clear();
    dispatch(auth(null));
    window.location.href = `/login`;
  };

  useEffect(() => {
    if (userInfo) {
      getInfo();
    }
  }, [userInfo]);

  useEffect(() => {
    window.addEventListener(`resize`, () => setInnerWidth(window.innerWidth));
    return () =>
      window.removeEventListener(`resize`, () =>
        setInnerWidth(window.innerWidth)
      );
  }, []);

  return (
    <>
      <ToastContainer />
      {innerWidth <= 1160 ? (
        <>
          <Avatar
            src={uploadedImageUrl}
            style={{ marginRight: '10px', cursor: 'pointer' }}
            size={64}
            onClick={() => {
              fileInputRef.current.click();
            }}
          />
          <input
            type="file"
            style={{ display: 'none' }}
            accept="image/jpg,image/png,image/jpeg"
            name="profile_img"
            onChange={handleImageUpload}
            ref={fileInputRef}
          />
          <Name>{name}</Name>
        </>
      ) : (
        <>
          <Container>
            <div>
              <Avatar
                src={uploadedImageUrl}
                style={{ marginRight: '10px', cursor: 'pointer' }}
                size={50}
                onClick={() => {
                  fileInputRef.current.click();
                }}
              />
              <input
                type="file"
                style={{ display: 'none' }}
                accept="image/jpg,image/png,image/jpeg"
                name="profile_img"
                onChange={handleImageUpload}
                ref={fileInputRef}
              />

              <Name>{name}</Name>
            </div>
            <LogoutBtn onClick={logoutFunc}>
              로그아웃
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-sign-out.png`}
                alt="로그아웃"
              />
            </LogoutBtn>
          </Container>
          <ProfileInfo>
            프로필을 클릭하면 프로필 사진을 변경할 수 있습니다.
          </ProfileInfo>
        </>
      )}
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
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const getUserName = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_HOST}/api/user/info`,
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
          Authorization: `Bearer ${getExpire()}`,
        },
      });

      if (res.data.success) {
        console.log('success');
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
      console.error('정보 요청 실패:', error);
    }
  };

  const logoutFunc = async () => {
    if (!window.confirm('로그아웃 하시겠습니까?')) {
      return;
    }
    dispatch(auth(null));
    dispatch({ type: 'LOGOUT' });
    await persistor.purge();
    localStorage.clear();
    navigate(`/${id}/login`, { replace: true });
  };

  const movetoManager = () => {
    navigate(`/${id}/manager`);
  };

  // useEffect(() => {}, []);
  useEffect(() => {
    setUserInfo();
    console.log('setUserInfo');
  }, []);

  useEffect(() => {
    if (userInfo) {
      confirmCountry(id, userInfo, getUserName);
    }
  }, [userInfo]);

  useEffect(() => {
    window.addEventListener(`resize`, () => setInnerWidth(window.innerWidth));
    return () =>
      window.removeEventListener(`resize`, () =>
        setInnerWidth(window.innerWidth)
      );
  }, []);
  return (
    <>
      {innerWidth <= 1160 ? (
        <ProfileContainer>
          <ProfileName>
            {name} <div className="job">{job}</div>
          </ProfileName>
          <div className="btnBox">
            <LogoutBtn onClick={async () => logoutFunc()}>
              로그아웃
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-sign-out.png`}
                alt="로그아웃"
              />
            </LogoutBtn>
            {isManager && (
              <ToManagerBtn onClick={movetoManager}>관리자 페이지</ToManagerBtn>
            )}
          </div>
        </ProfileContainer>
      ) : (
        <>
          <DesktopContainer>
            <div className="name">{name}</div>
            <div className="job">{job}</div>
          </DesktopContainer>
          <ProfileBtn>
            {isManager && (
              <ToManagerBtn onClick={movetoManager}>관리자 페이지</ToManagerBtn>
            )}
            <LogoutBtn onClick={async () => logoutFunc()}>
              로그아웃
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-sign-out.png`}
                alt="로그아웃"
              />
            </LogoutBtn>
          </ProfileBtn>
        </>
      )}
    </>
  );
}
