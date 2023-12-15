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
    const {isLoggedIn, token, defaultPath }= useSelector((state) => state.accountReducer);
    const {userDetail}= useSelector((state) => state.userReducer);
    const userRole = userDetail?.userRole;
    console.log("AuthGuard isLoggedIn==",isLoggedIn)

    useEffect(()=>{
        if(isLoggedIn){
            dispatch(getUser(token));
            if(userRole){
                dispatch(getMenuGroupByRoleId(userRole.id))
            }
        }
    },[getUser])
    if (!isLoggedIn) {
        return <Redirect to="/login" />;
    }
    return children;
};

AuthGuard.propTypes = {
    children: PropTypes.node
};

export default AuthGuard;
