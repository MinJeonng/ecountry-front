import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid #a7d2e4;
  border-radius: 10px;
  height: auto;
  margin-bottom: 20px;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  p {
    font-size: 14px;
  }
`;

export default function ScheduleList() {
  const { id } = useParams();
  const [schedule, setSchedule] = useState([]);
  const [isSchedule, setIsSchedule] = useState(true);

  useEffect(() => {
    const getSchedule = async () => {
      try {
        const res = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_HOST}/api/school/timetable/${id}`,
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
          },
        });
        if (res.data.success && res.data.result.length > 0) {
          setSchedule(res.data.result);
          setIsSchedule(true);
        } else {
          setIsSchedule(false);
        }
      } catch (error) {
        console.error(error);
        setIsSchedule(false);
      }
    };

    getSchedule();
  }, [id]);

  const days = ['월', '화', '수', '목', '금'];
  const periods = [1, 2, 3, 4, 5, 6];

  const getSubject = (dayIndex, periodIndex) => {
    const day = schedule[dayIndex];
    if (day && day.subject[periodIndex]) {
      return day.subject[periodIndex];
    }
    return '';
  };

  return isSchedule ? (
    <>
      <table>
        <thead>
          <tr>
            <th></th>
            {days.map((day, index) => (
              <th key={index}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {periods.map((period, periodIndex) => (
            <tr key={periodIndex}>
              <td className="period">{period}</td>
              {days.map((day, dayIndex) => (
                <td key={dayIndex}>{getSubject(dayIndex, periodIndex)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  ) : (
    <Container>
      <p>시간표 정보가 없습니다.</p>
    </Container>
  );
}
