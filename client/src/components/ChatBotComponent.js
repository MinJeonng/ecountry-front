import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../images/ico-arr-left.svg';
import { ReactComponent as IconHome } from '../images/icon-home.svg';
import { ReactComponent as IconSend } from '../images/icon-send.svg';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { getOnlyTime, handleKeyDown } from '../hooks/Functions';

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
  position: fixed;
  top: 60px;
  bottom: ${(props) => props.bottomsize + 'px'};
  overflow: auto;
  background: #f4f5f7;
  width: 100%;
  padding: 15px 20px 0 55px;
  box-sizing: border-box;
  font-size: 12px;
  .chatBox {
    position: relative;
    .chatMsgBox {
      display: flex;
      align-items: flex-end;
      flex-wrap: wrap;
      .chatMsg {
        margin-bottom: 10px;
        padding: 7px 12px;
        max-width: 66%;
        word-break: break-all;
        background: #fff;
        border-radius: 20px;
        border-top-left-radius: 4px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
        width: fit-content;
      }
      .chatDate {
        font-size: 10px;
        word-break: keep-all;
        padding: 0 0 13px 6px;
        color: #999;
      }
    }
    &.bot {
      &::before {
        content: '챗봇';
        display: block;
        margin-bottom: 4px;
        color: #777;
      }
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: -40px;
        display: block;
        width: 35px;
        height: 35px;
        background: #75a47f url('/images/icon-chatbot.png') no-repeat center /
          25px auto;
        border-radius: 15px;
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
          padding: 0 6px 13px 0;
        }
      }
    }
  }
  .menuList {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-bottom: 10px;
    .menuBtn {
      background: #fff;
      border: 1.5px solid #ddd;
      color: #75a47f;
      padding: 4px 8px;
      border-radius: 20px;
      font-weight: 500;
      font-size: 11px;
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
    font-size: 13px;
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

export function ChatBotContent({ bottomsize, chatlist, addfunc, menufunc }) {
  const scrollRef = useRef(null);
  const clickFunc = (msg) => {
    menufunc(msg);
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
    // console.log(chatlist);
  }, [chatlist]);
  return (
    <ContentStyle bottomsize={bottomsize}>
      {chatlist.map((data, parentIndex) => (
        <div className={`chatBox ${data.writer}`}>
          {data.detail.map((chat, index) => (
            <div className="chatMsgBox">
              {chat.type === 'msg' && (
                <div className="chatMsg">{chat.chatMsg}</div>
              )}
              {chat.type === 'menuList' && (
                <div className="menuList">
                  {chat.chatMsg.map((menu) => (
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
              )}
              {data.detail.length - 1 === index && (
                <p className="chatDate">{getOnlyTime(data.chatDate)}</p>
              )}
            </div>
          ))}
        </div>
      ))}
      <div ref={scrollRef}></div>
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
      writer: 'me',
      detail: [{ type: 'msg', chatMsg: msg }],
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
        onKeyDown={(e) => handleKeyDown(e, addChat)}
      />
      <button type="button" className="sendBtn" onClick={addChat}>
        <IconSend stroke="#fff" className="sendIcon" />
      </button>
    </FooterStyle>
  );
}
