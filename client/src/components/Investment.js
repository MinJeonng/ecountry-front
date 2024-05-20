import React, { useState } from 'react';

import '../styles/setting.scss';

export function CheckInvestment() {
  // 투자 리스트 - 투자 상품 이름, 단위(ex.kg),
  const [products, setProducts] = useState([
    {
      id: 1,
      name: '선생님 몸무게',
      unit: 'kg',
    },
    {
      id: 2,
      name: '미세먼지 농도',
      unit: '㎍/㎥',
    },
    {
      id: 3,
      name: '미세먼지 농도',
      unit: '㎍/㎥',
    },
    {
      id: 4,
      name: '미세먼지 농도',
      unit: '㎍/㎥',
    },
  ]);
  //투자 리스트 - 투자 정보(id로 연결)
  const [productInfo, setProductInfo] = useState([
    {
      id: 1,
      info: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 2,
      info: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 3,
      info: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 4,
      info: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
  ]);
  const [openStates, setOpenStates] = useState(
    Array(products.length).fill(false)
  ); // 각 제품에 대한 open 상태 배열
  const [rotate180Styles, setRotate180Styles] = useState(
    Array(products.length).fill({})
  ); // 각 제품에 대한 회전 스타일 배열
  const [height, setHeight] = useState(
    Array(products.length).fill({ height: '100px' })
  );

  // 제품을 클릭할 때 해당 제품의 open 상태와 회전 스타일을 토글하는 핸들러
  const handleProductClick = (index) => {
    const newOpenStates = [...openStates]; // open 상태 배열 복사
    const newRotate180Styles = [...rotate180Styles]; // 회전 스타일 배열 복사
    const newHeight = [...height];
    newOpenStates[index] = !newOpenStates[index]; // 해당 제품의 open 상태를 토글
    setOpenStates(newOpenStates); // open 상태 업데이트

    // 회전 스타일 업데이트
    const rotate180Style = {};
    if (newOpenStates[index]) {
      rotate180Style.transition = 'transform 0.3s ease';
      rotate180Style.transform = 'rotate(180deg)';
    }
    newRotate180Styles[index] = rotate180Style;
    setRotate180Styles(newRotate180Styles);
    //높이 업데이트
    const heightStyle = {};
    if (newOpenStates[index]) {
      heightStyle.transition = 'height 0.5s ease';
      heightStyle.height = '300px';
    }
    newHeight[index] = heightStyle;
    setHeight(newHeight);
  };

  return (
    <>
      <div style={{ color: '#777777', marginBottom: '10px' }}>투자 리스트</div>
      {products.map((product, index) => (
        <div
          key={index}
          style={{
            border: '1px solid #777777',
            borderRadius: '12px',
            padding: '10px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            marginBottom: '30px',
            ...height[index],
          }}
          onClick={() => handleProductClick(index)}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/*투자 정보 이름*/}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  backgroundColor: 'rgb(149 177 230)',
                  width: '20px',
                  height: '20px',
                  textAlign: 'center',
                  borderRadius: '8px',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 'auto',
                }}
              >
                {product.id}
              </div>
              <div
                style={{
                  color: '#6789CA',
                  fontSize: '15px',
                  marginLeft: '10px',
                }}
              >
                {' '}
                {product.name}
              </div>
            </div>
            <img
              key={index}
              src={`${process.env.PUBLIC_URL}/images/icon-drop-down.png`}
              style={{
                ...rotate180Styles[index], // 해당 제품의 회전 스타일 적용
                width: '10%',
              }}
            />
          </div>
          {/* 투자 정보 */}
          <div
            style={{ color: '#777777', fontSize: '11px', marginTop: '10px' }}
          >
            <div>최신 투자 정보</div>
            <div>{productInfo.filter((item) => item.id === 3)[0].info}</div>
          </div>
        </div>
      ))}
    </>
  );
}
