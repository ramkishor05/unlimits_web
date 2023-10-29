import { 
    GET_ALL_VENDOR_SUPPLIER_LIST_SUCCESS, VENDOR_SUPPLIER_ADD_SUCCESS,
    SHOW_VENDOR_SUPPLIER_LOADER, REMOVE_VENDOR_SUPPLIER_LOADER,
    VENDOR_SUPPLIER_TO_EDIT, VENDOR_SUPPLIER_EDIT_SUCCESS, GET_FINISHING_VENDOR_SUPPLIER_LIST,VENDOR_SUPPLIER_DELETE_SUCCESS
} from '../types';

import VendorSupplierService from '../services/VendorSupplierService';

// Action creator for getting all vendorSuppliers --<
export const getVendorSupplierList = () => async dispatch => {
    dispatch({ type: SHOW_VENDOR_SUPPLIER_LOADER });

    try {
        const vendorSuppliers = await VendorSupplierService.getAll();

        if (vendorSuppliers) {
            dispatch({ type: GET_ALL_VENDOR_SUPPLIER_LIST_SUCCESS, payload: vendorSuppliers });
            dispatch({ type: REMOVE_VENDOR_SUPPLIER_LOADER });
        }
    } catch(error) {
        dispatch({ type: REMOVE_VENDOR_SUPPLIER_LOADER });
        console.log(error);
    }
};

// Action creator for adding vendorSupplier --<
export const addVendorSupplier = (data, clear, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_VENDOR_SUPPLIER_LOADER });

    try {
        const vendorSupplier = await VendorSupplierService.add(data);

        if (vendorSupplier) {
            dispatch({ type: VENDOR_SUPPLIER_ADD_SUCCESS });
            dispatch({ type: REMOVE_VENDOR_SUPPLIER_LOADER });
        }

        getVendorSupplierList();

        clear && clear();

        successNotification && successNotification();
        
    } catch(error) {
        dispatch({ type: REMOVE_VENDOR_SUPPLIER_LOADER });
        
        clear && clear();

        errorNotification && errorNotification();
    }
};

export const renderToVendorSupplierEdit = vendorSupplier => {
    return {
        type: VENDOR_SUPPLIER_TO_EDIT,
        payload: vendorSupplier,
    };
};

export const editVendorSupplier = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_VENDOR_SUPPLIER_LOADER });

    try {
        const vendorSupplier = await VendorSupplierService.update(id, data);

        if (vendorSupplier) {
            dispatch({ type: VENDOR_SUPPLIER_EDIT_SUCCESS });
            dispatch({ type: REMOVE_VENDOR_SUPPLIER_LOADER });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
    } catch(error) {
        dispatch({ type: REMOVE_VENDOR_SUPPLIER_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateVendorSupplier = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_VENDOR_SUPPLIER_LOADER });

    try {
        const vendorSupplier = await VendorSupplierService.update(id, data);

        if (vendorSupplier) {
            dispatch({ type: VENDOR_SUPPLIER_EDIT_SUCCESS });
            dispatch({ type: REMOVE_VENDOR_SUPPLIER_LOADER });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
    } catch(error) {
        dispatch({ type: REMOVE_VENDOR_SUPPLIER_LOADER });
        errorNotification && errorNotification();
    }
};

export const deleteVendorSupplier = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_VENDOR_SUPPLIER_LOADER });

    try {
        const vendorSupplier = await VendorSupplierService.update(id, data);

        if (vendorSupplier) {
            dispatch({ type: VENDOR_SUPPLIER_DELETE_SUCCESS });
            dispatch({ type: REMOVE_VENDOR_SUPPLIER_LOADER });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
    } catch(error) {
        dispatch({ type: REMOVE_VENDOR_SUPPLIER_LOADER });
        errorNotification && errorNotification();
    }
};

export const getFinishingVendorSupplierList = minimum => async dispatch => {
    dispatch({ type: SHOW_VENDOR_SUPPLIER_LOADER });

    try {
        const vendorSupplier = await VendorSupplierService.find(minimum);

        if (vendorSupplier) {
            dispatch({ type: GET_FINISHING_VENDOR_SUPPLIER_LIST, payload: vendorSupplier });
        }
    } catch(error) {
        dispatch({ type: REMOVE_VENDOR_SUPPLIER_LOADER });
    }
}; 
