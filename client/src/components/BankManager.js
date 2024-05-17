import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ConfirmBtn } from './SettingBtn';
import '../styles/setting.scss';
import axios from 'axios';

export function AddSavings() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [savingName, setSavingName] = useState('');
  const [savingDeadLine, setSavingDeadLine] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [savingList, setSavingList] = useState([]);
  const [registerDate, setRegisterDate] = useState(new Date());
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(true);

  const getList = async () => {
    const res = await axios({
      method: 'GET',
      url: `http://localhost:8080/api/account/${id}`,
    });
    setSavingList(res.data.result);
  };
  const sendList = async () => {
    const res = await axios({
      method: 'POST',
      url: `http://localhost:8080/api/account`,
      data: {
        countryId: id,
        name: savingName,
        interest: interestRate,
        dueDate: savingDeadLine,
      },
    });
    console.log(res.data.message);
    getList();
  };
  const updateFunc = async (accountId) => {
    const res = await axios({
      method: 'PATCH',
      url: `http://localhost:8080/api/account`,
      data: {
        id: accountId,
        name: savingName,
        interest: interestRate,
        dueDate: savingDeadLine,
      },
    });
    getList();
  };
  useEffect(() => {
    // 등록 날짜를 오늘 날짜로 설정
    setRegisterDate(new Date());
    getList();
  }, []);

  const calculateDDay = useCallback(() => {
    const today = new Date();
    const deadline = new Date(registerDate);
    deadline.setDate(deadline.getDate() + parseInt(savingDeadLine)); // 만기 날짜

    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return `D-${diffDays}`;
  }, [registerDate, savingDeadLine]);

  useEffect(() => {
    // savingDeadLine이 변경될 때마다 D-Day 계산
    calculateDDay();
  }, [savingDeadLine, calculateDDay]);

  const handleAddSavings = () => {
    if (!savingName || !savingDeadLine || !interestRate) {
      alert('모든 값을 입력해주세요');
      return;
    }
    sendList();
    // const dDayForItem = calculateDDay();
    //
    // if (selectedIndex !== null) {
    //   const updatedSaving = [...savingList];
    //   updatedSaving[selectedIndex] = {
    //     name: savingName,
    //     dueDate: savingDeadLine,
    //     interest: interestRate,
    //     dDay: dDayForItem,
    //   };
    //   setSavingList(updatedSaving);
    // } else {
    //   const newSavingList = [
    //     ...savingList,
    //     {
    //       name: savingName,
    //       dueDate: savingDeadLine,
    //       interest: interestRate,
    //       dDay: dDayForItem,
    //     },
    //   ];
    //   setSavingList(newSavingList);
    // }
    setSavingName('');
    setInterestRate('');
    setSavingDeadLine('');
    setSelectedIndex(null);
  };
  const selectInput = (saving, index) => {
    setSavingName(saving.name);
    setSavingDeadLine(saving.dueDate);
    setInterestRate(saving.interest);
    setSelectedIndex(index);

    // 아코디언 열기
    setIsAccordionOpen(true); // 아코디언 열림 상태로 변경
    setIsAddOpen(false);
  };
  const handleCloseAccordion = () => {
    const dDayForItem = calculateDDay();

    if (selectedIndex !== null) {
      const updatedSaving = [...savingList];
      updatedSaving[selectedIndex] = {
        name: savingName,
        dueDate: savingDeadLine,
        interest: interestRate,
        dDay: dDayForItem,
      };
      setSavingList(updatedSaving);
    } else {
      const newSavingList = [
        ...savingList,
        {
          name: savingName,
          dueDate: savingDeadLine,
          interest: interestRate,
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
    if (savingName !== '' || savingDeadLine !== '' || selectedIndex !== null) {
      const isConfirmed = window.confirm('초기화 하시겠습니까?');
      if (!isConfirmed) {
        return;
      }
      setSelectedIndex(null);
      setSavingName('');
      setInterestRate('');
      setSavingDeadLine('');
    }
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

  //db로 보내는 함수
  // ? 이거 store가 필요한지?
  const handleConfirm = () => {
    //
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
            {saving.name}적금 D-{saving.dueDate}
            <button
              className="updateBtn"
              onClick={() => selectInput(saving, index)}
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
                <div className="set-title">적금 상품명</div>
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
                onClick={() => {
                  handleCloseAccordion();
                  updateFunc(saving.id);
                }}
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
        <>
          <form className="box-style">
            <div className="reset">
              <div className="set-title">적금 상품명</div>
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
              backgroundColor="#bacd92"
            ></ConfirmBtn>
          </form>
          <ConfirmBtn
            onClick={handleConfirm}
            btnName="완료"
            backgroundColor="#bacd92"
          ></ConfirmBtn>
        </>
      )}
    </>
  );
}
