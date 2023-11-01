// action - state management
import { ACCOUNT_INITIALIZE, LOGIN, LOGOUT } from '../store/actions';

import {
    USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL,
    GET_USER_PROFILE_SUCCESS, GET_USER_PROFILE_FAIL,
    USER_UPDATE_SUCCESS,USER_UPDATE_FAIL,
    GET_USER_SUCCESS
} from '../types';


const roleEndPointMap={
    "OWNER" : ['dashboard','sales', 'purchase', 'items','vendor', 'setups', 'other'],
    "MANAGER" : ['dashboard','sales', 'purchase', 'items', 'setups', 'other'],
    "SUPERVISOR": ['dashboard','sales', 'purchase', 'items'],
    "CREW" : ['items','other']
}

export const initialState = {
    token: '',
    isLoggedIn: false,
    isInitialized: false,
    userDetail: null,
    containsId : (id, roleName) => {
        let roleEndPointList = roleEndPointMap[roleName];
        return roleEndPointList.indexOf(id) >= 0;
     }
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
        case USER_UPDATE_SUCCESS:
            return {
                    ...state, 
                userDetail : {
                    ...action.payload,
                    userProfile: state.userDetail.userProfile
                } 
            };
        
        case USER_UPDATE_FAIL:
                    return { ...state };
        case GET_USER_PROFILE_SUCCESS:
                    return {
                         ...state, 
                        userDetail : {
                            userProfile: action.payload
                        } 
                    };
        
        case GET_USER_PROFILE_FAIL:
                    return { ...state };
        default: {
            return { ...state };
        }
    }
};

export default accountReducer;
