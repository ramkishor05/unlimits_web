import React, { useState } from 'react';

// material-ui
import { Box, Button, Card, CardContent, CardHeader, Divider, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';

// project imports
import { useDispatch, useSelector } from 'react-redux';

import { updateUser} from '../../actions';
import { EditOutlined } from '@material-ui/icons';
import { useEffect } from 'react';

//==============================|| SAMPLE PAGE ||==============================//

const UserAccount = () => {
    const dispatch= useDispatch();
    const accountReducer = useSelector((state) => state.account);
    const [userDetail, setUserDetail]= useState(accountReducer.userDetail);

    const setUserDetailField= (event, name)=>{
        let newUserDetail={...userDetail};
        newUserDetail[name]=event.target.value;
        setUserDetail(newUserDetail);
    }

    const editUserDetail=()=>{
        dispatch(updateUser(userDetail.id, userDetail));
    }

    useEffect(()=>{
        
    },[])
    
    return (
            <Box
                component="form"
                noValidate
                autoComplete="off"
                >
                   <Card sx={{ border:5 , borderStyle:'revert'}}>
                    <CardHeader title="User Account">
                  </CardHeader>
                  <CardContent>
                  <Grid container spacing={1}>
                    <Grid item xl={12} xs={12} xm={12}>
                    <Grid container spacing={3}>
                        <Grid item  xl={4} xs={4} xm={4}>
                            <FormControl fullWidth>
                            <TextField
                                id="userDetail-username"
                                label="Username"
                                name='username'
                                defaultValue={userDetail.username}
                                variant='standard'
                                onChange={(event)=> setUserDetailField(event,'username')}
                            />
                            </FormControl>
                        </Grid>
                        <Grid item  xl={4} xs={4} xm={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="userDetail-password"
                                label="Password"
                                name='password'
                                type='password'
                                defaultValue={userDetail.password}
                                variant='standard'
                                onChange={(event)=> setUserDetailField(event,'password')}
                            />
                            </FormControl>
                        </Grid>
                        <Grid item  xl={4} xs={4} xm={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="userDetail-mobile"
                                label="Registered Mobile"
                                name='mobile'
                                defaultValue={userDetail.mobile}
                                variant='standard'
                                onChange={(event)=> setUserDetailField(event,'mobile')}
                            />
                            </FormControl>
                        </Grid>
                        <Grid item  xl={4} xs={4} xm={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="userDetail-email"
                                name='email'
                                label="Registered email"
                                defaultValue={userDetail.email}
                                variant='standard'
                                onChange={(event)=> setUserDetailField(event,'email')}
                            />
                            </FormControl>
                        </Grid>
                        <Grid item  xl={4} xs={4} xm={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="userDetail-accountName"
                                name='accountName'
                                label="Account Name"
                                defaultValue={userDetail.accountName}
                                variant='standard'
                                onChange={(event)=> setUserDetailField(event,'accountName')}
                            />
                            </FormControl>
                        </Grid>
                        <Grid item  xl={4} xs={4} xm={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="userDetail-type"
                                name='type'
                                label="Registered type"
                                defaultValue={userDetail.type}
                                variant='standard'
                                onChange={(event)=> setUserDetailField(event,'type')}
                            />
                            </FormControl>
                        </Grid>
                    </Grid>
                    </Grid>
                    <Grid item  xl={12} xs={12} xm={12} sx={{textAlign: 'right'}}>
                            <Button variant='contained' onClick={editUserDetail} ><EditOutlined></EditOutlined></Button>
                        </Grid>
                    </Grid>
                    </CardContent>
                 </Card>
            </Box>
               
    );
};

export default UserAccount;
