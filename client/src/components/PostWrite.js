import React, { useState, useEffect, useRef, useMemo } from 'react';
import axios from 'axios';
import { ConfirmBtn } from './SettingBtn';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill, { Quill } from 'react-quill';
import { storage } from '../config/Firebase';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';
import { toast, ToastContainer } from 'react-toastify';
// import ImageResize from '@looop/quill-image-resize-module-react';
import ImageResize from 'quill-image-resize-module-react';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import '../styles/setting.scss';
import '../styles/test.scss';

Quill.register('modules/imageResize', ImageResize);

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
  'code-block',
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

    // 이미지 파일을 배열에 저장
    // imageFiles.push({ file, range });

    //일단 리사이즈 후 저장
    // const resizedImage = await resizeImage(file);
    // imageFiles.push({ file: resizedImage, range });

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
      [{ header: [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      [{ align: [] }, { color: [] }, { background: [] }],
      ['clean'],
    ],
    handlers: {
      image: function () {
        imageHandler(this.quill, storage);
      },
    },
  },
  imageResize: {
    displayStyles: {
      backgroundColor: 'black',
      border: 'none',
      color: 'white',
    },
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize', 'Toolbar'],
  },
};

export function SetPostWrite({ placeholder, value, ...rest }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const quillRef = useRef(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [postId, setPostId] = useState();

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
    const { content, title } = res.data.result;

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

  //작성 누르면 넘어가는 이 부분 부탁드릴게요
  const addFunc = () => {
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

  //보류
  const resetBtn = () => {
    const userConfirmed = window.confirm('취소하시겠습니까?');
    if (userConfirmed) {
      navigate(-1);
    }
  };

  useEffect(() => {}, []); // mount 시에만 실행

  return (
    <>
      <ToastContainer />
      {/* 헤더 위로 올리기 */}
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

          <ReactQuill
            style={{
              height: 'fit-content',
              border: 'none',
              borderRadius: '18px',
            }}
            {...rest}
            placeholder={placeholder}
            theme="snow"
            ref={quillRef}
            value={content || ''}
            onChange={setContent}
            modules={modules}
            formats={formats}
          />
          <div className="postBtn">
            <ConfirmBtn
              btnName="취소"
              // onChange={resetBtn}
              onClick={() => navigate(-1)}
              backgroundColor="#bacd92"
              width="40vw"
            ></ConfirmBtn>

            <ConfirmBtn
              btnName="작성"
              backgroundColor="#61759f"
              onClick={addFunc}
              width="40vw"
            ></ConfirmBtn>
          </div>
        </div>
      </form>
    </>
  );
}
