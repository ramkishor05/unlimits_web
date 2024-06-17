import { 
   GET_ALL_GLOBAL_JOURNAL_PAGE_SUCCESS,
   GET_ALL_GLOBAL_JOURNAL_PAGE_FAIL,
   GET_ALL_GLOBAL_JOURNAL_SUCCESS,
   GET_ALL_GLOBAL_JOURNAL_FAIL,
   SHOW_LOADER,
   REMOVE_LOADER,
   ADD_GLOBAL_JOURNAL_SUCCESS,
   EDIT_GLOBAL_JOURNAL_SUCCESS,
   RENDER_GLOBAL_JOURNAL_TO_EDIT
} from '../../types';
import GlobalJournalService from '../../services/GlobalJournalService';

// Action creator for getting all items --<
export const getGlobalJournalList = () => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const globalJournalList = await GlobalJournalService.getAll();
        if (globalJournalList) {
            dispatch({ type: GET_ALL_GLOBAL_JOURNAL_SUCCESS, payload: globalJournalList });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: GET_ALL_GLOBAL_JOURNAL_FAIL });
        dispatch({ type: REMOVE_LOADER });
        //console.log(error);
    }
};

export const getGlobalJournalPageList = (pageNumber, pageCount) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const globalJournalList = await GlobalJournalService.getPageList(pageNumber, pageCount);
        if (globalJournalList) {
            dispatch({ type: GET_ALL_GLOBAL_JOURNAL_PAGE_SUCCESS, payload: globalJournalList });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: GET_ALL_GLOBAL_JOURNAL_PAGE_FAIL });
        dispatch({ type: REMOVE_LOADER });
        //console.log(error);
    }
};

// Action creator for adding item --<
export const addGlobalJournal = (data, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalJournal = await GlobalJournalService.add(data);

        if (globalJournal) {
            dispatch({ type: ADD_GLOBAL_JOURNAL_SUCCESS });
        }

        refreshItemsList && refreshItemsList();

        clear && clear();

        successNotification && successNotification();
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        
        clear && clear();

        errorNotification && errorNotification();
    }
};

export const renderGlobalJournalToEdit = item => {
    return {
        type: RENDER_GLOBAL_JOURNAL_TO_EDIT,
        payload: item,
    };
};

export const editGlobalJournal = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalJournal = await GlobalJournalService.update(id, data);

        if (globalJournal) {
            dispatch({ type: EDIT_GLOBAL_JOURNAL_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateGlobalJournal = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalJournal = await GlobalJournalService.update(id, data);

        if (globalJournal) {
            dispatch({ type: EDIT_GLOBAL_JOURNAL_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

// Action creator for deleting football transaction from the system.
export const deleteGlobalJournal = (id, refresh) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const deleted_global_category = await GlobalJournalService.delete(id);

        if (deleted_global_category) {
            refresh && refresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        console.log(error);
    }
};