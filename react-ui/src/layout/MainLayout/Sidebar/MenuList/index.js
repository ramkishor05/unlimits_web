import React, { useState } from 'react';

// material-ui
import { Typography } from '@material-ui/core';

// project imports
import NavGroup from './NavGroup';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

//-----------------------|| SIDEBAR MENU LIST ||-----------------------//

const MenuList = () => {
    const {userDetail} = useSelector((state) => state.userReducer);
    const userMenuGroupReducer = useSelector((state) => state.userMenuGroupReducer);
   // let userRole=userDetail?.userRole;
   
    return userMenuGroupReducer.userMenuGroups.map((item) => {
        console.log("userDetail=",userDetail?.onBoarding)
        let onBoarding=userDetail.onBoarding;
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} onBoarding = {onBoarding}/>;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });
};

export default MenuList;
