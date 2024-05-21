import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import '../styles/setting.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartDataLabels,
  Title,
  Tooltip,
  Legend
);

export function CheckInvestment() {
  //데이터
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
  //시간별 수치 변화 - 날짜, 수치 객체 배열
  const [list, setList] = useState([
    { date: '2024-05-20', amount: '1' },
    { date: '2024-05-21', amount: '5' },
    { date: '2024-05-22', amount: '10' },
    { date: '2024-05-23', amount: '15' },
    { date: '2024-05-24', amount: '15' },
    { date: '2024-05-25', amount: '15' },
    { date: '2024-05-26', amount: '15' },
  ]);
  //날짜 배열
  const [labels, setLabels] = useState([]);
  // 수치 배열
  const [amounts, setAmounts] = useState([]);
  //날짜 배열 - labels
  useEffect(() => {
    const formattedLabels = list.map((item) => {
      const [year, month, day] = item.date.split('-');
      return `${month} ${day}`;
    });
    setLabels(formattedLabels);
  }, [list]);
  //수치 배열 - amounts
  useEffect(() => {
    setAmounts(list.map((item) => item.amount));
  }, [list]);
  console.log(amounts);

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
  //차트 커스텀
  const options = {
    responsive: true,
    maintainAspectRatio: false, // 가로세로 비율을 유지하지 않음
    aspectRatio: 5,
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: 'white',
        },
        ticks: {
          color: '#888888',
          // fontSize: 14,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
        mode: 'index',
        intersect: false,
      },
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        align: 'end',
        anchor: 'end',
        color: '#36A2EB',
        formatter: function (value) {
          return value;
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'amount',
        data: amounts,
        borderColor: '#F99417',
        borderWidth: 2,
        datalabels: {
          align: 'end',
          anchor: 'end',
          color: '#888888',
        },
      },
    ],
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
          {/* 차트 */}
          {height[index].height == '300px' && (
            <div
              style={{
                width: 280,
                height: 185,
                // backgroundColor: 'rgb(254 239 244 / 80%)',
                borderRadius: '12px',
                margin: '10px',
                padding: '10px',
                position: 'absolute',
                left: '28px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Line options={options} data={data} />
            </div>
          )}
        </div>
      ))}
    </>
  );
}
