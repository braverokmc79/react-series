import React, { useRef, useState } from 'react'

function LoginPage() {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    //value={Email} 입력하지 않으면 useRef 사용
    const onEmailHandler = (event) => {
        console.log("emailRef : ", emailRef.current.value);
        // console.log("passwordRef : ", passwordRef.current.value);
        //console.log("event ", event.target.value);
        setEmail(emailRef.current.value);
    }

    const onPasswordHandler = (event) => {
        console.log("Password : ", event.currentTarget.value);
        setPassword(event.currentTarget.value);
    }


    const onSubmitHandler = (event) => {

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