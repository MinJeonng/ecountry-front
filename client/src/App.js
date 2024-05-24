import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './styles/common.scss';
import './styles/reset.css';

import Intro from './pages/Intro';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NationBuilding from './pages/NationBuilding';
import CountryList from './pages/CountryList';
import Setting from './pages/Setting';
import SetBank from './pages/Bank';
import Loading from './components/Loading';
import ManagerDashBoard from './pages/ManagerDashBoard';
import SetInvestment from './pages/Investment';
import { SetAssembly } from './pages/Assembly';
import { SetBoardPeople } from './pages/BoardPeople';
import { SetNews } from './pages/News';
import PeopleList from './pages/PeopleList';
import { SetSeat } from './pages/Seat';
import Test from './pages/Test';
import NOTFOUND from './pages/NOTFOUND';
import StudentLogin from './pages/StudentLogin';
import StudentMyPage from './pages/StudentMyPage';
import ChatBot from './pages/ChatBot';
import StudentBank from './pages/StudentBank';
import { CommonMain } from './pages/CommonMain';
import Revenu from './pages/Revenu';
import { ChangePassword } from './components/ChangePassword';
import JobList from './pages/JobList';

function App() {
  return (
    <div className="App Contain">
      <BrowserRouter>
        <Routes>
          {/* setting페이지 */}
          <Route path="/" element={<Intro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/country" element={<NationBuilding />} />
          <Route path="/countryList" element={<CountryList />} />

          <Route path="/setDone" element={<Loading />} />

          <Route
            path="/setting/schoolInfo"
            element={<Setting position="학교 정보 입력" />}
          />
          <Route
            path="/setting/countryInfo"
            element={<Setting position="국가 정보 입력" />}
          />
          <Route
            path="/setting/studentInfo"
            element={<Setting position="학생 정보 입력" />}
          />
          <Route
            path="/setting/seatingMap"
            element={<Setting position="자리배치도" />}
          />
          <Route
            path="/setting/jobList"
            element={<Setting position="직업리스트" />}
          />
          <Route
            path="/setting/law"
            element={<Setting position="기본 법 제정" />}
          />
          <Route path="/setting/taxLaw" element={<Setting position="세법" />} />
          <Route
            path="/setting/seatRental"
            element={<Setting position="자리임대료" />}
          />
          <Route path="/setting/fine" element={<Setting position="과태료" />} />

          <Route path="/test" element={<Test />} />

          {/* 밑에는 관리자 대시보드에서 연결되는 링크 */}
          <Route path="/:id/manager" element={<ManagerDashBoard />} />
          <Route
            path="/:id/manager/bank"
            element={<SetBank position="적금 상품" />}
          />
          <Route
            path="/:id/manager/investment"
            element={<SetInvestment position="투자 상품 관리" />}
          />

          {/* <Route path="/:id/manager/boardPeople" element={<SetBoardPeople />} /> */}
          <Route path="/:id/manager/seatMap" element={<SetSeat />} />

          <Route path="/:id/manager/peopleList" element={<PeopleList />} />

          <Route path="/:id/manager/seatMap" element={<SetSeat />} />
          <Route path="/:id/manager/peopleList" element={<PeopleList />} />
          <Route
            path="/:id/manager/assembly"
            element={<SetAssembly position="국회" />}
          />
          <Route path="/:id/manager/jobList" element={<JobList />} />

          {/* 공통 페이지 */}
          <Route path="/:id/main" element={<CommonMain />} />
          <Route
            path="/:id/boardPeople"
            element={<SetBoardPeople position="신문고" />}
          />
          <Route
            path="/:id/boardPeople/write"
            element={<SetBoardPeople position="신문고 글쓰기" />}
          />
          <Route
            path="/:id/boardPeople/read/:contentId"
            element={<SetBoardPeople position="신문고 리스트" />}
          />
          <Route
            path="/:id/news"
            element={<SetNews position="뉴스 리스트" />}
          />
          <Route
            path="/:id/news/write"
            element={<SetNews position="뉴스 글쓰기" />}
          />
          <Route
            path="/:id/news/read/:newsId"
            element={<SetNews position="읽기" />}
          />
          {/* 학생 페이지 */}
          <Route path="/:id/login" element={<StudentLogin />} />
          <Route path="/:id/mypage" element={<StudentMyPage />} />
          <Route path="/:id/changePw" element={<ChangePassword />} />

          <Route
            path="/:id/investment"
            element={<SetInvestment position="투자 상품 확인" />}
          />
          <Route path="/:id/bank" element={<StudentBank position="은행" />} />

          <Route path="/:id/chatbot" element={<ChatBot />} />

          <Route path="/:id/revenue" element={<Revenu position="국세청" />} />
          <Route
            path="/:id/revenue/collect"
            element={<Revenu position="과태료징수" />}
          />

          <Route path="*" element={<NOTFOUND />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
