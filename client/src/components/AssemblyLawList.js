import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ConfirmBtn } from './Btns';
import { ReactComponent as Arrow } from '../images/ico-arr-left.svg';
import { toast, ToastContainer } from 'react-toastify';

import axios from 'axios';
import { getExpire, handleKeyDown } from '../hooks/Functions';
import { SkillHeader } from './Headers';

export function AssemblyLawList() {
  const { id } = useParams();
  const [laws, setLaws] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(true);
  const [selectedId, setSelectedId] = useState('');
  const [selectedDetail, setSelectedDetail] = useState('');
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener(`resize`, () => setInnerWidth(window.innerWidth));
    return () =>
      window.removeEventListener(`resize`, () =>
        setInnerWidth(window.innerWidth)
      );
  }, []);

  const getRules = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/rule/${id}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    });
    // console.log(res.data.result);
    setLaws(res.data.result);
  };

  const updateRule = async (ruleId) => {
    const res = await axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_HOST}/api/rule`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
      data: { id: ruleId, rule: selectedDetail },
    });
    if (res.data.success) {
      toast.success('규칙 수정이 완료되었습니다.');
      getRules();
    }
  };

  const addRule = async () => {
    const res = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_HOST}/api/rule`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
      data: [{ countryId: id, rule: selectedDetail }],
    });
    if (res.data.success) {
      getRules();
      toast.success('법 등록이 완료되었습니다.', { autoClose: 1300 });
      const res2 = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_HOST}/api/student/notice/add/all/${id}`,
        headers: {
          Authorization: `Bearer ${getExpire()}`,
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
        },
        data: {
          content: `${selectedDetail} 법이 신규 생성되었습니다.`,
        },
      });
    } else {
      toast.error('법 생성에 실패했습니다. 다시 시도해주세요.', {
        autoClose: 1300,
      });
    }
  };

  const deleteRule = async (ruleId) => {
    const res = await axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_HOST}/api/rule/${ruleId}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
      data: [{ countryId: id, rule: selectedDetail }],
    });
    if (res.data.success) {
      toast.success('삭제 완료되었습니다.', { autoClose: 1300 });
      getRules();
    }
  };

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
      setSelectedDetail(law.rule);

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

    addRule();

    setSelectedDetail('');
    setSelectedIndex(null);
  };
  const deleteBtn = (e, index, id) => {
    if (!window.confirm(`${index}항을 삭제하시겠습니까?`)) {
      return;
    }
    deleteRule(id);

    setIsAccordionOpen(false);
    setIsAddOpen(true);
    setSelectedIndex(null);
    setSelectedId('');
    setSelectedDetail('');
  };

  useEffect(() => {
    getRules();
  }, []);

  return (
    <>
      <ToastContainer />
      {innerWidth >= 1160 && <SkillHeader />}
      <div className="pc-wrap">
        <div className="setting-wrap title-wrap">
          <ul className="title-list">
            <li className="underLine">
              국가에 필수인 기본법을 제정하세요&#46;
            </li>
          </ul>
        </div>

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
                    <div className="infoBox">
                      <span className="line">
                        {index + 1}항. <span className="pLine">{law.rule}</span>
                      </span>
                    </div>

                    <Arrow stroke="#ddd" className="accArrBtn" />
                  </div>
                  {isAccordionOpen && selectedIndex === index && (
                    <div className="box-style">
                      <div className="reset">
                        <div className="set-title">{index + 1}항</div>
                        <img
                          className="delete-img"
                          src={`${process.env.PUBLIC_URL}/images/icon-delete.png`}
                          onClick={(e) => deleteBtn(e, index + 1, law.id)}
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
                          updateRule(law.id);
                        }}
                        btnName="업데이트"
                        backgroundColor="#61759f"
                      ></ConfirmBtn>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="non-law">제정된 기본법이 존재하지 않습니다.</div>
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
              onKeyDown={(e) => handleKeyDown(e, handleNewLaw)}
            />
            <ConfirmBtn
              onClick={handleNewLaw}
              btnName="제정하기"
              backgroundColor="#61759f"
            ></ConfirmBtn>
          </form>
        )}
      </div>
    </>
  );
}
