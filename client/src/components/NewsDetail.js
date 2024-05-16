import React, { useState, useEffect } from 'react';
import { ConfirmBtn } from './SettingBtn';

import '../styles/setting.scss';

export function SetNewsDetail() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 1분(60초)마다 갱신
    return () => clearInterval(timer);
  }, []);

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);
  };

  return (
    <form className="box-style">
      <div
        className="reset"
        style={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          position: 'relative',
        }}
      >
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
          }}
        >
          {selectedImage ? (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Uploaded"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div>이미지를 드롭하세요.</div>
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
        <div style={{ marginTop: '20px' }}>
          {currentTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
        {/* 저장 버튼 */}
        <ConfirmBtn btnName="업데이트"></ConfirmBtn>
      </div>
    </form>
  );
}
