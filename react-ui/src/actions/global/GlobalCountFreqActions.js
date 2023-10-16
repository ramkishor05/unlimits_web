import { 
   GET_ALL_GLOBAL_COUNT_FREQ_SUCCESS,
   GET_ALL_GLOBAL_COUNT_FREQ_FAIL,
   SHOW_GLOBAL_COUNT_FREQ_LOADER,
   REMOVE_GLOBAL_COUNT_FREQ_LOADER,
   ADD_GLOBAL_COUNT_FREQ_SUCCESS,
   EDIT_GLOBAL_COUNT_FREQ_SUCCESS,
   RENDER_GLOBAL_COUNT_FREQ_TO_EDIT
} from '../../types';
import GlobalCountFreqService from '../../services/GlobalCountFreqService';

// Action creator for getting all items --<
export const getGlobalCountFreqList = () => async dispatch => {
    dispatch({ type: SHOW_GLOBAL_COUNT_FREQ_LOADER });

    try {
        const globalCountFreqList = await GlobalCountFreqService.getAll();

        if (globalCountFreqList) {
            dispatch({ type: GET_ALL_GLOBAL_COUNT_FREQ_SUCCESS, payload: globalCountFreqList });
            dispatch({ type: REMOVE_GLOBAL_COUNT_FREQ_LOADER });
        }
    } catch(error) {
        dispatch({ type: GET_ALL_GLOBAL_COUNT_FREQ_FAIL });
        dispatch({ type: REMOVE_GLOBAL_COUNT_FREQ_LOADER });
        console.log(error);
    }
};

// Action creator for adding item --<
export const addGlobalCountFreq = (data, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_GLOBAL_COUNT_FREQ_LOADER });

    try {
        const globalCountFreq = await GlobalCountFreqService.add(data);

        if (globalCountFreq) {
            dispatch({ type: ADD_GLOBAL_COUNT_FREQ_SUCCESS });
            dispatch({ type: REMOVE_GLOBAL_COUNT_FREQ_LOADER });
        }

        refreshItemsList && refreshItemsList();

        clear && clear();

        successNotification && successNotification();
        
    } catch(error) {
        dispatch({ type: REMOVE_GLOBAL_COUNT_FREQ_LOADER });
        
        clear && clear();

        errorNotification && errorNotification();
    }
};

export const renderGlobalCountFreqToEdit = item => {
    return {
        type: RENDER_GLOBAL_COUNT_FREQ_TO_EDIT,
        payload: item,
    };
};

export const editGlobalCountFreq = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_GLOBAL_COUNT_FREQ_LOADER });

    try {
        const globalCountFreq = await GlobalCountFreqService.update(id, data);

        if (globalCountFreq) {
            dispatch({ type: EDIT_GLOBAL_COUNT_FREQ_SUCCESS });
            dispatch({ type: REMOVE_GLOBAL_COUNT_FREQ_LOADER });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
    } catch(error) {
        dispatch({ type: REMOVE_GLOBAL_COUNT_FREQ_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateGlobalCountFreq = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_GLOBAL_COUNT_FREQ_LOADER });

    try {
        const globalCountFreq = await GlobalCountFreqService.update(id, data);

        if (globalCountFreq) {
            dispatch({ type: EDIT_GLOBAL_COUNT_FREQ_SUCCESS });
            dispatch({ type: REMOVE_GLOBAL_COUNT_FREQ_LOADER });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
    } catch(error) {
        dispatch({ type: REMOVE_GLOBAL_COUNT_FREQ_LOADER });
        errorNotification && errorNotification();
    }
};

// Action creator for deleting football transaction from the system.
export const deleteGlobalCountFreq = (id, refresh) => async dispatch => {
    try {
        const deleted_global_CountFreq = await GlobalCountFreqService.delete(id);

        if (deleted_global_CountFreq) {
            refresh && refresh();
        }
    } catch (error) {
        console.log(error);
    }
};