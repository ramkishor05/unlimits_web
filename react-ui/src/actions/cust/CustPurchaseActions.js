import { 
    GET_ALL_PURCHASES_SUCCESS,
    GET_PURCHASES_TODAY_SUCCESS, GET_PURCHASES_YESTERDAY_SUCCESS, GET_PURCHASES_LONG_SUCCESS,
    PURCHASE_TO_EDIT
} from '../../types';
import CustPurchaseService from '../../services/CustPurchaseService';

// Action creator for getting all purchases.
export const getCustPurchaseList = () => async dispatch => {
    try {
        let purchases = await CustPurchaseService.getAll();

        if (purchases) {
            dispatch({ type: GET_ALL_PURCHASES_SUCCESS, payload: purchases });
        }
    } catch (error) {
        console.log(error);
    }
};

// Action creator for getting purchases according to date.
export const getCustPurchaseListByDate = (from, to, day) => async dispatch => {
    try {
        let purchases = await CustPurchaseService.getByDate(from, to);

        if (purchases) {
            if (day === 'today') {
                dispatch({ type: GET_PURCHASES_TODAY_SUCCESS, payload: purchases });
            } else if (day === 'yesterday') {
                dispatch({ type: GET_PURCHASES_YESTERDAY_SUCCESS, payload: purchases });
            } else if (day === 'long') {
                dispatch({ type: GET_PURCHASES_LONG_SUCCESS, payload: purchases });
            } else {
                dispatch({ type: GET_ALL_PURCHASES_SUCCESS, payload: purchases });
            }
        }
    } catch(error) {
        console.log(error);
    }
};

// Action creator for adding purchases.
export const addCustPurchase = (data, refreshPurchases, clear, successNotification, errorNotification) => async dispatch => {
    try {
        let purchase = await CustPurchaseService.add(data);

        if (purchase) {
            refreshPurchases && refreshPurchases();

            clear && clear();
            
            successNotification && successNotification();
        }
    } catch (error) {
        errorNotification && errorNotification();
        console.log(error);
    }
};

// Action creator for rendering a specific purchase to edit.
export const renderPurchaseToEdit = payload => {
    return {
        type: PURCHASE_TO_EDIT,
        payload,
    };
};

// Action creator for editing purchases in the system.
export const editCustPurchase = (id, data, refreshPurchases, clear, successNotification, errorNotification) => async dispatch => {
    try {
        const purchase = await CustPurchaseService.update(id, data);

        if (purchase) {
            refreshPurchases && refreshPurchases();

            clear && clear();

            successNotification && successNotification();
        }
    } catch (error) {
        errorNotification && errorNotification();
        console.log(error);
    }
};

// Action creator for editing purchases in the system.
export const deleteCustPurchase = (id, refreshPurchases, clear, successNotification, errorNotification) => async dispatch => {
    try {
        const purchase = await CustPurchaseService.delete(id);

        if (purchase) {
            refreshPurchases && refreshPurchases();

            clear && clear();

            successNotification && successNotification();
        }
    } catch (error) {
        errorNotification && errorNotification();
        console.log(error);
    }
};