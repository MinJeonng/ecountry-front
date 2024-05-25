import { useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import {
  ChatBotContent,
  ChatBotFooter,
  ChatBotHeader,
} from '../components/ChatBotComponent';
import { compareTime } from '../hooks/Functions';

export default function ChatBot() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useAuth(id);
  const [bottomSize, setBottomSize] = useState(60);
  const [chatList, setChatList] = useState([]);
  const teacherMenu = [
    '다른 나라 세법 구경하기',
    '다른 나라 직업 리스트 구경하기',
    '다른 나라 과태료 구경하기',
    '학생 메뉴 보기',
    '다른 질문 하기',
  ];
  const studentMenu = [
    '추천 도서',
    '지구촌 소식',
    '',
    '학생 메뉴4',
    '학생 메뉴5',
    '다른 질문 하기',
  ];

  const addChat = (newChat) => {
    console.log(chatList);
    console.log(newChat.writer, ' : ', newChat);
    const newList = [...chatList];
    const lastEl = newList[newList.length - 1];
    if (
      compareTime(lastEl.chatDate, newChat.chatDate) &&
      lastEl.writer === newChat.writer
    ) {
      newList[newList.length - 1].detail.push(newChat.detail[0]);
    } else {
      console.log('else(1)-', newChat.writer, ' : ', newChat);
      newList.push(newChat);
      console.log('else(2)-', newChat.writer, ' : ', newList);
    }
    console.log('결과1 : ', chatList);
    console.log(newList);
    setChatList(newList);
    console.log('chatList', chatList);
  };

  const selectMenu = (msg) => {
    if (msg === '다른 나라 세법 구경하기') {
      addChat({
        writer: 'bot',
        detail: [{ type: 'msg', chatMsg: '세법리스트 보여주기' }],
        chatDate: new Date(),
      });
      console.log('챗봇 채팅 추가 : ', chatList);
    }
  };

  const menuFunc = (msg) => {
    console.log('내 채팅 추가 전 : ', chatList);
    addChat({
      writer: 'me',
      detail: [{ type: 'msg', chatMsg: msg }],
      chatDate: new Date(),
    });

    console.log('내 채팅 추가 : ', chatList);
    // selectMenu(msg);
  };

  useEffect(() => {
    console.log('리스트 변경 : ', chatList);
  }, [chatList]);

  useEffect(() => {
    setUserInfo();
  }, []);
  useEffect(() => {
    if (userInfo) {
      setChatList([
        {
          writer: 'bot',
          detail: [
            { type: 'msg', chatMsg: '상담 내용을 선택하세요' },
            {
              type: 'menuList',
              chatMsg: userInfo.isStudent ? studentMenu : teacherMenu,
            },
          ],
          chatDate: new Date(),
        },
      ]);
    }
  }, [userInfo]);
  return (
    <>
      <ChatBotHeader />
      <ChatBotContent
        bottomsize={bottomSize}
        chatlist={chatList}
        addfunc={addChat}
        menufunc={menuFunc}
      />
      <ChatBotFooter sizefunc={setBottomSize} addfunc={addChat} />
    </>
  );
}
