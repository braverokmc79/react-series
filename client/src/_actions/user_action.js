import axios from 'axios';
import { LOGIN_USER, REGISTER_USER } from './types';

export function loginUser(dataTomSubmit) {
    console.log("2. actions 액션작업 시작 - axios 전송");
    const request = axios.post('/api/users/login', dataTomSubmit)
        .then((res) => {
            return res.data;
        }).catch((Error) => {
            console.error("에러 :", Error);
        });
    return {
        type: LOGIN_USER,
        payload: request
    }
}


export function registerUser(dataTomSubmit) {
    const request = axios.post('/api/users/register', dataTomSubmit)
        .then(res => res.data);

    return {
        type: REGISTER_USER,
        payload: request
    }
}
