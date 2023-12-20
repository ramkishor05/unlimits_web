import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getMenuGroupByRoleId, getUser } from '../../actions';

//-----------------------|| AUTH GUARD ||-----------------------//

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }) => {
    const dispatch=useDispatch();
    const {isLoggedIn, token}= useSelector((state) => state.accountReducer);
    console.log("AuthGuard isLoggedIn==",isLoggedIn)

    useEffect(()=>{
        
    },[])
    if (!isLoggedIn) {
        return <Redirect to="/login" />;
    }
    return children;
};

AuthGuard.propTypes = {
    children: PropTypes.node
};

export default AuthGuard;
