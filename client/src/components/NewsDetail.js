import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function SetNewsDetail() {

  const [newsList, setNewsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const indexOfLastItem = Math.min(currentPage * itemsPerPage, newsList.length);
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsList.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(newsList.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));

  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  // const getNews = async () => {
  //   try {
  //     const res = await axios({
  //       method: 'get',
  //       url: `${process.env.REACT_APP_HOST}/api/rule`,
  //     });
  //     setNews(res.data); // 전체 데이터를 상태로 설정
  //   } catch (error) {
  //     console.error('뉴스를 가져오는데 실패했습니다.', error);
  //   }
  // };

  // useEffect(() => {
  //   getNews();
  // }, []);

  // useEffect(() => {
  //   const mockData = {
  //     success: true,
  //     result: [
  //       {
  //         id: 1,
  //         title: '뉴스 제목 1',
  //         writeTime: '2024. 5. 16. 오후 03:46',
  //         newsImage: `${process.env.PUBLIC_URL}/logo192.png`,
  //         newsContent: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  //       },
  //       {
  //         id: 2,
  //         title: '뉴스 제목 2',
  //         writeTime: '2024. 5. 16. 오후 03:46',
  //         newsImage: `${process.env.PUBLIC_URL}/logo192.png`,
  //         newsContent: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  //       },
  //       {
  //         id: 3,
  //         title: '뉴스 제목 3',
  //         writeTime: '2024. 5. 16. 오후 03:46',
  //         newsImage: `${process.env.PUBLIC_URL}/logo192.png`,
  //         newsContent: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  //       },
  //     ],
  //   };

  //   setNews(mockData);
  // }, []);
  useEffect(() => {
    const newsData = [
      {
        id: 1,
        title: '뉴스 제목 1',
        writeTime: '2024. 5. 16. 오후 03:46',
        newsImage: `${process.env.PUBLIC_URL}/logo192.png`,
        newsContent: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      },
      {
        id: 2,
        title: '뉴스 제목 2',
        writeTime: '2024. 5. 16. 오후 03:46',
        newsImage: `${process.env.PUBLIC_URL}/logo192.png`,
        newsContent: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      },
      {
        id: 3,
        title: '뉴스 제목 3',
        writeTime: '2024. 5. 16. 오후 03:46',
        newsImage: `${process.env.PUBLIC_URL}/logo192.png`,
        newsContent: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      },
      {
        id: 4,
        title: '뉴스 제목 4',
        writeTime: '2024. 5. 16. 오후 03:46',
        newsImage: `${process.env.PUBLIC_URL}/logo192.png`,
        newsContent: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      },
      {
        id: 5,
        title: '뉴스 제목 5',
        writeTime: '2024. 5. 16. 오후 03:46',
        newsImage: `${process.env.PUBLIC_URL}/logo192.png`,
        newsContent: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      },
      {
        id: 6,
        title: '뉴스 제목 6',
        writeTime: '2024. 5. 16. 오후 03:46',
        newsImage: `${process.env.PUBLIC_URL}/logo192.png`,
        newsContent: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      },
    ];
    setNewsList(newsData);
  }, []);
  //기사 내용을 50자까지만 출력하게 함
  const truncateText = (text, maxLength = 100) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <>
      {/* <div className="content"> */}
      <div>
        <div className="newsHead" style={{ marginBottom: '10%' }}>
          뉴스
        </div>
        {/* {news?.success ? (
          <div className="newsInfo">
            {news.result.map((item) => (
              <div key={item.id}>
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="newsContent">
            <span>뉴스가 존재하지 않습니다.</span>
            <Link
              className="registerBtn"
              to="/:id/manager/news/write"
              style={{ color: 'black' }}
            >
              등록하기
            </Link>
          </div>
        )} */}
        {currentItems.map((news, index) => (
          <>
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
            >
              <img
                src={news.newsImage}
                style={{ width: '10%', height: '10%' }}
                alt="News Image"
              />

              <p style={{ marginLeft: '5%' }}>
                <div>{news.title}</div>
                <div style={{ fontSize: '11px' }}>{news.writeTime}</div>
                <div style={{ fontSize: '11px' }}>
                  {truncateText(news.newsContent)}
                </div>
              </p>
            </div>
          </>
        ))}
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
        </div>
      </div>
    </>
  );
}
