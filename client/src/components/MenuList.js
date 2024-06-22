import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

export const MenuContainer = styled.div`
  @media (max-width: 1160px) {
    border: 1px solid #a7d2e4;
    width: 100%;
    height: auto;
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
    border-radius: 9px;
    h4 {
      margin-bottom: 4px;
    }
    p {
      font-size: 14px;
      line-height: 1.5;
      margin: 0;
    }
  }
  @media (min-width: 1160px) {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    /* text-align: center; */
    .menu-title {
      font-size: 1rem;
      font-weight: 700;
      color: #333;
    }
    span {
      font-size: 0.9rem;
      margin: 0;
    }
    p {
      text-align: center;
      font-size: 1.1rem;
    }
  }
`;

export default function MenuList() {
  const { id } = useParams();
  const [todayMenu, setTodayMenu] = useState(null);
  const [tomorrowMenu, setTomorrowMenu] = useState(null);
  const [isMenu, setIsMenu] = useState(true);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const replaceBrWithComma = (menuHtml) => {
    return menuHtml.replace(/<br\s*\/?>/gi, ', ');
  };

  useEffect(() => {
    window.addEventListener(`resize`, () => setInnerWidth(window.innerWidth));
    return () =>
      window.removeEventListener(`resize`, () =>
        setInnerWidth(window.innerWidth)
      );
  }, []);

  useEffect(() => {
    const getMenus = async () => {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      try {
        const res = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_HOST}/api/school/menu/${id}`,
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
          },
        });

        if (res.data.success && res.data.result.length > 0) {
          // console.log(res.data.result);
          const todayFormatted = today
            .toISOString()
            .split('T')[0]
            .replace(/-/g, '');
          const tomorrowFormatted = tomorrow
            .toISOString()
            .split('T')[0]
            .replace(/-/g, '');

          const todayMenu = res.data.result.find(
            (menu) => menu.date === todayFormatted
          );
          const tomorrowMenu = res.data.result.find(
            (menu) => menu.date === tomorrowFormatted
          );

          setTodayMenu(todayMenu || null);
          setTomorrowMenu(tomorrowMenu || null);
          setIsMenu(true);
        } else {
          setIsMenu(false);
        }
      } catch (error) {
        console.error('급식 정보 불러오지 못함', error);
        setIsMenu(false);
      }
    };

    getMenus();
  }, [id]);

  return (
    <>
      {innerWidth <= 1160 ? (
        isMenu ? (
          <>
            {todayMenu && (
              <MenuContainer>
                <h4>오늘의 메뉴</h4>
                <p dangerouslySetInnerHTML={{ __html: todayMenu.menu }}></p>
              </MenuContainer>
            )}
            {tomorrowMenu && (
              <MenuContainer>
                <h4>내일의 메뉴</h4>
                <p dangerouslySetInnerHTML={{ __html: tomorrowMenu.menu }}></p>
              </MenuContainer>
            )}
          </>
        ) : (
          <MenuContainer>
            <p style={{ color: '#333' }}>급식 정보가 없습니다.</p>
          </MenuContainer>
        )
      ) : isMenu ? (
        <>
          {todayMenu && (
            <MenuContainer>
              <p className="menu-title">오늘의 메뉴</p>
              <span>{replaceBrWithComma(todayMenu.menu)}</span>
            </MenuContainer>
          )}

          {tomorrowMenu && (
            <MenuContainer>
              <p className="menu-title">내일의 메뉴</p>
              <span>{replaceBrWithComma(tomorrowMenu.menu)}</span>
            </MenuContainer>
          )}
        </>
      ) : (
        <MenuContainer>
          <p style={{ color: '#333' }}>급식 정보가 없습니다.</p>
        </MenuContainer>
      )}
    </>
  );
}
