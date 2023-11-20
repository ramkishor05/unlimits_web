import { 
    GET_ALL_VENDOR_BUSINESS_LIST_SUCCESS, VENDOR_BUSINESS_ADD_SUCCESS,
    SHOW_LOADER, REMOVE_LOADER,
    VENDOR_BUSINESS_TO_EDIT, VENDOR_BUSINESS_EDIT_SUCCESS, GET_FINISHING_VENDOR_BUSINESS_LIST
} from '../types';
import VendorBusinessService from '../services/VendorBusinessService';

import VendorAppService from '../services/VendorAppService';

const ITEM_APP_URL='http://localhost:4444/api/cust/app';

// Action creator for getting all VendorBusinessServices --<
export const getVendorBusinessList = () => async dispatch => {
    
    try {
        dispatch({ type: SHOW_LOADER });
        const vendorBusinesss = await VendorBusinessService.getAll();

        if (vendorBusinesss) {
            dispatch({ type: GET_ALL_VENDOR_BUSINESS_LIST_SUCCESS, payload: vendorBusinesss });
           
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};

// Action creator for adding vendorBusiness --<
export const addVendorBusiness = (data, refreshVendorBusinessList, clear, successNotification, errorNotification) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });
        const vendorBusiness = await VendorBusinessService.add(data);

        if (vendorBusiness) {
            dispatch({ type: VENDOR_BUSINESS_ADD_SUCCESS });
            const data={
                businessId: vendorBusiness.id,
                appId: 1
            }
            await VendorAppService.add(ITEM_APP_URL,data)
        }

        refreshVendorBusinessList && refreshVendorBusinessList();

        clear && clear();

        successNotification && successNotification();
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        
        clear && clear();

        errorNotification && errorNotification();
    }
};

export const renderToVendorBusinessEdit = vendorBusiness => {
    return {
        type: VENDOR_BUSINESS_TO_EDIT,
        payload: vendorBusiness,
    };
};

export const editVendorBusiness = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
  
    try {
        dispatch({ type: SHOW_LOADER });

        const vendorBusiness = await VendorBusinessService.update(id, data);

        if (vendorBusiness) {
            dispatch({ type: VENDOR_BUSINESS_EDIT_SUCCESS });
            const data={
                businessId: vendorBusiness.id,
                appId: 1
            }
            await VendorAppService.add(ITEM_APP_URL,data)
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
            
            dispatch({ type: REMOVE_LOADER });

        }
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const deleteVendorBusiness = (id, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
  
    try {
        dispatch({ type: SHOW_LOADER });

        const vendorBusiness = await VendorBusinessService.delete(id);

        if (vendorBusiness) {
            dispatch({ type: VENDOR_BUSINESS_EDIT_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateVendorBusiness = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });

        const vendorBusiness = await VendorBusinessService.update(id, data);

        if (vendorBusiness) {
            dispatch({ type: VENDOR_BUSINESS_EDIT_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const getFinishingVendorBusinessList = minimum => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });

        const vendorBusiness = await VendorBusinessService.find(minimum);

        if (vendorBusiness) {
            dispatch({ type: GET_FINISHING_VENDOR_BUSINESS_LIST, payload: vendorBusiness });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
    }
}; 
