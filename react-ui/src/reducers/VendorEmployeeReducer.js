import { 
    GET_ALL_VENDOR_EMPLOYEE_LIST_SUCCESS, VENDOR_EMPLOYEE_ADD_SUCCESS,
    SHOW_VENDOR_EMPLOYEE_LOADER, REMOVE_VENDOR_EMPLOYEE_LOADER,
    VENDOR_EMPLOYEE_TO_EDIT, VENDOR_EMPLOYEE_EDIT_SUCCESS, GET_FINISHING_VENDOR_EMPLOYEE_LIST
} from '../types';

const INITIAL_STATE = {
    vendorEmployeeList: [],
    vendorEmployeeList_finishing: [],
    vendorEmployee: {
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
    show_vendor_employee_loader: false,
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_ALL_VENDOR_EMPLOYEE_LIST_SUCCESS:
            return { ...state, vendorEmployeeList: action.payload, show_vendor_employee_loader: false };

        case SHOW_VENDOR_EMPLOYEE_LOADER:
            return { ...state, show_vendor_employee_loader: true };
    
        case REMOVE_VENDOR_EMPLOYEE_LOADER:
            return { ...state, show_vendor_employee_loader: false };

        case VENDOR_EMPLOYEE_ADD_SUCCESS:
            return { ...state, show_vendor_employee_loader: false };

        case VENDOR_EMPLOYEE_TO_EDIT:
            return { ...state, vendorEmployee: action.payload };

        case VENDOR_EMPLOYEE_EDIT_SUCCESS:
            return { ...state, show_vendor_employee_loader: false };

        case GET_FINISHING_VENDOR_EMPLOYEE_LIST:
            return { ...state, show_vendor_employee_loader: false, vendorEmployeeList_finishing: action.payload };

        default:
            return state;
    }
};

