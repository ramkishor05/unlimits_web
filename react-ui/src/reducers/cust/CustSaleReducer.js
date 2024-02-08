import {
    GET_ALL_SALES_SUCCESS,
    GET_SALES_TODAY_SUCCESS, GET_SALES_YESTERDAY_SUCCESS, GET_SALES_LONG_SUCCESS,
    SALE_TO_EDIT,
    ADD_TO_CART, 
} from '../../types';

const INITIAL_STATE = {
    custSaleList: [],
    custSaleList_today: [],
    custSaleList_yesterday: [],
    custSaleList_long: [],
    cust_sale_to_edit: {
        retailQnt: 0.00,
        wholeQnt: 0.00,
        customerId: 0,
        productId: 0,
        userId: 0,
        custProductRetailSaleList: [],
        custProductWholeSaleList: []
    },
    custCartList: []
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_ALL_SALES_SUCCESS:
            return { ...state, custSaleList: action.payload };

        case GET_SALES_TODAY_SUCCESS:
            return { ...state, custSaleList_today: action.payload };

        case GET_SALES_YESTERDAY_SUCCESS:
            return { ...state, custSaleList_yesterday: action.payload };

        case GET_SALES_LONG_SUCCESS:
            return { ...state, custSaleList_long: action.payload };

        case SALE_TO_EDIT:
            return { ...state, sale_to_edit: action.payload };

        case ADD_TO_CART:
                const custCartList= state.custCartList.filter(custCart=>custCart.custProduct.id!=action.payload.custProduct.id);
                custCartList.push(action.payload);
                return { ...state, custCartList: custCartList};

        default:
            return state;
    }
};



