import React, { useEffect, useState } from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';

import MenuItem from '@mui/material/MenuItem';

import Select from '@mui/material/Select';

import { getCustDashboardList, getCustProductList, getCustPurchaseList, getCustSaleList, getCustBusinessList, getCustCustomerList, getCustEmployeeList, getCustSupplierList, getCustUserList } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { SET_BUSSINESS_ACCOUNT } from '../../store/actions';

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
    
  const { custBusinessList} = useSelector(state => state.custBusinessReducer);

  const {businessId}= useSelector(state => state.accountReducer);

  const dispatch=useDispatch();

  const onSeach = async (event)=>{
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
    value={businessId?businessId : ''}
    onChange={onSeach} sx={{width: '20%', borderStyle:'hidden'}}
  >
    {
        custBusinessList.map((vendorBusiness, index)=><MenuItem key={index} value={vendorBusiness?.id}>{vendorBusiness.name}</MenuItem>)
    }
  </Select>
  );
}

export default BusinessOptions;