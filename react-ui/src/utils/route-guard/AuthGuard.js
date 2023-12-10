import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getUser } from '../../actions';

//-----------------------|| AUTH GUARD ||-----------------------//

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }) => {
    const dispatch=useDispatch();
    const account = useSelector((state) => state.account);
    console.log("AuthGuard account.isLoggedIn==",account.isLoggedIn)
    useEffect(()=>{
       // if(account.isLoggedIn)
        dispatch(getUser(account.token));
    },[getUser])
    if (!account.isLoggedIn) {
        return <Redirect to="/login" />;
    }
    return children;
};

AuthGuard.propTypes = {
    children: PropTypes.node
};

export default AuthGuard;
