import { 
    GET_ALL_VENDOR_EMPLOYEE_LIST_SUCCESS, VENDOR_EMPLOYEE_ADD_SUCCESS,
    SHOW_LOADER, REMOVE_LOADER,
    VENDOR_EMPLOYEE_TO_EDIT, VENDOR_EMPLOYEE_EDIT_SUCCESS, GET_FINISHING_VENDOR_EMPLOYEE_LIST,VENDOR_EMPLOYEE_DELETE_SUCCESS
} from '../types';

import VendorEmployeeService from '../services/VendorEmployeeService';

// Action creator for getting all vendorEmployees --<
export const getVendorEmployeeList = () => async dispatch => {
    
    try {
        dispatch({ type: SHOW_LOADER });

        const vendorEmployees = await VendorEmployeeService.getAll();

        if (vendorEmployees) {
            dispatch({ type: GET_ALL_VENDOR_EMPLOYEE_LIST_SUCCESS, payload: vendorEmployees });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};

// Action creator for adding vendorEmployee --<
export const addVendorEmployee = (data, clear, successNotification, errorNotification) => async dispatch => {
    
    try {
        dispatch({ type: SHOW_LOADER });

        const vendorEmployee = await VendorEmployeeService.add(data);

        if (vendorEmployee) {
            dispatch({ type: VENDOR_EMPLOYEE_ADD_SUCCESS });
        }
        getVendorEmployeeList();

        clear && clear();

        successNotification && successNotification();
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        
        clear && clear();

        errorNotification && errorNotification();
    }
};

export const renderToVendorEmployeeEdit = vendorEmployee => {
    return {
        type: VENDOR_EMPLOYEE_TO_EDIT,
        payload: vendorEmployee,
    };
};

export const editVendorEmployee = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    
    try {
        dispatch({ type: SHOW_LOADER });

        const vendorEmployee = await VendorEmployeeService.update(id, data);

        if (vendorEmployee) {
            dispatch({ type: VENDOR_EMPLOYEE_EDIT_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateVendorEmployee = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });

        const vendorEmployee = await VendorEmployeeService.update(id, data);

        if (vendorEmployee) {
            dispatch({ type: VENDOR_EMPLOYEE_EDIT_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const deleteVendorEmployee = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const vendorEmployee = await VendorEmployeeService.update(id, data);

        if (vendorEmployee) {
            dispatch({ type: VENDOR_EMPLOYEE_DELETE_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const getFinishingVendorEmployeeList = minimum => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const vendorEmployee = await VendorEmployeeService.find(minimum);

        if (vendorEmployee) {
            dispatch({ type: GET_FINISHING_VENDOR_EMPLOYEE_LIST, payload: vendorEmployee });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
    }
}; 
