import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { GetTimeText, confirmCountry } from '../hooks/Functions';
import { ChatBotBtn, ConfirmBtn } from './Btns';
import { ToastContainer, toast } from 'react-toastify';

export function BoardPeopleRead({ userinfo }) {
  // 데이터
  // id : long,
  // title : string,
  // content : string,
  // createdAt : timestamp,
  // writerId : long,
  // writerName : string
  const { id, contentId } = useParams();
  const navigate = useNavigate();
  const [petitionInfo, setPetitionInfo] = useState();
  const [isShow, setIsShow] = useState(false);
  const getPetiton = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/post/petition/${contentId}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    });
    console.log(res.data.result);
    if (res.data.success) {
      if (res.data.result.countryId != id) {
        toast.error('잘못된 접근입니다.', { autoClose: 1300 });
        if (userinfo?.isStudent) {
          setTimeout(() => navigate(`/${id}/login`), 1300);
        } else {
          setTimeout(() => navigate('/login'), 1300);
        }
        if (!userinfo) {
          setTimeout(() => navigate('/'), 1300);
        }
      }
      setPetitionInfo(res.data.result);
      setIsShow(!res.data.result.isSecret);
      if (userinfo?.isStudent) {
        if (userinfo?.id == petitionInfo?.writerId) {
          setIsShow(true);
        }
      } else {
        setIsShow(true);
      }
    } else {
      toast.error('신문고가 존재하지 않습니다.', { autoClose: 1300 });
      navigate(`/${id}/boardPeople`);
    }
  };

  const updateFunc = () => {
    localStorage.setItem('petitionId', contentId);
    navigate(`/${id}/boardPeople/write`);
  };

  const deleteFunc = async () => {
    if (!window.confirm('삭제하시겠습니까?')) {
      return;
    }
    const res = await axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_HOST}/api/post/petition/${contentId}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    });
    if (res.data.success) {
      toast.error('삭제 완료되었습니다.', { autoClose: 1300 });
      document.location.href = `/${id}/boardPeople`;
    }
  };

  useEffect(() => {
    if (userinfo) {
      getPetiton();
    }
  }, [userinfo]);
  return (
    <>
      <div className="pc-wrap">
        <ToastContainer />
        <ChatBotBtn />
        <p align="right">
          <button
            type="button"
            onClick={updateFunc}
            style={{
              color: 'white',
              backgroundColor: '#bacd92',
              padding: '4px 10px 4px 10px',
              borderRadius: '8px',
              marginBottom: '10px',
              marginRight: '10px',
              border: 'none',
            }}
          >
            수정
          </button>
          <button
            type="button"
            onClick={deleteFunc}
            style={{
              color: 'white',
              backgroundColor: '#bacd92',
              padding: '4px 10px 4px 10px',
              borderRadius: '8px',
              marginBottom: '10px',
              border: 'none',
            }}
          >
            삭제
          </button>
        </p>
        <div
          style={{ borderBottom: '2px solid #bacd92', marginBottom: '10%' }}
        ></div>

        <form className="box-style">
          <div
            className="reset"
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            <div
              style={{
                borderBottom: '2px solid #bacd92',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  padding: '10px',
                  border: 'none',
                  width: '100%',
                  boxSizing: 'border-box',
                  color: '#666666',
                  background: '#fff',
                }}
              >
                {petitionInfo?.title}
              </div>
            </div>
            <div
              style={{
                borderBottom: '2px solid #bacd92',
                marginBottom: '20px',
              }}
            >
              {!isShow ? (
                <div
                  style={{
                    padding: '10px 10px 40px',
                    border: 'none',
                    width: '100%',
                    boxSizing: 'border-box',
                    color: '#666666',
                    background: '#fff',
                  }}
                >
                  비밀글 입니다.
                </div>
              ) : (
                <div
                  style={{
                    padding: '10px 10px 40px',
                    border: 'none',
                    width: '100%',
                    boxSizing: 'border-box',
                    color: '#666666',
                    background: '#fff',
                  }}
                >
                  {petitionInfo?.content}
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
