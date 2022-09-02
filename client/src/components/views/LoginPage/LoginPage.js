import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { loginUser } from '../../../_actions/user_action';

function LoginPage() {
    const dispatch = useDispatch();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const emailRef = useRef(null);
    let navigate = useNavigate();


    //value={Email} 사용하지 않고 useRef 사용 할 경우
    const onEmailHandler = (event) => {
        setEmail(emailRef.current.value);
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }


    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const body = {
            email: Email,
            password: Password
        }
        /****** 리덕스 사용  *******/
        console.log("1. dispatch 로 body 값 action 에 데이터 전달");
        dispatch(loginUser(body)).then(response => {
            if (response.payload.loginSuccess) {
                //alert(response.payload.loginSuccess);
                navigate("/");
            } else {
                alert('Error');
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
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" onChange={onEmailHandler} ref={emailRef} />

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <br />

                <button>
                    Login
                </button>


            </form>

        </div>
    )
}
export default LoginPage