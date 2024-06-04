import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GetTimeText, getThumbnail, htmlToText } from '../hooks/Functions';
import { NewPostBtn } from './Btns';
import styled from 'styled-components';

const ImaContainer = styled.div`
  @media (max-width: 1160px) {
    width: 20%;
    height: 20%;
  }
`;

export function SetNewsDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 3;
  const [indexOfLastItem, setIndexOfLastItem] = useState(0);
  const [indexOfFirstItem, setIndexOfFirstItem] = useState(0);
  const [currentItems, setCurrentItems] = useState([]); //한페이지에 들어가는 뉴스들
  const [totalPages, setTotalPages] = useState(0);

  const getNews = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_HOST}/api/post/articles/${id}`,
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
        },
      });
      setNews(res.data.result);
    } catch {
      // 프론트 완료 후 작성
    }
  };

  // const nextPage = () => {
  //   setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  // };

  // const prevPage = () => {
  //   setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  // };

  useEffect(() => {
    getNews();
  }, []);

  useEffect(() => {
    if (news.length > 0) {
      setIndexOfLastItem(Math.min(currentPage * itemsPerPage, news.length));
      setIndexOfFirstItem((currentPage - 1) * itemsPerPage);
      setTotalPages(Math.ceil(news.length / itemsPerPage));
    }
  }, [currentPage, news]);

  useEffect(() => {
    setCurrentItems(news.slice(indexOfFirstItem, indexOfLastItem));
  }, [indexOfFirstItem, indexOfLastItem]);

  //기사 내용을 50자까지만 출력하게 함
  const truncateText = (text, maxLength = 100) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };
  return (
    <>
      {/* <div className="content"> */}
      <div className="pc-wrap">
        {/* <div style={{ display: 'flex', flexDirection: 'row' }}>
          
        </div> */}
        {/* <div
          style={{ borderBottom: '2px solid #bacd92', marginBottom: '10%' }}
        ></div> */}

        {news.length !== 0 ? (
          <div className="newsInfo"></div>
        ) : (
          <div className="newsContent nonePost">
            <span>뉴스가 존재하지 않습니다.</span>
          </div>
        )}
        {currentItems.map((news, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'row',
              position: 'relative',
              marginBottom: '5%',
              borderRadius: '18px',
              padding: '4%',
              alignItems: 'center',
              border: '0.5px solid #e2d9d9',
            }}
            onClick={() => navigate(`/${id}/news/read/${news.id}`)}
          >
            <ImaContainer>
              <img src={getThumbnail(news.content)} alt="News Image" />
            </ImaContainer>

            <p style={{ marginLeft: '5%' }}>
              <div>{news.title}</div>
              <div style={{ fontSize: '11px' }}>
                {GetTimeText(news.createdAt)}
              </div>
              <div style={{ fontSize: '11px' }} className="textLimit">
                {htmlToText(news.content)}
              </div>
            </p>
          </div>
        ))}

        <div style={{ marginTop: '10%', textAlign: 'center' }}>
          {/* 이전 페이지 그룹 버튼 */}
          <button
            onClick={() =>
              setCurrentPage((prevPage) => Math.max(prevPage - 5, 1))
            }
            disabled={currentPage <= 1}
            style={{
              marginRight: '10px',
            }}
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
                    border: '1px solid rgb(192 238 207)',
                    borderRadius: '5px',
                    backgroundColor:
                      currentPage === pageNum + 1
                        ? 'rgb(192 238 207)'
                        : 'transparent',
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
        </div>
      </div>
    </>
  );
}
