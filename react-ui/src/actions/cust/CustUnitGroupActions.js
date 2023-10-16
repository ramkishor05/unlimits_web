import { 
    GET_ALL_CUST_UNIT_GROUPS_SUCCESS, 
    GET_ALL_CUST_UNIT_GROUPS_FAIL,
    GET_CUST_UNIT_GROUPS_TODAY_SUCCESS,
    GET_CUST_UNIT_GROUPS_YESTERDAY_SUCCESS, 
    GET_CUST_UNIT_GROUPS_LONG_SUCCESS,
    ADD_CUST_UNIT_GROUP_SUCCESS, 
    ADD_CUST_UNIT_GROUP_FAIL, 
    EDIT_CUST_UNIT_GROUP_SUCCESS,
    RENDER_CUST_UNIT_GROUP_TO_EDIT,
} from '../../types';

import CustUnitGroupService from '../../services/CustUnitGroupService';

// Action creator for getting all Unit entries in the system.
export const getCustUnitGroupList = () => async dispatch => {
    try {
        let unitGroups = await CustUnitGroupService.getAll();

        if (unitGroups) {
            dispatch({ type: GET_ALL_CUST_UNIT_GROUPS_SUCCESS, payload: unitGroups });
        }
    } catch (error) {
        dispatch({ type: GET_ALL_CUST_UNIT_GROUPS_FAIL, payload: error });
        console.log(error);
    }
};

// Action creator for getting Unit entries according to specified dates in the system.
export const getCustUnitGroupsByDate = (from, to, day) => async dispatch => {
    try {
        let globalUnitGroups = await CustUnitGroupService.getByDate(new Date(from), new Date(`${to}T23:59:59`));

        if (globalUnitGroups) {
            if (day === 'today') {
                dispatch({ type: GET_CUST_UNIT_GROUPS_TODAY_SUCCESS, payload: globalUnitGroups });
            } else if (day === 'yesterday') {
                dispatch({ type: GET_CUST_UNIT_GROUPS_YESTERDAY_SUCCESS, payload: globalUnitGroups });
            } else if (day === 'long') {
                dispatch({ type: GET_CUST_UNIT_GROUPS_LONG_SUCCESS, payload: globalUnitGroups });
            } else {
                dispatch({ type: GET_ALL_CUST_UNIT_GROUPS_SUCCESS, payload: globalUnitGroups });
            }
        }
    } catch (error) {
        dispatch({ type: GET_ALL_CUST_UNIT_GROUPS_FAIL, payload: error });
        console.log(error);
    }
};

// Action creator for adding Unit transaction to the system.
export const addCustUnitGroup = (data, refresh, clear, successNotification, errorNotification) => async dispatch => {
    try {
        let unitGroup = await CustUnitGroupService.add(data);

        if (unitGroup) {
            dispatch({ type: ADD_CUST_UNIT_GROUP_SUCCESS });
            
            refresh && refresh();
    
            clear && clear();

            successNotification && successNotification();
        }

    } catch (error) {
        dispatch({ type: ADD_CUST_UNIT_GROUP_FAIL });
        errorNotification && errorNotification();
        console.log(error);
    }
};

// Action creator for editing Unit transactions to the system.
export const editCustUnitGroup = (id, data, refresh, clear, successNotification, errorNotification) => async dispatch => {
    try {
        let unitGroup = await CustUnitGroupService.update(id, data);

        if (unitGroup) {
            dispatch({ type: EDIT_CUST_UNIT_GROUP_SUCCESS });

            refresh && refresh();

            clear && clear();

            successNotification && successNotification();
        }
    } catch(error) {
        errorNotification && errorNotification();
        console.log(error);
    }
};

// Action creator for rendering a Unit to edit in the system.
export const renderCustUnitGroupToEdit = payload => {
    return {
        type: RENDER_CUST_UNIT_GROUP_TO_EDIT,
        payload,
    };
};

export const deleteCustUnitGroup = (id, refresh) => async dispatch => {
    try {
        const deletedCustUnitGroup = await CustUnitGroupService.delete(id);

        if (deletedCustUnitGroup) {
            refresh && refresh();
        }
    } catch (error) {
        console.log(error);
    }
};
