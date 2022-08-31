import React, { useEffect } from 'react'
import Axios from 'axios';

function LandingPage() {

  useEffect(() => {
    Axios.get("http://localhost:5000/api/hello")
      .then(res => {
        console.log(res.data);
      });
  }, []);


  return (
    <div>LandingPage 랜딩페이지</div>
  )
}

export default LandingPage