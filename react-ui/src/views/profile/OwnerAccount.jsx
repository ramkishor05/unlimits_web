import React, { useState } from 'react';

// material-ui
import { Box, Button, Card, CardContent, CardHeader, Divider, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';

// project imports
import { useDispatch, useSelector } from 'react-redux';

import { getVendor, updateUser} from '../../actions';
import { EditOutlined } from '@material-ui/icons';
import { useEffect } from 'react';

//==============================|| SAMPLE PAGE ||==============================//

const OwnerAccount = () => {
    const dispatch= useDispatch();
    const accountReducer = useSelector((state) => state.account);
    const ownerId=accountReducer.userDetail.ownerId;
    const vendorReducer = useSelector((state) => state.vendorReducer);
    
    const [vendor, setVendor]= useState(vendorReducer.vendor);
    const [loaded, setLoaded]= useState(false);

    const setVendorField= (event, name)=>{
        let newVendor={...vendor};
        newVendor[name]=event.target.value;
        setVendor(newVendor);
    }

    const editVendor=()=>{
        dispatch(updateUser(vendor.id, vendor));
    }

    useEffect(()=>{
        dispatch(getVendor(ownerId));
        if(!loaded){
            setVendor(vendorReducer.vendor);
            setLoaded(true);
        }
    },[getVendor])
    
    return (
            <Box
                component="form"
                noValidate
                autoComplete="off"
                >
                <Card sx={{ border:5 , borderStyle:'revert'}}>
                    <CardHeader title="Owner Account">
                  </CardHeader>
                  <CardContent>
                  <Grid container spacing={1}>
                    <Grid item xl={12} xs={12} xm={12}>
                    <Grid container spacing={3}>
                        <Grid item  xl={4} xs={4} xm={4}>
                            <FormControl fullWidth>
                            <TextField
                                id="vendor-name"
                                label="Name"
                                name='name'
                                defaultValue={vendor.name}
                                variant='standard'
                                onChange={(event)=> setVendorField(event,'name')}
                            />
                            </FormControl>
                        </Grid>
                        <Grid item  xl={4} xs={4} xm={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="vendor-emailAddress"
                                label="Email Address"
                                name='emailAddress'
                                defaultValue={vendor.emailAddress}
                                variant='standard'
                                onChange={(event)=> setVendorField(event,'emailAddress')}
                            />
                            </FormControl>
                        </Grid>
                        <Grid item  xl={4} xs={4} xm={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="vendor-mobileNumber"
                                label="Mobile Number"
                                name='mobileNumber'
                                defaultValue={vendor.mobileNumber}
                                variant='standard'
                                onChange={(event)=> setVendorField(event,'mobileNumber')}
                            />
                            </FormControl>
                        </Grid>
                        <Grid item  xl={4} xs={4} xm={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="vendor-phoneNumber"
                                name='phoneNumber'
                                label="Phone Number"
                                defaultValue={vendor.phoneNumber}
                                variant='standard'
                                onChange={(event)=> setVendorField(event,'phoneNumber')}
                            />
                            </FormControl>
                        </Grid>
                        <Grid item  xl={4} xs={4} xm={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="vendor-permamentAddress"
                                name='permamentAddress'
                                label="Permament Address"
                                defaultValue={vendor.permamentAddress}
                                variant='standard'
                                onChange={(event)=> setVendorField(event,'permamentAddress')}
                            />
                            </FormControl>
                        </Grid>
                        <Grid item  xl={4} xs={4} xm={4}>
                        <FormControl fullWidth>
                            <TextField
                                id="vendor-presentAddress"
                                name='presentAddress'
                                label="Present Address"
                                defaultValue={vendor.presentAddress}
                                variant='standard'
                                onChange={(event)=> setVendorField(event,'presentAddress')}
                            />
                            </FormControl>
                        </Grid>
                    </Grid>
                    </Grid>
                    <Grid item  xl={12} xs={12} xm={12} sx={{textAlign: 'right'}}>
                            <Button variant='contained' onClick={editVendor} ><EditOutlined></EditOutlined></Button>
                        </Grid>
                    </Grid>
                    </CardContent>
                 </Card>
            </Box>
               
    );
};

export default OwnerAccount;
