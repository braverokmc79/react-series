import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import 'antd/dist/antd.min.css';
import Auth from './hoc/auth';


function App() {
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false); //로그인한 유저는 출입불가
  const AuthRegisterPage = Auth(RegisterPage, false);

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

          <Route path="/" element={<AuthLandingPage />} />
          <Route path="/login" element={<AuthLoginPage />} >
                
          </Route>
          <Route path="/register" element={<AuthRegisterPage />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}


export default App;
