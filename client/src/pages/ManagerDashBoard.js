import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Background from '../components/Background';
import '../styles/manager_dash.scss';
import styled from 'styled-components';
import ProfileImage from '../components/ProfileImage';
import { Avatar, Button } from 'antd';
import { Link } from 'react-router-dom';

const ManagerName = styled.div`
  box-sizing: border-box;
  font-size: 30px;
  color: #333;
  font-weight: bold;
  /* text-align: center; */
`;
// const Button = styled.button`

// `

export default function ManagerDashBoard() {
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

  //나중에 백이랑 연결해서 api생기면 주석풀고 다시
  // const getUserName = async () => {
  //   const res = await axios({
  //     method: 'POST',
  //     url: `${process.env.REACT_APP_HOST}/api/user/login`,
  //   });
  //   setName(res.data.name);
  // };
  // useEffect(() => {
  //   getUserName();
  // }, []);

  return (
    <>
      <Background />
      {/* <div>
        <img
          src={`${process.env.PUBLIC_URL}/images/icon-sign-out.png`}
          width="30px"
        />
      </div> */}
      <div className="managerInfo">
        <div className="InfoPart1">
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
          {/* <ManagerName>{name} 대통령</ManagerName> */}
          <ManagerName>홍길동 대통령</ManagerName>
        </div>
        <Button style={{ fontSize: '15px', backgroundColor: '#D9D9D9' }}>
          <Link to="/">초기세팅수정</Link>
        </Button>
      </div>
    </>
  );
}
