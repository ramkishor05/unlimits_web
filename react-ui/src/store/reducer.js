import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// reducer import
import customizationReducer from './customizationReducer';
import accountReducer from './AccountReducer';
import userReducer from './UserReducer';

import GlobalCategoryGroupReducer from './GlobalCategoryGroupReducer';
import GlobalCategoryReducer from './GlobalCategoryReducer';
import GlobalUnitGroupReducer from './GlobalUnitGroupReducer';
import GlobalUnitReducer from './GlobalUnitReducer';
import GlobalCountFreqReducer from './GlobalCountFreqReducer';

import CustProductReducer from './CustProductReducer';

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
    globalCategoryReducer: GlobalCategoryReducer,
    globalUnitGroupReducer:GlobalUnitGroupReducer,
    globalUnitReducer: GlobalUnitReducer,
    globalCountFreqReducer: GlobalCountFreqReducer,

    custProductReducer: CustProductReducer
});

export default reducer;
