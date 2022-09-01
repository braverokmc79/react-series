import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">login</Link></li>
            <li><Link to="/register">register</Link></li>
          </ul>
        </div>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}


export default App;
