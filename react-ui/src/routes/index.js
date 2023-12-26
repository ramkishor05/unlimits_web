import React, { useEffect, useState } from 'react';
import { Redirect, Switch } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AutheRoutes from './AuthRoutes';
import UnauthRoutes from './UnauthRoutes';


// project imports
import config from './../config';
import { useDispatch, useSelector } from 'react-redux';
import UIColor from '../views/utilities/Color';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../actions';

//-----------------------|| ROUTING RENDER ||-----------------------//

const Routes = () => {
    const dispatch =useDispatch();
    const location = useLocation();
    const {isLoggedIn, defaultPath, token}= useSelector((state) => state.accountReducer);
    const {userDetail}= useSelector((state) => state.userReducer);
    const [isLoading, setLoading] = useState(true);
   
    useEffect(()=>{
        if(isLoading){
            if(isLoggedIn){
                dispatch(getUser(token));
            }
            setLoading(false);
        }
    });

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
                <Redirect from="/**" to={defaultPath(userDetail, location, isLoggedIn)} />
            
            </React.Fragment>
        </Switch>
         </>
    );
};

export default Routes;
