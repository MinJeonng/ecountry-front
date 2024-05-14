import React from 'react';
import Template from '../components/Template';
import { useSelector } from 'react-redux';

export default function StudentList() {
  const studentList = useSelector((state) => state.setting3.studentList);
  return (
    <>
      <Template
        childrenBottom={
          <>
            {studentList.map((student, index) => (
              <div key={index}>
                <p>{student}</p>
              </div>
            ))}
          </>
        }
      ></Template>
    </>
  );
}
