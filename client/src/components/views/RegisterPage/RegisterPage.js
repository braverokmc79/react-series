import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { registerUser } from '../../../_actions/user_action';

function RegisterPage() {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  let navigate = useNavigate();


  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  }


  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert('비밀번호 비밀번호 확인은 같아야 합니다.');
    }

    const body = {
      email: Email,
      password: Password,
      name: Name
    }

    dispatch(registerUser(body)).then(response => {
      console.log("response :", response);
      if (response.payload.success) {
        navigate("/login");
      } else {
        alert('Error');
      }
    });

  }



  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />


        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />


        <label>ConfirmPassword</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />



        <br />

        <button>회원가입</button>

      </form>


    </div>
  )
}

export default RegisterPage

