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
    globalPromptList: [],
    globalPromptList_today: [],
    globalPromptList_yesterday: [],
    globalPromptList_long: [],
    globalPrompt_to_edit: {
        name: '',
        desc: '',
        typeId:'',
        glbPromptGroupId: 0
    },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_GLOBAL_PROMPT_TAG_SUCCESS:
            return { ...state, globalPromptList: action.payload };

        case GET_ALL_GLOBAL_PROMPT_TAG_FAIL:
            return { ...state };

        case GET_GLOBAL_PROMPT_TAG_TODAY_SUCCESS:
            return { ...state, globalPromptList_today: action.payload };

        case GET_GLOBAL_PROMPT_TAG_YESTERDAY_SUCCESS:
            return { ...state, globalPromptList_yesterday: action.payload };

        case GET_GLOBAL_PROMPT_TAG_LONG_SUCCESS:
            return { ...state, globalPromptList_long: action.payload };

        case ADD_GLOBAL_PROMPT_TAG_SUCCESS:
            return { ...state, openAddGlobalPromptModal: false };

        case ADD_GLOBAL_PROMPT_TAG_FAIL:
            return { ...state };

        case RENDER_GLOBAL_PROMPT_TAG_TO_EDIT:
            return { ...state, globalPrompt_to_edit: action.payload };
    
        default:
            return state;
    }
};









