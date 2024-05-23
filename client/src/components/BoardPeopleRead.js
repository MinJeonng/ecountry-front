import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { GetTimeText } from '../hooks/Functions';
import { ConfirmBtn } from './Btns';
import { ToastContainer, toast } from 'react-toastify';

export function BoardPeopleRead() {
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
        // 잘못된 접근 알림 추가
        console.log('접근 권한이 없습니다.');
        toast.error('잘못된 접근입니다.', { autoClose: 1300 });
        // 홈으로 랜딩
        return;
      }
      setPetitionInfo(res.data.result);
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
    getPetiton();
  }, []);

  return (
    <>
      <ToastContainer />
      <div style={{ color: '#666666', fontWeight: 'bolder' }}>신문고 내용</div>
      <button type="button" onClick={updateFunc}>
        임시 수정버튼
      </button>
      <button type="button" onClick={deleteFunc}>
        임시 삭제 버튼
      </button>
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
            style={{ borderBottom: '2px solid #bacd92', marginBottom: '20px' }}
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
            style={{ borderBottom: '2px solid #bacd92', marginBottom: '20px' }}
          >
            {petitionInfo?.isSecret ? (
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
    </>
  );
}
