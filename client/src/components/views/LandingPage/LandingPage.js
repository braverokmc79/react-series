import React, { useEffect } from 'react'
import Axios from 'axios';

function LandingPage() {

  useEffect(() => {
    Axios.get("api/hello")
      .then(res => {
        console.log(res.data);
      });
  }, []);


  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100vh'
    }
    }>
      시작 페이지
    </div>
  )
}

export default LandingPage