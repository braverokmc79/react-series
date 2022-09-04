import { LOGIN_USER, REGISTER_USER, AUTH_USER } from '../_actions/types';

const initialState = { value: 0 }
export default function user_reducers(state = initialState, action) {
    let result = null;
    switch (action.type) {
        case LOGIN_USER:
            result = { ...state, loginSuccess: action.payload }
            break;
        case REGISTER_USER:
            result = { ...state, register: action.payload }
            break;

        case AUTH_USER:
            result = { ...state, userData: action.payload }
            break;

        default:
            result = state;
            break;
    }
    return result;
}


