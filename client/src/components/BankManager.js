import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConfirmBtn } from './SettingBtn';
import '../styles/setting.scss';

export function AddSavings() {
  const navigate = useNavigate();
  const [savingName, setSavingName] = useState('');
  const [savingDeadLine, setSavingDeadLine] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [savingList, setSavingList] = useState([]);
  const [registerDate, setRegisterDate] = useState(new Date());
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(true);

  useEffect(() => {
    // 등록 날짜를 오늘 날짜로 설정
    setRegisterDate(new Date());
  }, []);
  useEffect(() => {
    // savingDeadLine이 변경될 때마다 D-Day 계산
    calculateDDay();
  }, [savingDeadLine]);

  const calculateDDay = (savingDeadLine) => {
    const today = new Date();
    const deadline = new Date(registerDate);
    deadline.setDate(deadline.getDate() + parseInt(savingDeadLine)); // 만기 날짜

    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return `D-${diffDays}`;
  };

  const handleAddSavings = () => {
    if (!savingName || !savingDeadLine || !interestRate) {
      alert('모든 값을 입력해주세요');
      return;
    }
    const dDayForItem = calculateDDay(savingDeadLine);

    if (selectedIndex !== null) {
      const updatedSaving = [...savingList];
      updatedSaving[selectedIndex] = {
        name: savingName,
        deadline: savingDeadLine,
        rate: interestRate,
        dDay: dDayForItem,
      };
      setSavingList(updatedSaving);
    } else {
      const newSavingList = [
        ...savingList,
        {
          name: savingName,
          deadline: savingDeadLine,
          rate: interestRate,
          dDay: dDayForItem,
        },
      ];
      setSavingList(newSavingList);
    }
    setSavingName('');
    setInterestRate('');
    setSavingDeadLine('');
    setSelectedIndex(null);
  };
  const selectInput = (saving, index) => {
    setSavingName(saving.name);
    setSavingDeadLine(saving.deadline);
    setInterestRate(saving.rate);
    setSelectedIndex(index);

    // 아코디언 열기
    setIsAccordionOpen(true); // 아코디언 열림 상태로 변경
    setIsAddOpen(false);
  };
  const handleCloseAccordion = () => {
    const dDayForItem = calculateDDay(savingDeadLine);
    if (selectedIndex !== null) {
      const updatedSaving = [...savingList];
      updatedSaving[selectedIndex] = {
        name: savingName,
        deadline: savingDeadLine,
        rate: interestRate,
        dDay: dDayForItem,
      };
      setSavingList(updatedSaving);
    } else {
      const newSavingList = [
        ...savingList,
        {
          name: savingName,
          deadline: savingDeadLine,
          rate: interestRate,
          dDay: dDayForItem,
        },
      ];
      setSavingList(newSavingList);
    }
    setSavingName('');
    setInterestRate('');
    setSavingDeadLine('');
    setSelectedIndex(null);
    setIsAccordionOpen(false); // 아코디언 닫힘 상태로 변경
    setIsAddOpen(true);
  };
  const resetBtn = () => {
    setSelectedIndex(null);
    setSavingName('');
    setInterestRate('');
    setSavingDeadLine('');
  };

  const deleteBtn = (index) => (e) => {
    e.stopPropagation();
    const filteredSavings = savingList.filter((_, i) => i !== index);
    setSavingList(filteredSavings);
    setSavingName('');
    setInterestRate('');
    setSavingDeadLine('');
    setSelectedIndex(null);
  };
  const newAddBtn = () => {
    setIsAddOpen(true);
    setIsAccordionOpen(false);
    setSelectedIndex(null);
    setSavingName('');
    setInterestRate('');
    setSavingDeadLine('');
  };
  return (
    <>
      <div className="title-list">
        <div>적금 상품 생성</div>
        <ul className="title-list">
          <li>적금 상품을 생성할 수 있습니다.</li>
          <li>생성 후 삭제 및 수정 불가합니다.</li>
        </ul>
      </div>

      {savingList.map((saving, index) => (
        <>
          <div
            className={`display ${
              isAccordionOpen && selectedIndex === index ? 'accordion-open' : ''
            } ${selectedIndex === index ? 'selected' : ''}`}
            key={index}
          >
            {saving.name}적금 {saving.dDay}
            <button
              className="updateBtn"
              onClick={() => selectInput(saving, index)}
            >
              수정
            </button>
            <img
              className="deleteBtn"
              src={`${process.env.PUBLIC_URL}/images/icon-delete.png`}
              onClick={() => deleteBtn(index)}
            />
          </div>
          {isAccordionOpen && selectedIndex === index && (
            <form className="box-style">
              <div className="reset">
                <div className="set-title">적금 상품명</div>
                <img
                  className="resetBtn"
                  src={`${process.env.PUBLIC_URL}/images/icon-reset.png`}
                  onClick={resetBtn}
                />
              </div>
              <input
                className="set-input"
                type="text"
                value={savingName}
                onChange={(e) => {
                  setSavingName(e.target.value);
                }}
              />
              <div className="set-title">적금 기간(생성일부터 ~까지)</div>
              <input
                className="set-input"
                type="number"
                min="0"
                value={savingDeadLine}
                onChange={(e) => {
                  setSavingDeadLine(e.target.value);
                }}
              />
              <div className="set-title">금리 설정</div>
              <input
                className="set-input"
                type="number"
                min="0"
                value={interestRate}
                onChange={(e) => {
                  setInterestRate(e.target.value);
                }}
              />
              <ConfirmBtn
                onClick={() => handleCloseAccordion()}
                btnName="업데이트"
              ></ConfirmBtn>
            </form>
          )}
        </>
      ))}

      {isAccordionOpen && (
        <button onClick={() => newAddBtn()}>상품 등록</button>
      )}

      {isAddOpen && (
        <form className="box-style">
          <div className="reset">
            <div className="set-title">적금 상품명</div>
            <img
              className="resetBtn"
              src={`${process.env.PUBLIC_URL}/images/icon-reset.png`}
              onClick={resetBtn}
            />
          </div>
          <input
            className="set-input"
            type="text"
            value={savingName}
            onChange={(e) => {
              setSavingName(e.target.value);
            }}
          />
          <div className="set-title">적금 기간(생성일부터 ~까지)</div>
          <input
            className="set-input"
            type="number"
            min="0"
            value={savingDeadLine}
            onChange={(e) => {
              setSavingDeadLine(e.target.value);
            }}
          />
          <div className="set-title">금리 설정</div>
          <input
            className="set-input"
            type="number"
            min="0"
            value={interestRate}
            onChange={(e) => {
              setInterestRate(e.target.value);
            }}
          />
          <ConfirmBtn
            onClick={handleAddSavings}
            btnName="상품 등록"
          ></ConfirmBtn>
        </form>
      )}
    </>
  );
}