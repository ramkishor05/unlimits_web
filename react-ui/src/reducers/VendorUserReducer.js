import { 
    GET_ALL_VENDOR_USER_LIST_SUCCESS, VENDOR_USER_ADD_SUCCESS,
    SHOW_VENDOR_USER_LOADER, REMOVE_VENDOR_USER_LOADER,
    VENDOR_USER_TO_EDIT, VENDOR_USER_EDIT_SUCCESS, GET_FINISHING_VENDOR_USER_LIST
} from '../types';

const INITIAL_STATE = {
    vendorUserList: [],
    vendorUserList_finishing: [],
    vendorUser: {
        id: '',
        title: '',
        name: '',
        phoneNumber: '',
        mobileNumber: '',
        emailAddress: '',
        permamentAddress: '',
        presentAddress: '',
        vendorId: 0
    },
    show_vendor_user_loader: false,
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_ALL_VENDOR_USER_LIST_SUCCESS:
            return { ...state, vendorUserList: action.payload, show_vendor_user_loader: false };

        case SHOW_VENDOR_USER_LOADER:
            return { ...state, show_vendor_user_loader: true };
    
        case REMOVE_VENDOR_USER_LOADER:
            return { ...state, show_vendor_user_loader: false };

        case VENDOR_USER_ADD_SUCCESS:
            return { ...state, show_vendor_user_loader: false };

        case VENDOR_USER_TO_EDIT:
            return { ...state, vendorUser: action.payload };

        case VENDOR_USER_EDIT_SUCCESS:
            return { ...state, show_vendor_user_loader: false };

        case GET_FINISHING_VENDOR_USER_LIST:
            return { ...state, show_vendor_user_loader: false, vendorUserList_finishing: action.payload };

        default:
            return state;
    }
};

