import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <h1>Welcome to React Router!</h1>

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
