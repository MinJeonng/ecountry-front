//국민리스트
import React from 'react';
import Template from '../components/Template';
import { useSelector } from 'react-redux';

export function SetPeopleList() {
  // const studentList = useSelector((state) => state.setting3.studentList);
  // const
  return (
    <>
      <Template
        childrenBottom={
          <>
            {/* {studentList.map((student, index) => (
              <>
                <div key={index}>출석번호{student.attendanceNumber}</div>
                <div key={index}>학생이름{student.name}</div>
              </>
            ))} */}
          </>
        }
      ></Template>
    </>
  );
}
