import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function MainNews() {
  const [news, setNews] = useState(null);

  const getNews = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_HOST}/api/rule`,
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
        },
      });
      setNews(res.data); // 전체 데이터를 상태로 설정
    } catch (error) {
      console.error('뉴스를 가져오는데 실패했습니다.', error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);
  return (
    <>
      <div className="content">
        <span className="newsHead">뉴스</span>
        {news?.success ? (
          <div className="newsInfo">
            {news.result.map((item) => (
              <div key={item.id}>
                <span>{item.rule}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="newsContent">
            <span>뉴스가 존재하지 않습니다.</span>
            <Link
              className="registerBtn"
              to="/:id/manager/news"
              style={{ color: 'black' }}
            >
              등록하기
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
