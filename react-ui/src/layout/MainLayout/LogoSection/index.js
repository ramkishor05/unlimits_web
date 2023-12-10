import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@material-ui/core';

// project imports

import Logo from './../../../component/Logo';
import { useSelector } from 'react-redux';

//-----------------------|| MAIN LOGO ||-----------------------//

const LogoSection = () => {
    const account = useSelector((state) => state.account);

    return (
        <ButtonBase disableRipple component={Link} to={account.defaultPath(account?.userDetail?.userRole)}>
            <Logo />
        </ButtonBase>
    );
};

export default LogoSection;
