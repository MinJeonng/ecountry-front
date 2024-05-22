import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const MenuContainer = styled.div`
  border: 1px solid #a7d2e4;
  border-radius: 10px;
  height: auto;
  margin-bottom: 20px;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  h3 {
    margin-bottom: 4px;
  }
  p {
    font-size: 14px;
  }
`;

export default function MenuList() {
  const { id } = useParams();
  const [todayMenu, setTodayMenu] = useState(null);
  const [tomorrowMenu, setTomorrowMenu] = useState(null);
  const [isMenu, setIsMenu] = useState(true);

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
          console.log(res.data.result);
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

  return isMenu ? (
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
      <p>급식 정보가 없습니다.</p>
    </MenuContainer>
  );
}
