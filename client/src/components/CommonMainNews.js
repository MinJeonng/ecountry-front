import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Swipe from 'react-easy-swipe';
import { getThumbnail } from '../hooks/Functions';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { GetTimeText } from '../hooks/Functions';
import { ToastContainer } from 'react-toastify';

export const Container = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 9px;
  position: relative;
`;

export const ImageCounterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  margin-top: 10px;
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
  overflow: hidden;
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
  flex-direction: column;
  justify-content: flex-start;
  h4 {
    line-height: 1.2;
  }
  .defaultImg {
    width: 100%;
    height: 170px;
    object-fit: contain;
    border-radius: 10px;
    background: #e0e0e0;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 170px;
  object-fit: cover;
  border-radius: 10px;
`;

const NoneNews = styled.div`
  border: 1px solid #a7d2e4;
  border-radius: 10px;
  height: auto;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  text-align: center;
  p {
    font-size: 14px;
  }
  @media (min-width: 1160px) {
    border: none;
    p {
      font-size: 1.1rem;
    }
  }
`;
const ArrowLeft = styled.div`
  position: absolute;
  left: 0%;
  top: 30%;
  cursor: pointer;
  z-index: 2;
  img {
    width: 18px;
    height: 18px;
  }
`;

const ArrowRight = styled.div`
  position: absolute;
  right: 0%;
  top: 30%;
  cursor: pointer;
  z-index: 2;
  img {
    width: 18px;
    height: 18px;
    transform: rotate(180deg);
  }
`;

export default function CommonMainNews() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [newsList, setNewsList] = useState([]);
  const [positionx, setPositionx] = useState(0);
  const [imgCount, setImgCount] = useState(1);
  const [endSwipe, setEndSwipe] = useState(false);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [displayNewsList, setDisplayNewsList] = useState([]); //뉴스 보여지는거 5개로 제한

  const shouldRender =
    innerWidth <= 1160 ||
    (innerWidth > 1160 && location.pathname === `/${id}/news`);

  useEffect(() => {
    window.addEventListener(`resize`, () => setInnerWidth(window.innerWidth));
    return () =>
      window.removeEventListener(`resize`, () =>
        setInnerWidth(window.innerWidth)
      );
  }, []);

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

  // 화살표 클릭 이벤트 핸들러
  const handlePrevClick = () => {
    const prevImgCount = imgCount <= 1 ? displayNewsList.length : imgCount - 1;
    setImgCount(prevImgCount);
    updatePosition(prevImgCount); // 위치 업데이트 함수 호출
  };

  const handleNextClick = () => {
    const nextImgCount = imgCount >= displayNewsList.length ? 1 : imgCount + 1;
    setImgCount(nextImgCount);
    updatePosition(nextImgCount); // 위치 업데이트 함수 호출
  };

  // 위치를 업데이트하는 함수
  const updatePosition = (imgCount) => {
    const newPositionX = -(imgCount - 1) * 100;
    setPositionx(newPositionX); // 새 위치 설정
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

  useEffect(() => {
    setDisplayNewsList(newsList.slice(0, 5));
  }, [newsList]);

  return (
    <>
      <ToastContainer />
      {shouldRender && (
        <>
          {displayNewsList?.length > 0 ? (
            <Container>
              <Swipe onSwipeEnd={onSwipeEnd} onSwipeMove={onSwipeMove}>
                <StyledImgDiv
                  imgCount={imgCount}
                  positionx={positionx}
                  endSwipe={endSwipe}
                >
                  {displayNewsList?.map((post, index) => (
                    <ImageContainer
                      key={post.id}
                      onClick={() => navigate(`/${id}/news/read/${post.id}`)}
                    >
                      <Image
                        className={
                          getThumbnail(post.content) ===
                          '/images/defaultImg.jpg'
                            ? 'defaultImg'
                            : null
                        }
                        src={getThumbnail(post.content)}
                        alt={post.title}
                      />
                      <h4>{post.title}</h4>
                    </ImageContainer>
                  ))}
                </StyledImgDiv>
              </Swipe>
              {displayNewsList?.length > 1 && (
                <ImageCounterWrapper>
                  {displayNewsList.map((post, index) => {
                    return (
                      <ImageCounter
                        key={index}
                        index={index}
                        imgCount={imgCount}
                      />
                    );
                  })}
                </ImageCounterWrapper>
              )}
            </Container>
          ) : (
            <NoneNews>
              <p style={{ color: '#333' }}>뉴스 정보가 없습니다.</p>
            </NoneNews>
          )}
        </>
      )}
      {innerWidth >= 1160 &&
        (location.pathname === `/${id}/main` ||
          location.pathname === `/${id}/manager`) && (
          <>
            {displayNewsList?.length > 0 ? (
              <Container>
                {displayNewsList.length > 1 && (
                  <ArrowLeft onClick={handlePrevClick}>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon-arrow-circle.png`}
                      alt="화살표"
                    />
                  </ArrowLeft>
                )}
                <StyledImgDiv
                  imgCount={imgCount}
                  positionx={positionx} // 수정된 위치를 사용하여 이미지를 이동
                  endSwipe={endSwipe}
                >
                  {displayNewsList?.map((post, index) => (
                    <ImageContainer
                      key={post.id}
                      onClick={() => navigate(`/${id}/news/read/${post.id}`)}
                    >
                      <Image
                        src={getThumbnail(post.content)}
                        alt={post.title}
                      />
                      <h4>{post.title}</h4>
                    </ImageContainer>
                  ))}
                </StyledImgDiv>
                {displayNewsList.length > 1 && (
                  <ArrowRight onClick={handleNextClick}>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/icon-arrow-circle.png`}
                      alt="화살표"
                    />
                  </ArrowRight>
                )}
              </Container>
            ) : (
              <>
                <NoneNews>
                  <p style={{ color: '#333' }}>뉴스 정보가 없습니다.</p>
                </NoneNews>
              </>
            )}
          </>
        )}
    </>
  );
}
