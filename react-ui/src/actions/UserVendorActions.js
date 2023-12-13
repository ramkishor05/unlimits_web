import { 
    GET_ALL_VENDOR_LIST_SUCCESS,GET_VENDOR_SUCCESS, VENDOR_ADD_SUCCESS,
    SHOW_LOADER, REMOVE_LOADER,
    VENDOR_TO_EDIT, VENDOR_EDIT_SUCCESS, GET_FINISHING_VENDOR_LIST
} from '../types';

import UserVendorService from '../services/UserVendorService';

// Action creator for getting all vendors --<
export const getUserVendorList = () => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });
        const vendors = await UserVendorService.getAll();

        if (vendors) {
            dispatch({ type: GET_ALL_VENDOR_LIST_SUCCESS, payload: vendors });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};

// Action creator for getting all vendors --<
export const getUserVendor = (id) => async dispatch => {
      try {
        dispatch({ type: SHOW_LOADER });
        const vendor = await UserVendorService.get(id);

        if (vendor) {
            dispatch({ type: GET_VENDOR_SUCCESS, payload: vendor });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};


export const updateUserVendor = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });

        const vendor = await UserVendorService.update(id, data);

        if (vendor) {
            dispatch({ type: VENDOR_EDIT_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};