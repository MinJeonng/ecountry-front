import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ConfirmBtn } from './Btns';
import { ReactComponent as Arrow } from '../images/ico-arr-left.svg';
import { toast, ToastContainer } from 'react-toastify';

import '../styles/setting.scss';
import '../styles/lawList.scss';

export function AssemblyLawList() {
  const [laws, setLaws] = useState([
    { id: 1, detail: '법을 잘 지키자' },
    { id: 2, detail: '약속을 잘 지키자' },
    { id: 3, detail: '쿠쿠루삥뽕' },
  ]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(true);
  const [selectedId, setSelectedId] = useState('');
  const [selectedDetail, setSelectedDetail] = useState('');
  const navigate = useNavigate();

  const selectInput = (law, index) => {
    if (selectedIndex === index) {
      setIsAccordionOpen(false);
      setIsAddOpen(true);
      setSelectedIndex(null);
      setSelectedId('');
      setSelectedDetail('');
    } else {
      setSelectedIndex(index);
      setSelectedId(law.id);
      setSelectedDetail(law.detail);

      setIsAccordionOpen(true);
      setIsAddOpen(false);
    }
  };
  const handleCloseAccordion = () => {
    if (selectedIndex !== null) {
      const updatedlaws = [...laws];
      updatedlaws[selectedIndex] = {
        id: selectedId,
        detail: selectedDetail,
      };
      setLaws(updatedlaws);
    } else {
      const newLaws = [
        ...laws,
        {
          id: laws.length - 1,
          detail: selectedDetail,
        },
      ];
      setLaws(newLaws);
    }
    setSelectedDetail('');
    setSelectedIndex(null);
    setIsAccordionOpen(false); // 아코디언 닫힘 상태로 변경
    setIsAddOpen(true);
  };
  const handleNewLaw = () => {
    if (!selectedDetail) {
      toast.error('내용을 모두 입력하세요', { autoClose: 1300 });
    }

    // sendList();

    const newLaws = [
      ...laws,
      {
        id: laws.length + 1,
        detail: selectedDetail,
      },
    ];
    console.log(newLaws);
    setLaws(newLaws);
    setSelectedDetail('');
    setSelectedIndex(null);
  };
  const deleteBtn = (e, id) => {
    if (!window.confirm(`${id}항을 삭제하시겠습니까?`)) {
      return;
    }
  };

  return (
    <>
      <ToastContainer />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div
          className="newsHead"
          style={{ color: '#666666', marginBottom: '10px' }}
        >
          기본법
        </div>
      </div>
      <div
        style={{ borderBottom: '2px solid #bacd92', marginBottom: '10%' }}
      ></div>
      {laws.length !== 0 ? (
        <>
          <div className="newsInfo">
            {laws.map((law, index) => (
              <div key={index}>
                <div
                  className={`display ${
                    isAccordionOpen && selectedIndex === index
                      ? 'accordion-open'
                      : ''
                  } ${selectedIndex === index ? 'selected' : ''}`}
                  onClick={() => selectInput(law, index)}
                  style={{ fontSize: '13px' }}
                >
                  <p>{law.id}항.</p>
                  <p>{law.detail}</p>
                  <Arrow stroke="#ddd" className="accArrBtn" />
                </div>
                {isAccordionOpen && selectedIndex === index && (
                  <form className="box-style">
                    <div className="reset">
                      <div className="set-title">{index + 1}항</div>
                      <img
                        className="resetBtn"
                        src={`${process.env.PUBLIC_URL}/images/icon-delete.png`}
                        onClick={(e) => deleteBtn(e, law.id)}
                        alt="삭제"
                      />
                    </div>
                    <input
                      className="set-input"
                      type="text"
                      value={selectedDetail}
                      onChange={(e) => {
                        setSelectedDetail(e.target.value);
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
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              color: '#666666',
              marginBottom: '20px',
              fontSize: '13px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>제정된 세법이 존재하지 않습니다.</span>
          </div>
        </>
      )}
      {isAddOpen && (
        <form className="box-style">
          <div className="reset">
            <div className="set-title">{laws.length + 1}항</div>
          </div>
          <input
            className="set-input"
            type="text"
            value={selectedDetail}
            onChange={(e) => {
              setSelectedDetail(e.target.value);
              setSelectedIndex(laws.length);
            }}
          />
          <ConfirmBtn
            onClick={handleNewLaw}
            btnName="제정하기"
            backgroundColor="#61759f"
          ></ConfirmBtn>
        </form>
      )}
    </>
  );
}
