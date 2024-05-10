import React from 'react';
import Background from './Background';

export default function Setting3() {
  const titleContent = (
    <div className="title-wrap">
      <div className="title">학생 파일 업로드</div>
      <ul>
        <li>아래의 정해진 양식(엑셀)에 따라 학생 파일을 업로드 하세요.</li>
        <li>
          만약 엑셀 업로드가 불가할 경우 직접 입력 버튼을 눌러 학생 정보를
          기입할 수 있습니다.
        </li>
      </ul>
    </div>
  );
  return (
    <div>
      <Background main={titleContent} />
    </div>
  );
}
