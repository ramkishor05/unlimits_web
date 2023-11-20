import { 
    GET_ALL_VENDOR_LIST_SUCCESS,GET_VENDOR_SUCCESS, VENDOR_ADD_SUCCESS,
    SHOW_LOADER, REMOVE_LOADER,
    VENDOR_TO_EDIT, VENDOR_EDIT_SUCCESS, GET_FINISHING_VENDOR_LIST
} from '../types';

import VendorService from '../services/VendorService';

// Action creator for getting all vendors --<
export const getVendorList = () => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });
        const vendors = await VendorService.getAll();

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
export const getVendor = (id) => async dispatch => {
      try {
        dispatch({ type: SHOW_LOADER });
        const vendor = await VendorService.get(id);

        if (vendor) {
            dispatch({ type: GET_VENDOR_SUCCESS, payload: vendor });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};

// Action creator for adding vendor --<
export const addVendor = (data, refreshVendorListList, clear, successNotification, errorNotification) => async dispatch => {
       try {

        dispatch({ type: SHOW_LOADER });

        const vendor = await VendorService.add(data);

        if (vendor) {
            dispatch({ type: VENDOR_ADD_SUCCESS });
        }

        refreshVendorListList && refreshVendorListList();

        clear && clear();

        successNotification && successNotification();
        
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        
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
    
    try {
        dispatch({ type: SHOW_LOADER });

        const vendor = await VendorService.update(id, data);

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

export const updateVendor = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });

        const vendor = await VendorService.update(id, data);

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

export const getFinishingVendorList = minimum => async dispatch => {
    
    try {
        dispatch({ type: SHOW_LOADER });

        const vendor = await VendorService.find(minimum);

        if (vendor) {
            dispatch({ type: GET_FINISHING_VENDOR_LIST, payload: vendor });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
    }
}; 
