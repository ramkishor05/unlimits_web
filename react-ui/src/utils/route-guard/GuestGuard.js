import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

// project imports
import config from '../../config';
import { getMenuGroupByRoleId, getUser } from '../../actions';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

//-----------------------|| GUEST GUARD ||-----------------------//

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */
const GuestGuard = ({ children }) => {
    const location = useLocation();

    const { isLoggedIn, defaultPath,token} = useSelector((state) => state.accountReducer);
    const { userDetail }= useSelector((state) => state.userReducer);
    const userRole = userDetail?.userRole;
    const dispatch=useDispatch();
   
    useEffect(()=>{
        if(isLoggedIn && token){
            console.log("useEffect(()=>", token)
            dispatch(getUser(token));
            if(userRole){
               // dispatch(getMenuGroupByRoleId(userRole.id))
            }
            console.log("useEffect(()=>", token)
        }
    },[])

    if (isLoggedIn ) {
        console.log("GuestGuard accountReducer.isLoggedIn==",isLoggedIn)
        console.log("GuestGuard userRole==",userRole)
        if(userRole)
             return <Redirect to={defaultPath(userRole, location, isLoggedIn)} />;
        else
             return <Redirect to={'/login'} />;
    } 
    
    return children;
    
};

GuestGuard.propTypes = {
    children: PropTypes.node
};

export default GuestGuard;
