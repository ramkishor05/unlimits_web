import { 
    GET_ALL_VENDOR_LIST_SUCCESS,GET_VENDOR_SUCCESS, VENDOR_ADD_SUCCESS,
    SHOW_VENDOR_LOADER, REMOVE_VENDOR_LOADER,
    VENDOR_TO_EDIT, VENDOR_EDIT_SUCCESS, GET_FINISHING_VENDOR_LIST
} from '../types';

import VendorService from '../services/VendorService';

// Action creator for getting all vendors --<
export const getVendorList = () => async dispatch => {
    dispatch({ type: SHOW_VENDOR_LOADER });

    try {
        const vendors = await VendorService.getAll();

        if (vendors) {
            dispatch({ type: GET_ALL_VENDOR_LIST_SUCCESS, payload: vendors });
            dispatch({ type: REMOVE_VENDOR_LOADER });
        }
    } catch(error) {
        dispatch({ type: REMOVE_VENDOR_LOADER });
        console.log(error);
    }
};

// Action creator for getting all vendors --<
export const getVendor = (id) => async dispatch => {
    dispatch({ type: SHOW_VENDOR_LOADER });

    try {
        const vendor = await VendorService.get(id);

        if (vendor) {
            dispatch({ type: GET_VENDOR_SUCCESS, payload: vendor });
            dispatch({ type: REMOVE_VENDOR_LOADER });
        }
    } catch(error) {
        dispatch({ type: REMOVE_VENDOR_LOADER });
        console.log(error);
    }
};

// Action creator for adding vendor --<
export const addVendor = (data, refreshVendorListList, clear, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_VENDOR_LOADER });

    try {
        const vendor = await VendorService.add(data);

        if (vendor) {
            dispatch({ type: VENDOR_ADD_SUCCESS });
            dispatch({ type: REMOVE_VENDOR_LOADER });
        }

        refreshVendorListList && refreshVendorListList();

        clear && clear();

        successNotification && successNotification();
        
    } catch(error) {
        dispatch({ type: REMOVE_VENDOR_LOADER });
        
        clear && clear();

        errorNotification && errorNotification();
    }
};

export const renderToVendorEdit = vendor => {
    return {
        type: VENDOR_TO_EDIT,
        payload: vendor,
    };
};

export const editVendor = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_VENDOR_LOADER });

    try {
        const vendor = await VendorService.update(id, data);

        if (vendor) {
            dispatch({ type: VENDOR_EDIT_SUCCESS });
            dispatch({ type: REMOVE_VENDOR_LOADER });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
    } catch(error) {
        dispatch({ type: REMOVE_VENDOR_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateVendor = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_VENDOR_LOADER });

    try {
        const vendor = await VendorService.update(id, data);

        if (vendor) {
            dispatch({ type: VENDOR_EDIT_SUCCESS });
            dispatch({ type: REMOVE_VENDOR_LOADER });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
    } catch(error) {
        dispatch({ type: REMOVE_VENDOR_LOADER });
        errorNotification && errorNotification();
    }
};

export const getFinishingVendorList = minimum => async dispatch => {
    dispatch({ type: SHOW_VENDOR_LOADER });

    try {
        const vendor = await VendorService.find(minimum);

        if (vendor) {
            dispatch({ type: GET_FINISHING_VENDOR_LIST, payload: vendor });
        }
    } catch(error) {
        dispatch({ type: REMOVE_VENDOR_LOADER });
    }
}; 
