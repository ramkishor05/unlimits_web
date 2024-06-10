
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
import CustCategoryItem from '../views/cust/category/CustCategoryItem';
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
import CustOwnerAccountPage from '../views/cust/profile/CustOwnershipPage';
import CustUserSecurityPage from '../views/cust/profile/CustUserSecurityPage';
import CustOwnershipPage from '../views/cust/profile/CustOwnershipPage';
import CustMembershipPage from '../views/cust/profile/CustMembershipPage';
import CustUserPrivacyPage from '../views/cust/profile/CustUserPrivacyPage';
import CustOrderPage from '../views/cust/orders/CustOrderPage';
import GlobalTagGroup from '../views/global/tags/GlobalTagGroup';
import GlobalTagList from '../views/global/tags/GlobalTagList';
import GlobalPrompt from '../views/global/prompts/GlobalPrompts';
import GlobalImageLibrary from '../views/global/images/GlobalImageLibrary';
import GlobalMindSetLibrary from '../views/global/mindsets/GlobalMindSetLibrary';


export const PageMapper = {
    "/global/dashboard/default": GlobalDashboard,
    "/global/portal/menus/groups": GlobalMenuGroupsPage,
    "/global/portal/menus/items": GlobalMenuItemsPage,
    "/global/portal/menus/role/groups": GlobalRoleMenuGroupsPage,
    "/global/portal/menus/role/items": GlobalRoleMenuItemsPage,
    "/global/portal/content/main/categories": GlobalCategoryGroup,
    "/global/portal/content/sub/categories": GlobalCategoryList,
    "/global/portal/content/main/tags": GlobalTagGroup,
    "/global/portal/content/sub/tags": GlobalTagList,
    "/global/portal/content/prompt/list": GlobalPrompt,
    "/global/portal/content/image/list": GlobalImageLibrary,
    "/global/portal/content/midset/videos": GlobalMindSetLibrary,
    "/global/portal/content/unit/group": GlobalUnitGroup,
    "/global/portal/content/unit/list": GlobalUnitList,
    "/global/portal/content/currency/group": GlobalCurrencyGroup,
    "/global/portal/content/currency/list": GlobalCurrencyList,
    "/global/portal/content/count/freq": GlobalCountFreq,
    "/global/portal/user/profile": GlobalUserProfilePage,
    "/global/portal/parties/vendors" : GlobalVendorPage,
    "/global/portal/parties/suppliers" : GlobalSupplierPage,
    "/global/portal/parties/customers" : GlobalCustomerPage,
    "/global/portal/organizations/users":GlobalUserPage,
    "/global/portal/organizations/employee":GlobalEmployeePage,

    "/business/portal/dashboard/default" :CustDashboard,
    "/business/portal/orders/ordering" :CustOrderPage,
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
    "/business/portal/content/category/group" :CustCategoryGroup,
    "/business/portal/content/category/list" :CustCategoryItem,
    "/business/portal/content/currency/group" :CustCurrencyGroup,
    "/business/portal/content/currency/list" :CustCurrencyList,
    "/business/portal/content/unit/group" :CustUnitGroup,
    "/business/portal/content/unit/list" :CustUnitList,
    "/business/portal/content/count/freq" :CustCountFreq,
    "/business/portal/user/profile":CustUserProfilePage,
    "/business/portal/user/ownership":CustOwnershipPage,
    "/business/portal/user/membership":CustMembershipPage,
    "/business/portal/user/security":CustUserSecurityPage,
    "/business/portal/user/privacy":CustUserPrivacyPage
}