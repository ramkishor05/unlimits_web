import React from 'react';

// material-ui
import { Typography } from '@material-ui/core';

// project imports
import NavGroup from './NavGroup';
import menuItem from './../../../../menu-items';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

//-----------------------|| SIDEBAR MENU LIST ||-----------------------//

const MenuList = () => {
     
    const dispatch= useDispatch();
    const accountReducer = useSelector((state) => state.account);

    if(accountReducer.userDetail){
        const userRole = accountReducer.userDetail.userRole;

        //console.log("userRole menu item =", JSON.stringify(accountReducer.urls(menuItem)));

        const navItems = menuItem.items.filter(item=>accountReducer.contains(item.id, userRole)).map((item) => {
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
        });

        return navItems;
    } 

    return <></>;
};

export default MenuList;
