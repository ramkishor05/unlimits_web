// action - state management
import { ACCOUNT_INITIALIZE, LOGIN, LOGOUT } from '../store/actions';

import {
    USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL,
    GET_USER_PROFILE_SUCCESS, GET_USER_PROFILE_FAIL,
    USER_UPDATE_SUCCESS,USER_UPDATE_FAIL,
    GET_USER_SUCCESS
} from '../types';


const roleEndPointMap={
    "ADMIN" : ['dashboard','sales', 'purchase', 'items','vendor', 'setups', 'other'],
    "OWNER" : ['dashboard','sales', 'purchase', 'items','vendor', 'setups', 'other'],
    "MANAGER" : ['dashboard','sales', 'purchase', 'items', 'setups', 'other'],
    "SUPERVISOR": ['dashboard','sales', 'purchase', 'items'],
    "CREW" : ['dashboard','items','other']
}

const collapse=(item)=>{
    let paths=[];
    item.children.map((menu) => {
        switch (menu.type) {
            case 'collapse':
                paths.push(...collapse(menu))
            break;
            case 'item':
                paths.push(menu.url);
            break
            default:
                break;
        }
    });
    return paths
}

export const initialState = {
    token: '',
    isLoggedIn: false,
    isInitialized: false,
    userDetail: null,
    containsId : (id, roleName) => {
        let roleEndPointList = roleEndPointMap[roleName];
        return roleEndPointList.indexOf(id) >= 0;
     },
     paths: (roleName, menuItem) => {
        let roleEndPointBuild= [];
        let roleEndPointList = roleEndPointMap[roleName];
        let paths=[];
        menuItem.items.forEach(item => {
            if(roleEndPointList.indexOf(item.id) >= 0){
                item.children.map((menu) => {
                    switch (menu.type) {
                        case 'collapse':
                           paths.push(...collapse(menu))
                        break;
                        case 'item':
                            paths.push(menu.url);
                            roleEndPointBuild.push({title:menu.title, type:menu.t })
                        break
                        default:
                            break;
                    }
                });
            }
        });
       return  paths;
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
        case USER_UPDATE_SUCCESS:
            return {
                    ...state, 
                userDetail : {
                    ...state.userDetail,
                    ...action.payload
                } 
            };
        
        case USER_UPDATE_FAIL:
                    return { ...state };
        case USER_UPDATE_PROFILE_SUCCESS:
                return {
                     ...state, 
                    userDetail : {
                        ...state.userDetail,
                        userProfile: action.payload
                    } 
                };
    
        case USER_UPDATE_PROFILE_FAIL:
                return { ...state };
       
        case GET_USER_PROFILE_SUCCESS:
                    return {
                         ...state, 
                        userDetail : {
                            ...state.userDetail,
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
