import { 
    GET_ALL_VENDOR_USER_LIST_SUCCESS, VENDOR_USER_ADD_SUCCESS,
    SHOW_LOADER, REMOVE_LOADER,
    VENDOR_USER_TO_EDIT, VENDOR_USER_EDIT_SUCCESS, GET_FINISHING_VENDOR_USER_LIST,VENDOR_USER_DELETE_SUCCESS
} from '../types';

import VendorUserService from '../services/VendorUserService';

// Action creator for getting all vendorUsers --<
export const getVendorUserList = () => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const vendorUsers = await VendorUserService.getAll();

        if (vendorUsers) {
            dispatch({ type: GET_ALL_VENDOR_USER_LIST_SUCCESS, payload: vendorUsers });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};

// Action creator for adding vendorUser --<
export const addVendorUser = (data, clear, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const vendorUser = await VendorUserService.add(data);

        if (vendorUser) {
            dispatch({ type: VENDOR_USER_ADD_SUCCESS });
        }

        getVendorUserList();

        clear && clear();

        successNotification && successNotification();
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        
        clear && clear();

        errorNotification && errorNotification();
    }
};

export const renderToVendorUserEdit = vendorUser => {
    return {
        type: VENDOR_USER_TO_EDIT,
        payload: vendorUser,
    };
};

export const editVendorUser = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const vendorUser = await VendorUserService.update(id, data);

        if (vendorUser) {
            dispatch({ type: VENDOR_USER_EDIT_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateVendorUser = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const vendorUser = await VendorUserService.update(id, data);

        if (vendorUser) {
            dispatch({ type: VENDOR_USER_EDIT_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const deleteVendorUser = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const vendorUser = await VendorUserService.update(id, data);

        if (vendorUser) {
            dispatch({ type: VENDOR_USER_DELETE_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const getFinishingVendorUserList = minimum => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const vendorUser = await VendorUserService.find(minimum);

        if (vendorUser) {
            dispatch({ type: GET_FINISHING_VENDOR_USER_LIST, payload: vendorUser });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
    }
}; 
