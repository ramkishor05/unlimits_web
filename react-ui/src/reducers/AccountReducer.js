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
    "Owner" : ['dashboard','sales', 'purchase', 'items','vendor', 'setups', 'other'],
    "MANAGER" : ['dashboard','sales', 'purchase', 'items', 'setups', 'other'],
    "SUPERVISOR": ['dashboard','sales', 'purchase', 'items'],
    "Crew" : ['dashboard','items','other']
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
    contains : (id, userRole) => {
        if("404"==id || "home"==id){
            return true;
        }
        return userRole.roleEndpoints.find(roleEndpoint=>roleEndpoint.type===id) !=null;
     },
     paths: (userRole) => {
       let paths=["/404","/home"];
       userRole.roleEndpoints.forEach(roleEndpoint=>{
        paths.push(roleEndpoint.url);
       })
       return  paths;
    },
     urls: (menuItem) => {
        let roleEndPointBuild= [];
        menuItem.items.forEach(item => {
            item.children.map((menu) => {
                switch (menu.type) {
                    case 'collapse':
                        //paths.push(...collapse(menu))
                    break;
                    case 'item':
                        roleEndPointBuild.push({title:menu.title, type:item.id, url:menu.url })
                    break
                    default:
                        break;
                }
            });
        })
        let roleEndPointObjects= {
            "id": "GlobalUserEndpoint",
            "order": 1,
            "objects": [

            ]
        };

        roleEndPointBuild.forEach(roleEndPoint=>{
             let roleEndPointObject= {
                "id": "UserEndpoint_"+roleEndPoint.title.replace(" ", "_"),
                "type": "com.brijframwork.authorization.model.EOUserEndpoint",
                "name": "GlobalUserEndpoint",
                "properties": roleEndPoint
            }
            roleEndPointObjects.objects.push(roleEndPointObject)
        })

        return roleEndPointObjects;
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
