import { 
    GET_ALL_VENDOR_CUSTOMER_LIST_SUCCESS, VENDOR_CUSTOMER_ADD_SUCCESS,
    SHOW_LOADER, REMOVE_LOADER,
    VENDOR_CUSTOMER_TO_EDIT, VENDOR_CUSTOMER_EDIT_SUCCESS, GET_FINISHING_VENDOR_CUSTOMER_LIST,VENDOR_CUSTOMER_DELETE_SUCCESS
} from '../types';

import VendorCustomerService from '../services/VendorCustomerService';

// Action creator for getting all vendorCustomers --<
export const getVendorCustomerList = () => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });

        const vendorCustomers = await VendorCustomerService.getAll();

        if (vendorCustomers) {
            dispatch({ type: GET_ALL_VENDOR_CUSTOMER_LIST_SUCCESS, payload: vendorCustomers });
        }
        
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};

// Action creator for adding vendorCustomer --<
export const addVendorCustomer = (data, refreshVendorCustomerList, clear, successNotification, errorNotification) => async dispatch => {
    
    try {
        dispatch({ type: SHOW_LOADER });

        const vendorCustomer = await VendorCustomerService.add(data);

        if (vendorCustomer) {
            dispatch({ type: VENDOR_CUSTOMER_ADD_SUCCESS });
        }

        getVendorCustomerList();

        clear && clear();

        successNotification && successNotification();
        
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        
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
   
    try {
        dispatch({ type: SHOW_LOADER });

        const vendorCustomer = await VendorCustomerService.update(id, data);

        if (vendorCustomer) {
            dispatch({ type: VENDOR_CUSTOMER_EDIT_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateVendorCustomer = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });

        const vendorCustomer = await VendorCustomerService.update(id, data);

        if (vendorCustomer) {
            dispatch({ type: VENDOR_CUSTOMER_EDIT_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const deleteVendorCustomer = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });

        const vendorCustomer = await VendorCustomerService.update(id, data);

        if (vendorCustomer) {
            dispatch({ type: VENDOR_CUSTOMER_DELETE_SUCCESS });
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        
        dispatch({ type: REMOVE_LOADER });
            
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const getFinishingVendorCustomerList = minimum => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });

        const vendorCustomer = await VendorCustomerService.find(minimum);

        if (vendorCustomer) {
            dispatch({ type: GET_FINISHING_VENDOR_CUSTOMER_LIST, payload: vendorCustomer });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
    }
}; 
