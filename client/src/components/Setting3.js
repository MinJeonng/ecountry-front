import React, { useState } from 'react';
import Background from './Background';


export default function Setting3() {
  const [directInput, setDirectUInput] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // 파일이 선택되었을 때
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // 선택된 파일 가져오기
    setSelectedFile(file); // 상태 업데이트
  };

  // 파일 업로드
  const handleUpload = () => {
    if (selectedFile) {
      // 여기에 파일 업로드를 처리하는 로직
      console.log('업로드된 파일:', selectedFile);
    } else {
      alert('파일을 선택해주세요.');
    }
  };
  return (
    <>
      <div className="title-wrap">
        <div className="title">학생 파일 업로드</div>
        <ul className="title-list">
          <li>아래의 정해진 양식(엑셀)에 따라 학생 파일을 업로드 하세요.</li>
          <li>
            만약 엑셀 업로드가 불가할 경우 '직접 입력' 버튼을 눌러 학생 정보를
            기입할 수 있습니다.
          </li>
        </ul>
      </div>
      {directInput ? (
        <>
          <form className="box-style">
            <button onClick={() => setDirectUInput(!directInput)}>
              파일 업로드
            </button>
            <div>비밀번호</div>
            <input type="password"></input>
            <div className="">
              <div>출석번호</div>
              <input type="number"></input>
              <div>이름</div>
              <input type="text"></input>
            </div>
          </form>
        </>
      ) : (
        <>
          <form className="box-style">
            <div>
              <button onClick={() => setDirectUInput(!directInput)}>
                직접 입력
              </button>
            </div>

            <div>여기에 엑셀 예시가 들어가야함</div>

            <input
              type="file"
              onChange={handleFileChange}
              accept=".xlsx,.xls"
            />
            <button onClick={handleUpload}>업로드</button>
          </form>
        </>
      )}
    </>

  );
}
