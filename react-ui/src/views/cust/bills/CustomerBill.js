import React from 'react';
import 'date-fns';

// material-ui
import { Avatar, Box, Button, ButtonGroup, Card, CardContent, CardHeader, Divider, FormControl, FormControlUnstyled, FormLabel, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Table, TableCell, TableRow, TextField, Typography } from '@material-ui/core';
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
import DynamicField from '../../../component/fields/DynamicField';


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
       
            <Table sx={{border:1, borderStyle: 'groove'}}>
            <TableRow alignItems="flex-start" key={'selectedItem_header'} >
                <TableCell key={'selectedItem_'+0+'_image'} >
                Image
                </TableCell>
                <TableCell key={'selectedItem_'+0+'_title'}>Title</TableCell>
                <TableCell key={'selectedItem_'+0+'price'}>Price</TableCell>
                <TableCell >Discount</TableCell>
                <TableCell key={'selectedItem_'+0+'qnt'}>Qnt</TableCell>
            </TableRow>
            {
            selectedItems && selectedItems.map(selectedItem=>
                <TableRow key={'selectedItem_'+selectedItem.id}>
                    <TableCell key={'selectedItem_'+selectedItem.id+'image'}>
                        <Avatar alt="Remy Sharp" src={selectedItem.image} />
                    </TableCell>
                    <TableCell key={'selectedItem_'+selectedItem.id+'_title'} >
                        {selectedItem.title}
                    </TableCell>
                    <TableCell key={'selectedItem_'+selectedItem.id+'price'}>
                        {selectedItem.price}
                    </TableCell>
                    <TableCell key={'selectedItem_'+selectedItem.id+'discount'}>
                        <TextField variant='standard'></TextField>
                    </TableCell>
                    <TableCell>
                        <ShoppingCartButton  
                            counter={selectedItem.qnt} 
                            updateCounter={(counter)=>itemQnt(selectedItem, counter )}>
                        </ShoppingCartButton>
                    </TableCell>
                </TableRow>
            )}
             <TableRow key={1000}>
             <TableCell colSpan={5} align='right'>
             Sub Total : 
               {
                    selectedItems && selectedItems.reduce((previousValue, currentValue) => {
                        return previousValue + currentValue.qnt * currentValue.price;
                    }, 0)
               }
            </TableCell>
            </TableRow>
            <TableRow>
            <TableCell colSpan={3} align='right'>
                <List>
                    <ListItem>
                        Discounts : <TextField variant='standard'></TextField>
                    </ListItem>
                 </List>
            </TableCell>
            
            <TableCell colSpan={2} align='right'>
            <List>
                    <ListItem>
                        <DynamicField list={addAdditionalChargeList} onSave={setAddAdditionalChargeList}></DynamicField>
                     </ListItem>
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
                    </List>
            </TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={5}>
                        <Grid container spacing={2}>
                            <Grid item  sx={{textAlign: 'left'}} xs={12} sm={12} md={6}>
                                <Button variant='text'>Total Bill : {getTotalBill()}</Button>
                            </Grid>
                            <Grid item  sx={{textAlign: 'right'}} xs={12} sm={12} md={6}>
                                <Button variant='contained'>Bill Generate</Button>
                            </Grid>
                        </Grid>
                </TableCell>
            </TableRow>

           </Table>
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
        <Card variant="elevation">
           <CardHeader title="Bill Information" >  </CardHeader>
            <Divider />
           <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={3}>
                        <TextField
                            id="datetime-local"
                            label="Bill Date"
                            variant='standard'
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
                    <Grid item xs={12} sm={12} md={12}>
                            {
                                getSelectedItems()
                            }
                    </Grid>
                </Grid>
            </CardContent>
         </Card>
         </>
    );
};

export default CustomerBill;
