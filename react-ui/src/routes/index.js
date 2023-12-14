import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AutheRoutes from './AuthRoutes';
import UnauthRoutes from './UnauthRoutes';


// project imports
import config from './../config';
import { useSelector } from 'react-redux';
import UIColor from '../views/utilities/Color';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

//-----------------------|| ROUTING RENDER ||-----------------------//

const Routes = () => {
    const location = useLocation();
    const {isLoggedIn, defaultPath}= useSelector((state) => state.accountReducer);
    const {userDetail}= useSelector((state) => state.userReducer);
    const userRole = userDetail?.userRole;
    
    return (
        <>
        <Switch>
            <React.Fragment>
                {/* Routes for authentication pages */}
                <AutheRoutes />

                {/* Route for login */}
                <LoginRoutes />

                {/* Routes for main layouts */}
                <MainRoutes />
                <UnauthRoutes/>
                <Redirect exact from="/**" to={defaultPath(userRole, location, isLoggedIn)} />
            
            </React.Fragment>
        </Switch>
         </>
    );
};

export default Routes;
