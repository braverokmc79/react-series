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
    <div>LandingPage 랜딩페이지</div>
  )
}

export default LandingPage