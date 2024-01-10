import { 
   GET_ALL_CUST_CASH_BOOK_SUCCESS,
   GET_ALL_CUST_CASH_BOOK_FAIL,
   GET_CUST_CASH_BOOK_TODAY_SUCCESS,
   GET_CUST_CASH_BOOK_YESTERDAY_SUCCESS,
   GET_CUST_CASH_BOOK_LONG_SUCCESS,
   ADD_CUST_CASH_BOOK_SUCCESS,
   ADD_CUST_CASH_BOOK_FAIL,
   RENDER_CUST_CASH_BOOK_TO_EDIT
} from '../../types';

const INITIAL_STATE = {
    custCashBookList: [],
    custCashBookList_today: [],
    custCashBookList_yesterday: [],
    custCashBookList_long: [],
    custCashBook_to_edit: {
        id: '',
        name: '',
        desc: '',
        typeId: ''
    },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_CUST_CASH_BOOK_SUCCESS:
            return { ...state, custCashBookList: action.payload };

        case GET_ALL_CUST_CASH_BOOK_FAIL:
            return { ...state };

        case GET_CUST_CASH_BOOK_TODAY_SUCCESS:
            return { ...state, custCashBookList_today: action.payload };

        case GET_CUST_CASH_BOOK_YESTERDAY_SUCCESS:
            return { ...state, custCashBookList_yesterday: action.payload };

        case GET_CUST_CASH_BOOK_LONG_SUCCESS:
            return { ...state, custCashBookList_long: action.payload };

        case ADD_CUST_CASH_BOOK_SUCCESS:
            return { ...state, openAddGlobalCashBookModal: false };

        case ADD_CUST_CASH_BOOK_FAIL:
            return { ...state };

        case RENDER_CUST_CASH_BOOK_TO_EDIT:
            return { ...state, custCashBook_to_edit: action.payload };
    
        default:
            return state;
    }
};









