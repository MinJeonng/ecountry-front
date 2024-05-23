import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { GetTimeText } from '../hooks/Functions';
import { NewPostBtn } from './Btns';

export function BoardPeopleList() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [contents, setContents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const [indexOfLastItem, setIndexOfLastItem] = useState(0);
  const [indexOfFirstItem, setIndexOfFirstItem] = useState(0);
  const [currentItems, setCurrentItems] = useState([]); //한페이지에 들어가는 글 배열
  const [totalPages, setTotalPages] = useState(0);

  const getContents = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_HOST}/api/post/petitions/${id}`,
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
        },
      });
      console.log(res.data.result);
      setContents(res.data.result);
    } catch {
      //프론트 완료 후 작성
    }
  };
  useEffect(() => {
    getContents();
  }, []);

  useEffect(() => {
    if (contents.length > 0) {
      setIndexOfLastItem(Math.min(currentPage * itemsPerPage, contents.length));
      setIndexOfFirstItem((currentPage - 1) * itemsPerPage);
      setTotalPages(Math.ceil(contents.length / itemsPerPage));
    }
  }, [currentPage, contents]);
  useEffect(() => {
    setCurrentItems(contents.slice(indexOfFirstItem, indexOfLastItem));
  }, [indexOfFirstItem, indexOfLastItem]);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div
          className="newsHead"
          style={{ color: '#666666', marginBottom: '10px' }}
        >
          신문고
        </div>
      </div>
      <div
        style={{ borderBottom: '2px solid #bacd92', marginBottom: '10%' }}
      ></div>
      {contents.length !== 0 ? (
        <>
          <p align="right" style={{ marginBottom: '20px', fontSize: '0.8rem' }}>
            <Link
              className="registerBtn"
              to={`/${id}/boardPeople/write`}
              style={{
                color: 'white',
                backgroundColor: '#bacd92',
                padding: '4px 10px 4px 10px',
                borderRadius: '8px',
                marginBottom: '10px',
              }}
            >
              제안하기
            </Link>
          </p>
          <div className="newsInfo">
            {currentItems.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  position: 'relative',
                  marginBottom: '10px',
                  borderRadius: '18px',
                  padding: '5%',
                  alignItems: 'center',
                  border: '0.1px solid gray',
                }}
                onClick={() => navigate(`/${id}/boardPeople/read/${item.id}`)}
              >
                <p style={{ marginLeft: '5%' }}>
                  <div>{item.title}</div>
                  <div style={{ fontSize: '11px' }}>
                    {GetTimeText(item.createdAt)}
                  </div>
                  {item.isSecret ? (
                    <div style={{ fontSize: '11px' }} className="textLimit">
                      비밀글입니다.
                    </div>
                  ) : (
                    <div style={{ fontSize: '11px' }} className="textLimit">
                      {item.content}
                    </div>
                  )}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="nonePost">
            <span>신문고 내 제안이 존재하지 않습니다</span>
          </div>
        </>
      )}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        {/* 이전 페이지 그룹 버튼 */}
        <button
          onClick={() =>
            setCurrentPage((prevPage) => Math.max(prevPage - 5, 1))
          }
          disabled={currentPage <= 1}
          style={{ marginRight: '10px' }}
        >
          &lt;
        </button>
        {/* 페이지 번호 표시 */}
        {[...Array(totalPages).keys()].map((pageNum) => {
          const showPage =
            pageNum + 1 >= currentPage - 2 && pageNum + 1 <= currentPage + 2;
          return (
            showPage && (
              <button
                key={pageNum + 1}
                onClick={() => setCurrentPage(pageNum + 1)}
                style={{
                  margin: '0 5px',
                  padding: '5px 10px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  backgroundColor:
                    currentPage === pageNum + 1 ? '#eee' : 'transparent',
                  cursor: 'pointer',
                }}
              >
                {pageNum + 1}
              </button>
            )
          );
        })}
        {/* 다음 페이지 그룹 버튼 */}
        <button
          onClick={() =>
            setCurrentPage((prevPage) => Math.min(prevPage + 5, totalPages))
          }
          disabled={currentPage >= totalPages}
          style={{ marginLeft: '10px' }}
        >
          &gt;
        </button>
        <NewPostBtn navigate={navigate} path={`/${id}/boardPeople/write`} />
      </div>
    </>
  );
}
