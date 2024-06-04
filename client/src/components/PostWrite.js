import React, { useState, useEffect, useRef, useMemo } from 'react';
import axios from 'axios';
import { ConfirmBtn } from './Btns';
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

import useAuth from '../hooks/useAuth';
import { getExpire, handleKeyDownNext } from '../hooks/Functions';

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

export function SetPostWrite({ ...rest }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const quillRef = useRef(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [postId, setPostId] = useState(0);

  //뉴스 추가
  const sendNews = async () => {
    if (postId) {
      const res = await axios({
        method: 'PATCH',
        url: `${process.env.REACT_APP_HOST}/api/post/article`,
        data: {
          title: title,
          content: content,
          id: postId,
        },
      });
      if (res.data.success) {
        toast.success('글이 수정되었습니다.', {
          autoClose: 1200,
        });

        setTimeout(() => {
          document.location.href = `/${id}/news`;
        }, 1400);
      }
    } else {
      const res = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_HOST}/api/post/article`,
        headers: {
          Authorization: `Bearer ${getExpire()}`,
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
        },
        data: {
          title: title,
          content: content,
          countryId: id,
        },
      });
      if (res.data.success) {
        toast.success('글이 등록되었습니다.', {
          autoClose: 1200,
        });
        console.log(getExpire());
        const res2 = await axios({
          method: 'POST',
          url: `${process.env.REACT_APP_HOST}/api/student/notice/add/all/${id}`,
          headers: {
            Authorization: `Bearer ${getExpire()}`,
            'Content-Type': `application/json`,
            'ngrok-skip-browser-warning': '69420',
          },
          data: {
            content: `${title} 뉴스가 새로 등록되었습니다.`,
          },
        });
        if (res2.data.success) {
          setTimeout(() => {
            document.location.href = `/${id}/news`;
          }, 1400);
        }
      }
    }
  };
  //뉴스 조회
  const getNews = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/post/article/${postId}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    });
    if (res.data.success) {
      console.log(res.data.result);
      setTitle(res.data.result.title);
      setContent(res.data.result.content);
      document.querySelector('.ql-editor').innerHTML = res.data.result.content;
      localStorage.removeItem('postId');
    } else {
      setPostId(0);
    }
  };

  // useEffect(() => {
  //   if (getExpire()) {
  //     // 사용자 인증 후 권한이 없으면 작성 불가
  //     // setUser();
  //   } else {
  //     // alert('로그인 후 이용해주세요.');
  //     // navigate('/signup');
  //     // return;
  //   }
  //   if (localStorage.getItem('postId')) {
  //     setPostId(Number(localStorage.getItem('postId')));
  //   }

  //   if (quillRef.current) {
  //     const editor = quillRef.current.getEditor();
  //     const toolbar = editor.getModule('toolbar');
  //     toolbar.addHandler('image', () => imageHandler(quillRef, storage));
  //   }
  // }, []);

  const addFunc = () => {
    if (!content.trim() || content.trim() === '<p><br></p>') {
      alert('내용을 입력해주세요');
      return;
    }
    try {
      sendNews();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(postId);
    if (postId) {
      getNews(postId);
    }
  }, [postId]);

  useEffect(() => {
    if (localStorage.getItem('postId')) {
      setPostId(Number(localStorage.getItem('postId')));
    }

    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const toolbar = editor.getModule('toolbar');
      toolbar.addHandler('image', () => imageHandler(quillRef, storage));
    }
  }, []);

  return (
    <div>
      <ToastContainer />
      <div className="student-wrap">
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
              onKeyDown={(e) => handleKeyDownNext(e, quillRef)}
            />

            <ReactQuill
              style={{
                height: 'fit-content',
                border: 'none',
                borderRadius: '18px',
              }}
              {...rest}
              placeholder="뉴스 내용을 입력해주세요"
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
                onClick={() => document.location.reload()}
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
            <div className="pc-postBtn">
              <ConfirmBtn
                btnName="취소"
                onClick={() => document.location.reload()}
                backgroundColor="#bacd92"
                width="24vw"
              ></ConfirmBtn>

              <ConfirmBtn
                btnName="작성"
                backgroundColor="#61759f"
                onClick={addFunc}
                width="24vw"
              ></ConfirmBtn>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
