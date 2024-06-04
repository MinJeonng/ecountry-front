import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from 'axios';

import { ReactComponent as Arrow } from '../images/ico-arr-left.svg';
import { handleKeyDown } from '../hooks/Functions';

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
    { label: unit, value: 1 },
    { label: '자리 임대료', value: 2 },
    { label: '과태료', value: 3 },
  ];

  const categoryMapping = {
    tax: { title: '세금', divisions: [0, 1] },
    rent: { title: '자리 임대료', divisions: [2] },
    penalty: { title: '과태료', divisions: [3] },
  };

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
      toast.error('세금 규칙 로딩 오류', { autoClose: 1300 });
    }
  };

  // db 추가
  const addTax = async () => {
    try {
      const res = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_HOST}/api/tax`,
        data: [
          {
            countryId: id,
            name: lawName,
            division,
            tax,
          },
        ],
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });
      if (res.data.success) {
        getTaxList();
        toast.success('세금 규칙이 등록되었습니다.', { autoClose: 1300 });
      } else {
        toast.error('세금 규칙 등록 오류', { autoClose: 1300 });
      }
    } catch {
      toast.error('세금 규칙 등록 오류', { autoClose: 1300 });
    }
  };

  // db 업데이트
  const updateTax = async () => {
    try {
      const res = await axios({
        method: 'PATCH',
        url: `${process.env.REACT_APP_HOST}/api/tax`,
        data: {
          id: selectedTaxLawId,
          name: lawName,
          division,
          tax,
        },
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });
      if (res.data.success) {
        getTaxList();
        toast.success('세금 규칙이 수정되었습니다.', { autoClose: 1300 });
      } else {
        toast.error('세금 규칙 수정 오류', { autoClose: 1300 });
      }
    } catch {
      toast.error('세금 규칙 수정 오류', { autoClose: 1300 });
    }
  };

  // db 삭제
  const deleteTax = async () => {
    try {
      const res = await axios({
        method: 'DELETE',
        url: `${process.env.REACT_APP_HOST}/api/tax/${selectedTaxLawId}`,
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });
      if (res.data.success) {
        getTaxList();
        toast.success('세금 규칙이 삭제되었습니다.', { autoClose: 1300 });
      } else {
        toast.error('세금 규칙 삭제 오류', { autoClose: 1300 });
      }
    } catch {
      toast.error('세금 규칙 삭제 오류', { autoClose: 1300 });
    }
  };

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
        setUnit(res.data.result.unit);
      }
    } catch (error) {
      console.log('화폐단위 불러오는데 실패', error);
    }
  };

  // 세법 추가하기
  const handleAddTaxLaw = () => {
    if (!lawName || division === '' || !tax) {
      toast.error('모든 값을 입력해주세요', { autoClose: 1300 });
      return;
    }

    if (isAddOpen) {
      addTax();
    } else {
      updateTax();
    }

    resetInputs();
  };

  // 세법 삭제하기
  const handleDeleteBtn = (index) => (e) => {
    e.stopPropagation();
    if (window.confirm('세법을 삭제하시겠습니까?')) {
      deleteTax();
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

  useEffect(() => {
    getTaxList();
    getUnit();
  }, []);

  return (
    <div>
      <ToastContainer />
      <div className="setting-wrap">
        <ul className="title-list">
          <li>설정한 세법을 확인할 수 있습니다&#46;</li>
          <li>
            세금 &#183; 자리임대료 &#183; 과태료 등 추가 &#183; 수정 &#183; 삭제
            할 수 있습니다&#46;
          </li>
        </ul>
      </div>

      <div>
        {Object.keys(categoryMapping).map((categoryKey) => {
          const category = categoryMapping[categoryKey];
          const filteredTaxLaws = taxLawList.filter((taxLaw) =>
            category.divisions.includes(taxLaw.division)
          );

          if (filteredTaxLaws.length === 0) {
            return null;
          }

          return (
            <div className="group-wrap" key={categoryKey}>
              <div className="group-header">{category.title}</div>

              {filteredTaxLaws.map((taxLaw, index) => {
                const globalIndex = `${categoryKey}-${index}`;
                return (
                  <div key={index}>
                    <div
                      className={`display display2 ${
                        selectedTaxLawIndex === globalIndex
                          ? 'accordion-open'
                          : ''
                      } ${
                        selectedTaxLawIndex === globalIndex ? 'selected' : ''
                      }`}
                      onClick={() => selectInput(taxLaw, globalIndex)}
                    >
                      {taxLaw.name} {taxLaw.tax}
                      {taxLaw.division === 0 ? '%' : unit}
                      <Arrow stroke="#ddd" className="accArrBtn" />
                    </div>
                    {selectedTaxLawIndex === globalIndex && (
                      <form className="box-style">
                        <div className="reset">
                          <div className="set-title">세금명</div>

                          <img
                            className="resetBtn"
                            src={`${process.env.PUBLIC_URL}/images/icon-delete.png`}
                            onClick={handleDeleteBtn(index)}
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
                          min={0}
                          onChange={(e) => setTax(e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, handleAddTaxLaw)}
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
              })}
            </div>
          );
        })}
      </div>

      {isAddOpen && (
        <div className="pc-wrap">
          <form className="box-style">
            <div className="reset">
              <div className="set-title">세금명</div>

              <img
                className="resetBtn"
                src={`${process.env.PUBLIC_URL}/images/icon-delete.png`}
                onClick={resetInputs}
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
              min={0}
              onChange={(e) => setTax(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, handleAddTaxLaw)}
            />
            <button
              className="blue-btn"
              type="button"
              onClick={handleAddTaxLaw}
            >
              등록
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
