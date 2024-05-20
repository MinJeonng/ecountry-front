import React, { useState, useEffect, useRef } from 'react';
import { ConfirmBtn } from './SettingBtn';

import '../styles/setting.scss';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import ReactQuill, { Quill } from 'react-quill';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import ImageResize from '@looop/quill-image-resize-module-react';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import '../styles/test.scss';

import { storage } from '../config/Firebase';

// Quill.register('modules/imageResize', ImageResize);
export const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'align',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'background',
  'color',
  'link',
  'image',
  'video',
  'width',
  'height',
  'float',
];
const imageHandler = (quillRef, storage) => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();
  input.addEventListener('change', async () => {
    const editor = quillRef.current.getEditor();
    const file = input.files[0];
    // 현재 커서 위치 저장
    const range = editor.getSelection();
    // 서버에 올려질때까지 표시할 로딩 placeholder 삽입
    editor.insertEmbed(range.index, 'image', `/images/loading2.gif`);

    try {
      // 파일명을 "image/Date.now()"로 저장
      const storageRef = ref(storage, `image/${Date.now()}`);

      // Firebase Method : uploadBytes, getDownloadURL
      await uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          // 이미지 URL 에디터에 삽입
          editor.deleteText(range.index, 1); //placeholder 삭제
          editor.insertEmbed(range.index, 'image', url);
          // URL 삽입 후 커서를 이미지 뒷 칸으로 이동
          editor.setSelection(range.index + 1);
        });
      });
    } catch (error) {
      editor.deleteText(range.index, 1);
    }
  });
};

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, false] }], // header 설정
      ['bold', 'italic', 'underline', 'strike', 'blockquote'], // 굵기, 기울기, 밑줄 등 부가 tool 설정
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ], // 리스트, 인덴트 설정
      ['link', 'image'], // 링크, 이미지, 비디오 업로드 설정
      [{ align: [] }, { color: [] }, { background: [] }], // 정렬, 글자 색, 글자 배경색 설정
      ['clean'], // toolbar 설정 초기화 설정
    ],

    // 핸들러 설정
    handlers: {
      image: imageHandler, // 이미지 tool 사용에 대한 핸들러 설정
    },

    // 이미지 크기 조절
    imageResize: {
      displayStyles: {
        backgroundColor: 'black',
        border: 'none',
        color: 'white',
      },
      modules: ['Resize', 'DisplaySize', 'Toolbar'],
    },
  },
};
export function SetPostWrite({ placeholder, value, ...rest }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const quillRef = useRef();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [postId, setPostId] = useState();
  //html형식 그대로 넣는거때매 필요
  const [fetchedContent, setFetchedContent] = useState('');

  //뉴스 추가
  const sendNews = async () => {
    const res = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_HOST}/api/post/article`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
      data: {
        postTitle: title,
        content: content,
        countryId: id,
      },
    });
    if (res.data.success) {
      toast('글이 등록되었습니다.');
      // navigate(`${countryId}/news/read/${postId}`);
    }
  };
  //뉴스 조회
  const getNews = async () => {
    const res = await axios({
      method: 'GET',
      url: `http://localhost:8080/api/post/article`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
      params: { id: postId },
    });
    const { content, postTitle } = res.data.result;

    document.querySelector('.ql-editor').innerHTML = content;
    localStorage.removeItem('postId');
  };
  useEffect(() => {
    if (localStorage.getItem('token')) {
      // setUser();
    } else {
      // alert('로그인 후 이용해주세요.');
      // navigate('/signup');
      // return;
    }
    if (localStorage.getItem('postId')) {
      setPostId(Number(localStorage.getItem('postId')));
    }
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const toolbar = editor.getModule('toolbar');
      toolbar.addHandler('image', () => imageHandler(quillRef, storage));
    }
  }, []);
  const handleNews = () => {
    if (!content.trim() || content.trim() === '<p><br></p>') {
      alert('내용을 입력해주세요');
      return;
    }
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
      <ToastContainer />
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
            className="ql-snow ql-toolbar ql-title"
            type="text"
            placeholder="제목을 입력하세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              marginBottom: '10px',
              border: 'none',
            }}
          />
          {/* 뉴스 기사 */}
          <ReactQuill
            style={{
              height: '300px',
              resize: 'none',
              border: 'none',
              borderRadius: '18px',
            }}
            {...rest}
            placeholder={placeholder}
            theme="snow"
            ref={quillRef}
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
          />

          <div className="postBtn">
            <ConfirmBtn
              btnName="취소"
              onClick={() => navigate(-1)}
              backgroundColor="#bacd92"
              width="40%"
            ></ConfirmBtn>
            {/* 저장 버튼 */}
            <ConfirmBtn
              btnName="작성"
              backgroundColor="#61759f"
              onClick={handleNews}
            ></ConfirmBtn>
          </div>
        </div>
      </form>
    </>
  );
}
