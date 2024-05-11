import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Intro from './pages/Intro';
import Login from './pages/Login';
import Setting from './pages/Setting';
// import StudentSetting from './components/StudentSetting';
import ManagerDashBoard from './pages/ManagerDashBoard';
import './styles/common.scss';
import './styles/reset.css';

function App() {
  return (
    <div className="App Contain">
      <BrowserRouter>
        <Routes>
          <Route path="/intro" element={<Intro />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/setting" element={<Setting position="설정1" />} />
          <Route path="/setting/2" element={<Setting position="설정2" />} />
          <Route path="/setting/3" element={<Setting position="설정3" />} />

          <Route path="/setting/4" element={<Setting position="설정4" />} />
          <Route path="/setting/5" element={<Setting position="설정5" />} />
          <Route path="/setting/6" element={<Setting position="설정6" />} />

          <Route path="/manager" element={<ManagerDashBoard />} />

          {/* <Route path = "/setting" element = {} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
