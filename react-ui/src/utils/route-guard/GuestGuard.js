import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

// project imports
import config from '../../config';
import { getUser } from '../../actions';

//-----------------------|| GUEST GUARD ||-----------------------//

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */
const GuestGuard = ({ children }) => {
    const account = useSelector((state) => state.account);
    const { isLoggedIn } = account;
    const dispatch=useDispatch();
    console.log("GuestGuard account.isLoggedIn==",account.isLoggedIn)
    useEffect(()=>{
       if(account.isLoggedIn)
        dispatch(getUser(account.token));
    },[getUser])

    if (isLoggedIn ) {
        console.log("page:", account.defaultPath(account?.userDetail?.userRole))
        if(account?.userDetail?.userRole)
             return <Redirect to={account.defaultPath(account?.userDetail?.userRole)} />;
        else
             return <Redirect to={'/login'} />;
    } 
    
    return children;
    
};

GuestGuard.propTypes = {
    children: PropTypes.node
};

export default GuestGuard;
