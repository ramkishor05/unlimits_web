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
import GlobalCurrencyGroupReducer from './global/GlobalCurrencyGroupReducer';
import GlobalCurrencyItemReducer from './global/GlobalCurrencyItemReducer';

import CustDashboardReducer from './cust/CustDashboardReducer';
import CustCategoryGroupReducer from './cust/CustCategoryGroupReducer';
import CustCategoryReducer from './cust/CustCategoryReducer';
import CustUnitGroupReducer from './cust/CustUnitGroupReducer';
import CustUnitReducer from './cust/CustUnitReducer';
import CustCountFreqReducer from './cust/CustCountFreqReducer';

import CustCurrencyGroupReducer from './cust/CustCurrencyGroupReducer';
import CustCurrencyItemReducer from './cust/CustCurrencyItemReducer';
import CustProductReducer from './cust/CustProductReducer';
import CustSaleReducer from './cust/CustSaleReducer';
import CustPurchaseReducer from './cust/CustPurchaseReducer';

import VendorReducer from './VendorReducer';
import VendorCustomerReducer from './VendorCustomerReducer';
import VendorBusinessReducer from './VendorBusinessReducer';
import VendorSupplierReducer from './VendorSupplierReducer';
import VendorEmployeeReducer from './VendorEmployeeReducer';
import VendorUserReducer from './VendorUserReducer';
import UserRoleReducer from './UserRoleReducer';
import LoaderReducer from './LoaderReducer';
import MenuGroupReducer from './MenuGroupReducer';
import MenuItemReducer from './MenuItemReducer';

import RoleMenuGroupReducer from './RoleMenuGroupReducer';
import RoleMenuItemReducer from './RoleMenuItemReducer';


//-----------------------|| COMBINE REDUCER ||-----------------------//

const reducer = combineReducers({
    loaderReducer: LoaderReducer,
    account: persistReducer(
        {
            key: 'account',
            storage,
            keyPrefix: 'pos-'
        },
        AccountReducer
    ),
    userReducer: UserReducer,
    userRoleReducer: UserRoleReducer,

    menuGroupReducer: MenuGroupReducer,
    menuItemReducer: MenuItemReducer,
    roleMenuGroupReducer: RoleMenuGroupReducer,
    roleMenuItemReducer: RoleMenuItemReducer,

    customization: CustomizationReducer,

    vendorReducer: VendorReducer,
    vendorCustomerReducer: VendorCustomerReducer,
    vendorBusinessReducer: VendorBusinessReducer,
    vendorSupplierReducer: VendorSupplierReducer,
    vendorEmployeeReducer: VendorEmployeeReducer,
    vendorUserReducer: VendorUserReducer,

    globalCategoryGroupReducer: GlobalCategoryGroupReducer,
    globalCategoryReducer: GlobalCategoryReducer,
    globalCurrencyGroupReducer: GlobalCurrencyGroupReducer,
    globalCurrencyItemReducer: GlobalCurrencyItemReducer,
    globalUnitGroupReducer:GlobalUnitGroupReducer,
    globalUnitReducer: GlobalUnitReducer,
    globalCountFreqReducer: GlobalCountFreqReducer,

    custDashboardReducer: CustDashboardReducer,
    custProductReducer: CustProductReducer,
    custCategoryGroupReducer: CustCategoryGroupReducer,
    custCategoryReducer: CustCategoryReducer,
    custUnitGroupReducer:CustUnitGroupReducer,
    custUnitReducer: CustUnitReducer,
    custCountFreqReducer: CustCountFreqReducer,
    custCurrencyGroupReducer: CustCurrencyGroupReducer,
    custCurrencyItemReducer: CustCurrencyItemReducer,
    custSaleReducer:CustSaleReducer,
    custPurchaseReducer:CustPurchaseReducer
});

export default reducer;
