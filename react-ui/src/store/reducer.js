import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// reducer import
import customizationReducer from './customizationReducer';
import accountReducer from './accountReducer';
import GlobalCategoryGroupReducer from './GlobalCategoryGroupReducer';
import GlobalCategoryReducer from './GlobalCategoryReducer';
import userReducer from './userReducer';


//-----------------------|| COMBINE REDUCER ||-----------------------//

const reducer = combineReducers({
    account: persistReducer(
        {
            key: 'account',
            storage,
            keyPrefix: 'berry-'
        },
        accountReducer
    ),
    userReducer: userReducer,
    customization: customizationReducer,
    globalCategoryGroupReducer: GlobalCategoryGroupReducer,
    globalCategoryReducer: GlobalCategoryReducer

});

export default reducer;
