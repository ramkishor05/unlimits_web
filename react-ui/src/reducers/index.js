import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// reducer import
import CustomizationReducer from './CustomizationReducer';
import AccountReducer from './AccountReducer';
import UserReducer from './UserReducer';

import GlobalCategoryGroupReducer from './global/GlobalCategoryGroupReducer';
import GlobalCategoryReducer from './global/GlobalCategoryReducer';
import GlobalUnitGroupReducer from './global/GlobalUnitGroupReducer';
import GlobalUnitReducer from './global/GlobalUnitReducer';
import GlobalCountFreqReducer from './global/GlobalCountFreqReducer';

import CustCategoryGroupReducer from './cust/CustCategoryGroupReducer';
import CustCategoryReducer from './cust/CustCategoryReducer';
import CustUnitGroupReducer from './cust/CustUnitGroupReducer';
import CustUnitReducer from './cust/CustUnitReducer';
import CustCountFreqReducer from './cust/CustCountFreqReducer';
import CustProductReducer from './cust/CustProductReducer';
//-----------------------|| COMBINE REDUCER ||-----------------------//

const reducer = combineReducers({
    account: persistReducer(
        {
            key: 'account',
            storage,
            keyPrefix: 'berry-'
        },
        AccountReducer
    ),
    userReducer: UserReducer,
    customization: CustomizationReducer,
    globalCategoryGroupReducer: GlobalCategoryGroupReducer,
    globalCategoryReducer: GlobalCategoryReducer,
    globalUnitGroupReducer:GlobalUnitGroupReducer,
    globalUnitReducer: GlobalUnitReducer,
    globalCountFreqReducer: GlobalCountFreqReducer,

    custProductReducer: CustProductReducer,
    custCategoryGroupReducer: CustCategoryGroupReducer,
    custCategoryReducer: CustCategoryReducer,
    custUnitGroupReducer:CustUnitGroupReducer,
    custUnitReducer: CustUnitReducer,
    custCountFreqReducer: CustCountFreqReducer,
});

export default reducer;