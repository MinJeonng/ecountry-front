import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../images/ico-arr-left.svg';
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
  padding: 0 20px 0 16px;
  box-sizing: border-box;
  z-index: 10000;
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
  padding: 80px 20px ${(props) => props.bottomsize + 'px'} 55px;
  box-sizing: border-box;
  .chatBox {
    position: relative;
    .chatMsgBox {
      display: flex;
      align-items: flex-end;
      .chatMsg {
        margin-bottom: 10px;
        padding: 10px;
        max-width: 55vw;
        word-break: break-all;
        background: #fff;
        border-radius: 20px;
        border-top-left-radius: 4px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
        width: fit-content;
      }
      .chatDate {
        font-size: 12px;
        padding: 0 0 13px 10px;
        color: #999;
      }
    }
    &.you {
      &::before {
        content: '챗봇';
      }
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: -40px;
        display: block;
        width: 35px;
        height: 35px;
        background: #777;
        border-radius: 50%;
      }
    }
    &.me {
      .chatMsgBox {
        justify-content: end;
        .chatMsg {
          order: 2;
          background: #75a47f;
          color: #fff;
          border-radius: 20px;
          border-bottom-right-radius: 4px;
        }
        .chatDate {
          order: 1;
          padding: 0 10px 13px 0;
        }
      }
    }
  }
  .menuList {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 10px;
    .menuBtn {
      background: #fff;
      border: 1.5px solid #ddd;
      color: #75a47f;
      padding: 4px 8px;
      border-radius: 20px;
      font-weight: 500;
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

export function ChatBotContent({ bottomsize, chatlist, addfunc }) {
  const scrollRef = useRef(null);
  const clickFunc = (msg) => {
    addfunc({ type: 'me', chatMsg: [msg], chatDate: new Date() });
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
            {chat.chatMsg.map((msg, index) =>
              chat.chatMsg.length - 1 !== index ? (
                <div className="chatMsgBox">
                  <div className="chatMsg">{msg}</div>
                </div>
              ) : (
                <div className="chatMsgBox">
                  <div className="chatMsg">{msg}</div>
                  <p className="chatDate">{getOnlyTime(chat.chatDate)}</p>
                </div>
              )
            )}
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
      chatMsg: [msg],
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
