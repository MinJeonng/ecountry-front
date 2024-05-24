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
    '선생님 메뉴2',
    '선생님 메뉴3',
    '선생님 메뉴4',
    '선생님 메뉴5',
    '다른 질문',
  ];
  const studentMenu = [
    '책 추천',
    '학생 메뉴2',
    '학생 메뉴3',
    '학생 메뉴4',
    '학생 메뉴5',
    '다른 질문',
  ];

  const addChat = (newChat) => {
    const newList = [...chatList];
    const lastEl = newList[newList.length - 1];
    if (
      compareTime(lastEl.chatDate, newChat.chatDate) &&
      lastEl.type === newChat.type
    ) {
      newList[newList.length - 1].chatMsg.push(newChat.chatMsg[0]);
    } else {
      newList.push(newChat);
    }
    setChatList(newList);
  };

  useEffect(() => {
    setUserInfo();
  }, []);
  useEffect(() => {
    if (userInfo) {
      setChatList([
        {
          type: 'you',
          chatMsg: ['상담 내용을 선택하세요'],
          chatDate: new Date(),
        },
        {
          type: 'menu',
          menuList: userInfo.isStudent ? studentMenu : teacherMenu,
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
      />
      <ChatBotFooter sizefunc={setBottomSize} addfunc={addChat} />
    </>
  );
}
