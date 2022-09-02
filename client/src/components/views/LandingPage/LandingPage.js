import React, { useEffect } from 'react'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("api/hello")
      .then(res => {
        console.log(res.data);
      });
  }, []);


  const onClikHandler = () => {
    Axios.get("/api/users/logout")
      .then(res => {
        if (res.data.success) {
          navigate("/login");
        } else {
          alert("로그아웃 하는데 실패 했습니다.");
        }

      })
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100vh'
    }
    }>
      <h2>시작 페이지</h2>

      
      <button onClick={onClikHandler}>
        로그아웃
      </button>
    </div>
  )
}

export default LandingPage