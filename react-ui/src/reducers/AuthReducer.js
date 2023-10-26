import {
    LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS
} from '../types';

const INITIAL_STATE = {
    token: localStorage.getItem('api_token') ,
    isLoggedIn: localStorage.getItem('api_token') ? true:  false,
    login_error: '',
    userDetail:{}
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
       
        case LOGIN_SUCCESS:
            return { ...state, isLoggedIn: true, token: action.payload };

        case LOGIN_FAIL:
            return { ...state, isLoggedIn: false, token: null, login_error: action.payload };

        case LOGOUT_SUCCESS:
            return { ...state, isLoggedIn: false, token: null, login_error: '' };

        default:
            return state;
    }
};

