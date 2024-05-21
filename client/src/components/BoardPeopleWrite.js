import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ConfirmBtn } from './SettingBtn';

export function BoardPeopleWrite() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const handleWrite = () => {
    try {
      //db에 들어가는 로직
      alert('글이 등록되었습니다.');
      navigate('/:id/manager/news/:id');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div style={{ color: '#666666', fontWeight: 'bolder' }}>
        신문고 글쓰기
      </div>
      <form className="box-style">
        <div
          className="reset"
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          {/* 제목 */}
          <div
            style={{ borderBottom: '2px solid #bacd92', marginBottom: '20px' }}
          >
            <input
              type="text"
              placeholder="제목을 입력하세요."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                padding: '10px',
                border: 'none',
                width: '100%',
                boxSizing: 'border-box',
                color: '#666666',
              }}
              onFocus={(e) => (e.target.style.outline = 'none')}
              onBlur={(e) => (e.target.style.outline = 'none')}
            />
          </div>
          {/* 뉴스 기사 */}
          <div
            style={{ borderBottom: '2px solid #bacd92', marginBottom: '20px' }}
          >
            <textarea
              placeholder="제안하고자 하는 내용을 입력하세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{
                height: '200px',
                padding: '10px',
                resize: 'none',
                border: 'none',
                width: '100%',
                boxSizing: 'border-box',
                color: '#666666',
              }}
              onFocus={(e) => (e.target.style.outline = 'none')}
              onBlur={(e) => (e.target.style.outline = 'none')}
            />
          </div>

          {/* 저장 버튼 */}
          <ConfirmBtn
            btnName="업데이트"
            backgroundColor="#bacd92"
            onClick={handleWrite}
          ></ConfirmBtn>
        </div>
      </form>
    </>
  );
}
