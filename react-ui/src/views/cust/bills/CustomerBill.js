import React from 'react';
import 'date-fns';

// material-ui
import { Avatar, Box, Button, ButtonGroup, Card, CardContent, CardHeader, Divider, FormControl, FormControlUnstyled, FormLabel, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField, Typography } from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import CustomerDropDwon from '../../../component/dropdwons/CustomerDropDwon';
// project imports
import { makeStyles } from '@material-ui/styles';
import ItemDropDwon from '../../../component/dropdwons/ItemDropDwon';
import { 
    getCustProductList
 } from '../../../actions';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchProducts } from "../sales/dataApi";
import ShoppingCartButton from '../../../component/buttons/ShoppingCartButton';
import { FreeBreakfastOutlined, Label } from '@material-ui/icons';
import AdditionalCharges from '../../../component/fields/AdditionalCharges';


//==============================|| SAMPLE PAGE ||==============================//
const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));
const CustomerBill = () => {

    const [productData, setProductData] = useState([]);

    const [selectedItems, setSelectedItems] = useState([]);

    const [addAdditionalChargeList, setAddAdditionalChargeList]=useState([]);

    const fetchData = async () => {
        await fetchProducts()
        .then((data) => {
            setProductData(data);
        })
        .catch((e) => {
            console.error(e);
        });
    };

    useEffect(()=>{
        fetchData();
    },[])

    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const itemAction=(newValue)=>{
        const newSelectedItems = [...selectedItems];
        newValue['qnt']=1;
        newSelectedItems.push(newValue);
        setSelectedItems(newSelectedItems);
        console.log("select item= ",newSelectedItems);
    }

    const itemQnt=(object, qnt)=>{
        console.log("select qnt= ",qnt);
        console.log("select item= ",object);
    }

    const getSelectedItems=()=>{
        return (
        <>
            {
            <>
            <ListItem alignItems="flex-start" key={'selectedItem_header'} >
                <ListItemText key={'selectedItem_'+0+'_image'}  sx={{width: '10%', textAlign:'left'}} >
                Image
                </ListItemText>
                <ListItemText key={'selectedItem_'+0+'_title'} sx={{textJustify: 'auto' , width: '50%', maxWidth:'50%', textAlign:'left'}}>Title</ListItemText>
                <ListItemText key={'selectedItem_'+0+'price'} sx={{textJustify: 'auto' , width: '20%', textAlign:'left'}}>Price</ListItemText>
                <ListItemText key={'selectedItem_'+0+'qnt'} sx={{textJustify: 'auto' , width: '20%', textAlign:'left'}}>Qnt</ListItemText>
            </ListItem>
            {
            selectedItems && selectedItems.map(selectedItem=>
                <ListItem alignItems="flex-start" key={'selectedItem_'+selectedItem.id}>
                    <ListItemAvatar key={'selectedItem_'+selectedItem.id+'image'} sx={{textJustify: 'auto' , width: '10%'}}>
                        <Avatar alt="Remy Sharp" src={selectedItem.image} />
                    </ListItemAvatar>
                    <ListItemText key={'selectedItem_'+selectedItem.id+'_title'} sx={{textJustify: '40%', maxWidth:'50%' , width: '50%'}}>{selectedItem.title}</ListItemText>
                    
                    <ListItemText key={'selectedItem_'+selectedItem.id+'price'} sx={{textJustify: 'auto' , maxWidth:'10%' , width: '20%'}}>{selectedItem.price}</ListItemText>
                    <ShoppingCartButton sx={{ textJustify: 'auto' ,width: '10%',maxWidth:'10%' ,}} counter={selectedItem.qnt} updateCounter={(counter)=>itemQnt(selectedItem, counter )}></ShoppingCartButton>
                </ListItem>
            )}
           </>
            }
        </>
        )
    }

    const getSelectedCarts=()=>{
        return (
        <>
            {
                <>
                <ListItem alignItems="flex-start" key={1000}>
                    Sub Total : 
                    {
                        selectedItems && selectedItems.reduce((previousValue, currentValue) => {
                            return previousValue + currentValue.qnt * currentValue.price;
                        }, 0)
                  }
                </ListItem>
                <ListItem>
                    Discounts : <TextField variant='standard'></TextField>
                </ListItem>
                <ListItem><AdditionalCharges list={addAdditionalChargeList} onSave={setAddAdditionalChargeList}></AdditionalCharges></ListItem>
                <ListItem>
                    <List>
                     {
                        addAdditionalChargeList.map(addAdditionalCharge=>
                            <ListItem alignItems="flex-start" key={'addAdditionalCharge'+addAdditionalCharge.key}>
                                <ListItemText key={'addAdditionalCharge'+addAdditionalCharge.key+'_txt'} 
                                sx={{textSizeAdjust: 100, width:100}}>{addAdditionalCharge.key} : </ListItemText>
                                <ListItemText key={'addAdditionalCharge'+addAdditionalCharge.value+'_txt'} 
                                sx={{textSizeAdjust: 100, width:100}}>{addAdditionalCharge.value}</ListItemText>
                            </ListItem>
                        )
                     }
                     </List>
                </ListItem>
                </>
            }
        </>
        )
    }

    const getTotalBill = () =>{
        let subTotal=  selectedItems && selectedItems.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.qnt * currentValue.price;
        }, 0);
        let addAdditionalChargeTotal= addAdditionalChargeList && addAdditionalChargeList.reduce((previousValue, currentValue) => {
            return previousValue + Number.parseFloat(currentValue.value);
        }, 0);
        return subTotal+addAdditionalChargeTotal;
    }

    return (
        <>
        <Card variant="outlined">
           <CardHeader title="Customer Bill" >  </CardHeader>
            <Divider />
           <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={3}>
                        <TextField
                            id="datetime-local"
                            label="Bill Date"
                            type="datetime-local"
                            defaultValue="2017-05-24T10:30"
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                        <CustomerDropDwon label="Bill to"></CustomerDropDwon>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <ItemDropDwon label="Items" items={productData} itemAction={itemAction}></ItemDropDwon>
                    </Grid>
                    
                </Grid>

            </CardContent>
            <Divider />
            
        </Card>
         <Card variant="outlined">
            <CardHeader title="Customer Bill" >  </CardHeader>
            <Divider />
                <CardContent>
                    <Grid container spacing={2} >
                        <Grid item xs={12} sm={12} md={8}>
                             <List sx={{border:1, borderStyle: 'groove'}}
                                style={{
                                    minWidth: '20%',
                                    maxWidth: '100%',
                                    minHeight: '100%',
                                    maxHeight: 350,
                                    overflowX: 'auto'
                                }}>
                                {
                                    getSelectedItems()
                                }
                            </List>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                             <List sx={{border:1, borderStyle: 'groove'}}
                                style={{
                                    minWidth: '20%',
                                    maxWidth: 500,
                                    minHeight: '10%',
                                    maxHeight: 350,
                                    overflowX: 'auto'
                                }}>
                                {
                                    getSelectedCarts()
                                }
                            </List>
                            <List sx={{border:1, borderStyle: 'groove'}}
                             style={{
                                minWidth: '20%',
                                maxWidth: 500,
                                minHeight: '10%',
                                maxHeight: 350,
                                overflowX: 'auto'
                            }}>
                                <ListItem>
                                    <Grid container spacing={2}>
                                        <Grid item  sx={{textAlign: 'left'}} xs={12} sm={12} md={3}>
                                            <Button variant='outlined'>Total Bill : {getTotalBill()}</Button>
                                        </Grid>
                                        <Grid item xs={6} sx={{textAlign: 'right'}}>
                                        <Button variant='outlined'>Bill</Button>
                                        </Grid>
                                    </Grid>
                            </ListItem>
                            </List>
                        </Grid>
                </Grid>
                </CardContent>
         </Card>
         </>
    );
};

export default CustomerBill;
