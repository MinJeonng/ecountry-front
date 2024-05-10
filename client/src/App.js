import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Intro from './pages/Intro';
import Login from './pages/Login';
import Setting from './pages/Setting';
import StudentSetting from './components/StudentSetting';
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
          <Route path="/setting" element={<Setting />} />
          <Route path="/manager" element={<ManagerDashBoard />} />

          {/* <Route path = "/setting" element = {} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
