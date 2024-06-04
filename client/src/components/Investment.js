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
import axios from 'axios';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import '../styles/setting.scss';
import { useParams } from 'react-router-dom';

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
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [list, setList] = useState([]);
  const [labels, setLabels] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const [openStates, setOpenStates] = useState([]);
  const [rotate180Styles, setRotate180Styles] = useState([]);
  const [height, setHeight] = useState([]);
  console.log('products', products);
  console.log('list', list);
  console.log('labels', labels);
  console.log('amounts', amounts);
  useEffect(() => {
    const formattedLabels = list.map((item) => {
      const newDate = new Date(item.createdAt);
      return `${newDate.getMonth() + 1}/${newDate.getDate()}`; // Month is 0-indexed
    });
    setLabels(formattedLabels);
  }, [list]);

  useEffect(() => {
    setAmounts(list.map((item) => item.status));
  }, [list]);

  useEffect(() => {
    getInvest();
  }, []);

  const getInvest = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/invest/${id}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    });
    const result = res.data.result;
    setProducts(result);
    setOpenStates(Array(result.length).fill(false));
    setRotate180Styles(Array(result.length).fill({}));
    setHeight(Array(result.length).fill({ height: '100px' }));
  };

  const getStatus = async (investId) => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/invest/status/${investId}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    });
    setList(res.data.result);
  };

  const handleProductClick = (index) => {
    const newOpenStates = new Array(openStates.length).fill(false);
    const newRotate180Styles = new Array(rotate180Styles.length).fill({});
    const newHeight = new Array(height.length).fill({
      transition: 'height 0.5s ease',
      height: '100px',
    });

    // 클릭된 index의 openState를 토글합니다.
    newOpenStates[index] = !openStates[index];

    // 클릭된 index의 스타일을 설정합니다.
    if (newOpenStates[index]) {
      newRotate180Styles[index] = {
        transition: 'transform 0.3s ease',
        transform: 'rotate(180deg)',
      };
      newHeight[index] = { transition: 'height 0.5s ease', height: '300px' };
    } else {
      newRotate180Styles[index] = {};
      newHeight[index] = { transition: 'height 0.5s ease', height: '100px' };
    }

    setOpenStates(newOpenStates);
    setRotate180Styles(newRotate180Styles);
    setHeight(newHeight);
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
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
        anchor: 'end',
        clamp: true,
        clip: false,
        align: '45',
        offset: -20,
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
      <div className="pc-wrap">
        <div
          style={{
            borderBottom: '2px solid #bacd92',
            marginBottom: '10%',
            paddingBottom: '15px',
          }}
        >
          투자 상품 확인
        </div>
        {products.length === 0 ? (
          <p style={{ marginBottom: '20px', fontSize: '0.8rem' }}>
            <div
              style={{
                color: '#666666',
                padding: '4px 10px 4px 10px',
                borderRadius: '8px',
                marginBottom: '10px',
              }}
            >
              투자 상품이 존재하지 않습니다.
            </div>
          </p>
        ) : (
          <>
            {products.map((product, index) => (
              <div
                key={index}
                style={{
                  border: '1px solid #777777',
                  borderRadius: '12px',
                  padding: '10px',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  marginBottom: '30px',
                }}
                onClick={() => {
                  handleProductClick(index);
                  getStatus(product.id);
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
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
                      {product.name}
                    </div>
                  </div>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/icon-drop-down.png`}
                    style={{
                      ...rotate180Styles[index],
                      width: '10%',
                    }}
                  />
                </div>
                <div
                  style={{
                    color: '#777777',
                    fontSize: '11px',
                    marginTop: '10px',
                  }}
                >
                  <div>최신 투자 정보</div>
                  <div>{product.info}</div>
                </div>
                {height[index].height === '300px' && (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      maxWidth: '600px', // 원하는 최대 너비 설정
                      maxHeight: '400px', // 원하는 최대 높이 설정
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      overflow: 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <Line
                      options={options}
                      data={data}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
