//은행원 - 적금 추가 및 해지
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const SearchStudentStyle = styled.div`
  input {
    width: -webkit-fill-available;
    border-bottom: 1px solid #ddd;
    border-radius: 10px;
    padding: 10px 10px;
    border-top: none;
    border-left: none;
    border-right: none;
  }
  .container {
    display: flex;
    align-items: center;
    img {
      width: 20px;
      height: 20px;
      position: absolute;
      right: 50px;
    }
  }
`;

const ResultList = styled.div`
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export function SavingTeller() {
  const { id } = useParams();
  const [studentList, setStudentList] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const searchFunc = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/student/${id}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    });
    if (res.data.success) {
      setStudentList(res.data.result);
    } else {
      console.log(res.data.result.message);
    }
  };

  const handleFocus = () => {
    searchFunc();
  };

  useEffect(() => {
    if (!searchInput.trim()) {
      setFilteredStudents(studentList);
    } else {
      const [searchRollNumber, ...searchNameParts] = searchInput.split(' ');
      const searchName = searchNameParts.join(' ');
      const filtered = studentList.filter(
        (student) =>
          (searchRollNumber &&
            student.rollNumber.toString().includes(searchRollNumber)) ||
          (searchName &&
            student.name.toLowerCase().includes(searchName.toLowerCase()))
      );
      setFilteredStudents(filtered);
    }
  }, [searchInput, studentList]);

  const handleSelectStudent = (student) => {
    setSearchInput(`${student.rollNumber}번 ${student.name}`);
    setSelectedStudentId(student.id);
  };

  useEffect(() => {
    if (searchInput) {
      setFilteredStudents([]);
    }
    // console.log(selectedStudentId);
  }, [searchInput, selectedStudentId]);
  return (
    <>
      <SearchStudentStyle>
        <div className="container">
          <input
            className="findStudent"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onFocus={handleFocus}
            placeholder="출석번호 또는 국민 이름으로 검색해보세요"
          />
          <img
            src={`${process.env.PUBLIC_URL}/images/icon-search.png`}
            alt="검색"
          />
        </div>
        {filteredStudents.map((student) => (
          <ResultList
            key={student.id}
            data-id={student.id}
            onClick={() => handleSelectStudent(student)}
          >
            {student.rollNumber}번 {student.name}
          </ResultList>
        ))}
      </SearchStudentStyle>
    </>
  );
}
