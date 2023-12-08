import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import MainLayout from './../layout/MainLayout';
import Loadable from '../component/Loadable';
import AuthGuard from './../utils/route-guard/AuthGuard';
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


import VendorCustomer from '../views/cust/Vendor/Customer/VendorCustomer';
import VendorSupplier from '../views/cust/Vendor/Supplier/VendorSupplier';
import VendorBusiness from '../views/cust/Vendor/Business/VendorBusiness';
import VendorEmployee from '../views/cust/Vendor/Employee/VendorEmployee';
import VendorUser from '../views/cust/Vendor/Users/VendorUser';
import { useSelector } from 'react-redux';
import MainPage from '../views/cust/MainPage';
import VendorSupplierDetail from '../views/cust/Vendor/Supplier/VendorSupplierDetail';
// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('../views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('../views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('../views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('../views/utilities/TablerIcons')));


//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {
    const location = useLocation();
    const accountReducer = useSelector((state) => state.account);
    const userMenuReducer = useSelector((state) => state.userMenuReducer);
    let paths=[];
    const userRole = accountReducer?.userDetail?.userRole;
    if(userRole && accountReducer.userDetail){
        paths=accountReducer.paths(userRole)
    }

    const findMenu=(url)=>{
        return userMenuReducer.menuGroups.find(menuGroup=>menuGroup.url===url)
    }

    return (
        <Route
            path={[...paths,"/cust/orders","/cust/parties","/cust/organizations","/cust/dashboard","/cust/items","/cust/setups"]}
        >
            <MainLayout>
                <Switch location={location} key={location.pathname}>
                    <AuthGuard>
                        
                        
                        <Route exact path="/business/portal/orders" render={(props) => <MainPage menuGroup={findMenu('/business/portal/orders')} {...props}></MainPage>} />
                        <Route exact path="/business/portal/parties" render={(props) => <MainPage menuGroup={findMenu('/business/portal/parties')} {...props}></MainPage>} />
                        <Route exact path="/business/portal/dashboard" render={(props) => <MainPage menuGroup={findMenu('/business/portal/dashboard')} {...props}></MainPage>} />
                        <Route exact path="/business/portal/items" render={(props) => <MainPage menuGroup={findMenu('/business/portal/items')} {...props}></MainPage>} />
                        <Route exact path="/business/portal/organizations" render={(props) => <MainPage menuGroup={findMenu('/business/portal/organizations')} {...props}></MainPage>} />
                        <Route exact path="/business/portal/setups" render={(props) => <MainPage menuGroup={findMenu('/business/portal/setups')} {...props}></MainPage>} />
                        <Route exact path="/business/portal/dashboard/default" component={DashboardDefault} />
                        <Route exact path="/business/portal/orders/sales" component={CustSalePage} />
                        <Route exact path="/business/portal/orders/purchase" component={CustPurchasePage} />
                        <Route exact path="/business/portal/items/products" component={CustProductPage} />
                        <Route exact path="/business/portal/organizations/business" component={VendorBusiness} />
                        <Route exact path="/business/portal/organizations/employee" component={VendorEmployee} />
                        <Route exact path="/business/portal/organizations/users" component={VendorUser} />
                        <Route exact path="/business/portal/parties/customer" component={VendorCustomer} />
                        <Route exact path="/business/portal/parties/supplier" component={VendorSupplier} />
                        <Route exact path="/business/portal/setups/category/group" component={CustCategoryGroup} />
                        <Route exact path="/business/portal/setups/category/list" component={CustCategoryList} />
                        <Route exact path="/business/portal/setups/currency/group" component={CustCurrencyGroup} />
                        <Route exact path="/business/portal/setups/currency/list" component={CustCurrencyList} />
                        <Route exact path="/business/portal/setups/unit/group" component={CustUnitGroup} />
                        <Route exact path="/business/portal/setups/unit/list" component={CustUnitList} />
                        <Route exact path="/business/portal/setups/count/freq" component={CustCountFreq} />

                        <Route exact path="/utils/util-typography" component={UtilsTypography} />
                        <Route exact path="/utils/util-color" component={UtilsColor} />
                        <Route exact path="/utils/util-shadow" component={UtilsShadow} />
                        <Route exact path="/icons/tabler-icons" component={UtilsTablerIcons} />
                        <Route exact path="/icons/material-icons" component={UtilsMaterialIcons} />
                        <Route exact path="/user/profile" component={UserProfilePage} />
                    </AuthGuard>
                </Switch>
            </MainLayout>
        </Route>
    );
};

export default MainRoutes;
