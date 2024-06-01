import { useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import {
  ChatBotContent,
  ChatBotFooter,
  ChatBotHeader,
} from '../components/ChatBotComponent';
import { compareTime, chatBotList, chatBotCard } from '../hooks/Functions';

export default function ChatBot() {
  const [userInfo, setUserInfo] = useAuth(0);
  const [bottomSize, setBottomSize] = useState(60);
  const [chatList, setChatList] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [isPossible, setIsPossible] = useState(false);
  const teacherMenu = [
    '다른 나라 세법 구경하기',
    '다른 나라 직업 리스트 구경하기',
    '다른 나라 과태료 구경하기',
    '학생 메뉴 보기',
  ];
  const studentMenu = ['추천 도서', '지구촌 소식'];
  const bookType = ['키워드', '저자', '연령', '인기 도서'];
  const ageList = [
    '유아',
    '초등학생',
    '중학생',
    '고등학생',
    '10대',
    '20대',
    '30대',
    '40대',
    '50대',
    '60대 이상',
  ];

  const newChatMsg = (writer, msg) => {
    return {
      writer,
      detail: [{ type: 'msg', chatMsg: msg }],
      chatDate: new Date(),
    };
  };
  const newBtnMsg = (list) => {
    return {
      writer: 'bot',
      detail: [
        {
          type: 'menuList',
          chatMsg: list,
        },
      ],
      chatDate: new Date(),
    };
  };

  const inputKeyword = (msg) => {
    if (keyword !== '') {
      menuFunc(`${keyword}: ${msg}`);
    }
  };

  const addChat = (newChat) => {
    const newList = [...chatList];
    newChat.forEach((data) => {
      if (newList.length === 0) {
        newList.push(data);
      } else {
        const lastEl = newList[newList.length - 1];
        if (
          compareTime(lastEl.chatDate, data.chatDate) &&
          lastEl.writer === data.writer
        ) {
          newList[newList.length - 1].detail.push(data.detail[0]);
        } else {
          newList.push(data);
        }
      }
    });
    setChatList(newList);
  };

  const menuFunc = async (msg) => {
    const defaultMsg = {
      writer: 'me',
      detail: [{ type: 'msg', chatMsg: msg }],
      chatDate: new Date(),
    };
    const answerChat = async (func, kor, eng) => {
      addChat([defaultMsg]);
      addChat([
        defaultMsg,
        await func(kor, eng),
        newChatMsg('bot', '다른 질문이 있으신가요?'),
        newBtnMsg(userInfo.isStudent ? studentMenu : teacherMenu),
      ]);
      setIsPossible(false);
    };
    const depthList = (list, showMsg) => {
      addChat([defaultMsg, newChatMsg('bot', showMsg), newBtnMsg(list)]);
    };
    if (msg === '다른 나라 세법 구경하기') {
      await answerChat(chatBotList, '세법', 'tax');
    } else if (msg === '다른 나라 직업 리스트 구경하기') {
      await answerChat(chatBotList, '직업', 'job');
    } else if (msg === '다른 나라 과태료 구경하기') {
      await answerChat(chatBotList, '과태료', 'penalty');
    } else if (msg === '학생 메뉴 보기') {
      addChat([
        defaultMsg,
        newChatMsg('bot', '무엇을 도와드릴까요?'),
        newBtnMsg(studentMenu),
      ]);
    } else if (msg === '지구촌 소식') {
      await answerChat(chatBotCard, '지구촌 소식 알려줘', 'newsList');
    } else if (msg === '추천 도서') {
      depthList(bookType, '원하시는 추천 메뉴를 선택하세요.');
    } else if (msg === '키워드' || msg === '저자') {
      addChat([defaultMsg, newChatMsg('bot', `검색할 ${msg}를 입력하세요.`)]);
      setIsPossible(true);
      setKeyword(msg);
    } else if (msg === '연령') {
      depthList(ageList, '연령을 선택하세요.');
      setKeyword(msg);
    } else if (ageList.includes(msg)) {
      await answerChat(chatBotCard, `${keyword} ${msg}`, 'bookList');
    } else {
      await answerChat(chatBotCard, msg, 'bookList');
    }
  };
  const removeMenu = () => {
    let isChange = false;
    const lastIndex = chatList.length - 1;
    const newList = [];
    chatList.forEach((data, index) => {
      const newDetail = [];
      if (index !== lastIndex) {
        data.detail.forEach((el) => {
          if (el.type !== 'menuList') {
            newDetail.push(el);
          } else {
            isChange = true;
          }
        });
        newList.push({
          writer: data.writer,
          detail: newDetail,
          chatDate: data.chatDate,
        });
      } else {
        newList.push(data);
      }
    });
    const finalList = newList.filter((data) => data.detail.length > 0);
    if (isChange) {
      setChatList(finalList);
    }
  };

  useEffect(() => {
    removeMenu();
    console.log(chatList);
  }, [chatList]);

  useEffect(() => {
    if (userInfo) {
      if (chatList.length === 0) {
        addChat([
          newChatMsg('bot', '무엇을 도와드릴까요?'),
          newBtnMsg(userInfo.isStudent ? studentMenu : teacherMenu),
        ]);
      }
    }
  }, [userInfo]);

  useEffect(() => {
    setUserInfo();
  }, []);

  return (
    <>
      <ChatBotHeader />
      <ChatBotContent
        bottomsize={bottomSize}
        chatlist={chatList}
        menufunc={menuFunc}
      />
      <ChatBotFooter
        sizefunc={setBottomSize}
        addfunc={inputKeyword}
        ispossible={isPossible}
        keywordfunc={setKeyword}
      />
    </>
  );
}
