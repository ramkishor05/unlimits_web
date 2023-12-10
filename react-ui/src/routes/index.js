import React from 'react';
import { Redirect, Switch , Route} from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AutheRoutes from './AuthRoutes';

// project imports
import config from './../config';
import { useSelector } from 'react-redux';

//-----------------------|| ROUTING RENDER ||-----------------------//

const Routes = () => {
    const account = useSelector((state) => state.account);

    return (
        <Switch>
            <Redirect exact from="/" to={account.defaultPath(account?.userDetail?.userRole)} />
            <React.Fragment>
                {/* Routes for authentication pages */}
                <AutheRoutes />

                {/* Route for login */}
                <LoginRoutes />

                {/* Routes for main layouts */}
                <MainRoutes>
                  
                </MainRoutes>

            </React.Fragment>
        </Switch>
    );
};

export default Routes;
