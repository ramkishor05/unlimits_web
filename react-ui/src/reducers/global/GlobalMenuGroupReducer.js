import {
    GET_MENU_GROUP_LIST_SUCCESS,
    GET_USER_MENU_GROUP_LIST_SUCCESS
} from '../../types';

const INITIAL_STATE = {
    menuGroups: [],
    userMenuGroups: []
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_MENU_GROUP_LIST_SUCCESS:
            return { ...state, menuGroups: action.payload };
        case GET_USER_MENU_GROUP_LIST_SUCCESS:
            console.log("GET_USER_MENU_GROUP_LIST_SUCCESS=",action.payload)
                return { ...state, userMenuGroups: action.payload };
        default:
            return state;
    }
};

