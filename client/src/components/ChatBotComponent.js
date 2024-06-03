import { Link, useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../images/ico-arr-left.svg';
import { ReactComponent as IconHome } from '../images/icon-home.svg';
import { ReactComponent as IconSend } from '../images/icon-send.svg';
import { ReactComponent as IconClose } from '../images/icon-close.svg';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import {
  getOnlyTime,
  handleKeyDown,
  newsTitleFilter,
} from '../hooks/Functions';

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
  z-index: 900;
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
        &.loading {
          width: 30px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          span {
            display: inline-block;
            width: 4px;
            height: 4px;
            background-color: gray;
            border-radius: 50%;
            animation: loading 1s linear infinite;
            background-color: black;
            &:first-child {
              animation-delay: 0s;
            }
            &:nth-child(2) {
              animation-delay: 0.3s;
              margin: 0 6px;
            }
            &:last-child {
              animation-delay: 0.6s;
            }
          }
          @keyframes loading {
            0%,
            100% {
              opacity: 0;
              transform: scale(0.5);
            }
            50% {
              opacity: 1;
              transform: scale(1.2);
            }
          }
        }
      }
      .chatDate {
        font-size: 10px;
        word-break: keep-all;
        padding: 0 0 13px 6px;
        color: #999;
        margin: 0;
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
  .cardNewsWrap {
    width: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    .cardNewsBox {
      width: fit-content;
      display: flex;
      margin-bottom: 10px;
      .cardNews {
        width: 53vw;
        background: #fff;
        border-radius: 10px;
        overflow: hidden;
        margin-right: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
        &:last-child {
          margin-right: 0;
        }
        .cardThumbnail {
          position: relative;
          width: 100%;
          &::after {
            content: '';
            display: block;
            padding-bottom: 80%;
          }
          img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .cardText {
          padding: 15px 10px;
          .cardTitle {
            font-size: 14px;
            font-weight: 700;
            line-height: 1.5;
          }
          .cardDate {
            color: #999;
            margin-bottom: 4px;
          }
          .cardContent {
            margin-bottom: 8px;
          }
          .goNews {
            display: block;
            width: 100%;
            border: none;
            background: #75a47f;
            line-height: 2;
            color: #fff;
            border-radius: 20px;
            text-align: center;
            font-size: 12px;
            line-height: 2.5;
          }
        }
      }
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
    &.impossible {
      background: #777;
    }
    .sendIcon {
      padding: 2px 3px 0 0;
    }
  }
`;
const NewsStyle = styled.div`
  background: #fff;
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  width: 100%;
  overflow: auto;
  z-index: 990;
  .newsTop {
    padding: 20px;
    border-bottom: 1px solid #ddd;
    .newsTitle {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .newsWriter {
      font-size: 14px;
    }
    .newsDate {
      font-size: 12px;
      color: #999;
    }
  }
  .newsBottom {
    padding: 20px;
    img {
      display: block;
      width: 100%;
      height: auto;
      margin-bottom: 20px;
    }
    .newsContent {
      line-height: 2;
      text-indent: 8px;
    }
    .goOrigin {
      display: block;
      margin: 50px auto 10px;
      padding: 0 30px;
      background: #75a47f;
      line-height: 3;
      border: none;
      color: #fff;
      border-radius: 10px;
      text-align: center;
      width: fit-content;
    }
    .closeBtn {
      display: block;
      color: #75a47f;
      background: transparent;
      border: none;
      text-align: center;
      margin: 0 auto 30px;
    }
  }
`;
export function ChatBotHeader() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <HeaderStyle>
      <div className="headerLeft">
        <ArrowLeft stroke="#ddd" onClick={() => navigate(-1)} />
        <div className="chatbotTit">챗봇</div>
      </div>
      {/* 홈버튼 클릭 시 국가 메인페이지로 이동 되도록 수정 */}
      <IconHome stroke="#ddd" onClick={() => navigate(`/${id}/manager`)} />
    </HeaderStyle>
  );
}

export function ChatBotContent({ bottomsize, chatlist, menufunc }) {
  const scrollRef = useRef(null);
  const [newsContent, setNewsContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const newsClose = () => {
    setNewsContent(null);
  };
  const checkLoading = () => {
    if (chatlist.length > 0) {
      if (chatlist[chatlist.length - 1].writer === 'bot') {
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }
    }
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
    checkLoading();
  }, [chatlist]);
  return (
    <>
      <ContentStyle bottomsize={bottomsize}>
        {chatlist.map((data, parentIndex) => (
          <div
            className={`chatBox ${data.writer} ${
              chatlist.length - 1 === parentIndex ? 'lastBox' : null
            }`}
            key={`chatBox ${parentIndex}`}
          >
            {data.detail.map((chat, index) => (
              <div
                className={`chatMsgBox`}
                key={`chatBox${parentIndex} chatMsgBox${index}`}
              >
                {chat.type === 'msg' && (
                  <div className="chatMsg">{chat.chatMsg}</div>
                )}
                {chat.type === 'menuList' && (
                  <div className="menuList">
                    {chat.chatMsg.map((menu, menuIndex) => (
                      <button
                        type="button"
                        key={`chatBox${parentIndex} chatMsgBox${index} menuList${menuIndex}`}
                        className="menuBtn"
                        onClick={() => menufunc(menu)}
                      >
                        {menu}
                      </button>
                    ))}
                  </div>
                )}
                {(chat.type === 'cardNews' || chat.type === 'cardBook') && (
                  <div className="cardNewsWrap">
                    <div className="cardNewsBox">
                      {chat.chatMsg.map((card, cardIndex) => (
                        <ChatBotCardNews
                          type={chat.type}
                          card={card}
                          cardIndex={cardIndex}
                          func={setNewsContent}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {data.detail.length - 1 === index && (
                  <p className="chatDate">{getOnlyTime(data.chatDate)}</p>
                )}
              </div>
            ))}
          </div>
        ))}
        {isLoading && (
          <div className={`chatBox bot`}>
            <div className="chatMsgBox">
              <div className="chatMsg loading">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={scrollRef}></div>
      </ContentStyle>
      {newsContent !== null && (
        <ChatBotNews news={newsContent} closefunc={newsClose} />
      )}
    </>
  );
}

export function ChatBotFooter({ sizefunc, addfunc, ispossible }) {
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
    if (!msg.trim()) {
      toast.error('메세지를 입력하세요', { autoClose: 1300 });
      return;
    }
    addfunc(msg);
    setMsg('');
  };
  const getFooterHeight = () => {
    sizefunc(footerRef.current.offsetHeight);
  };

  return (
    <>
      <ToastContainer />
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
          disabled={!ispossible}
        />
        <button
          type="button"
          className={`sendBtn ${ispossible ? 'possible' : 'impossible'}`}
          onClick={ispossible ? addChat : null}
        >
          <IconSend stroke="#fff" className="sendIcon" />
        </button>
      </FooterStyle>
    </>
  );
}

export function ChatBotCardNews({ type, card, cardIndex, func }) {
  return (
    <div className="cardNews" key={cardIndex}>
      <div className="cardThumbnail">
        <img
          src={
            card.imageUrl
              ? type === 'cardNews'
                ? `https://kids.donga.com/${card.imageUrl}`
                : card.imageUrl
              : '/images/defaultImg.jpg'
          }
          alt={card.title}
        />
      </div>
      <div className="cardText">
        <div className="textLimit1 cardTitle">
          {newsTitleFilter(card.title)}
        </div>
        <div className="cardDate">
          {type === 'cardNews' ? card.date : `${card.writer}(${card.date})`}
        </div>
        <div className="textLimit cardContent">{card.description}</div>
        {type === 'cardNews' ? (
          <button
            type="button"
            className="goNews"
            onClick={() => {
              func(card);
            }}
          >
            소식 보러 가기
          </button>
        ) : (
          <Link className="goNews" to={card.url} target="_blank">
            자세히 보기
          </Link>
        )}
      </div>
    </div>
  );
}

export function ChatBotNews({ news, closefunc }) {
  return (
    <NewsStyle>
      <HeaderStyle style={{ padding: '0 18px 0 20px' }}>
        <div className="chatbotTit">지구촌 소식</div>
        <IconClose stroke="#ddd" onClick={() => closefunc()} />
      </HeaderStyle>
      <div className="newsTop">
        <div className="newsTitle">{news.title}</div>
        <div className="newsWriter">{news.writer}</div>
        <div className="newsDate">{news.date}</div>
      </div>
      <div className="newsBottom">
        <img
          src={`https://kids.donga.com/${news.imageUrl}`}
          alt={`${news.title} 이미지`}
        />
        <div className="newsContent">{news.description}</div>
        <Link className="goOrigin" to={news.url} target="_blank">
          기사 원문 보러가기
        </Link>
        <button className="closeBtn" type="button" onClick={() => closefunc()}>
          닫기
        </button>
      </div>
    </NewsStyle>
  );
}
