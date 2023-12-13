import { 
    GET_ALL_VENDOR_SUPPLIER_LIST_SUCCESS, VENDOR_SUPPLIER_ADD_SUCCESS,
    SHOW_VENDOR_SUPPLIER_LOADER, REMOVE_VENDOR_SUPPLIER_LOADER,
    VENDOR_SUPPLIER_TO_EDIT, VENDOR_SUPPLIER_EDIT_SUCCESS, GET_FINISHING_VENDOR_SUPPLIER_LIST
} from '../../types';

const INITIAL_STATE = {
    vendorSupplierList: [],
    vendorSupplierList_finishing: [],
    vendorSupplier: {
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
    show_vendor_customer_loader: false,
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_ALL_VENDOR_SUPPLIER_LIST_SUCCESS:
            return { ...state, vendorSupplierList: action.payload, show_vendor_customer_loader: false };

        case SHOW_VENDOR_SUPPLIER_LOADER:
            return { ...state, show_vendor_customer_loader: true };
    
        case REMOVE_VENDOR_SUPPLIER_LOADER:
            return { ...state, show_vendor_customer_loader: false };

        case VENDOR_SUPPLIER_ADD_SUCCESS:
            return { ...state, show_vendor_customer_loader: false };

        case VENDOR_SUPPLIER_TO_EDIT:
            return { ...state, vendorSupplier: action.payload };

        case VENDOR_SUPPLIER_EDIT_SUCCESS:
            return { ...state, show_vendor_customer_loader: false };

        case GET_FINISHING_VENDOR_SUPPLIER_LIST:
            return { ...state, show_vendor_customer_loader: false, vendorSupplierList_finishing: action.payload };

        default:
            return state;
    }
};

