import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ConfirmBtn } from './Btns';

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
  const textareaRef = useRef(null);

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

  const editNews = () => {
    localStorage.setItem('postId', newsId);
    navigate(`/${id}/news/write`);
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
  }, []); // mount 시에만 실행

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);
  };
  const handleNews = () => {};
  //삭제, 수정 버튼
  const handleSelectBox = () => {
    setShowBox(!showBox);
  };
  useEffect(() => {
    document.querySelector('.newsContent').innerHTML = newsContent;
  }, [newsContent]);

  return (
    <>
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
              style={{ width: '20px', height: '20px', right: '0' }}
            />
            {showBox && (
              <div
                className="selectBox"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'absolute',
                  fontSize: '14px',
                  textAlign: 'center',
                  margin: '10px',
                  boxSizing: 'border-box',
                  top: '9px',
                  color: '#5f6368',
                }}
              >
                <div
                  style={{
                    flex: 1,
                    width: '100%',
                    boxSizing: 'border-box',
                    borderBottom: '1px solid rgb(163 167 172)',
                    margin: 4,
                    marginBottom: 4,
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
                    borderBottom: '1px solid rgb(163 167 172)',
                    padding: 4,
                  }}
                  onClick={editNews}
                >
                  수정
                </div>
              </div>
            )}
          </div>
        </div>
        {/* 뉴스 제목 */}
        <div
          style={{
            border: 'none',
            borderRadius: '18px',
            color: '#666666',
            fontSize: '20px',
            paddingLeft: '5px',
            marginTop: '30px',
            marginBottom: '10px',
          }}
        >
          {newsTitle}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            color: '#666666',
            paddingLeft: '5px',
            fontSize: '14px',
            marginBottom: '10px',
          }}
        >
          <p>{writeTime}</p>
          <p style={{ paddingLeft: '14px' }}>글쓴이 : {writer}</p>
        </div>
        <div
          style={{ borderBottom: '2px solid #bacd92', marginBottom: '10px' }}
        ></div>
        {/* 뉴스 기사 */}
        <div style={{ marginTop: '20px' }}>
          <div
            className="newsContent"
            style={{
              minHeight: '200px',
              padding: '10px',
              resize: 'none',
              border: 'none',
              color: '#666666',
            }}
          ></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <button
            onClick={() => navigate(`/${id}/news`)}
            style={{
              all: 'unset',
              margin: 10,
              color: 'rgb(102, 102, 102)',
              fontWeight: 500,
              border: '1.2px solid #bacd92',
              borderRadius: 8,
              padding: '5px 15px',
            }}
          >
            목록
          </button>
        </div>
      </div>
    </>
  );
}
