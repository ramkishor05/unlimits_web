import { 
   GET_ALL_GLOBAL_JOURNAL_SUCCESS,
   GET_ALL_GLOBAL_JOURNAL_FAIL,
   GET_GLOBAL_JOURNAL_TODAY_SUCCESS,
   GET_GLOBAL_JOURNAL_YESTERDAY_SUCCESS,
   GET_GLOBAL_JOURNAL_LONG_SUCCESS,
   ADD_GLOBAL_JOURNAL_SUCCESS,
   ADD_GLOBAL_JOURNAL_FAIL,
   GET_ALL_GLOBAL_JOURNAL_PAGE_SUCCESS,
   GET_ALL_GLOBAL_JOURNAL_PAGE_FAIL
} from '../../types';

const INITIAL_STATE = {
    globalJournalList: [],
    globalJournalList_today: [],
    globalJournalList_yesterday: [],
    globalJournalList_long: [],
    globalJournalPageData: {
        elements: []
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_ALL_GLOBAL_JOURNAL_PAGE_SUCCESS:
            return { ...state, globalJournalPageData: action.payload };

        case GET_ALL_GLOBAL_JOURNAL_PAGE_FAIL:
            return { ...state };

        case GET_ALL_GLOBAL_JOURNAL_SUCCESS:
            return { ...state, globalJournalList: action.payload };

        case GET_ALL_GLOBAL_JOURNAL_FAIL:
            return { ...state };

        case GET_GLOBAL_JOURNAL_TODAY_SUCCESS:
            return { ...state, globalJournalList_today: action.payload };

        case GET_GLOBAL_JOURNAL_YESTERDAY_SUCCESS:
            return { ...state, globalJournalList_yesterday: action.payload };

        case GET_GLOBAL_JOURNAL_LONG_SUCCESS:
            return { ...state, globalJournalList_long: action.payload };

        case ADD_GLOBAL_JOURNAL_SUCCESS:
            return { ...state, openAddGlobalJournalModal: false };

        case ADD_GLOBAL_JOURNAL_FAIL:
            return { ...state };
    
        default:
            return state;
    }
};









