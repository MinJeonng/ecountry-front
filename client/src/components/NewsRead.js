import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ConfirmBtn } from './SettingBtn';

import '../styles/setting.scss';
import axios from 'axios';
import { GetTimeText } from '../hooks/Functions';

export function SetNewsRead() {
  const { id, newsId } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(
    `${process.env.PUBLIC_URL}/logo192.png`
  );
  const [newsTitle, setNewsTitle] = useState('뉴스 제목 1');
  const [newsContent, setNewsContent] = useState(
    `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
  );
  const [writeTime, setWriteTime] = useState('2024. 5. 16. 오후 03:46');
  const [showBox, setShowBox] = useState(false);
  const [writer, setWriter] = useState('');
  const [formattedTime, setFormattedTime] = useState('');
  const [correction, setCorrection] = useState(false);

  const getNews = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_HOST}/api/post/article/${newsId}`,
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
        },
      });
      console.log(res.data.result);
      if (res.data.result.countryId == id) {
        const result = res.data.result;
        setNewsTitle(result.title);
        setNewsContent(result.content);
        setWriteTime(GetTimeText(result.createdAt));
        setWriter(result.writerName);
      } else {
        alert('유효하지 않은 접근입니다.');
      }
    } catch {
      alert('해당 뉴스를 불러올수 없습니다.');
      navigate(`/${id}/news`);
    }
  };

  const deleteNews = async () => {
    if (!window.confirm('뉴스를 삭제하시겠습니까?')) {
      return;
    }
    const res = await axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_HOST}/api/post/article/${newsId}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    });
    if (res.data.success) {
      alert('뉴스 삭제가 완료되었습니다.');
      navigate(`/${id}/news`);
    }
  };

  useEffect(() => {
    getNews();
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
    setCorrection(false);
    // try {
    //   //작성시간
    //   setWriteTime(formattedTime);
    //   //db에 들어가는 로직
    //   alert('글이 등록되었습니다.');
    //   navigate('/:id/manager/news/:id');
    // } catch (error) {
    //   console.log(error);
    // }
  };
  //삭제, 수정 버튼
  const handleSelectBox = () => {
    setShowBox(!showBox);
  };
  const textareaRef = useRef(null);
  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto'; // 텍스트가 삭제될 때 높이 재조정을 위해 초기화
    textarea.style.height = `${textarea.scrollHeight}px`; // 콘텐츠 높이에 맞춰 조정
  }, [newsContent]);

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
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              position: 'relative',
              zIndex: 100,
            }}
          >
            <img
              className="resetBtn"
              src={`${process.env.PUBLIC_URL}/images/icon-setting.png`}
              alt="Reset Button"
              onClick={handleSelectBox}
              style={{ width: '30px', height: '30px', right: '0' }}
            />
            {showBox && (
              <div
                className="selectBox"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '40px',
                  position: 'absolute',
                  top: '27px',
                  right: '7px',
                  fontSize: '13px',
                  textAlign: 'center',
                  background: 'rgba(117, 117, 117, 0.5)',
                  borderRadius: '12px',
                  padding: '10px',
                }}
              >
                <div
                  style={{
                    flex: 1,
                    width: '100%',
                    boxSizing: 'border-box',
                    color: 'white',
                  }}
                  onClick={deleteNews}
                >
                  삭제
                </div>
                <div
                  style={{
                    flex: 1,
                    width: '100%',
                    boxSizing: 'border-box',
                    color: 'white',
                  }}
                  onClick={() => setCorrection(true)}
                >
                  수정
                </div>
              </div>
            )}
          </div>
        </div>
        {/* <div style={{ marginBottom: '20px', fontSize: '11px' }}>
          {formattedTime}
        </div> */}
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
            <div
              style={{
                width: '225px',
                height: '200px',
              }}
            >
              이미지가 없는 상태
            </div>
          )}
        </label>
        {correction && (
          <input
            id="fileInput"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
        )}

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
          disabled={!correction}
        />
        {/* 뉴스 기사 */}
        <textarea
          ref={textareaRef}
          placeholder="뉴스 기사를 입력하세요."
          value={newsContent}
          onChange={(e) => setNewsContent(e.target.value)}
          style={{
            minHeight: '200px',
            padding: '10px',
            resize: 'none',
            border: 'none',
            borderRadius: '18px',
            overflow: 'hidden',
          }}
          disabled={!correction}
        />
        <div style={{ height: '10%' }}></div>
        {/* 저장 버튼 */}
        {correction && (
          <ConfirmBtn
            btnName="업데이트"
            backgroundColor="#61759f"
            onClick={handleNews}
          ></ConfirmBtn>
        )}
      </div>
    </form>
  );
}
