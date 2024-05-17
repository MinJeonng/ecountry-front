import React, { useState, useEffect } from 'react';
import { ConfirmBtn } from './SettingBtn';

import '../styles/setting.scss';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export function SetNewsWrite() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newsTitle, setNewsTitle] = useState('');
  const [newsContent, setNewsContent] = useState('');

  const sendNews = async () => {
    const res = await axios({
      method: 'POST',
      url: `http://localhost:8080/api/post/article`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        title: newsTitle,
        content: newsContent,
        countryId: id,
      },
    });
    if (res.data.success) {
      alert('글이 등록되었습니다.');
    }
  };

  const handleNews = () => {
    try {
      //db에 들어가는 로직
      sendNews();
      // navigate('/:id/manager/news/:id');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []); // mount 시에만 실행

  return (
    <>
      <div>뉴스 작성</div>
      <form className="box-style">
        <div
          className="reset"
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          {/* 뉴스 제목 */}
          <input
            type="text"
            placeholder="뉴스 제목을 입력하세요."
            value={newsTitle}
            onChange={(e) => setNewsTitle(e.target.value)}
            style={{
              marginBottom: '20px',
              padding: '10px',
              border: 'none',
              borderRadius: '18px',
            }}
          />
          {/* 뉴스 기사 */}
          <textarea
            placeholder="뉴스 기사를 입력하세요."
            value={newsContent}
            onChange={(e) => setNewsContent(e.target.value)}
            style={{
              height: '200px',
              padding: '10px',
              resize: 'none',
              border: 'none',
              borderRadius: '18px',
            }}
          />

          {/* 저장 버튼 */}
          <ConfirmBtn
            btnName="작성"
            backgroundColor="#61759f"
            onClick={handleNews}
          ></ConfirmBtn>
        </div>
      </form>
    </>
  );
}
