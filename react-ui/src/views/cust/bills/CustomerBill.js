import React from 'react';
import 'date-fns';

// material-ui
import { Avatar, Box, Card, CardContent, CardHeader, Divider, FormControl, FormControlUnstyled, FormLabel, Grid, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import CustomerDropDwon from '../../../ui-component/dropdwons/CustomerDropDwon';
// project imports
import { makeStyles } from '@material-ui/styles';
import ItemDropDwon from '../../../ui-component/dropdwons/ItemDropDwon';
import { 
    getCustProductList
 } from '../../../actions';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchProducts } from "../sales/dataApi";
import ShoppingCartButton from '../../../ui-component/buttons/ShoppingCartButton';
import { FreeBreakfastOutlined, Label } from '@material-ui/icons';


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
            selectedItems && selectedItems.map(selectedItem=>
                <ListItem alignItems="flex-start" key={selectedItem.title}>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={selectedItem.image} />
                    </ListItemAvatar>
                    <ListItemText key={selectedItem.id}>{selectedItem.title}
                    </ListItemText>
                    <ShoppingCartButton counter={selectedItem.qnt} updateCounter={(counter)=>itemQnt(selectedItem, counter )}></ShoppingCartButton>
                </ListItem>
            )}
        </>
        )
    }

    const getSelectedCarts=()=>{
        return (
        <>
            {
            selectedItems && selectedItems.map(selectedItem=>
                <ListItem alignItems="flex-start" key={selectedItem.title}>
                    <ListItemAvatar sx={{maxWidth:50, textJustify:'auto'}}>
                        <Avatar alt="Remy Sharp" src={selectedItem.image} />
                    </ListItemAvatar>
                    <ListItemText sx={{maxWidth:100, textJustify:'auto'}} key={selectedItem.id}>{selectedItem.title}
                    </ListItemText>
                    <ListItemText sx={{maxWidth:50, textJustify:'auto'}} key={selectedItem.id}>{selectedItem.qnt}
                    </ListItemText>
                    <ListItemText sx={{maxWidth:50, textJustify:'auto'}} key={selectedItem.id}>{selectedItem.price * selectedItem.qnt}
                    </ListItemText>
                </ListItem>
            )}
        </>
        )
    }

    return (
        <Card variant="outlined">
           <CardHeader title="Customer Bill" >  </CardHeader>
           
           <Divider />
           <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <CustomerDropDwon label="Bill to"></CustomerDropDwon>
                    </Grid>
                    <Grid item xs={6}>
                        <ItemDropDwon label="Items" items={productData} itemAction={itemAction}></ItemDropDwon>
                    </Grid>
                    <Grid item xs={3}>
                            <React.Fragment>
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
                        </React.Fragment>
                    </Grid>
                </Grid>
                <Grid container spacing={2} >
                    <Grid item xs={6}>
                        <div style={{border:5}}>
                            <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
                            {
                                getSelectedItems()
                            }
                            </List>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div style={{border:5}}>
                            <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
                            {
                                getSelectedCarts()
                            }
                            </List>
                        </div>
                    </Grid>
               </Grid>
            </CardContent>
        </Card>
    );
};

export default CustomerBill;
