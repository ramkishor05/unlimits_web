import React, { useState } from 'react';

// material-ui
import { Typography } from '@material-ui/core';

// project imports
import NavGroup from './NavGroup';
import menuItem from './../../../../menu-items';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getMenuGroupByRoleId } from '../../../../actions';

//-----------------------|| SIDEBAR MENU LIST ||-----------------------//

const MenuList = () => {
     
    const dispatch= useDispatch();
    const accountReducer = useSelector((state) => state.account);
    const {menuGroups} = useSelector((state) => state.userMenuReducer);
    const [loading, setLoading]=useState(false)
    useEffect(()=>{
        if(accountReducer.userDetail){
            const userRole = accountReducer.userDetail.userRole;
            if(!loading){
                dispatch(getMenuGroupByRoleId(userRole.id));
                setLoading(true);
            }
        }
    },[accountReducer])

    if(accountReducer.userDetail){
        const userRole = accountReducer.userDetail.userRole;
        /*const navItems = menuItem.items.filter(item=>accountReducer.contains(item.id, userRole)).map((item) => {
            switch (item.type) {
                case 'group':
                    return <NavGroup key={item.id} item={item} filter={(itemChildren)=> accountReducer.filter(itemChildren, userRole)} />;
                default:
                    return (
                        <Typography key={item.id} variant="h6" color="error" align="center">
                            Menu Items Error
                        </Typography>
                    );
            }
        });*/

        const navItems = menuGroups.map((item) => {
            switch (item.type) {
                case 'group':
                    return <NavGroup key={item.id} item={item}/>;
                default:
                    return (
                        <Typography key={item.id} variant="h6" color="error" align="center">
                            Menu Items Error
                        </Typography>
                    );
            }
        });

        return navItems;
    } 

    return <></>;
};

export default MenuList;
