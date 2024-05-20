import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Template from '../components/Template';

export function AssemblyLawEdit() {
  const { id } = useParams();
  const isEditing = id !== undefined;
  const [detail, setDetail] = useState('');

  const [laws, setLaws] = useState([
    { id: 1, detail: '법을 잘 지키자' },
    { id: 2, detail: '약속을 잘 지키자' },
    { id: 3, detail: '쿠쿠루삥뽕' },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditing) {
      const law = laws.find((law) => law.id === parseInt(id));
      if (law) {
        setDetail(law.detail);
      }
    } else {
      setDetail('');
    }
  }, [id, isEditing, laws]);

  const handleSave = () => {
    if (isEditing) {
      // 법 개정 로직
      const updatedLaws = laws.map((law) =>
        law.id === parseInt(id) ? { ...law, detail } : law
      );
      setLaws(updatedLaws);
      console.log('법 개정:', detail);
    } else {
      // 새로운 법 제정 로직
      const newLaw = { id: laws.length + 1, detail };
      setLaws([...laws, newLaw]);
      console.log('새로운 법 제정:', detail);
    }
    navigate(-1); // 이전 페이지로 이동
  };

  const renderContent = () => (
    <div className="box-style">
      <div>법 {isEditing ? '개정' : '제정'}</div>
      <input
        className="law-input"
        type="text"
        placeholder="내용"
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
      />
      <button className="blue-btn" onClick={handleSave}>
        {isEditing ? '개정' : '제정'}
      </button>
    </div>
  );

  return isEditing ? (
    renderContent()
  ) : (
    <Template
      childrenTop={<div className="top-title">국회</div>}
      childrenBottom={renderContent()}
    />
  );
}
