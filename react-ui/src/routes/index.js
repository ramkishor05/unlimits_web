import React from 'react';
import { Redirect, Switch , Route} from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AutheRoutes from './AuthRoutes';

// project imports
import config from './../config';
import PageNotFound from '../views/utilities/PageNotFound';
import UserProfile from '../views/profile/UserProfile';

//-----------------------|| ROUTING RENDER ||-----------------------//

const Routes = () => {
    return (
        <Switch>
            <Redirect exact from="/" to={config.defaultPath} />
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
