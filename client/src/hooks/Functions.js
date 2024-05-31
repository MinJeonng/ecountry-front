import axios from 'axios';
import styled from 'styled-components';

const ImageDefault = styled.img`
  width: 100%;
  height: 170px;
  object-fit: contain;
  border-radius: 10px;
  background: #ddfcae;
`;

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
  }. ${newTime.getDate()} ${translateTime()}:${newTime.getMinutes()}`;
}

export function getThumbnail(html) {
  if (html.includes('<img src="')) {
    const [_, start] = html.split('<img src="');
    const [imgUrl, __] = start.split('">');
    return imgUrl;
  }
  // return '/images/defaultImg.jpg';
  return (
    <ImageDefault
      className="defaultImg"
      src={`${process.env.PUBLIC_URL}/images/defaultImg.jpg`}
    />
  );
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
      .padStart(2, '0')}:${newTime.getMinutes()}`;
  } else {
    result = `오전 ${newTime
      .getHours()
      .toString()
      .padStart(2, '0')}:${newTime.getMinutes()}`;
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
  if (e.key === 'Enter') {
    e.preventDefault();
    refName.current.focus();
  }
};

export const handleKeyDown = (e, func) => {
  if (e.key === 'Enter') {
    func();
  }
};

export const chatBotList = async (msg, keyName) => {
  const res = await axios({
    method: 'GET',
    url: `${process.env.REACT_APP_HOST}/api/chatbot?text=${msg} 알려줘`,
    headers: {
      'Content-Type': `application/json`,
      'ngrok-skip-browser-warning': '69420',
    },
  });
  const list = JSON.parse(res.data.result);
  let result = '';
  await list.list.forEach((data, index) => {
    if (index === 0) {
      result += data[keyName];
    } else {
      result += `, ${data[keyName]}`;
    }
  });

  return {
    writer: 'bot',
    detail: [
      {
        type: 'msg',
        chatMsg: `다른 국가의 ${msg}에는 ${result} 등이 있습니다.`,
      },
    ],
    chatDate: new Date(),
  };
};

export const chatBotCard = async (msg, keyName) => {
  const res = await axios({
    method: 'GET',
    url: `${process.env.REACT_APP_HOST}/api/chatbot?text=${msg} 알려줘`,
    headers: {
      'Content-Type': `application/json`,
      'ngrok-skip-browser-warning': '69420',
    },
  });
  const list = JSON.parse(res.data.result).list[keyName];
  // const list = [
  //   {
  //     title: '[오늘의 뉴스] 미국에 세계 최대 야생동물 생태통로 생긴다',
  //     url: 'https://kids.donga.com?ptype=article&no=20240529121420438217&psub=online&gbn=',
  //     imageUrl: 'www/data/article/thum/202405/20240529121420.jpg',
  //     date: '2024-05-29 12:14:20',
  //     writer: '김재성 기자',
  //     description:
  //       '생태통로가 들어서기 전의 모습(맨 왼쪽)과 공사가 진행 중인 현재의 모습(가운데), 그리고 생태통로가 완공됐을 때의 상상도. 캘리포니아 주 제공101번 고속도로 근처 지역을 돌아다니고 있는 코요테. 워싱턴포스트 홈페이지 캡처',
  //   },
  //   {
  //     title: '[오늘의 뉴스] 미국에 세계 최대 야생동물 생태통로 생긴다2',
  //     url: 'https://kids.donga.com?ptype=article&no=20240529121420438217&psub=online&gbn=',
  //     imageUrl: 'www/data/article/thum/202405/20240529121420.jpg',
  //     date: '2024-05-29 12:14:20',
  //     writer: '김재성 기자',
  //     description:
  //       '생태통로가 들어서기 전의 모습(맨 왼쪽)과 공사가 진행 중인 현재의 모습(가운데), 그리고 생태통로가 완공됐을 때의 상상도. 캘리포니아 주 제공101번 고속도로 근처 지역을 돌아다니고 있는 코요테. 워싱턴포스트 홈페이지 캡처',
  //   },
  //   {
  //     title: '[오늘의 뉴스] 미국에 세계 최대 야생동물 생태통로 생긴다3',
  //     url: 'https://kids.donga.com?ptype=article&no=20240529121420438217&psub=online&gbn=',
  //     imageUrl: 'www/data/article/thum/202405/20240529121420.jpg',
  //     date: '2024-05-29 12:14:20',
  //     writer: '김재성 기자',
  //     description:
  //       '생태통로가 들어서기 전의 모습(맨 왼쪽)과 공사가 진행 중인 현재의 모습(가운데), 그리고 생태통로가 완공됐을 때의 상상도. 캘리포니아 주 제공101번 고속도로 근처 지역을 돌아다니고 있는 코요테. 워싱턴포스트 홈페이지 캡처',
  //   },
  // ];
  return {
    writer: 'bot',
    detail: [
      {
        type: 'cardNews',
        chatMsg: list,
      },
    ],
    chatDate: new Date(),
  };
};

export function newsTitleFilter(title) {
  if (title.includes(']')) {
    const [_, text] = title.split(']');
    return text;
  }
  return title;
}
