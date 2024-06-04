import { useEffect, useState, useRef } from 'react';
import { ConfirmBtn } from './Btns';
import '../styles/setting.scss';

import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { ReactComponent as Arrow } from '../images/ico-arr-left.svg';
import axios from 'axios';
import { handleKeyDown, handleKeyDownNext } from '../hooks/Functions';
import { ManagerHeader } from './ManagerHeader';

export function AddInvestment() {
  const { id } = useParams();
  const [investmentName, setInvestmentName] = useState('');
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState('');
  const [investmentInfo, setInvestmentInfo] = useState('');
  const [investmentList, setInvestmentList] = useState([]);
  const [investValueList, setInvestValueList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(true);
  const [statusList, setStatusList] = useState([]);
  const endOfListRef = useRef(null);

  const unitRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    if (endOfListRef.current) {
      endOfListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [statusList]);

  const getList = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/invest/${id}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    });
    console.log(res.data.result);
    setInvestmentList(res.data.result);
  };

  const sendinvest = async () => {
    const res = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_HOST}/api/invest`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
      data: [
        {
          name: investmentName,
          unit,
          info: investmentInfo,
          countryId: id,
        },
      ],
    });
    getList();
  };

  const updateFunc = async (investId) => {
    const res = await axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_HOST}/api/invest`,
      data: {
        id: investId,
        info: investmentInfo,
      },
    });
    getList();
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
    console.log(res.data.result);
    setStatusList(res.data.result);
  };

  const sendStatus = async (investId) => {
    const res = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_HOST}/api/invest/status`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
      data: {
        status: value,
        investId,
      },
    });
    getStatus(investId);
    toast.success('값이 없데이트 되었습니다.', {
      autoClose: 1300,
    });
    setValue('');
  };
  //투자 정보 삭제 data.id, invest.id, data.createdAt,data.status, invest.unit
  const deleteStatus = async (id, investId, createdAt, status, unit) => {
    if (!window.confirm(`${status}${unit} 삭제하시겠습니까?`)) {
      return;
    }
    const res = await axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_HOST}/api/invest/status/${id}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    });
    getStatus(investId);
  };

  const handleAddInvestments = () => {
    if (!investmentName || !unit || !investmentInfo) {
      toast.error('모든 값을 입력해주세요', { autoClose: 1300 });
      return;
    }
    sendinvest();
    setInvestmentInfo('');
    setInvestmentName('');
    setSelectedIndex(null);
    setUnit('');
  };
  //투자 상품 클릭시 업데이트 아코디언 열리게
  const selectInput = (invest, index) => {
    if (selectedIndex === index) {
      setInvestmentInfo('');
      setInvestmentName('');
      setSelectedIndex(null);
      setUnit('');

      setIsAccordionOpen(false);
      setIsAddOpen(true);
    } else {
      getStatus(invest.id);
      setInvestmentInfo('');
      setInvestmentName(invest.name);
      setUnit(invest.unit);

      setSelectedIndex(index);
      setIsAccordionOpen(true);
      setIsAddOpen(false);
    }
  };

  //최신 투자 정보 업데이트
  const handleInvestmentInfo = (investId) => {
    if (!investmentInfo) {
      toast.error('최신 투자 정보를 입력하세요', { autoClose: 1300 });
      return;
    }
    updateFunc(investId); //DB로 최신 투자 정보 업데이트
    toast.success('최신 투자 정보가 업데이트 되었습니다.', { autoClose: 1300 });
    setInvestmentInfo('');
  };

  const deleteInvestmentInfo = async (investId) => {
    const res = await axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_HOST}/api/invest/${investId}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    });
    if (res.data.success) {
      toast.success('삭제되었습니다.');
    }
  };

  const deleteBtn = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm('삭제하시겠습니까?')) {
      return;
    }
    deleteInvestmentInfo(id);
    const res = await axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_HOST}/api/invest/${id}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    });
    if (res.data.success) {
      toast.success('삭제되었습니다.');
    }
    getList();
    setInvestmentInfo('');
    setInvestmentName('');
    setUnit('');
    setSelectedIndex(null);
    setIsAccordionOpen(false);
    setIsAddOpen(true);
  };

  const newAddBtn = () => {
    setIsAddOpen(true);
    setIsAccordionOpen(false);
    setInvestmentInfo('');
    setInvestmentName('');
    setSelectedIndex(null);
    setUnit('');
  };
  const handleAddValue = () => {
    let updatedValueList = [...investValueList];

    if (selectedIndex !== null) {
      if (updatedValueList[selectedIndex]) {
        updatedValueList[selectedIndex].push(value);
      } else {
        updatedValueList[selectedIndex] = [value];
      }
    }

    setInvestValueList(updatedValueList);

    setIsAccordionOpen(false);
    setIsAddOpen(true);
    setSelectedIndex(null);
    setInvestmentInfo('');
    setUnit('');
    setInvestmentName('');
  };

  const getDate = (date) => {
    const newDate = new Date(date);
    return `${newDate.getMonth() + 1}월 ${newDate.getDate()}일`;
  };

  useEffect(() => {
    console.log(investValueList);
  }, [investValueList]);

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="pc-wrap">
        <div className="setting-wrap title-wrap">
          <ul className="title-list">
            <li>투자 상품을 생성할 수 있습니다.</li>
          </ul>
        </div>

        {investmentList.map((invest, index) => (
          <>
            <div
              className={`display ${
                isAccordionOpen && selectedIndex === index
                  ? 'accordion-open'
                  : ''
              } ${selectedIndex === index ? 'selected' : ''}`}
              key={index}
              onClick={() => selectInput(invest, index)}
              style={{ fontSize: '14px', color: '#666666' }}
            >
              {invest.name}
              <Arrow stroke="#ddd" className="accArrBtn" />
            </div>
            {isAccordionOpen && selectedIndex === index && (
              <>
                <form
                  style={{
                    backgroundColor: 'none',
                    zIndex: '10',
                    width: '-webkit-fill-available',
                    margin: '10px',
                    padding: '5px',
                    position: 'relative',
                  }}
                >
                  <img
                    className="resetBtn"
                    style={{ position: 'absolute', right: 0 }}
                    src={`${process.env.PUBLIC_URL}/images/icon-delete.png`}
                    onClick={(e) => deleteBtn(e, invest.id)}
                    alt="삭제"
                  />
                </form>
                <form className="box-style">
                  <div className="set-title">투자정보 업데이트</div>
                  <div
                    style={{
                      color: '#666666',
                      fontSize: '12px',
                      paddingTop: '5px',
                    }}
                  >
                    최신 투자정보 | {invest.info}
                  </div>
                  <input
                    className="set-input"
                    type="text"
                    value={investmentInfo}
                    onChange={(e) => {
                      setInvestmentInfo(e.target.value);
                    }}
                  />
                  <ConfirmBtn
                    onClick={() => {
                      handleInvestmentInfo(invest.id);
                    }}
                    btnName="업데이트"
                    backgroundColor="rgb(140 159 198)"
                  ></ConfirmBtn>
                </form>
                <form className="box-style">
                  <div className="set-title">이전 현황</div>
                  {statusList.length === 0 ? (
                    <div
                      style={{
                        color: '#666666',
                        fontSize: '12px',
                        paddingTop: '5px',
                      }}
                    >
                      이전 현황이 없습니다.
                    </div>
                  ) : (
                    <div
                      style={{
                        marginTop: '15px',
                        marginBottom: '15px',
                        padding: '5px',
                        borderBottom: '1px solid #e9ae24',
                        maxHeight: '80px',
                        overflowX: 'scroll',
                        boxSizing: 'border-box',
                        color: '#666666',
                        fontSize: '12px',
                      }}
                    >
                      {statusList.map((data) => (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: '3px',
                          }}
                        >
                          <div
                            style={{
                              color: '#666666',
                              fontSize: '12px',
                            }}
                          >
                            {getDate(data.createdAt)} {'   '}
                            {data.status}
                            {invest.unit}
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              deleteStatus(
                                data.id,
                                invest.id,
                                data.createdAt,
                                data.status,
                                invest.unit
                              )
                            }
                            style={{ all: 'unset' }}
                          >
                            삭제
                          </button>
                        </div>
                      ))}
                      {/* <div ref={endOfListRef} /> */}
                    </div>
                  )}

                  <div className="set-title">값</div>
                  <input
                    className="set-input"
                    type="number"
                    min="0"
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                  />
                  <ConfirmBtn
                    onClick={() => {
                      sendStatus(invest.id);
                    }}
                    btnName="업데이트"
                    backgroundColor="rgb(140 159 198)"
                  ></ConfirmBtn>
                </form>
              </>
            )}
          </>
        ))}
        {isAccordionOpen && (
          <ConfirmBtn
            onClick={() => newAddBtn()}
            btnName="완료"
            backgroundColor="#bacd92"
          ></ConfirmBtn>
        )}

        {isAddOpen && (
          <>
            <form className="box-style">
              <div className="reset">
                <div className="set-title">투자 상품명</div>
              </div>
              <input
                className="set-input"
                type="text"
                value={investmentName}
                onChange={(e) => {
                  setInvestmentName(e.target.value);
                }}
                onKeyDown={(e) => handleKeyDownNext(e, unitRef)}
              />
              <div className="set-title">단위</div>
              <input
                ref={unitRef}
                className="set-input"
                type="text"
                value={unit}
                placeholder="ex) kg,cm.."
                onChange={(e) => {
                  setUnit(e.target.value);
                }}
                onKeyDown={(e) => handleKeyDownNext(e, infoRef)}
              />
              <div className="set-title">오늘의 투자정보</div>
              <input
                ref={infoRef}
                className="set-input"
                type="text"
                value={investmentInfo}
                onChange={(e) => {
                  setInvestmentInfo(e.target.value);
                }}
                onKeyDown={(e) => handleKeyDown(e, handleAddInvestments)}
              />
              <ConfirmBtn
                onClick={handleAddInvestments}
                btnName="상품 등록"
                backgroundColor="#bacd92"
              ></ConfirmBtn>
            </form>
          </>
        )}
      </div>
    </>
  );
}
