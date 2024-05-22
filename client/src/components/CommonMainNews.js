import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Swipe from 'react-easy-swipe';

//나중에 삭제
import dogImage from '../images/dog.png';
import moonImage from '../images/moon.jpeg';
import busImage from '../images/mainBus.jpeg';

export const Container = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
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
  flex-direction: column;
  justify-content: flex-start;
  h4 {
    line-height: 1.2;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
`;
export default function CommonMainNews() {
  // 임시 데이터
  const initialNewsList = [
    {
      id: 1,
      title:
        '첫 번째 뉴스 제목을 하고있어요 잘되나요 확인중이에요 라라러라라라라라라',
      image: dogImage,
    },
    {
      id: 2,
      title: '두 번째 뉴스 제목',
      image: moonImage,
    },
    {
      id: 3,
      title: '세 번째 뉴스 제목',
      image: busImage,
    },
  ];

  const [newsList, SetNewsList] = useState(initialNewsList);
  const [positionx, setPositionx] = useState(0);
  const [imgCount, setImgCount] = useState(1);
  const [endSwipe, setEndSwipe] = useState(false);

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
  // useEffect(() => {});

  return (
    <Container>
      <Swipe onSwipeEnd={onSwipeEnd} onSwipeMove={onSwipeMove}>
        <StyledImgDiv
          imgCount={imgCount}
          positionx={positionx}
          endSwipe={endSwipe}
        >
          {newsList.map((post) => (
            <ImageContainer key={post.id}>
              <Image src={post.image} alt={post.title} />
              <h4>{post.title}</h4>
            </ImageContainer>
          ))}
        </StyledImgDiv>
      </Swipe>
      {newsList.length > 1 && (
        <ImageCounterWrapper>
          {newsList.map((post, index) => {
            return (
              <ImageCounter key={index} index={index} imgCount={imgCount} />
            );
          })}
        </ImageCounterWrapper>
      )}
    </Container>
  );
}