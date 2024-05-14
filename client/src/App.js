import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Intro from './pages/Intro';
import Login from './pages/Login';
import NationBuilding from './pages/NationBuilding';
import CountryList from './pages/CountryList';
import Setting from './pages/Setting';
import Loading from './components/Loading';
import Signup from './pages/Signup';
import ManagerDashBoard from './pages/ManagerDashBoard';
import Test from './pages/Test';
import NOTFOUND from './pages/NOTFOUND';
import StudentList from './pages/StudentList';

import './styles/common.scss';
import './styles/reset.css';
import { SetBank } from './pages/Bank';
import { SetInvestment } from './pages/Investment';
import { SetAssembly } from './pages/Assembly';
import { SetBoardPeople } from './pages/BoardPeople';
import { SetNews } from './pages/News';
import { SetPeopleList } from './pages/PeopleList';
import { SetSeat } from './pages/Seat';
import { SetTaxService } from './pages/TaxService';

function App() {
  return (
    <div className="App Contain">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/signup" element={<Signup />} />

          <Route path="/user/country" element={<NationBuilding />} />
          <Route path="/user/countryList" element={<CountryList />} />

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
          <Route path="/test" element={<Test />} />

          <Route path="/studentList" element={<StudentList />} />
            
          {/* 밑에는 관리자 대시보드에서 연결되는 링크 */}
          <Route path="/bank" element={<SetBank />} />
          <Route path="/investment" element={<SetInvestment />} />
          <Route path="/assembly" element={<SetAssembly />} />
          <Route path="/boardPeople" element={<SetBoardPeople />} />
          <Route path="/news" element={<SetNews />} />
          <Route path="/peopleList" element={<SetPeopleList />} />
          <Route path="/seat" element={<SetSeat />} />
          <Route path="/taxService" element={<SetTaxService />} />


          <Route path="*" element={<NOTFOUND />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
