import {
    USERNAME_CHANGED, PASSWORD_CHANGED,
    GET_USERS_SUCCESS, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
    OPEN_ADD_USER_MODAL, OPEN_EDIT_USER_MODAL, OPEN_DELETE_USER_MODAL,ALREADY_EXISTS_SUCCESS
} from '../types';

const INITIAL_STATE = {
    users: [],
    username : '',
    password: '',
    userDetail: {},
    exists: false,
    open_add_user_modal: false,
    open_edit_user_modal: false,
    open_delete_user_modal: false,
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ALREADY_EXISTS_SUCCESS:
                return { ...state, 'exists': action.payload };
                
        case USERNAME_CHANGED:
                return { ...state, 'username': action.payload };

        case PASSWORD_CHANGED:
            return { ...state, 'password' : action.payload };

        case GET_USERS_SUCCESS:
            return { ...state, users: action.payload };

        case USER_UPDATE_SUCCESS:
            return { ...state, userDetail: action.payload };

        case USER_UPDATE_FAIL:
            return { ...state };

        case USER_UPDATE_PROFILE_SUCCESS:
                return {
                     ...state, 
                    userDetail : {
                        userProfile: action.payload
                    } 
                };
    
        case USER_UPDATE_PROFILE_FAIL:
                return { ...state };

        case OPEN_ADD_USER_MODAL:
            return { ...state, open_add_user_modal: action.payload };

        case OPEN_EDIT_USER_MODAL:
            return { ...state, open_edit_user_modal: action.payload };

        case OPEN_DELETE_USER_MODAL:
            return { ...state, open_delete_user_modal: action.payload };

        default:
            return state;
    }
};

