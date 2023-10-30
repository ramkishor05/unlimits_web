// action - state management
import { ACCOUNT_INITIALIZE, LOGIN, LOGOUT } from '../store/actions';

import {
    USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL
} from '../types';

import { GET_USER_SUCCESS } from '../types';


export const initialState = {
    token: '',
    isLoggedIn: false,
    isInitialized: false,
    userDetail: null
};

//-----------------------|| ACCOUNT REDUCER ||-----------------------//

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACCOUNT_INITIALIZE: {
            const { isLoggedIn, userDetail, token } = action.payload;
            return {
                ...state,
                isLoggedIn,
                isInitialized: true,
                token,
                userDetail
            };
        }
        case GET_USER_SUCCESS:
            return { ...state, userDetail: action.payload };
        case LOGIN: {
            const { userDetail } = action.payload;
            return {
                ...state,
                isLoggedIn: true,
                userDetail
            };
        }
        case LOGOUT: {
            return {
                ...state,
                isLoggedIn: false,
                token: '',
                userDetail: null
            };
        }
        case USER_UPDATE_PROFILE_SUCCESS:
                return {
                     ...state, 
                    userDetail : {
                        userProfile: action.payload
                    } 
                };
    
        case USER_UPDATE_PROFILE_FAIL:
                return { ...state };
        default: {
            return { ...state };
        }
    }
};

export default accountReducer;
