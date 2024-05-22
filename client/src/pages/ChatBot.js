import { useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';
import { ChatBotHeader } from '../components/ChatBotComponent';

export default function ChatBot() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useAuth(id);
  useEffect(() => {
    setUserInfo();
    console.log(userInfo);
  }, []);
  return (
    <>
      <ChatBotHeader />
    </>
  );
}
