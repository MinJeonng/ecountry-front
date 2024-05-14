import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConfirmBtn } from './SettingBtn';
import '../styles/setting.scss';

export function AddSavings() {
  const navigate = useNavigate();
  const [savingName, setSavingName] = useState('');
  const [savingDeadLine, setSavingDeadLine] = useState(0);
  const [interestRate, setInterestRate] = useState('');
  const [savingList, setSavingList] = useState([]);
  const [registerDate, setRegisterDate] = useState(new Date());
  const [dDay, setDDay] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  useEffect(() => {
    // 등록 날짜를 오늘 날짜로 설정
    setRegisterDate(new Date());
  }, []);
  useEffect(() => {
    // savingDeadLine이 변경될 때마다 D-Day 계산
    calculateDDay();
  }, [savingDeadLine]);

  const calculateDDay = () => {
    const today = new Date();
    const deadline = new Date(registerDate);
    deadline.setDate(deadline.getDate() + parseInt(savingDeadLine)); //만기 날짜

    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setDDay(`D-${diffDays}`);
  };

  const handleAddSavings = () => {
    if (!savingName || !savingDeadLine || !interestRate) {
      alert('모든 값을 입력해주세요');
      return;
    }
    if (selectedIndex !== null) {
      const updatedSaving = [...savingList];
      updatedSaving[selectedIndex] = {
        name: savingName,
        deadline: savingDeadLine,
        rate: interestRate,
      };
      setSavingList(updatedSaving);
    } else {
      const newSavingList = [
        ...savingList,
        {
          name: savingName,
          deadline: savingDeadLine,
          rate: interestRate,
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
  };
  const handleCloseAccordion = () => {
    setIsAccordionOpen(false); // 아코디언 닫힘 상태로 변경
    // 필요하다면 폼의 입력값을 초기화하는 로직 추가
  };
  const resetBtn = () => {
    setSelectedIndex(null);
    // 나머지 set값들도 '' 해야하는지 알아보기
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
        <div className={`display ${isAccordionOpen ? 'accordion-open' : ''}`}>
          {saving.name}적금 {dDay}
          <button
            className="updateBtn"
            key={index}
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
      ))}
      {isAccordionOpen && (
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
            onClick={handleCloseAccordion}
            btnName="업데이트"
          ></ConfirmBtn>
        </form>
      )}
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
        <ConfirmBtn onClick={handleAddSavings} btnName="상품 등록"></ConfirmBtn>
      </form>
    </>
  );
}
