import React from 'react';

// material-ui
import { Box, Divider, FormControl, FormLabel, Grid, MenuItem, Select, TextField, Typography } from '@material-ui/core';

// project imports
import MainCard from '../../component/cards/MainCard';
import { useSelector } from 'react-redux';
import UserProfile from './UserProfile';

//==============================|| SAMPLE PAGE ||==============================//

const UserProfilePage = () => {
    const accountReducer = useSelector((state) => state.account);
    const userDetail = accountReducer.userDetail;
    const userProfile = userDetail.userProfile;
    console.log("userDetail=", accountReducer.userDetail)

    return (
        <MainCard title="Profile">
            <UserProfile></UserProfile>
        </MainCard>
    );
};

export default UserProfilePage;
