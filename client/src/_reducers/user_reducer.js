
import { LOGIN_USER } from '../_actions/types';

export default function user_reducers(state, action) {
    console.log("3. reducer  작업 시작  타입 :", action.type);
    let result = {};

    switch (action.type) {
        case LOGIN_USER:
            result = { ...state, loginSuccess: action.payload }
            break;

        default:
            break;
    }
    return result;
}


