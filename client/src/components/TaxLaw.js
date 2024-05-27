import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '../styles/setting.scss';
import axios from 'axios';

import { ReactComponent as Arrow } from '../images/ico-arr-left.svg';

export function TaxLaw() {
  const { id } = useParams();

  const [taxLawList, setTaxLawList] = useState([]);

  const [lawName, setLawName] = useState(''); // 세금 이름
  const [division, setDivision] = useState(''); // 세금 디비전
  const [tax, setTax] = useState(''); // 세금 금액
  const [selectedTaxLawIndex, setSelectedTaxLawIndex] = useState(null); // 선택한 세금 규칙의 인덱스
  const [selectedTaxLawId, setSelectedTaxLawId] = useState(null); // 선택한 세금 규칙의 아이디

  const [unit, setUnit] = useState('');

  const [isAddOpen, setIsAddOpen] = useState(true);

  const divisionList = [
    { label: '%', value: 0 },
    { label: unit.unit, value: 1 },
    { label: '자리 임대료', value: 2 },
    { label: '과태료', value: 3 },
  ];

  // 세법 불러오기
  const getTaxList = async () => {
    try {
      const resTax = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_HOST}/api/tax/${id}`,
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });
      if (resTax.data.success) {
        setTaxLawList(resTax.data.result);
        console.log(resTax.data.result);
      }
    } catch (error) {
      console.log('세금 규칙 불러오는데 실패', error);
    }
  };
  useEffect(() => {
    getTaxList();
  }, []);

  //단위 불러오기
  const getUnit = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_HOST}/api/bank/unit/${id}`,
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });
      if (res.data.success) {
        setUnit(res.data.result);
      }
    } catch (error) {
      console.log('화폐단위 불러오는데 실패', error);
    }
  };
  useEffect(() => {
    getUnit();
  }, []);

  // 세법 추가하기
  const handleAddTaxLaw = () => {
    if (!lawName || division === '' || !tax) {
      toast('모든 값을 입력해주세요');
      return;
    }

    if (isAddOpen) {
      const newTaxLaw = {
        id: taxLawList.length + 1,
        name: lawName,
        division: parseInt(division),
        tax: parseFloat(tax),
      };
      setTaxLawList([...taxLawList, newTaxLaw]);
      toast('세금 규칙이 등록되었습니다.', { type: 'success' });
    } else {
      const updatedTaxLawList = taxLawList.map((taxLaw, index) =>
        index === selectedTaxLawIndex
          ? {
              ...taxLaw,
              name: lawName,
              division: parseInt(division),
              tax: parseFloat(tax),
            }
          : taxLaw
      );
      setTaxLawList(updatedTaxLawList);
      toast('세금 규칙이 수정되었습니다.', { type: 'success' });
    }

    resetInputs();
  };

  // 세법 삭제하기
  const handleDeleteBtn = (index, lawId) => (e) => {
    e.stopPropagation();
    if (window.confirm('세법을 삭제하시겠습니까?')) {
      const updatedTaxLawList = taxLawList.filter(
        (taxLaw) => taxLaw.id !== lawId
      );
      setTaxLawList(updatedTaxLawList);
      toast('세금 규칙이 삭제되었습니다.', { type: 'success' });
      resetInputs();
    }
  };

  const selectInput = (taxLaw, index) => {
    if (selectedTaxLawIndex === index) {
      setIsAddOpen(true);
      setSelectedTaxLawIndex(null);
      setSelectedTaxLawId(null);
      resetInputs();
    } else {
      setLawName(taxLaw.name);
      setDivision(taxLaw.division);
      setTax(taxLaw.tax);
      setSelectedTaxLawIndex(index);
      setSelectedTaxLawId(taxLaw.id);
      setIsAddOpen(false);
    }
  };

  // 초기화
  const resetInputs = () => {
    setLawName('');
    setDivision('');
    setTax('');
    setSelectedTaxLawIndex(null);
    setSelectedTaxLawId(null);
    setIsAddOpen(true);
  };

  return (
    <div>
      <ToastContainer />
      <div className="title-list">
        <div>세법 관리</div>
        <ul className="title-list">
          <li>설정한 세법을 확인할 수 있습니다&#46;</li>
          <li>
            세금&#183;자리임대료&#183;과태료 등 추가&#183;수정 할 수
            있습니다&#46;
          </li>
        </ul>
      </div>
      <div>
        {divisionList.map((divisionItem) => (
          <div key={divisionItem.value}>
            <div className="group-header">{divisionItem.label}</div>

            {taxLawList.map((taxLaw, index) => {
              if (taxLaw.division === divisionItem.value) {
                return (
                  <div key={index}>
                    <div
                      className={`display ${
                        selectedTaxLawIndex === index ? 'accordion-open' : ''
                      } ${selectedTaxLawIndex === index ? 'selected' : ''}`}
                      onClick={() => selectInput(taxLaw, index)}
                    >
                      {taxLaw.name} {taxLaw.tax}
                      {
                        divisionList.find((d) => d.value === taxLaw.division)
                          ?.label
                      }{' '}
                      <Arrow stroke="#ddd" className="accArrBtn" />
                    </div>
                    {selectedTaxLawIndex === index && (
                      <form className="box-style">
                        <div className="reset">
                          <div className="set-title">세금명</div>

                          <img
                            className="resetBtn"
                            src={`${process.env.PUBLIC_URL}/images/icon-delete.png`}
                            onClick={handleDeleteBtn(index, taxLaw.id)}
                            alt="삭제"
                          />
                        </div>
                        <input
                          type="text"
                          className="set-input"
                          value={lawName}
                          onChange={(e) => setLawName(e.target.value)}
                          style={{ imeMode: 'active' }}
                        />
                        <div className="set-title">구분</div>
                        <select
                          className="set-input"
                          value={division}
                          onChange={(e) => setDivision(e.target.value)}
                        >
                          <option value="" disabled>
                            선택해주세요
                          </option>
                          {divisionList.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <div className="set-title">세금</div>
                        <input
                          className="set-input"
                          type="number"
                          value={tax}
                          onChange={(e) => setTax(e.target.value)}
                        />
                        <button
                          className="blue-btn"
                          type="button"
                          onClick={handleAddTaxLaw}
                        >
                          수정
                        </button>
                      </form>
                    )}
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        ))}
      </div>
      {isAddOpen && (
        <form className="box-style">
          <div className="reset">
            <div className="set-title">세금명</div>

            <img
              className="resetBtn"
              src={`${process.env.PUBLIC_URL}/images/icon-delete.png`}
              onClick={handleDeleteBtn}
              alt="삭제"
            />
          </div>
          <input
            type="text"
            className="set-input"
            value={lawName}
            onChange={(e) => setLawName(e.target.value)}
            style={{ imeMode: 'active' }}
          />
          <div className="set-title">구분</div>
          <select
            className="set-input"
            value={division}
            onChange={(e) => setDivision(e.target.value)}
          >
            <option value="" disabled>
              선택해주세요
            </option>
            {divisionList.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="set-title">세금</div>
          <input
            className="set-input"
            type="number"
            value={tax}
            onChange={(e) => setTax(e.target.value)}
          />
          <button className="blue-btn" type="button" onClick={handleAddTaxLaw}>
            등록
          </button>
        </form>
      )}
    </div>
  );
}
