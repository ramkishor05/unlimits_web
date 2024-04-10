import { 
   GET_ALL_GLOBAL_PROMPT_TAG_SUCCESS,
   GET_ALL_GLOBAL_PROMPT_TAG_FAIL,
   GET_GLOBAL_PROMPT_TAG_TODAY_SUCCESS,
   GET_GLOBAL_PROMPT_TAG_YESTERDAY_SUCCESS,
   GET_GLOBAL_PROMPT_TAG_LONG_SUCCESS,
   ADD_GLOBAL_PROMPT_TAG_SUCCESS,
   ADD_GLOBAL_PROMPT_TAG_FAIL,
   RENDER_GLOBAL_PROMPT_TAG_TO_EDIT
} from '../../types';

const INITIAL_STATE = {
    globalPromptTagList: [],
    globalPromptTagList_today: [],
    globalPromptTagList_yesterday: [],
    globalPromptTagList_long: [],
    globalPromptTag_to_edit: {
        name: '',
        desc: '',
        typeId:'',
        glbPromptTagGroupId: 0
    },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_GLOBAL_PROMPT_TAG_SUCCESS:
            return { ...state, globalPromptTagList: action.payload };

        case GET_ALL_GLOBAL_PROMPT_TAG_FAIL:
            return { ...state };

        case GET_GLOBAL_PROMPT_TAG_TODAY_SUCCESS:
            return { ...state, globalPromptTagList_today: action.payload };

        case GET_GLOBAL_PROMPT_TAG_YESTERDAY_SUCCESS:
            return { ...state, globalPromptTagList_yesterday: action.payload };

        case GET_GLOBAL_PROMPT_TAG_LONG_SUCCESS:
            return { ...state, globalPromptTagList_long: action.payload };

        case ADD_GLOBAL_PROMPT_TAG_SUCCESS:
            return { ...state, openAddGlobalPromptTagModal: false };

        case ADD_GLOBAL_PROMPT_TAG_FAIL:
            return { ...state };

        case RENDER_GLOBAL_PROMPT_TAG_TO_EDIT:
            return { ...state, globalPromptTag_to_edit: action.payload };
    
        default:
            return state;
    }
};









