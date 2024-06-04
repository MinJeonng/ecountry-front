import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { ConfirmBtn } from './Btns';

//신용등급 관리 위원회  (학생이 신용등급 수정)
export default function RatingManage() {
  const { id } = useParams();
  const [studentId, setStudentId] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [studentList, setStudentList] = useState([]);
  const [updateRating, setUpdateRating] = useState('');
  const [prevRating, setPrevRating] = useState();

  const getStudentList = async () => {
    const res = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_HOST}/api/student/${id}`,
      headers: {
        'Content-Type': `application/json`,
        'ngrok-skip-browser-warning': '69420',
      },
    });
    setStudentList(res.data.result);
    console.log(res.data.result);
  };
  const getUpdateRating = async () => {
    if (
      !window.confirm(
        `${selectedStudent.rollNumber}번 ${selectedStudent.name}의 신용등급을 ${updateRating}등급으로 변경하시겠습니까?`
      )
    ) {
      return;
    }
    try {
      const res = await axios({
        method: 'PATCH',
        url: `${process.env.REACT_APP_HOST}/api/student/rating`,
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
        },
        data: {
          id: studentId,
          rating: updateRating,
        },
      });
      if (res.data.success) {
        console.log('success');
        toast.success('신용등급 변경이 완료되었습니다.', { autoClose: 1300 });
        if (prevRating != updateRating) {
          const res2 = await axios({
            method: 'POST',
            url: `${process.env.REACT_APP_HOST}/api/student/notice/add/${id}`,
            headers: {
              'Content-Type': `application/json`,
              'ngrok-skip-browser-warning': '69420',
            },
            data: {
              studentId: [studentId],
              content: `신용등급이 ${prevRating}등급에서 ${updateRating}등급으로 변경되었습니다.`,
            },
          });
        }
        setStudentId('');
        setSelectedStudent('');
        setUpdateRating('');
      } else {
        toast.error('신용등급 변경에 실패하였습니다.');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleStudentId = (e) => {
    setStudentId(e.target.value);
    const student = studentList.find((student) => student.id == e.target.value);
    if (student) {
      setSelectedStudent({
        rollNumber: student.rollNumber,
        name: student.name,
      });
      setUpdateRating(student.rating);
      setPrevRating(student.rating);
    } else {
      setSelectedStudent(null);
    }
  };
  useEffect(() => {
    getStudentList();
  }, []);

  return (
    <>
      <ToastContainer />
      <ul className="title-list">
        <li>국민들의 신용 등급을 수정할 수 있습니다.</li>
      </ul>
      <form className="box-style">
        <div className="set-title">변경 대상자</div>
        <select
          id="name"
          className="set-input"
          value={studentId}
          onChange={handleStudentId}
        >
          <option value="" disabled>
            대상자 선택
          </option>
          {studentList.map((student) => (
            <option key={student.id} value={student.id}>
              {student.rollNumber}번 {student.name}
            </option>
          ))}
        </select>
        <div className="set-title">신용등급</div>
        <input
          className="set-input"
          type="number"
          value={updateRating}
          onChange={(e) => setUpdateRating(e.target.value)}
        ></input>
      </form>
      <ConfirmBtn
        btnName="수정"
        backgroundColor="#61759f"
        onClick={getUpdateRating}
      ></ConfirmBtn>
    </>
  );
}
