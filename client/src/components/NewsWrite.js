import React, { useState, useEffect } from 'react';
import { ConfirmBtn } from './SettingBtn';

import '../styles/setting.scss';
import { useNavigate } from 'react-router-dom';

export function SetNewsWrite() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [formattedTime, setFormattedTime] = useState('');
  const [writeTime, setWriteTime] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const newFormattedTime = `${currentTime.toLocaleDateString()} ${currentTime.toLocaleTimeString(
        [],
        {
          hour: '2-digit',
          minute: '2-digit',
        }
      )}`;
      setFormattedTime(newFormattedTime);
    }, 60000); // 1분(60초)마다 실행

    return () => clearInterval(intervalId);
  }, []); // mount 시에만 실행

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);
  };
  const handleNews = () => {
    try {
      //작성시간
      setWriteTime(formattedTime);
      //db에 들어가는 로직
      alert('글이 등록되었습니다.');
      navigate('/:id/manager/news/:id');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="box-style">
      <div
        className="reset"
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <div style={{ marginBottom: '20px', fontSize: '11px' }}>
          {formattedTime}
        </div>
        <label
          htmlFor="fileInput"
          style={{
            border: 'none',
            textAlign: 'center',
            lineHeight: '200px',
            cursor: 'pointer',
            marginBottom: '20px',
            position: 'relative',
            borderRadius: '18px',
            background: 'white',
            height: '200px',
            display: 'inline-block',
            overflow: 'hidden',
          }}
        >
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Uploaded"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%' }}>
              이미지를 드롭하세요.
            </div>
          )}
        </label>
        <input
          id="fileInput"
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
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
          btnName="업데이트"
          backgroundColor="#61759f"
          onClick={handleNews}
        ></ConfirmBtn>
      </div>
    </form>
  );
}
