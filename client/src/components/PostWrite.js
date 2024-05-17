import { useEffect, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';
import axios from 'axios';
import ImageResize from '@looop/quill-image-resize-module-react';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css'; // 이 위치로 옮겼습니다.
import '../styles/test.scss';

import { storage } from '../config/Firebase';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

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
    editor.insertEmbed(range.index, 'image', `/images/loading.gif`);

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

function QuillEditor({ placeholder, value, ...rest }) {
  const navigate = useNavigate();
  const quillRef = useRef();
  const [user, setUser] = useAuth();
  const [blog, setBlog] = useState(false);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [category, setCategory] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [postId, setPostId] = useState();
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', () => setInnerWidth(window.innerWidth));
  }, []);

  const getCategory = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/blog/getCategory`,
      params: { memberId: user.id },
    });
    setCategoryList(res.data.result);
  };
  const addFunc = async () => {
    if (!content.trim() || content.trim() === '<p><br></p>') {
      alert('내용을 입력해주세요');
      return;
    }
    const findBlog = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/blog/find`,
      params: { memberId: user.id },
    });
    if (findBlog.data.result) {
      const categoryId = () => {
        if (category === 'none') {
          return null;
        }
        return Number(category);
      };
      const data = {
        postTitle: title,
        content: content,
        blogId: findBlog.data.result.id,
        hashtag: hashtag.split(', ').filter((val) => val !== ''),
        categoryId: categoryId(),
      };
      if (postId) {
        data.id = postId;
      }
      const res = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_HOST}/api/post/write`,
        data,
      });
      if (res.data.success) {
        alert('게시글 작성이 완료되었습니다.');
        navigate(`/blog/${user.id}/${res.data.result.id}`);
      }
    } else {
      alert('블로그 생성 후 게시글 작성이 가능합니다.');
      navigate('/setting/blog');
    }
  };
  const getPost = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/post/find`,
      params: { id: postId },
    });
    const { categoryId, content, postTitle } = res.data.result;
    let newString;
    res.data.result.hashtag.map((val, idx) => {
      if (idx > 0) {
        newString += `, ${val}`;
        setHashtag(newString);
      } else {
        newString = val;
        setHashtag(newString);
      }
      return;
    });
    setTitle(postTitle);
    if (categoryId) {
      setCategory(String(categoryId));
    }
    document.querySelector('.ql-editor').innerHTML = content;
    localStorage.removeItem('postId');
  };
  const checkKeyCode = (e) => {
    const kcode = e.keyCode;
    if (kcode === 32) {
      setHashtag(hashtag + ', #');
    } else if (kcode === 13) {
      setHashtag(hashtag + ', #');
    }
  };
  const changeFunc = (e) => {
    let newHashtag = e.target.value.replace(/\s$/, '');
    setHashtag(newHashtag);
  };
  const focusFunc = () => {
    if (!hashtag) {
      setHashtag('#');
    }
  };
  const focusOut = () => {
    if (hashtag === '#') {
      setHashtag('');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setUser();
    } else {
      alert('로그인 후 이용해주세요.');
      navigate('/signup');
      return;
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
  const getBlog = async () => {
    if (user.id) {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_HOST}/api/blog/find`,
        params: { memberId: user.id },
      });
      setBlog(res.data.success);
    }
  };
  useEffect(() => {
    if (user.id) {
      getBlog();
      getCategory();
    }
  }, [user]);
  useEffect(() => {
    if (user.id) {
      if (!blog) {
        alert('블로그 생성 후 게시글 작성이 가능합니다.');
        navigate('/setting/blog');
      }
    }
  }, [blog]);
  useEffect(() => {
    if (postId) {
      getPost();
    }
  }, [postId]);
  return (
    <>
      <div
        className="body"
        style={innerWidth >= 1160 ? { padding: '0 20px' } : { padding: 0 }}
      >
        <div className="postHeader">
          <button onClick={() => navigate(-1)}>취소</button>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="none">카테고리 없음</option>
            {categoryList?.map((value) => (
              <option key={value.id} value={value.id}>
                {value.categoryName}
              </option>
            ))}
          </select>
          {title.trim().length && content.trim().length ? (
            <button className="write on" onClick={addFunc}>
              작성
            </button>
          ) : (
            <button className="write" onClick={addFunc}>
              작성
            </button>
          )}
        </div>
        <input
          className="ql-snow ql-toolbar ql-title"
          type="text"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <ReactQuill
          style={{ height: 'fit-content' }}
          {...rest}
          placeholder={placeholder}
          theme="snow"
          ref={quillRef}
          value={content || ''}
          onChange={setContent}
          modules={modules}
          formats={formats}
        />
        <input
          className="hashtag"
          type="text"
          placeholder="해시태그를 입력해주세요(#제외 입력)"
          value={hashtag}
          onChange={changeFunc}
          onKeyDown={checkKeyCode}
          onFocus={focusFunc}
          onBlur={focusOut}
        />
      </div>
    </>
  );
}
export default QuillEditor;
