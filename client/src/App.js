import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Intro from './pages/Intro';
import Login from './pages/Login';
import Setting from './pages/Setting';
import Signup from './pages/Signup';
// import StudentSetting from './components/StudentSetting';
import ManagerDashBoard from './pages/ManagerDashBoard';
import './styles/common.scss';
import './styles/reset.css';

function App() {
  return (
    <div className="App Contain">
      <BrowserRouter>
        <Routes>
          {/* intro는 나중에 router 삭제할 예정 */}
          <Route path="/intro" element={<Intro />} />
          <Route path="/user/login" element={<Login />} />
            <Route path="/user/signup" element={<Signup />} />
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
          <Route
            path="/setting/taxLaw"
            element={<Setting position={'세법'} />}
          />
          <Route
            path="/setting/seatRental"
            element={<Setting position={'자리임대료'} />}
          />
          <Route
            path="/setting/fine"
            element={<Setting position={'과태료'} />}
          />

          <Route path="/manager" element={<ManagerDashBoard />} />

          {/* <Route path = "/setting" element = {} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
