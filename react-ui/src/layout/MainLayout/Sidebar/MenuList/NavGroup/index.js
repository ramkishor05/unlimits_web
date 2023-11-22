import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Divider, List, ListItemIcon, Typography } from '@material-ui/core';

// project imports
import NavItem from './../NavItem';
import NavCollapse from './../NavCollapse';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { useSelector } from 'react-redux';
import { IconMapper } from '../../../../../constants/IconMapper';

// style constant
const useStyles = makeStyles((theme) => ({
    menuCaption: {
        ...theme.typography.menuCaption
    },
    subMenuCaption: {
        ...theme.typography.subMenuCaption
    },
    menuDivider: {
        marginTop: '2px',
        marginBottom: '10px'
    }
}));

//-----------------------|| SIDEBAR MENU LIST GROUP ||-----------------------//

const NavGroup = ({ item , filter }) => {
    const customization = useSelector((state) => state.customization);
    const level=1;
    const classes = useStyles();

    // menu list collapse & items
    const items = filter? filter(item.menuItems).map((menu) => {
        switch (menu.type) {
            case 'collapse':
                return <NavCollapse key={menu.id} menu={menu} level={1} />;
            case 'item':
                return <NavItem key={menu.id} item={menu} level={1} />;
            default:
                return (
                    <Typography key={menu.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    }):item.menuItems?  item.menuItems.map((menu) => {
        switch (menu.type) {
            case 'collapse':
                return <NavCollapse key={menu.id} menu={menu} level={1} />;
            case 'item':
                return <NavItem key={menu.id} item={menu} level={1} />;
            default:
                return (
                    <Typography key={menu.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    }) :[];

    const Icon = IconMapper[item.icon];
    const itemIcon = IconMapper[item.icon] ? (
        <Icon stroke={1.5} size="1.3rem" className={classes.listCustomIcon} />
    ) : (
        <FiberManualRecordIcon
            className={
                customization.isOpen.findIndex((id) => id === item.id) > -1 ? classes.listCustomIconSubActive : classes.listCustomIconSub
            }
            fontSize={level > 0 ? 'inherit' : 'default'}
        />
    );

    let itemIconClass = !item.icon ? classes.listIcon : classes.menuIcon;
    itemIconClass = customization.navType === 'nav-dark' ? [itemIconClass, classes.listCustomIcon].join(' ') : itemIconClass;


    return (
        <React.Fragment>
            <List
                subheader={
                    item.title && (
                        <>
                         
                        <Typography variant="caption" className={classes.menuCaption} display="block" gutterBottom>
                           {
                            item.url? 
                            <Link to={item.url}>
                            {itemIcon}{item.title}
                           </Link>
                           : <>
                           {itemIcon}{item.title}
                           
                            {item.caption && (
                                <Typography variant="caption" className={classes.subMenuCaption} display="block" gutterBottom>
                                    {item.caption}
                                </Typography>
                            )}
                            </>
                }
                        </Typography>
                        </>
                    )
                }
            >
                {items}
            </List>

            {/* group divider */}
            <Divider className={classes.menuDivider} />
        </React.Fragment>
    );
};

NavGroup.propTypes = {
    item: PropTypes.object
};

export default NavGroup;
