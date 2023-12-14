import { 
    GET_ALL_VENDOR_LIST_SUCCESS,GET_VENDOR_SUCCESS, VENDOR_ADD_SUCCESS,
    SHOW_VENDOR_LOADER, REMOVE_VENDOR_LOADER,
    VENDOR_TO_EDIT, VENDOR_EDIT_SUCCESS, GET_FINISHING_VENDOR_LIST
} from '../types';

const INITIAL_STATE = {
    userVendorList: [],
    userVendorList_finishing: [],
    userVendor: {
        id: '',
        title: '',
        name: '',
        phoneNumber: '',
        mobileNumber: '',
        emailAddress: '',
        permamentAddress: '',
        presentAddress: ''
    },
    show_userVendor_loader: false,
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_ALL_VENDOR_LIST_SUCCESS:
            return { ...state, userVendorList: action.payload, show_userVendor_loader: false };

        case GET_VENDOR_SUCCESS:
            return { ...state, userVendor: action.payload, show_userVendor_loader: false };

        case SHOW_VENDOR_LOADER:
            return { ...state, show_userVendor_loader: true };
    
        case REMOVE_VENDOR_LOADER:
            return { ...state, show_userVendor_loader: false };

        case VENDOR_ADD_SUCCESS:
            return { ...state, show_userVendor_loader: false };

        case VENDOR_TO_EDIT:
            return { ...state, userVendor: action.payload };

        case VENDOR_EDIT_SUCCESS:
            return { ...state, show_userVendor_loader: false };

        case GET_FINISHING_VENDOR_LIST:
            return { ...state, show_userVendor_loader: false, userVendorList_finishing: action.payload };

        default:
            return state;
    }
};

