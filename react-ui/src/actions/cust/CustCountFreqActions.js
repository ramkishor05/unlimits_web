import { 
   GET_ALL_CUST_COUNT_FREQ_SUCCESS,
   GET_ALL_CUST_COUNT_FREQ_FAIL,
   SHOW_CUST_COUNT_FREQ_LOADER,
   REMOVE_CUST_COUNT_FREQ_LOADER,
   ADD_CUST_COUNT_FREQ_SUCCESS,
   EDIT_CUST_COUNT_FREQ_SUCCESS,
   RENDER_CUST_COUNT_FREQ_TO_EDIT
} from '../../types';
import CustCountFreqService from '../../services/CustCountFreqService';

// Action creator for getting all items --<
export const getCustCountFreqList = () => async dispatch => {
    dispatch({ type: SHOW_CUST_COUNT_FREQ_LOADER });

    try {
        const custCountFreqList = await CustCountFreqService.getAll();

        if (custCountFreqList) {
            dispatch({ type: GET_ALL_CUST_COUNT_FREQ_SUCCESS, payload: custCountFreqList });
            dispatch({ type: REMOVE_CUST_COUNT_FREQ_LOADER });
        }
    } catch(error) {
        dispatch({ type: GET_ALL_CUST_COUNT_FREQ_FAIL });
        dispatch({ type: REMOVE_CUST_COUNT_FREQ_LOADER });
        console.log(error);
    }
};

// Action creator for adding item --<
export const addCustCountFreq = (data, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_CUST_COUNT_FREQ_LOADER });

    try {
        const custCountFreq = await CustCountFreqService.add(data);

        if (custCountFreq) {
            dispatch({ type: ADD_CUST_COUNT_FREQ_SUCCESS });
            dispatch({ type: REMOVE_CUST_COUNT_FREQ_LOADER });
        }

        refreshItemsList && refreshItemsList();

        clear && clear();

        successNotification && successNotification();
        
    } catch(error) {
        dispatch({ type: REMOVE_CUST_COUNT_FREQ_LOADER });
        
        clear && clear();

        errorNotification && errorNotification();
    }
};

export const renderCustCountFreqToEdit = item => {
    return {
        type: RENDER_CUST_COUNT_FREQ_TO_EDIT,
        payload: item,
    };
};

export const editCustCountFreq = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_CUST_COUNT_FREQ_LOADER });

    try {
        const custCountFreq = await CustCountFreqService.update(id, data);

        if (custCountFreq) {
            dispatch({ type: EDIT_CUST_COUNT_FREQ_SUCCESS });
            dispatch({ type: REMOVE_CUST_COUNT_FREQ_LOADER });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
    } catch(error) {
        dispatch({ type: REMOVE_CUST_COUNT_FREQ_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateCustCountFreq = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_CUST_COUNT_FREQ_LOADER });

    try {
        const custCountFreq = await CustCountFreqService.update(id, data);

        if (custCountFreq) {
            dispatch({ type: EDIT_CUST_COUNT_FREQ_SUCCESS });
            dispatch({ type: REMOVE_CUST_COUNT_FREQ_LOADER });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
    } catch(error) {
        dispatch({ type: REMOVE_CUST_COUNT_FREQ_LOADER });
        errorNotification && errorNotification();
    }
};

// Action creator for deleting football transaction from the system.
export const deleteCustCountFreq = (id, refresh) => async dispatch => {
    try {
        const deleted_cust_CountFreq = await CustCountFreqService.delete(id);

        if (deleted_cust_CountFreq) {
            refresh && refresh();
        }
    } catch (error) {
        console.log(error);
    }
};