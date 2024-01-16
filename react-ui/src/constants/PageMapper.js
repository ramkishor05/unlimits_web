
import Loadable from '../component/Loadable';

import { lazy } from "react";

import GlobalDashboard from "../views/global/dasboard";
import GlobalCategoryGroup from "../views/global/category/GlobalCategoryGroup";
import GlobalCategoryList from "../views/global/category/GlobalCategoryList";
import GlobalCountFreq from "../views/global/count_freq/GlobalCountFreq";
import GlobalCurrencyGroup from "../views/global/currency/GlobalCurrencyGroup";
import GlobalCurrencyList from "../views/global/currency/GlobalCurrencyList";
import GlobalUnitGroup from "../views/global/unit/GlobalUnitGroup";
import GlobalUnitList from "../views/global/unit/GlobalUnitList";
import GlobalUserProfilePage from "../views/global/profile";
import GlobalMenuGroupsPage from "../views/global/menus/GlobalMenuGroupsPage";
import GlobalMenuItemsPage from "../views/global/menus/GlobalMenuItemsPage";
import GlobalRoleMenuGroupsPage from "../views/global/menus/GlobalRoleMenuGroupsPage";
import GlobalRoleMenuItemsPage from "../views/global/menus/GlobalRoleMenuItemsPage";
import GlobalVendorPage from "../views/global/parties/GlobalVendorPage";
import GlobalSupplierPage from "../views/global/parties/GlobalSupplierPage";
import GlobalCustomerPage from "../views/global/parties/GlobalCustomerPage";
import GlobalUserPage from "../views/global/organizations/GlobalUserPage";
import GlobalEmployeePage from "../views/global/organizations/GlobalEmployeePage";

// project imports
import CustDashboard from  '../views/cust/dashboard';
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
import CustUserProfilePage from '../views/cust/profile';
import CustCustomerPage from '../views/cust/parties/CustCustomer';
import CustSupplierPage from '../views/cust/parties/CustSupplier';
import CustBusinessPage from '../views/cust/organizations/CustBusiness';
import CustEmployeePage from '../views/cust/organizations/CustEmployee';
import CustUserPage from '../views/cust/organizations/CustUser';
import CustCashBook from '../views/cust/accounting/CustTransationBook';
import CustAccountBook from '../views/cust/accounting/CustAccountBook';


export const PageMapper = {
    "/global/dashboard/default": GlobalDashboard,
    "/global/menus/groups": GlobalMenuGroupsPage,
    "/global/menus/items": GlobalMenuItemsPage,
    "/global/menus/role/groups": GlobalRoleMenuGroupsPage,
    "/global/menus/role/items": GlobalRoleMenuItemsPage,
    "/global/setups/category/group": GlobalCategoryGroup,
    "/global/setups/category/list": GlobalCategoryList,
    "/global/setups/unit/group": GlobalUnitGroup,
    "/global/setups/unit/list": GlobalUnitList,
    "/global/setups/currency/group": GlobalCurrencyGroup,
    "/global/setups/currency/list": GlobalCurrencyList,
    "/global/setups/count/freq": GlobalCountFreq,
    "/global/portal/userprofile/detial": GlobalUserProfilePage,
    "/global/parties/vendors" : GlobalVendorPage,
    "/global/parties/suppliers" : GlobalSupplierPage,
    "/global/parties/customers" : GlobalCustomerPage,
    "/global/portal/organizations/users":GlobalUserPage,
    "/global/portal/organizations/employee":GlobalEmployeePage,

    "/business/portal/dashboard/default" :CustDashboard,
    "/business/portal/orders/sales" :CustSalePage,
    "/business/portal/orders/purchase" :CustPurchasePage,
    "/business/portal/accounting/cashbook" :CustCashBook,
    "/business/portal/accounting/accountbook": CustAccountBook,
    "/business/portal/items/products" :CustProductPage,
    "/business/portal/organizations/business" :CustBusinessPage,
    "/business/portal/organizations/employee" :CustEmployeePage,
    "/business/portal/organizations/users" :CustUserPage,
    "/business/portal/parties/customer" :CustCustomerPage,
    "/business/portal/parties/supplier" :CustSupplierPage,
    "/business/portal/setups/category/group" :CustCategoryGroup,
    "/business/portal/setups/category/list" :CustCategoryList,
    "/business/portal/setups/currency/group" :CustCurrencyGroup,
    "/business/portal/setups/currency/list" :CustCurrencyList,
    "/business/portal/setups/unit/group" :CustUnitGroup,
    "/business/portal/setups/unit/list" :CustUnitList,
    "/business/portal/setups/count/freq" :CustCountFreq,
    "/business/portal/user/profile":CustUserProfilePage
}