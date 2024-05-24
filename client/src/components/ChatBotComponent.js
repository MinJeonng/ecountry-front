import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../images/ico-arr-left.svg';
import { ReactComponent as ArrowUp } from '../images/icon-arrow-up.svg';
import { ReactComponent as IconHome } from '../images/icon-home.svg';
import { ReactComponent as IconSend } from '../images/icon-send.svg';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { getOnlyTime } from '../hooks/Functions';

const HeaderStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #ddd;
  padding: 0 20px;
  box-sizing: border-box;
  .headerLeft {
    display: flex;
    align-items: center;
    .chatbotTit {
      margin-left: 4px;
    }
  }
`;
const ContentStyle = styled.div`
  background: rgb(252, 255, 224);
  width: 100%;
  min-height: 100vh;
  padding: 80px 20px ${(props) => props.bottomsize + 'px'};
  box-sizing: border-box;
  .chatBox {
    display: flex;
    align-items: flex-end;
    margin-bottom: 10px;
    .chatMsg {
      padding: 10px;
      max-width: 60vw;
      word-break: break-all;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
    }
    .chatDate {
      font-size: 12px;
      padding: 0 0 3px 10px;
      color: #999;
    }
    &.me {
      justify-content: end;
      .chatMsg {
        order: 2;
        background: #75a47f;
        color: #fff;
      }
      .chatDate {
        order: 1;
        padding: 0 10px 3px 0;
      }
    }
  }
  .menuList {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 10px;
    .menuBtn {
      background: #75a47f;
      border: none;
      color: #fff;
      padding: 4px 8px;
      border-radius: 6px;
    }
  }
`;
const FooterStyle = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 60px;
  max-height: 100px;
  line-height: 60px;
  border-top: 1px solid #ddd;
  padding: 0 20px;
  box-sizing: border-box;
  textarea {
    width: 100%;
    margin: 10px 50px 10px 0;
    line-height: 20px;
    max-height: 80px;
    box-sizing: border-box;
    background: none;
    border: none;
    resize: none;
    overflow: auto;
    &:focus {
      outline: none;
    }
  }
  .sendBtn {
    display: flex;
    background: #75a47f;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
    .sendIcon {
      padding: 2px 3px 0 0;
    }
  }
`;
export function ChatBotHeader() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <HeaderStyle>
        <div className="headerLeft">
          <ArrowLeft stroke="#ddd" onClick={() => navigate(-1)} />
          <div className="chatbotTit">챗봇</div>
        </div>
        {/* 홈버튼 클릭 시 국가 메인페이지로 이동 되도록 수정 */}
        <IconHome stroke="#ddd" onClick={() => navigate(`/${id}/manager`)} />
      </HeaderStyle>
    </>
  );
}

export function ChatBotMsg({ type, chatmsg, chatdate }) {
  console.log(getOnlyTime(chatdate));
  return (
    <div className={`chatBox ${type}`}>
      <div className="chatMsg">{chatmsg}</div>
      <p className="chatDate">{getOnlyTime(chatdate)}</p>
    </div>
  );
}

export function ChatBotContent({ bottomsize, chatlist, addfunc }) {
  const scrollRef = useRef(null);
  const clickFunc = (msg) => {
    addfunc({ type: 'me', chatMsg: msg, chatDate: new Date() });
  };
  const scrollBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  };
  useEffect(() => {
    scrollBottom();
  }, [chatlist]);
  return (
    <ContentStyle bottomsize={bottomsize} ref={scrollRef}>
      {chatlist.map((chat, index) =>
        chat.type === 'me' || chat.type === 'you' ? (
          <div key={index} className={`chatBox ${chat.type}`}>
            <div className="chatMsg">{chat.chatMsg}</div>
            <p className="chatDate">{getOnlyTime(chat.chatDate)}</p>
          </div>
        ) : (
          <div className="menuList" key={index}>
            {chat.menuList.map((menu, index) => (
              <button
                type="button"
                key={index}
                className="menuBtn"
                onClick={() => clickFunc(menu)}
              >
                {menu}
              </button>
            ))}
          </div>
        )
      )}
    </ContentStyle>
  );
}

export function ChatBotFooter({ sizefunc, addfunc }) {
  const textareaRef = useRef(null);
  const footerRef = useRef(null);
  const [msg, setMsg] = useState('');
  const getHeigth = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = '1px';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };
  const addChat = () => {
    addfunc({
      type: 'me',
      chatMsg: msg,
      chatDate: new Date(),
    });
    setMsg('');
  };
  const getFooterHeight = () => {
    sizefunc(footerRef.current.offsetHeight);
  };
  return (
    <FooterStyle ref={footerRef} onChange={getFooterHeight}>
      <textarea
        type="text"
        placeholder="상담 내용을 입력하세요."
        ref={textareaRef}
        rows={1}
        value={msg}
        onChange={(e) => {
          getHeigth();
          setMsg(e.target.value);
        }}
      />
      <button type="button" className="sendBtn" onClick={addChat}>
        <IconSend stroke="#fff" className="sendIcon" />
      </button>
    </FooterStyle>
  );
}
