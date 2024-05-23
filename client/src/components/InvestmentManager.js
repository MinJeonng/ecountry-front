import { useEffect, useState } from 'react';
import { ConfirmBtn } from './Btns';
import '../styles/setting.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export function AddInvestment({ position }) {
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
  };

  const deleteStatus = async (id, investId) => {
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
      alert('모든 값을 입력해주세요');
      return;
    }
    sendinvest();
    setInvestmentInfo('');
    setInvestmentName('');
    setSelectedIndex(null);
    setUnit('');
  };

  const selectInput = (invest, index) => {
    console.log(invest);
    getStatus(invest.id);
    setInvestmentInfo(invest.info);
    setInvestmentName(invest.name);
    setUnit(invest.unit);
    const selectedValue =
      investValueList[index] !== undefined ? investValueList[index] : '';
    setValue(selectedValue);

    setSelectedIndex(index);
    setIsAccordionOpen(true);
    setIsAddOpen(false);
  };

  const handleCloseAccordion = () => {
    if (!investmentName || !unit || !investmentInfo) {
      alert('모든 값을 입력해주세요');
      return;
    }
    setInvestmentInfo('');
    setInvestmentName('');
    setSelectedIndex(null);
    setUnit('');

    setIsAccordionOpen(false);
    setIsAddOpen(true);
  };
  const resetBtn = () => {
    if (
      investmentInfo !== '' ||
      investmentName !== '' ||
      selectedIndex !== null ||
      unit !== ''
    ) {
      const isConfirmed = window.confirm('초기화 하시겠습니까?');
      if (!isConfirmed) {
        return;
      }

      setInvestmentInfo('');
      setInvestmentName('');
      setSelectedIndex(null);
      setUnit('');
    }
  };

  const deleteBtn = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm('삭제하시겠습니까?')) {
      return;
    }
    const res = await axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_HOST}/api/invest/${id}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    });
    if (res.data.success) {
      alert('삭제되었습니다.');
    }
    getList();
    setInvestmentInfo('');
    setInvestmentName('');
    setUnit('');

    setSelectedIndex(null);
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
      {/* <PageHeader>{position}</PageHeader> */}
      <div className="title-list">
        <div>투자 상품 관리</div>
        <ul className="title-list">
          <li>투자 상품을 생성할 수 있습니다.</li>
        </ul>
      </div>

      {investmentList.map((invest, index) => (
        <>
          <div
            className={`display ${
              isAccordionOpen && selectedIndex === index ? 'accordion-open' : ''
            } ${selectedIndex === index ? 'selected' : ''}`}
            key={index}
          >
            {invest.name}
            <button
              className="updateBtn"
              onClick={() => selectInput(invest, index)}
            >
              수정
            </button>
            <img
              className="deleteBtn"
              src={`${process.env.PUBLIC_URL}/images/icon-delete.png`}
              onClick={(e) => deleteBtn(e, invest.id)}
              alt="삭제"
            />
          </div>
          {isAccordionOpen && selectedIndex === index && (
            <>
              <form className="box-style">
                <div className="reset">
                  <img
                    className="resetBtn"
                    src={`${process.env.PUBLIC_URL}/images/icon-reset.png`}
                    onClick={resetBtn}
                    alt="초기화"
                  />
                </div>

                <div className="set-title">오늘의 투자정보</div>
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
                    handleCloseAccordion();
                    updateFunc(invest.id);
                  }}
                  btnName="업데이트"
                  backgroundColor="#61759f"
                ></ConfirmBtn>
              </form>
              <div>이전 현황</div>
              {statusList.length === 0 ? (
                <div>이전 현황이 없습니다.</div>
              ) : (
                <div>
                  {statusList.map((data) => (
                    <div>
                      {getDate(data.createdAt)} : {data.status}
                      {invest.unit}
                      <button
                        type="button"
                        onClick={() => deleteStatus(data.id, invest.id)}
                      >
                        삭제
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <form className="box-style">
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
                  btnName="추가"
                  backgroundColor="#bacd92"
                ></ConfirmBtn>
              </form>
            </>
          )}
        </>
      ))}

      {isAccordionOpen && (
        <ConfirmBtn
          onClick={() => newAddBtn()}
          btnName="상품 등록"
          width={'40%'}
          backgroundColor="#bacd92"
        ></ConfirmBtn>
      )}

      {isAddOpen && (
        <>
          <form className="box-style">
            <div className="reset">
              <div className="set-title">투자 상품명</div>
              <img
                className="resetBtn"
                src={`${process.env.PUBLIC_URL}/images/icon-reset.png`}
                onClick={resetBtn}
                alt="초기화"
              />
            </div>
            <input
              className="set-input"
              type="text"
              value={investmentName}
              onChange={(e) => {
                setInvestmentName(e.target.value);
              }}
            />
            <div className="set-title">단위</div>
            <input
              className="set-input"
              type="text"
              value={unit}
              placeholder="ex) kg,cm.."
              onChange={(e) => {
                setUnit(e.target.value);
              }}
            />
            <div className="set-title">오늘의 투자정보</div>
            <input
              className="set-input"
              type="text"
              value={investmentInfo}
              onChange={(e) => {
                setInvestmentInfo(e.target.value);
              }}
            />
            <ConfirmBtn
              onClick={handleAddInvestments}
              btnName="상품 등록"
              backgroundColor="#bacd92"
            ></ConfirmBtn>
          </form>
        </>
      )}
    </>
  );
}
