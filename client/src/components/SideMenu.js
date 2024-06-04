import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GetTimeText } from '../hooks/Functions';

const SideMenuBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #f8f5f5;
  z-index: 100;
  overflow: scroll;
  .btnClose {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 24px;
  }
  .sideBox {
    margin: 70px 20px 0 20px;
  }
`;

const DashboardBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  text-align: center;
  gap: 10px;
  margin-bottom: 15px;
  div {
    text-align: center;
    /* background-color: #f5f6fc; */
    border-radius: 10px;
    padding: 20px 0;
    cursor: pointer;
    flex: 1;
    min-width: 130px;
  }
  img {
    width: 60px;
    height: 60px;
    margin-top: 5px;
  }
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 6px 0 0;
    font-weight: 700;
    font-size: 16px;
    width: 100%;
  }

  .blueBox {
    background: #e9f2f3;
    box-shadow: 1px 2px #e5f3f5;
  }
  .skyblueBox {
    background: #e9f2f3;
    box-shadow: 1px 2px #e5f3f5;
  }
  .skillBox {
    border: 1px solid #a7d2e4;
  }
  .spanLine {
    color: #666666;
  }
`;

const AlarmBox = styled.div`
  .alarm {
    background: #ddd;
    padding: 25px 20px;
    border-radius: 10px;
    margin-bottom: 10px;
    .alarmDate {
      font-size: 12px;
      color: #777;
    }
    &.new {
      background: #e1ead0;
    }
  }
`;

export function SideMenuComponent({ func }) {
  //여기에 링크는 자리배치도만  다시해야함
  const { id } = useParams();
  const navigate = useNavigate();
  const studentInfoList = useSelector(
    (state) => state.studentInfo.studentInfoList
  );

  //이미지 모두 변환해야함
  const skillMappings = {
    0: {
      text: (
        <>
          은행원 <br /> (월급지급)
        </>
      ),
      link: `/${id}/skills`,
      img: `${process.env.PUBLIC_URL}/images/icon-teller-color2.png`,
    },
    1: {
      text: (
        <>
          은행원 <br /> (적금관리)
        </>
      ),
      link: `/${id}/skills`,
      img: `${process.env.PUBLIC_URL}/images/icon-teller-color.png`,
    },

    3: {
      text: (
        <>
          국세청 <br /> (세금 징수)
        </>
      ),
      link: `/${id}/skills`,
      img: `${process.env.PUBLIC_URL}/images/icon-irs-color.png`,
    },
    4: {
      text: (
        <>
          신용 관리 <br /> 등급 위원회
        </>
      ),
      link: `/${id}/skills`,
      img: `${process.env.PUBLIC_URL}/images/icon-credit-color.png`,
    },
    5: {
      text: (
        <>
          국회 <br /> (법 제정)
        </>
      ),
      link: `/${id}/skills`,
      img: `${process.env.PUBLIC_URL}/images/icon-law-color.png`,
    },
  };

  const skillBasedLinks = studentInfoList.skills
    ? studentInfoList.skills
        .map((skill) =>
          skillMappings[skill] ? { ...skillMappings[skill], key: skill } : null
        )
        .filter(Boolean)
    : [];

  return (
    <>
      <SideMenuBox>
        <div className="sideBox">
          <img
            src={`${process.env.PUBLIC_URL}/images/icon-close.png`}
            className="btnClose changeStroke"
            onClick={func}
            style={{ cursor: 'pointer' }}
            alt="닫기"
          />
          <DashboardBox>
            <div className="skyblueBox" onClick={() => navigate(`/${id}/bank`)}>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-bank-color.png`}
                alt="은행"
              />
              <p>은행</p>
            </div>
            <div
              className="blueBox"
              onClick={() => navigate(`/${id}/investment`)}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-investment-color.png`}
                alt="투자"
              />

              <p>투자</p>
            </div>
            <div
              className="skyblueBox"
              onClick={() => navigate(`/${id}/assembly`)}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-assembly-color.png`}
                alt="국회"
              />
              <p>국회</p>
            </div>

            <div className="blueBox" onClick={() => navigate(`/${id}/news`)}>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-news-color.png`}
                alt="뉴스"
              />
              <p>뉴스</p>
            </div>
            <div
              className="skyblueBox"
              onClick={() => navigate(`/${id}/boardPeople`)}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-board-color.png`}
                alt="국민 신문고"
              />
              <p>국민 신문고</p>
            </div>
            <div className="skyblueBox" onClick={() => navigate(``)}>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-seats-color.png`}
                alt="자리 배치도"
              />
              <p>자리 배치도</p>
            </div>
            <div className="blueBox" onClick={() => navigate(`/${id}/revenue`)}>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-tax-color.png`}
                alt="국세청"
              />
              <p>국세청</p>
            </div>

            <div
              className="skyblueBox"
              onClick={() => navigate(`/${id}/mypage`)}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/icon-user-color.png`}
                alt="마이페이지"
              />
              <p>마이페이지</p>
            </div>

            <hr width="100%" color="#e2e4e4" height="1px" noshade />
            {studentInfoList.skills &&
              skillBasedLinks.map(({ text, link, img, key }) => (
                <>
                  <div
                    key={key}
                    className="skillBox"
                    onClick={() => {
                      localStorage.setItem('skillId', key);
                      navigate(link);
                    }}
                  >
                    <img src={img} alt="스킬" />
                    <p>{text}</p>
                  </div>
                </>
              ))}
          </DashboardBox>
        </div>
      </SideMenuBox>
    </>
  );
}

export function AlarmComponent({ func }) {
  const [alarmList, setAlarmList] = useState([]);

  const getAlarm = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_HOST}/api/student/notice`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
        },
      });
      if (res.data.success) {
        if (res.data.result) {
          console.log(res.data.result);
          setAlarmList(res.data.result);
        }
      } else {
        toast.error('알림을 조회할 수 없습니다.', { autoClose: 1300 });
      }
    } catch {
      toast.error('알림을 조회할 수 없습니다.', { autoClose: 1300 });
    }
  };

  useEffect(() => {
    if (alarmList.length === 0) {
      getAlarm();
    }
  }, []);

  return (
    <SideMenuBox>
      <div className="sideBox">
        <img
          src={`${process.env.PUBLIC_URL}/images/icon-close.png`}
          className="btnClose changeStroke"
          onClick={func}
          style={{ cursor: 'pointer' }}
          alt="닫기"
        />
        <AlarmBox>
          {alarmList?.map((alarm) => (
            <div
              className={`alarm ${alarm.isChecked ? 'old' : 'new'}`}
              key={alarm.id}
            >
              <div className="alarmContent">{alarm.content}</div>
              <div className="alarmDate">{GetTimeText(alarm.createdAt)}</div>
            </div>
          ))}
        </AlarmBox>
      </div>
    </SideMenuBox>
  );
}
