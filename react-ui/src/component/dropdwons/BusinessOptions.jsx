import React, { useEffect, useState } from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, Box, ButtonBase, Card, CardContent, Grid, InputAdornment, OutlinedInput, Popper } from '@material-ui/core';

// third-party
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';

// project imports
import Transitions from '../extended/Transitions';

// assets
import { IconAdjustmentsHorizontal, IconSearch, IconX } from '@tabler/icons';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import Select from '@mui/material/Select';

import { getVendorBusinessList } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

// style constant
const useStyles = makeStyles((theme) => ({
  searchControl: {
      width: '434px',
      marginLeft: '16px',
      paddingRight: '16px',
      paddingLeft: '16px',
      '& input': {
          background: 'transparent !important',
          paddingLeft: '5px !important'
      },
      [theme.breakpoints.down('lg')]: {
          width: '250px'
      },
      [theme.breakpoints.down('md')]: {
          width: '100%',
          marginLeft: '4px',
          background: '#fff'
      }
  },
  startAdornment: {
      fontSize: '1rem',
      color: theme.palette.grey[500]
  },
  headerAvatar: {
      ...theme.typography.commonAvatar,
      ...theme.typography.mediumAvatar,
      background: theme.palette.secondary.light,
      color: theme.palette.secondary.dark,
      '&:hover': {
          background: theme.palette.secondary.dark,
          color: theme.palette.secondary.light
      }
  },
  closeAvatar: {
      ...theme.typography.commonAvatar,
      ...theme.typography.mediumAvatar,
      background: theme.palette.orange.light,
      color: theme.palette.orange.dark,
      '&:hover': {
          background: theme.palette.orange.dark,
          color: theme.palette.orange.light
      }
  },
  popperContainer: {
      zIndex: 1100,
      width: '99%',
      top: '-55px !important',
      padding: '0 12px',
      [theme.breakpoints.down('sm')]: {
          padding: '0 10px'
      }
  },
  cardContent: {
      padding: '12px !important'
  },
  card: {
      background: '#fff',
      [theme.breakpoints.down('sm')]: {
          border: 0,
          boxShadow: 'none'
      }
  }
}));
const BusinessOptions= (props) =>  {
  const classes = useStyles();

  const { vendorBusinessList} = useSelector(state => state.vendorBusinessReducer);

  const dispatch=useDispatch();

  const [value, setValue] = useState('');

  const onSeach =(event)=>{
      console.log("========onSeach=====")
      setValue(event.target.value);
      console.log("========onSeach=====")
  }

  useEffect(()=>{
    dispatch(getVendorBusinessList());
  },[vendorBusinessList])


  return (
    <React.Fragment>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <PopupState variant="popper" popupId="demo-popup-popper">
                    {(popupState) => (
                        <React.Fragment>
                            <Box
                                sx={{
                                    ml: 2
                                }}
                            >
                                <ButtonBase sx={{ borderRadius: '12px' }}>
                                    <Avatar variant="rounded" className={classes.headerAvatar} {...bindToggle(popupState)}>
                                        <IconSearch stroke={1.5} size="1.2rem" />
                                    </Avatar>
                                </ButtonBase>
                            </Box>
                            <Popper {...bindPopper(popupState)} transition className={classes.popperContainer}>
                                {({ TransitionProps }) => (
                                    <Transitions type="zoom" {...TransitionProps} sx={{ transformOrigin: 'center left' }}>
                                        <Card className={classes.card}>
                                            <CardContent className={classes.cardContent}>
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item xs>
                                                    <Select
                                                    value={value}
                                                    onChange={onSeach}
                                                    displayEmpty
                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                  >
                                                   
                                                    {
                                                        vendorBusinessList.map((vendorBusiness, index)=><MenuItem key={index} selected = {true} value={vendorBusiness.id}>{vendorBusiness.name}</MenuItem>)
                                                    }
                                                    
                                                  </Select>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Transitions>
                                )}
                            </Popper>
                        </React.Fragment>
                    )}
                </PopupState>
            </Box>
             <Select
                value={value}
                onChange={onSeach}
              >
                {
                    vendorBusinessList.map((vendorBusiness, index)=><MenuItem key={index} selected={true} value={vendorBusiness.id}>{vendorBusiness.name}</MenuItem>)
                }
              </Select>
        </React.Fragment>
  );
}

export default BusinessOptions;