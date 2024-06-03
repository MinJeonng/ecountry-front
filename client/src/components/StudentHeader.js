import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import '../styles/settingHeader.scss';

export function StudentHeader() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const positions = [
    { name: '홈', path: `/${id}/main` },
    { name: '신문고', path: `/${id}/boardPeople` },
    // { name: '신문고 글쓰기', path: `/${id}/boardPeople/write` },
    // { name: '신문고 리스트', path: `/${id}/boardPeople/read/${contentId}` },
    { name: '뉴스', path: `/${id}/news` },
    // { name: '뉴스 글쓰기', path: `/${id}/news/write` },
    // { name: '뉴스 리스트', path: `/${id}/news/read/${newsId}` },
    { name: '투자 상품', path: `/${id}/investment` },
    { name: '은행', path: `/${id}/bank` },
    // { name: '거래 내역', path: `/${id}/bank/history/${accountId}` },
    { name: '국회', path: `/${id}/assembly` },
    { name: '국세청', path: `/${id}/revenue` },

    { name: '마이페이지', path: `/${id}/mypage` },
  ];

  return (
    <header>
      <img
        className="header-logo"
        src={`${process.env.PUBLIC_URL}/images/logo-defaultImg.jpg`}
        alt="로고"
      />
      <nav>
        <ul className="header-menu">
          {positions.map(({ name, path }) => (
            <li
              key={name}
              className={window.location.pathname === path ? 'active' : ''}
            >
              <div onClick={() => handleNavigation(path)}>{name}</div>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
