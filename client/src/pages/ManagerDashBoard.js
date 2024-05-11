import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import '../styles/manager_dash.scss';
import styled from 'styled-components';
import ProfileImage from '../components/ProfileImage';
import { Avatar, Button } from 'antd';
import { Link } from 'react-router-dom';
import Template from '../components/Template';
import { ManagerMainHeader } from '../components/Headers';

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
  const [news, setNews] = useState(null);
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

  const getNews = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_HOST}/api/rule`,
      });
      setNews(res.data); // 전체 데이터를 상태로 설정
    } catch (error) {
      console.error('뉴스를 가져오는데 실패했습니다.', error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <>
      <Template
        childrenTop={
          <>
            <ManagerMainHeader />
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
                <ManagerName>홍길동 대통령</ManagerName>
              </div>
              <Button style={{ fontSize: '14px', backgroundColor: '#D9D9D9' }}>
                <Link to="/">초기세팅수정</Link>
              </Button>
            </div>
          </>
        }
        childrenBottom={
          <>
            <div className="content">
              <span className="newsHead">뉴스</span>
              {news?.success ? (
                <div className="newsInfo">
                  {news.result.map((item) => (
                    <div key={item.id}>
                      <span>{item.rule}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="newsContent">
                  <span>뉴스가 존재하지 않습니다.</span>
                  <Link
                    className="registerBtn"
                    to="/manager/news"
                    style={{ color: 'black' }}
                  >
                    등록하기
                  </Link>
                </div>
              )}
            </div>
          </>
        }
      />
    </>
  );
}
