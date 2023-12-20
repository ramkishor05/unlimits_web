import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, Box, ButtonBase } from '@material-ui/core';

// project imports
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';
import { getUser } from '../../../actions/UserActions';

// assets
import { IconMenu2 } from '@tabler/icons';
import { useSelector } from 'react-redux';
import BusinessOptions from '../../../component/dropdwons/BusinessOptions';
import { ItemMapper } from '../../../constants/ItemMapper';

// style constant
const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1
    },
    headerAvatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        transition: 'all .2s ease-in-out',
        background: theme.palette.secondary.light,
        color: theme.palette.secondary.dark,
        '&:hover': {
            background: theme.palette.secondary.dark,
            color: theme.palette.secondary.light
        }
    },
    boxContainer: {
        width: '228px',
        display: 'flex',
        [theme.breakpoints.down('md')]: {
            width: 'auto'
        }
    }
}));

//-----------------------|| MAIN NAVBAR / HEADER ||-----------------------//

const Header = ({ handleLeftDrawerToggle }) => {
    const userMenuGroupReducer = useSelector((state) => state.userReducer);
    let userRole=userMenuGroupReducer?.userDetail?.userRole;
    let headerItems = userRole? userRole.roleHeaderItems: [];
    const classes = useStyles();

    const getHeaderItem= (headerItem)=>{
       let Section = ItemMapper[headerItem.title];
       if(Section){
          return  <>
            <div className={classes.grow} />
            <Section metadata={headerItem}></Section>
            </>
       }
       return "";
    }
   
    return (
        <React.Fragment>
            {/* logo & toggler button */}
            <div className={classes.boxContainer}>
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection />
                </Box>
                <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <Avatar variant="rounded" className={classes.headerAvatar} onClick={handleLeftDrawerToggle} color="inherit">
                        <IconMenu2 stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
                
            </div>
            
            {/* header search */}
            {
               headerItems.map(headerItem=> getHeaderItem(headerItem))
            }
            
        </React.Fragment>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
