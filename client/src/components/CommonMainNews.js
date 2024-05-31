import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Swipe from 'react-easy-swipe';

//나중에 삭제
import dogImage from '../images/dog.png';
import moonImage from '../images/moon.jpeg';
import busImage from '../images/mainBus.jpeg';
import { getThumbnail } from '../hooks/Functions';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { GetTimeText } from '../hooks/Functions';

export const Container = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 5%;
  border: 4px solid #9e9e9e29;
  border-radius: 9px;
`;

export const ImageCounterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  margin-top: 15px;
`;
export const ImageCounter = styled.div`
  width: 6px;
  height: 6px;
  background: ${({ index, imgCount }) =>
    index === imgCount - 1 ? '#0095f6' : '#a8a8a8'};
  border-radius: 50%;
  &:not(:last-of-type) {
    margin-right: 4px;
  }
`;

export const StyledImgDiv = styled.div`
  display: flex;
  flex-direction: row;
  height: fit-content;
  transition: transform ${({ endSwipe }) => (endSwipe ? '0.2s' : '0s')};
  transform: translateX(
    ${({ imgCount, positionx }) =>
      `calc(${positionx}px - ${(imgCount - 1) * 100}%)`}
  );
`;
const ImageContainer = styled.div`
  min-width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Image = styled.img`
  width: 30%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 5%;
  h3 {
    margin: 0;
    margin-top: 2%;
  }
`;

const NoneNews = styled.div`
  border: 1px solid #a7d2e4;
  border-radius: 10px;
  height: auto;
  margin-bottom: 40px;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  p {
    font-size: 14px;
  }
`;

export default function CommonMainNews() {
  const { id } = useParams();
  const [newsList, setNewsList] = useState([]);
  const [positionx, setPositionx] = useState(0);
  const [imgCount, setImgCount] = useState(1);
  const [endSwipe, setEndSwipe] = useState(false);

  console.log(newsList);
  const navigate = useNavigate();
  const onSwipeMove = (position) => {
    setEndSwipe(false);
    if (newsList.length === 1) {
      return;
    }
    if (
      (imgCount === 1 && position.x > 0) ||
      (imgCount === newsList.length && position.x < 0)
    ) {
      setPositionx(0);
      return;
    }
    setPositionx(position.x);
  };

  const onSwipeEnd = () => {
    if (positionx > 20) {
      const prevImgCount = imgCount <= 1 ? newsList.length : imgCount - 1;
      setImgCount(prevImgCount);
    } else if (positionx < -20) {
      const nextImgCount = imgCount >= newsList.length ? 1 : imgCount + 1;
      setImgCount(nextImgCount);
    }
    setPositionx(0);
    setEndSwipe(true);
  };
  const getNews = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/post/articles/${id}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    });
    console.log(res.data.result);
    setNewsList(res.data.result);
  };
  useEffect(() => {
    getNews();
  }, []);

  return (
    <>
      {newsList?.length > 0 ? (
        <Container>
          <Swipe onSwipeEnd={onSwipeEnd} onSwipeMove={onSwipeMove}>
            <StyledImgDiv
              imgCount={imgCount}
              positionx={positionx}
              endSwipe={endSwipe}
            >
              {newsList?.map((post) => (
                <ImageContainer
                  key={post.id}
                  onClick={() => navigate(`/${id}/news/read/${post.id}`)}
                >
                  <Image src={getThumbnail(post.content)} alt={post.title} />
                  <Info>
                    <h3>{post.title}</h3>
                    <p
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        margin: 0,
                      }}
                    >
                      <span>작성자 : {post.writerName}</span>
                      <span>{GetTimeText(post.createdAt)}</span>
                    </p>
                  </Info>
                </ImageContainer>
              ))}
            </StyledImgDiv>
          </Swipe>
          {newsList?.length > 1 && (
            <ImageCounterWrapper>
              {newsList.map((post, index) => {
                return (
                  <ImageCounter key={index} index={index} imgCount={imgCount} />
                );
              })}
            </ImageCounterWrapper>
          )}
        </Container>
      ) : (
        <NoneNews>
          <p style={{ color: '#666666' }}>뉴스 정보가 없습니다.</p>
        </NoneNews>
      )}
    </>
  );
}
