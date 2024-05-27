//은행원 - 적금 추가 및 해지
import axios from 'axios';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import '../styles/bankClerk.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedStudentId,
  setSelectedStudentName,
} from '../store/selectedStudentIdReducer';

const SearchStudentStyle = styled.div`
  margin-bottom: 40px;
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
  margin-top: 5px;
  gap: 3px;
  display: flex;
  flex-direction: column;
  font-size: 15px;
  padding-left: 5px;
  color: #554d4d;
  /* border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #554d4d; */

  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
const AvailableListStyle = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
  .title {
    font-size: 16px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid #554d4d;
    margin-bottom: 10px;
    padding-bottom: 10px;
    color: #3d3838;
  }
  .savingInfoTitle {
    display: flex;
    justify-content: space-evenly;

    border-radius: 10px;
    background: #e2e8ae;
    padding: 12px;
    margin-bottom: 15px;

    span {
      text-align: center;
      font-size: 15px;
      font-weight: 500;
    }
    img {
      /* width: 15px; */
      height: 20px;
      align-items: center;
      display: flex;
    }
  }
  .savingListBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid #ddd;
    margin-bottom: 5px;
    cursor: pointer;
    &:hover {
      background-color: #f0f0f0;
    }
    span {
      text-align: center;
      font-size: 15px;
      width: 33.3%;
      padding-right: 30px;
    }
  }
`;

const AddBtn = styled.div`
  text-align: center;
  background-color: ${(props) =>
    props.disabled ? '#ddd' : 'rgb(101, 164, 146)'};
  color: white;
  border-radius: 10px;
  font-weight: 500;
  padding: 10px 20px;
  margin-bottom: 40px;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
  }
`;
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function SearchStudent() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [studentList, setStudentList] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchInput, setSearchInput] = useState('');

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
    dispatch(setSelectedStudentId(student.id));
    dispatch(setSelectedStudentName(student.name));
    setFilteredStudents([]);
  };

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

//적금 가입
function AddSaving() {
  const { id } = useParams();
  const [availableList, setAvailableList] = useState([]);
  const [selectedSavingId, setSelectedSavingId] = useState([]);
  const selectedStudentId = useSelector(
    (state) => state.student.selectedStudentId
  );

  const getSavingList = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/account/${id}`,
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
      },
    });
    if (res.data.success) {
      // console.log(res.data.result);
      setAvailableList(res.data.result);
    } else {
      console.log(res.data.message);
    }
  };
  useEffect(() => {
    getSavingList();
  }, [id, selectedStudentId]);

  const handleSelectSaving = (savingId) => {
    setSelectedSavingId((prev) =>
      prev.includes(savingId)
        ? prev.filter((id) => id !== savingId)
        : [...prev, savingId]
    );
  };

  const addSavingFunc = async () => {
    if (selectedSavingId.length > 0) {
      try {
        selectedSavingId.forEach(async (savingId) => {
          // 각 선택된 saving.id에 대해 반복
          const res = await axios({
            method: 'POST',
            url: `${process.env.REACT_APP_HOST}/api/account/saving`,
            headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': '69420',
            },
            data: {
              studentId: selectedStudentId, // 가입하는 친구아이디
              accountListId: savingId, // 가입하려는 적금 아이디
            },
          });
          if (res.data.success) {
            toast('가입이 완료되었습니다.', {
              autoClose: 1300,
            });
            setTimeout(() => {
              window.location.reload();
            }, 1400);

            console.log('success', res.data.success);
            console.log(selectedStudentId);
            console.log(savingId);
          } else {
            console.log(res.data.message);
          }
        });
      } catch (error) {
        toast('적금 가입에 실패했습니다.');
        console.log(error);
      }
    }
  };
  const handleDivClick = (savingId) => {
    handleSelectSaving(savingId);
  };
  return (
    <>
      <ToastContainer />
      <div className="saving-title">적금 가입</div>
      <AvailableListStyle>
        <div className="title">개설 가능 적금 리스트</div>
        <div className="savingInfoTitle">
          <span>적금이름</span>
          <img
            src={`${process.env.PUBLIC_URL}/images/icon-line.png`}
            alt="구분선"
          />
          <span>이율(%)</span>
          <img
            src={`${process.env.PUBLIC_URL}/images/icon-line.png`}
            alt="구분선"
          />
          <span>가입기간(일)</span>
        </div>
        <ListContainer>
          {availableList.map((saving) => {
            return (
              <div
                className="savingListBox"
                key={saving.id}
                value={saving.id}
                onClick={() => handleDivClick(saving.id)}
              >
                <input
                  type="checkbox"
                  checked={selectedSavingId.includes(saving.id)}
                  onChange={() => handleSelectSaving(saving.id)}
                  onClick={(e) => e.stopPropagation()}
                />
                <span>{saving.name}</span>
                <span>{saving.interest}</span>
                <span>{saving.dueDate}</span>
              </div>
            );
          })}
        </ListContainer>
      </AvailableListStyle>
      <AddBtn onClick={addSavingFunc} disabled={selectedSavingId.length === 0}>
        가입
      </AddBtn>
    </>
  );
}
//적금 해지
function CancelSaving() {
  const { id } = useParams();
  const [ownSavingList, setOwnSavingList] = useState([]);
  const [selectedSavingId, setSelectedSavingId] = useState([]);

  const selectedStudentId = useSelector(
    (state) => state.student.selectedStudentId
  );
  const selectedStudentName = useSelector(
    (state) => state.student.selectedStudentName
  );

  //가입한 적금 리스트
  const getOwnSavingList = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_HOST}/api/account/saving?studentId=${selectedStudentId}`,
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });

      if (res.data.success) {
        console.log('success', res.data.success);
        console.log(res.data.result);
        setOwnSavingList(res.data.result);
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.error('Error fetching own saving list:', error);
    }
  };
  useEffect(() => {
    getOwnSavingList();
  }, [id, selectedStudentId]);

  const handleSelectSaving = (savingId) => {
    setSelectedSavingId((prev) =>
      prev.includes(savingId)
        ? prev.filter((id) => id !== savingId)
        : [...prev, savingId]
    );
  };

  //적금 해지
  const cancelSavingFunc = async () => {
    if (selectedSavingId.length > 0) {
      try {
        for (const savingId of selectedSavingId) {
          const saving = ownSavingList.find((item) => item.id === savingId);
          if (!saving) continue;

          const { balance } = saving;

          const res = await axios({
            method: 'DELETE',
            url: `${process.env.REACT_APP_HOST}/api/account/saving/${id}`,
            headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': '69420',
            },
            data: {
              id: savingId, // 해지하려는 적금 아이디
              balance: balance, // 적금의 예상해지금액
              studentId: selectedStudentId, // 해지하려는 친구 ID
            },
          });

          if (res.data.success) {
            toast('해지가 완료되었습니다.', {
              autoClose: 1300,
            });
            setTimeout(() => {
              window.location.reload();
            }, 1400);
            console.log('success', res.data.success);
            console.log('balance', balance);
          } else {
            console.log(res.data.message);
          }
        }
      } catch (error) {
        toast('적금 해지에 실패했습니다.');
        console.log(error);
      }
    }
  };
  const handleDivClick = (savingId) => {
    handleSelectSaving(savingId);
  };
  return (
    <>
      <ToastContainer />
      <div className="saving-title">적금 해지</div>
      <AvailableListStyle>
        <div className="title">{selectedStudentName}</div>
        <div className="savingInfoTitle">
          <span>적금이름</span>
          <img
            src={`${process.env.PUBLIC_URL}/images/icon-line.png`}
            alt="구분선"
          />
          <span>만기일</span>
          <img
            src={`${process.env.PUBLIC_URL}/images/icon-line.png`}
            alt="구분선"
          />
          <span>예상해지금액</span>
        </div>
        <ListContainer>
          {ownSavingList.map((saving) => {
            const date = new Date(saving.expirationDate);
            const formattedDate = format(date, 'yyyy년 MM월 dd일');
            return (
              <div
                className="savingListBox"
                key={saving.id}
                value={saving.id}
                onClick={() => handleDivClick(saving.id)}
              >
                <input
                  type="checkbox"
                  checked={selectedSavingId.includes(saving.id)}
                  onChange={() => handleSelectSaving(saving.id)}
                  onClick={(e) => e.stopPropagation()}
                />
                <span>{saving.name}</span>
                <span>{formattedDate}</span>
                <span>{saving.balance}</span>
              </div>
            );
          })}
        </ListContainer>
      </AvailableListStyle>
      <AddBtn
        onClick={cancelSavingFunc}
        disabled={selectedSavingId.length === 0}
      >
        해지
      </AddBtn>
    </>
  );
}

export function SavingTeller() {
  return (
    <>
      <SearchStudent />
      <AddSaving />
      <CancelSaving />
    </>
  );
}
