import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ConfirmBtn } from './SettingBtn';
import { ReactComponent as Arrow } from '../images/ico-arr-left.svg';
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
      url: `${process.env.REACT_APP_HOST}/api/account/${id}`,
    });
    setSavingList(res.data.result);
  };
  const sendList = async () => {
    const res = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_HOST}/api/account`,
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
      url: `${process.env.REACT_APP_HOST}/api/account`,
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
    // getList();
  }, []);

  const handleAddSavings = () => {
    if (!savingName || !savingDeadLine || !interestRate) {
      alert('모든 값을 입력해주세요');
      return;
    }

    // sendList();

    if (selectedIndex !== null) {
      const updatedSaving = [...savingList];
      updatedSaving[selectedIndex] = {
        name: savingName,
        dueDate: savingDeadLine,
        interest: interestRate,

        dueDate: savingDeadLine,
      };
      setSavingList(updatedSaving);
    } else {
      const newSavingList = [
        ...savingList,
        {
          name: savingName,
          dueDate: savingDeadLine,
          interest: interestRate,

          dueDate: savingDeadLine,
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
    if (selectedIndex === index) {
      setIsAccordionOpen(false);
      setIsAddOpen(true);
      setSelectedIndex(null);
      setSavingName('');
      setInterestRate('');
      setSavingDeadLine('');
    } else {
      setSavingName(saving.name);
      setSavingDeadLine(saving.dueDate);
      setInterestRate(saving.interest);
      setSelectedIndex(index);

      setIsAccordionOpen(true);
      setIsAddOpen(false);
    }
  };

  const handleCloseAccordion = () => {
    if (selectedIndex !== null) {
      const updatedSaving = [...savingList];
      updatedSaving[selectedIndex] = {
        name: savingName,
        dueDate: savingDeadLine,
        interest: interestRate,
        dueDate: savingDeadLine,
      };
      setSavingList(updatedSaving);
    } else {
      const newSavingList = [
        ...savingList,
        {
          name: savingName,
          dueDate: savingDeadLine,
          interest: interestRate,
          dueDate: savingDeadLine,
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

  const deleteBtn = async (e, accountId) => {
    if (!window.confirm('적금 상품을 삭제하시겠습니까?')) {
      return;
    }
    const res = await axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_HOST}/api/account/delete/${accountId}`,
    });
    console.log(res.data.message);
    if (res.data.success) {
      alert('삭제 완료되었습니다.');
    }
    getList();
    e.stopPropagation();
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
            onClick={() => selectInput(saving, index)}
          >
            {saving.name} D-{saving.dueDate}(금리 {saving.interest}%)
            <Arrow stroke="#ddd" className="accArrBtn" />
          </div>
          {isAccordionOpen && selectedIndex === index && (
            <form className="box-style">
              <div className="reset">
                <div className="set-title">적금 상품명</div>
                <img
                  className="resetBtn"
                  src={`${process.env.PUBLIC_URL}/images/icon-delete.png`}
                  // onClick={(e) => deleteBtn(e, saving.id)}
                  onClick={deleteBtn(index)}
                  alt="삭제"
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
                  // updateFunc(saving.id);
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
        </>
      )}
    </>
  );
}
