import { 
   GET_ALL_GLOBAL_PROMPT_TAG_SUCCESS,
   GET_ALL_GLOBAL_PROMPT_TAG_FAIL,
   SHOW_LOADER,
   REMOVE_LOADER,
   ADD_GLOBAL_PROMPT_TAG_SUCCESS,
   EDIT_GLOBAL_PROMPT_TAG_SUCCESS,
   RENDER_GLOBAL_PROMPT_TAG_TO_EDIT
} from '../../types';
import GlobalPromptTagService from '../../services/GlobalPromptTagService';

// Action creator for getting all items --<
export const getGlobalPromptTagList = () => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const globalPromptTagList = await GlobalPromptTagService.getAll();
        if (globalPromptTagList) {
            dispatch({ type: GET_ALL_GLOBAL_PROMPT_TAG_SUCCESS, payload: globalPromptTagList });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: GET_ALL_GLOBAL_PROMPT_TAG_FAIL });
        dispatch({ type: REMOVE_LOADER });
        //console.log(error);
    }
};

export const getGlobalPromptTagPageList = (pageNumber, pageCount) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const globalPromptTagList = await GlobalPromptTagService.getPageList(pageNumber, pageCount);
        if (globalPromptTagList) {
            dispatch({ type: GET_ALL_GLOBAL_PROMPT_TAG_SUCCESS, payload: globalPromptTagList });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: GET_ALL_GLOBAL_PROMPT_TAG_FAIL });
        dispatch({ type: REMOVE_LOADER });
        //console.log(error);
    }
};

// Action creator for adding item --<
export const addGlobalPromptTag = (data, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalPromptTag = await GlobalPromptTagService.add(data);

        if (globalPromptTag) {
            dispatch({ type: ADD_GLOBAL_PROMPT_TAG_SUCCESS });
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

export const renderGlobalPromptTagToEdit = item => {
    return {
        type: RENDER_GLOBAL_PROMPT_TAG_TO_EDIT,
        payload: item,
    };
};

export const editGlobalPromptTag = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalPromptTag = await GlobalPromptTagService.update(id, data);

        if (globalPromptTag) {
            dispatch({ type: EDIT_GLOBAL_PROMPT_TAG_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateGlobalPromptTag = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalPromptTag = await GlobalPromptTagService.update(id, data);

        if (globalPromptTag) {
            dispatch({ type: EDIT_GLOBAL_PROMPT_TAG_SUCCESS });
            
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
export const deleteGlobalPromptTag = (id, refresh) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const deleted_global_category = await GlobalPromptTagService.delete(id);

        if (deleted_global_category) {
            refresh && refresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        console.log(error);
    }
};