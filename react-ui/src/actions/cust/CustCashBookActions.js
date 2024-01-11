import { 
   GET_ALL_CUST_CASH_BOOK_SUCCESS,
   GET_ALL_CUST_CASH_BOOK_FAIL,
   SHOW_LOADER,
   REMOVE_LOADER,
   ADD_CUST_CASH_BOOK_SUCCESS,
   EDIT_CUST_CASH_BOOK_SUCCESS,
   RENDER_CUST_CASH_BOOK_TO_EDIT
} from '../../types';
import CustCashBookService from '../../services/CustCashBookService';

// Action creator for getting all items --<
export const getCustCashBookList = () => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const custCashBookList = await CustCashBookService.getAll();

        if (custCashBookList) {
            dispatch({ type: GET_ALL_CUST_CASH_BOOK_SUCCESS, payload: custCashBookList });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: GET_ALL_CUST_CASH_BOOK_FAIL });
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};

// Action creator for getting all items --<
export const getCustCashBookFiltedList = (startDate, endDate) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const custCashBookList = await CustCashBookService.getFilted(startDate, endDate);

        if (custCashBookList) {
            dispatch({ type: GET_ALL_CUST_CASH_BOOK_SUCCESS, payload: custCashBookList });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: GET_ALL_CUST_CASH_BOOK_FAIL });
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};

// Action creator for adding item --<
export const addCustCashBook = (data, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const custCashBook = await CustCashBookService.add(data);

        if (custCashBook) {
            dispatch({ type: ADD_CUST_CASH_BOOK_SUCCESS });
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

export const renderCustCashBookToEdit = item => {
    return {
        type: RENDER_CUST_CASH_BOOK_TO_EDIT,
        payload: item,
    };
};

export const editCustCashBook = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const custCashBook = await CustCashBookService.update(id, data);

        if (custCashBook) {
            dispatch({ type: EDIT_CUST_CASH_BOOK_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateCustCashBook = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const custCashBook = await CustCashBookService.update(id, data);

        if (custCashBook) {
            dispatch({ type: EDIT_CUST_CASH_BOOK_SUCCESS });
            
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
export const deleteCustCashBook = (id, refresh) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const deleted_cust_category_group = await CustCashBookService.delete(id);

        if (deleted_cust_category_group) {
            refresh && refresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};