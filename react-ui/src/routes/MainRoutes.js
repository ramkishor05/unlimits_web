import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import MainLayout from './../layout/MainLayout';
import Loadable from '../ui-component/Loadable';
import AuthGuard from './../utils/route-guard/AuthGuard';
import GlobalCategoryGroup from '../views/global/category/GlobalCategoryGroup';
import GlobalCategoryList from '../views/global/category/GlobalCategoryList';
import GlobalCountFreq from '../views/global/count_freq/GlobalCountFreq';
import GlobalUnitList from '../views/global/unit/GlobalUnitList';
import GlobalUnitGroup from '../views/global/unit/GlobalUnitGroup';
import CustProductPage from '../views/cust/items/CustProductPage';
import CustSalePage from '../views/cust/sales/CustSalePage';
import CustomerBill from '../views/cust/bills/CustomerBill';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('../views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('../views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('../views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('../views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('../views/sample-page')));

//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {
    const location = useLocation();

    return (
        <Route
            path={[
                '/dashboard/default',
                '/cust/billing',
                '/cust/sales',
                '/cust/products',
                '/category/group',
                '/category/list',
                '/unit/group',
                '/unit/list',
                '/count/freq',
                '/utils/util-typography',
                '/utils/util-color',
                '/utils/util-shadow',
                '/icons/tabler-icons',
                '/icons/material-icons',
                '/sample-page'
            ]}
        >
            <MainLayout>
                <Switch location={location} key={location.pathname}>
                    <AuthGuard>
                        <Route path="/dashboard/default" component={DashboardDefault} />
                        <Route path="/cust/billing" component={CustomerBill} />
                        <Route path="/cust/sales" component={CustSalePage} />
                        <Route path="/cust/products" component={CustProductPage} />
                        <Route path="/category/group" component={GlobalCategoryGroup} />
                        <Route path="/category/list" component={GlobalCategoryList} />
                        <Route path="/unit/group" component={GlobalUnitGroup} />
                        <Route path="/unit/list" component={GlobalUnitList} />
                        <Route path="/count/freq" component={GlobalCountFreq} />
                        <Route path="/utils/util-typography" component={UtilsTypography} />
                        <Route path="/utils/util-color" component={UtilsColor} />
                        <Route path="/utils/util-shadow" component={UtilsShadow} />
                        <Route path="/icons/tabler-icons" component={UtilsTablerIcons} />
                        <Route path="/icons/material-icons" component={UtilsMaterialIcons} />
                        <Route path="/sample-page" component={SamplePage} />
                    </AuthGuard>
                </Switch>
            </MainLayout>
        </Route>
    );
};

export default MainRoutes;
