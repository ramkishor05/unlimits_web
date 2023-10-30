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
import VendorCustomer from '../views/cust/Vendor/Customer/VendorCustomer';
import VendorBusiness from '../views/cust/Vendor/Business/VendorBusiness';
import CustCurrencyList from '../views/cust/currency/CustCurrencyList';
import CustCurrencyGroup from '../views/cust/currency/CustCurrencyGroup';
import CustPurchasePage from '../views/cust/purchase/CustPurchasePage';
import VendorSupplier from '../views/cust/Vendor/Supplier/VendorSupplier';
import UserProfilePage from '../views/profile';

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

    return (
        <Route
            path={[
                '/dashboard/default',
                '/cust/sales',
                '/cust/purchase',
                '/cust/products',
                '/vendor/business',
                '/vendor/customer',
                '/vendor/supplier',
                '/category/group',
                '/category/list',
                '/currency/group',
                '/currency/list',
                '/unit/group',
                '/unit/list',
                '/count/freq',
                '/utils/util-typography',
                '/utils/util-color',
                '/utils/util-shadow',
                '/icons/tabler-icons',
                '/icons/material-icons',
                '/user/profile'
            ]}
        >
            <MainLayout>
                <Switch location={location} key={location.pathname}>
                    <AuthGuard>
                        <Route path="/dashboard/default" component={DashboardDefault} />
                        <Route path="/cust/sales" component={CustSalePage} />
                        <Route path="/cust/purchase" component={CustPurchasePage} />
                        <Route path="/cust/products" component={CustProductPage} />
                        <Route path="/vendor/business" component={VendorBusiness} />
                        <Route path="/vendor/customer" component={VendorCustomer} />
                        <Route path="/vendor/supplier" component={VendorSupplier} />
                        <Route path="/category/group" component={CustCategoryGroup} />
                        <Route path="/category/list" component={CustCategoryList} />
                        <Route path="/currency/group" component={CustCurrencyGroup} />
                        <Route path="/currency/list" component={CustCurrencyList} />
                        <Route path="/unit/group" component={CustUnitGroup} />
                        <Route path="/unit/list" component={CustUnitList} />
                        <Route path="/count/freq" component={CustCountFreq} />
                        <Route path="/utils/util-typography" component={UtilsTypography} />
                        <Route path="/utils/util-color" component={UtilsColor} />
                        <Route path="/utils/util-shadow" component={UtilsShadow} />
                        <Route path="/icons/tabler-icons" component={UtilsTablerIcons} />
                        <Route path="/icons/material-icons" component={UtilsMaterialIcons} />
                        <Route path="/user/profile" component={UserProfilePage} />
                    </AuthGuard>
                </Switch>
            </MainLayout>
        </Route>
    );
};

export default MainRoutes;
