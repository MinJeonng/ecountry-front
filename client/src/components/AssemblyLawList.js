import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import '../styles/lawList.scss';

export function AssemblyLawList() {
  const [laws, setLaws] = useState([]);
  const [detail, setDetail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // 임시 법 데이터
    const sampleLaws = [
      { id: 1, detail: '법을 잘 지키자' },
      { id: 2, detail: '약속을 잘 지키자' },
      { id: 3, detail: '쿠쿠루삥뽕' },
    ];

    setLaws(sampleLaws);
  }, []);

  const handleNewLaw = () => {
    // "제정" 버튼을 클릭했을 때의 동작
    navigate('/new/assembly/edit');
  };

  return (
    <div className="law-list">
      <ul className="law-list-items">
        {laws.map((law) => (
          <li key={law.id} className="law-list-item">
            <Link to={`/${law.id}/assembly/edit`} style={{ color: 'black' }}>
              <div className="law-title">{law.id}항</div>
              <div className="law-content">{law.detail}</div>
            </Link>
          </li>
        ))}
      </ul>

      <button onClick={handleNewLaw} className="add-law-link">
        제정
      </button>
    </div>
  );
}
