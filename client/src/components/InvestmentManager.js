import { useState } from 'react';
import { ConfirmBtn } from './SettingBtn';
import '../styles/setting.scss';
import { PageHeader } from './Headers';

export function AddInvestment({ position }) {
  const [investmentName, setInvestmentName] = useState('');
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState('');
  const [investmentInfo, setInvestmentInfo] = useState('');
  const [investmentList, setInvestmentList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(true);

  const handleAddInvestments = () => {
    if (!investmentName || !value || !unit || !investmentInfo) {
      alert('모든 값을 입력해주세요');
      return;
    }
    if (selectedIndex !== null) {
      const updatedInvestment = [...investmentList];
      updatedInvestment[selectedIndex] = {
        name: investmentName,
        value: value,
        unit: unit,
        todayInfo: investmentInfo,
      };
      setInvestmentList(updatedInvestment);
    } else {
      const newInvestmentList = [
        ...investmentList,
        {
          name: investmentName,
          value: value,
          unit: unit,
          todayInfo: investmentInfo,
        },
      ];
      setInvestmentList(newInvestmentList);
    }
    setInvestmentInfo('');
    setInvestmentName('');
    setSelectedIndex(null);
    setUnit('');
    setValue('');
  };

  const selectInput = (invest, index) => {
    setInvestmentInfo(invest.todayInfo);
    setInvestmentName(invest.name);
    setUnit(invest.unit);
    setValue(invest.value);
    setSelectedIndex(index);

    setIsAccordionOpen(true);
    setIsAddOpen(false);
  };
  const handleCloseAccordion = () => {
    if (!investmentName || !value || !unit || !investmentInfo) {
      alert('모든 값을 입력해주세요');
      return;
    }
    if (selectedIndex !== null) {
      const updatedInvestment = [...investmentList];
      updatedInvestment[selectedIndex] = {
        name: investmentName,
        value: value,
        unit: unit,
        todayInfo: investmentInfo,
      };
      setInvestmentList(updatedInvestment);
    } else {
      const newInvestmentList = [
        ...investmentList,
        {
          name: investmentName,
          value: value,
          unit: unit,
          todayInfo: investmentInfo,
        },
      ];
      setInvestmentList(newInvestmentList);
    }
    setInvestmentInfo('');
    setInvestmentName('');
    setSelectedIndex(null);
    setUnit('');
    setValue('');
    setIsAccordionOpen(false);
    setIsAddOpen(true);
  };
  const resetBtn = () => {
    if (
      investmentInfo !== '' ||
      investmentName !== '' ||
      selectedIndex !== null ||
      unit !== '' ||
      value !== ''
    ) {
      const isConfirmed = window.confirm('초기화 하시겠습니까?');
      if (!isConfirmed) {
        return;
      }

      setInvestmentInfo('');
      setInvestmentName('');
      setSelectedIndex(null);
      setUnit('');
      setValue('');
    }
  };

  const deleteBtn = (index) => (e) => {
    e.stopPropagation();
    const filteredInvests = investmentList.filter((_, i) => i !== index);
    setInvestmentList(filteredInvests);
    setInvestmentInfo('');
    setInvestmentName('');
    setUnit('');
    setValue('');
    setSelectedIndex(null);
  };
  const newAddBtn = () => {
    setIsAddOpen(true);
    setIsAccordionOpen(false);
    setInvestmentInfo('');
    setInvestmentName('');
    setSelectedIndex(null);
    setUnit('');
    setValue('');
  };

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
              onClick={deleteBtn(index)}
              alt="삭제"
            />
          </div>
          {isAccordionOpen && selectedIndex === index && (
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
              <div className="set-title">단위</div>
              <input
                className="set-input"
                type="text"
                value={unit}
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
                onClick={() => handleCloseAccordion()}
                btnName="업데이트"
                backgroundColor="#61759f"
              ></ConfirmBtn>
            </form>
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
          <div className="set-title">단위</div>
          <input
            className="set-input"
            type="text"
            value={unit}
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
      )}
    </>
  );
}
