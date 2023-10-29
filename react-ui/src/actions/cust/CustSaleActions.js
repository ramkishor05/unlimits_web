import { 
    GET_ALL_SALES_SUCCESS,
    GET_SALES_TODAY_SUCCESS, GET_SALES_YESTERDAY_SUCCESS, GET_SALES_LONG_SUCCESS,
    SALE_TO_EDIT
} from '../../types';
import CustSaleService from '../../services/CustSaleService';

// Action creator for getting all sales.
export const getCustSaleList = () => async dispatch => {
    try {
        let sales = await CustSaleService.getAll();

        if (sales) {
            dispatch({ type: GET_ALL_SALES_SUCCESS, payload: sales });
        }
    } catch (error) {
        console.log(error);
    }
};

// Action creator for getting sales according to date.
export const getCustSaleListByDate = (from, to, day) => async dispatch => {
    try {
        let sales = await CustSaleService.getByDate(from, to);

        if (sales) {
            if (day === 'today') {
                dispatch({ type: GET_SALES_TODAY_SUCCESS, payload: sales });
            } else if (day === 'yesterday') {
                dispatch({ type: GET_SALES_YESTERDAY_SUCCESS, payload: sales });
            } else if (day === 'long') {
                dispatch({ type: GET_SALES_LONG_SUCCESS, payload: sales });
            } else {
                dispatch({ type: GET_ALL_SALES_SUCCESS, payload: sales });
            }
        }
    } catch(error) {
        console.log(error);
    }
};

// Action creator for adding sales.
export const addCustSale = (data, refreshSales, clear, successNotification, errorNotification) => async dispatch => {
    try {
        let sale = await CustSaleService.add(data);

        if (sale) {
            refreshSales && refreshSales();

            clear && clear();
            
            successNotification && successNotification();
        }
    } catch (error) {
        errorNotification && errorNotification();
        console.log(error);
    }
};

// Action creator for rendering a specific sale to edit.
export const renderSaleToEdit = payload => {
    return {
        type: SALE_TO_EDIT,
        payload,
    };
};

// Action creator for editing sales in the system.
export const editCustSale = (id, data, refreshSales, clear, successNotification, errorNotification) => async dispatch => {
    try {
        const sale = await CustSaleService.update(id, data);

        if (sale) {
            refreshSales && refreshSales();

            clear && clear();

            successNotification && successNotification();
        }
    } catch (error) {
        errorNotification && errorNotification();
        console.log(error);
    }
};

// Action creator for editing sales in the system.
export const deleteCustSale = (id, refreshSales, clear, successNotification, errorNotification) => async dispatch => {
    try {
        const sale = await CustSaleService.delete(id);

        if (sale) {
            refreshSales && refreshSales();

            clear && clear();

            successNotification && successNotification();
        }
    } catch (error) {
        errorNotification && errorNotification();
        console.log(error);
    }
};