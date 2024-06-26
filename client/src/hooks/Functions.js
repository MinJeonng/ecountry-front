import axios from 'axios';
import { getDownloadURL, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export function GetTimeText(time) {
  const newTime = new Date(time);
  const translateTime = () => {
    if (newTime.getHours() > 12) {
      return `오후 ${(newTime.getHours() - 12).toString().padStart(2, '0')}`;
    } else {
      return `오전 ${newTime.getHours().toString().padStart(2, '0')}`;
    }
  };
  return `${newTime.getFullYear()}. ${
    newTime.getMonth() + 1
  }. ${newTime.getDate()} ${translateTime()}:${newTime
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
}

export function getThumbnail(html) {
  if (html.includes('<img src="')) {
    const [_, start] = html.split('<img src="');
    const [imgUrl, __] = start.split('">');
    return imgUrl;
  }
  return '/images/defaultImg.jpg';
}

export const htmlToText = (html) => {
  let newHtml = html;
  while (newHtml.includes('<')) {
    const s = newHtml.indexOf('<');
    const e = newHtml.indexOf('>') + 1;
    const subString = newHtml.slice(s, e);
    newHtml = newHtml.replaceAll(subString, '');
  }
  return newHtml;
};

export const getOnlyTime = (time) => {
  if (time === '') {
    return '';
  }
  const newTime = new Date(time);
  let result;
  if (newTime.getHours() > 12) {
    result = `오후 ${(newTime.getHours() - 12)
      .toString()
      .padStart(2, '0')}:${newTime.getMinutes().toString().padStart(2, '0')}`;
  } else {
    result = `오전 ${newTime.getHours().toString().padStart(2, '0')}:${newTime
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  }
  return result;
};

export const compareTime = (prevTime, nowTime) => {
  const prevDate = new Date(prevTime);
  const nowDate = new Date(nowTime);
  if (
    prevDate.getFullYear() === nowDate.getFullYear() &&
    prevDate.getMonth() === nowDate.getMonth() &&
    prevDate.getDate() === nowDate.getDate() &&
    prevDate.getHours() === nowDate.getHours() &&
    prevDate.getMinutes() === nowDate.getMinutes()
  ) {
    return true;
  } else {
    return false;
  }
};

export const getOnlyDate = (date) => {
  const newDate = new Date(date);
  return `${newDate.getMonth() + 1}월 ${newDate.getDate()}일`;
};

export const handleKeyDownNext = (e, refName) => {
  if (e.nativeEvent.isComposing) return;
  if (e.key === 'Enter') {
    e.preventDefault();
    refName.current.focus();
  }
};

export const handleKeyDown = (e, func) => {
  if (e.nativeEvent.isComposing) return;
  if (e.key === 'Enter') {
    e.preventDefault();
    func();
  }
};

const chatApi = async (msg) => {
  const res = await axios({
    method: 'GET',
    url: `${process.env.REACT_APP_HOST}/api/chatbot?text=${msg}`,
    headers: {
      'Content-Type': `application/json`,
      'ngrok-skip-browser-warning': '69420',
    },
  });
  // console.log(res.data.result);
  return JSON.parse(res.data.result);
};

const resultMsg = (type, chatMsg) => {
  return {
    writer: 'bot',
    detail: [{ type, chatMsg }],
    chatDate: new Date(),
  };
};

export const chatBotList = async (msg, keyName) => {
  const list = await chatApi(`${msg} 알려줘`);
  if (list.list.length > 0) {
    let result = '';
    await list.list.forEach((data, index) => {
      if (index === 0) {
        result += data[keyName];
      } else {
        result += `, ${data[keyName]}`;
      }
    });
    return resultMsg('msg', `다른 국가의 ${msg}에는 ${result} 등이 있습니다.`);
  } else {
    return resultMsg(
      'msg',
      '결과를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.'
    );
  }
};

export const chatBotCard = async (msg, keyName) => {
  const newMsg = msg.replace(':', '');
  const list = await chatApi(newMsg);
  if (list?.list[keyName]?.length === 0) {
    // console.log('빈배열');
    return resultMsg('msg', '검색 결과가 없습니다.');
  } else if (list) {
    return resultMsg(
      keyName === 'newsList' ? 'cardNews' : 'cardBook',
      list.list[keyName]
    );
  } else {
    return resultMsg(
      'msg',
      '결과를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.'
    );
  }
};

export function newsTitleFilter(title) {
  if (title.includes(']')) {
    const [_, text] = title.split(']');
    return text.replace(' ', '');
  }
  return title;
}

const dataURLtoBlob = (dataurl) => {
  let arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

const uploadImageFunc = async (file, ref) => {
  // file 매개변수 추가
  if (!file) return;
  try {
    await uploadBytes(ref, file);
    const url = await getDownloadURL(ref); // 업로드된 파일의 URL 가져옴
    // console.log('반환된 이미지경로 : ' + url);
    return url; // URL을 반환
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    return null;
  }
};

//프로필 사진 변경
const updateImg = async (id, file, uploadedUrl, ref, func) => {
  let imageUrl = uploadedUrl;
  if (file && !uploadedUrl.startsWith('https://')) {
    let blob = dataURLtoBlob(uploadedUrl);
    const uploadUrl = await uploadImageFunc(blob, ref);
    if (uploadUrl) {
      imageUrl = uploadUrl;
    }
  }
  func(imageUrl);
};

export const profileImageUpload = async (e, id, ref, func) => {
  const file = e.target.files[0];
  if (file) {
    // 파일을 읽어서 화면에 표시
    const reader = new FileReader();
    reader.onloadend = () => {
      // onloadend 이벤트 사용
      updateImg(id, file, reader.result, ref, func);
    };
    reader.readAsDataURL(file);
  } else {
    // 업로드 취소할 시 기본 이미지로 설정
    return 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  }
};

export const confirmCountry = (id, userInfo, func, onlyTeacher) => {
  if (userInfo.countryList?.includes(Number(id))) {
    if (onlyTeacher) {
      if (userInfo.isStudent) {
        errorMsg('선생님만 접근 가능한 페이지입니다.', `/${id}/main`);
        return;
      }
    }
    if (func) {
      func();
    }
  } else {
    if (userInfo.isStudent) {
      errorMsg('접근 권한이 없습니다.', `/${id}/login`);
    } else {
      errorMsg('접근 권한이 없습니다.', `login`);
    }
  }
};

export const authFunc = () => {
  if (getExpire()) {
    return true;
  } else {
    toast.error('로그인 후 이용 가능합니다.', { autoClose: 1300 });

    return false;
  }
};

export const setExpire = (token) => {
  const obj = {
    token,
    expire: Date.now() + 43200 * 1000,
  };
  const objString = JSON.stringify(obj);
  localStorage.setItem('token', objString);
};

export const getExpire = () => {
  const objString = localStorage.getItem('token');
  if (objString) {
    const obj = JSON.parse(objString);
    if (Date.now() > obj.expire) {
      localStorage.removeItem('token');
    } else {
      return obj.token;
    }
  }
  return null;
};

export const errorMsg = (msg, url) => {
  toast.error(msg, { autoClose: 1300 });
  setTimeout(() => {
    document.location.href = url;
  }, 1300);
};
