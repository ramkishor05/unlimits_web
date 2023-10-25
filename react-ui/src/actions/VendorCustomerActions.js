import { 
    GET_ALL_VENDOR_CUSTOMER_LIST_SUCCESS, VENDOR_CUSTOMER_ADD_SUCCESS,
    SHOW_VENDOR_CUSTOMER_LOADER, REMOVE_VENDOR_CUSTOMER_LOADER,
    VENDOR_CUSTOMER_TO_EDIT, VENDOR_CUSTOMER_EDIT_SUCCESS, GET_FINISHING_VENDOR_CUSTOMER_LIST,VENDOR_CUSTOMER_DELETE_SUCCESS
} from '../types';

import VendorCustomerService from '../services/VendorCustomerService';

// Action creator for getting all vendorCustomers --<
export const getVendorCustomerList = () => async dispatch => {
    dispatch({ type: SHOW_VENDOR_CUSTOMER_LOADER });

    try {
        const vendorCustomers = await VendorCustomerService.getAll();

        if (vendorCustomers) {
            dispatch({ type: GET_ALL_VENDOR_CUSTOMER_LIST_SUCCESS, payload: vendorCustomers });
            dispatch({ type: REMOVE_VENDOR_CUSTOMER_LOADER });
        }
    } catch(error) {
        dispatch({ type: REMOVE_VENDOR_CUSTOMER_LOADER });
        console.log(error);
    }
};

// Action creator for adding vendorCustomer --<
export const addVendorCustomer = (data, refreshVendorCustomerList, clear, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_VENDOR_CUSTOMER_LOADER });

    try {
        const vendorCustomer = await VendorCustomerService.add(data);

        if (vendorCustomer) {
            dispatch({ type: VENDOR_CUSTOMER_ADD_SUCCESS });
            dispatch({ type: REMOVE_VENDOR_CUSTOMER_LOADER });
        }

        getVendorCustomerList();

        clear && clear();

        successNotification && successNotification();
        
    } catch(error) {
        dispatch({ type: REMOVE_VENDOR_CUSTOMER_LOADER });
        
        clear && clear();

        errorNotification && errorNotification();
    }
};

export const renderToVendorCustomerEdit = vendorCustomer => {
    return {
        type: VENDOR_CUSTOMER_TO_EDIT,
        payload: vendorCustomer,
    };
};

export const editVendorCustomer = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_VENDOR_CUSTOMER_LOADER });

    try {
        const vendorCustomer = await VendorCustomerService.update(id, data);

        if (vendorCustomer) {
            dispatch({ type: VENDOR_CUSTOMER_EDIT_SUCCESS });
            dispatch({ type: REMOVE_VENDOR_CUSTOMER_LOADER });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
    } catch(error) {
        dispatch({ type: REMOVE_VENDOR_CUSTOMER_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateVendorCustomer = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_VENDOR_CUSTOMER_LOADER });

    try {
        const vendorCustomer = await VendorCustomerService.update(id, data);

        if (vendorCustomer) {
            dispatch({ type: VENDOR_CUSTOMER_EDIT_SUCCESS });
            dispatch({ type: REMOVE_VENDOR_CUSTOMER_LOADER });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
    } catch(error) {
        dispatch({ type: REMOVE_VENDOR_CUSTOMER_LOADER });
        errorNotification && errorNotification();
    }
};

export const deleteVendorCustomer = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_VENDOR_CUSTOMER_LOADER });

    try {
        const vendorCustomer = await VendorCustomerService.update(id, data);

        if (vendorCustomer) {
            dispatch({ type: VENDOR_CUSTOMER_DELETE_SUCCESS });
            dispatch({ type: REMOVE_VENDOR_CUSTOMER_LOADER });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
    } catch(error) {
        dispatch({ type: REMOVE_VENDOR_CUSTOMER_LOADER });
        errorNotification && errorNotification();
    }
};

export const getFinishingVendorCustomerList = minimum => async dispatch => {
    dispatch({ type: SHOW_VENDOR_CUSTOMER_LOADER });

    try {
        const vendorCustomer = await VendorCustomerService.find(minimum);

        if (vendorCustomer) {
            dispatch({ type: GET_FINISHING_VENDOR_CUSTOMER_LIST, payload: vendorCustomer });
        }
    } catch(error) {
        dispatch({ type: REMOVE_VENDOR_CUSTOMER_LOADER });
    }
}; 
