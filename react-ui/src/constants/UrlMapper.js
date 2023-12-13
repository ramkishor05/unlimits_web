import { lazy } from 'react';
import Loadable from '../component/Loadable';

// project imports
import CustCategoryGroup from '../views/cust/category/CustCategoryGroup';
import CustCategoryList from '../views/cust/category/CustCategoryList';
import CustCountFreq from '../views/cust/count_freq/CustCountFreq';
import CustUnitList from '../views/cust/unit/CustUnitList';
import CustUnitGroup from '../views/cust/unit/CustUnitGroup';
import CustProductPage from '../views/cust/items/CustProductPage';
import CustSalePage from '../views/cust/sales/CustSalePage';
import CustCurrencyList from '../views/cust/currency/CustCurrencyList';
import CustCurrencyGroup from '../views/cust/currency/CustCurrencyGroup';
import CustPurchasePage from '../views/cust/purchase/CustPurchasePage';
import UserProfilePage from '../views/profile';
import VendorCustomer from '../views/cust/Vendor/Customer/CustCustomer';
import VendorSupplier from '../views/cust/Vendor/Supplier/CustSupplier';
import VendorBusiness from '../views/cust/Vendor/Business/CustBusiness';
import VendorEmployee from '../views/cust/Vendor/Employee/CustEmployee';
import VendorUser from '../views/cust/Vendor/Users/CustUser';

export const UrlMapper = {
   "/business/portal/dashboard/default" :Loadable(lazy(() => import('../views/dashboard/Default'))),
   "/business/portal/orders/sales" :CustSalePage,
   "/business/portal/orders/purchase" :CustPurchasePage,
   "/business/portal/items/products" :CustProductPage,
   "/business/portal/organizations/business" :VendorBusiness,
   "/business/portal/organizations/employee" :VendorEmployee,
   "/business/portal/organizations/users" :VendorUser,
   "/business/portal/parties/customer" :VendorCustomer,
   "/business/portal/parties/supplier" :VendorSupplier,
   "/business/portal/setups/category/group" :CustCategoryGroup,
   "/business/portal/setups/category/list" :CustCategoryList,
   "/business/portal/setups/currency/group" :CustCurrencyGroup,
   "/business/portal/setups/currency/list" :CustCurrencyList,
   "/business/portal/setups/unit/group" :CustUnitGroup,
   "/business/portal/setups/unit/list" :CustUnitList,
   "/business/portal/setups/count/freq" :CustCountFreq,
   "/business/portal/user/profile":UserProfilePage

}