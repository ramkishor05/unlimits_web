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

import { getCustDashboardList, getCustProductList, getCustPurchaseList, getCustSaleList, getCustBusinessList, getCustCustomerList, getCustEmployeeList, getCustSupplierList, getCustUserList } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { SET_BUSSINESS_ACCOUNT } from '../../store/actions';
import Loader from '../Loader';

import { REMOVE_LOADER, SHOW_LOADER } from '../../types';

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
      zIndex: 100,
      width: '99%',
      top: '55px !important',
      padding: '0px',
      [theme.breakpoints.down('sm')]: {
          padding: '0px'
      }
  },
  cardContent: {
      padding: '1px !important'
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

  const { custBusinessList} = useSelector(state => state.custBusinessReducer);

  const accountReducer= useSelector(state => state.accountReducer);

  const dispatch=useDispatch();



  const [value, setValue] = useState(accountReducer.businessId);

  const onSeach = async (event)=>{
      setValue(event.target.value);
      dispatch({ type: SET_BUSSINESS_ACCOUNT, payload: event.target.value});
      dispatch(getCustDashboardList());
      // vendors
      dispatch(getCustBusinessList());
      dispatch(getCustEmployeeList());
      dispatch(getCustCustomerList());
      dispatch(getCustSupplierList());
      dispatch(getCustUserList());

      // order 
      dispatch(getCustSaleList());
      dispatch(getCustPurchaseList());

      // items
      dispatch(getCustProductList());
      

  }

  useEffect(()=>{
     dispatch(getCustBusinessList());
  },[getCustBusinessList])


  return (
    <Select variant='standard'
    value={value? value: ''}
    onChange={onSeach} sx={{width: '20%', borderStyle:'hidden'}}
  >
    {
        custBusinessList.map((vendorBusiness, index)=><MenuItem key={index} selected={vendorBusiness.id===value} value={vendorBusiness?.id}>{vendorBusiness.name}</MenuItem>)
    }
  </Select>
  );
}

export default BusinessOptions;