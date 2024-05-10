import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Intro from './pages/Intro';
import Login from './pages/Login';
import Setting1 from './components/Setting1';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/intro" element={<Intro />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/setting1" element={<Setting1 />} />

          {/* <Route path = "/setting" element = {} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
