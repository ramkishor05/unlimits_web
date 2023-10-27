import React, { Component } from 'react';
import 'date-fns';

import moment from 'moment';
import useMediaQuery from '@mui/material/useMediaQuery';


// material-ui
import { Avatar, Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, List, ListItem, ListItemText, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography} from '@material-ui/core';
import CustomerDropDwon from '../../../component/dropdwons/CustomerDropDwon';
// project imports
import { makeStyles, styled } from '@material-ui/styles';
import ItemDropDwon from '../../../component/dropdwons/ItemDropDwon';
import { 
    getCustProductList, getVendorCustomerList, addCustSale
 } from '../../../actions';

import ShoppingCartButton from '../../../component/buttons/ShoppingCartButton';
import DynamicField from '../../../component/fields/DynamicField';
import { connect } from 'react-redux';
import { GridCloseIcon } from '@mui/x-data-grid';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

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
    root: {
        width: '100%',
      },
      container: {
        maxHeight: 440,
      }
  }));

  class CustomerBill extends Component {

    state = {
        productData : [],
        selectedItems: [],
        addAdditionalChargeList:[],
        billDate: moment(new Date()).format("YYYY-MM-DDThh:mm"),
        customerId: 0,
        userId: 0,
        discounts : 0,
        custProductRetailSaleMap: {},
        custProductWholeSaleMap: {}
    }

    componentDidMount() {
        this.props.getVendorCustomerList();
        this.props.getCustProductList(); 
    }

    changeBillDate = (event) => {
        this.setState({billDate: event.target.value});
    };

    setDiscounts = (event) => {
        console.log(event)
        this.setState({discounts: event.target.value});
    };

     itemAction=(custProduct)=>{
        if(custProduct){
            const newSelectedItems = [...this.state.selectedItems];
            custProduct['qnt']=1;
            custProduct['discount']=0;
            newSelectedItems.push(custProduct);
            this.state.custProductRetailSaleMap[custProduct.id]=custProduct;
            this.setState({selectedItems: newSelectedItems});
            this.setState({custProductRetailSaleMap: this.state.custProductRetailSaleMap});
        }
    }

    customerAction=(customer)=>{
        if(customer){
            this.setState({customerId: customer.id});
        } else{
            this.setState({customerId: null});
        }
    }

     itemQnt=(item, qnt)=>{
        item['qnt']=qnt;
        const newSelectedItems = [...this.state.selectedItems];
        this.setState({selectedItems: newSelectedItems});
        console.log("qnt=",qnt)
    }

    setSelectedDate=()=>{

    }

    setProductData= () =>{

    }
    
    setAddAdditionalChargeList=(formValues)=>{
        this.setState({addAdditionalChargeList:formValues});
    }

    setDiscount=(item, amount)=>{
        item['discount']=amount;
        const newSelectedItems = [...this.state.selectedItems];
        this.setState({selectedItems: newSelectedItems, discounts: this.getDiscounts()});
    }

    getDiscounts=()=>{
        let discountTotal=this.state.selectedItems && this.state.selectedItems.reduce((previousValue, currentValue) => {
            console.log("currentValue=",currentValue)
            return previousValue + Number.parseFloat(currentValue.discount);
        }, 0)
        return discountTotal;
     }

     getSelectedItems=()=>{
        return (
       <TableContainer className={useStyles.container}>
        <Table stickyHeader  sx={{border:1, borderStyle: 'groove'}}>
            <TableHead stickyHeader>
                <TableRow alignItems="flex-start" key={'selectedItem_header'} >
                    <TableCell key={'selectedItem_'+0+'_image'} >
                    Image
                    </TableCell>
                    <TableCell key={'selectedItem_'+0+'_title'}>Title</TableCell>
                    <TableCell key={'selectedItem_'+0+'price'}>Price</TableCell>
                    <TableCell >Discount</TableCell>
                    <TableCell key={'selectedItem_'+0+'qnt'}>Qnt</TableCell>
                </TableRow>
            </TableHead>
            <TableBody sx={{overflowX : true, maxHeight:50}}>
            {
            this.state.custProductRetailSaleMap && this.state.selectedItems.map(selectedItem=>
                <TableRow key={'selectedItem_'+selectedItem.id}>
                    <TableCell key={'selectedItem_'+selectedItem.id+'image'}>
                        <Avatar alt="Remy Sharp" src={selectedItem.image} />
                    </TableCell>
                    <TableCell key={'selectedItem_'+selectedItem.id+'_title'} >
                        {selectedItem.title}
                    </TableCell>
                    <TableCell key={'selectedItem_'+selectedItem.id+'price'}>
                        {selectedItem.retailPrice.price}
                    </TableCell>
                    <TableCell key={'selectedItem_'+selectedItem.id+'discount'}>
                        <TextField type='number' variant='standard' onChange={(event)=> this.setDiscount(selectedItem, event.target.value)}></TextField>
                    </TableCell>
                    <TableCell>
                        <ShoppingCartButton  
                            counter={selectedItem.qnt} 
                            updateCounter={(counter)=> this.itemQnt(selectedItem, counter )}>
                        </ShoppingCartButton>
                    </TableCell>
                </TableRow>
            )}
             <TableRow key={1000}>
             <TableCell colSpan={5} align='right'>
             Sub Total : 
               {
                    this.state.selectedItems && this.state.selectedItems.reduce((previousValue, currentValue) => {
                        return previousValue + currentValue.qnt * currentValue.retailPrice.price;
                    }, 0)
               }
            </TableCell>
            </TableRow>
            <TableRow sx={{maxHeight:200, overflowX : true, overflowY : true}}>
            <TableCell colSpan={3} align='right'>
                <List>
                    <ListItem>
                        Discounts : <TextField value={this.getDiscounts()} defaultValue={this.getDiscounts()} onChange={this.setDiscounts} variant='standard'></TextField>
                    </ListItem>
                 </List>
            </TableCell>
            
            <TableCell colSpan={2} align='right'>
            <List>
                    <ListItem>
                        <DynamicField list={this.state.addAdditionalChargeList} onSave={this.setAddAdditionalChargeList}></DynamicField>
                     </ListItem>
                     <ListItem>
                        <List>
                        {
                            this.state.addAdditionalChargeList.map(addAdditionalCharge=>
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
            
            </TableBody>
        </Table>
        </TableContainer>
        )
    }

    

     getTotalBill = () =>{
        let subTotal=  this.state.selectedItems && this.state.selectedItems.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.qnt * currentValue.retailPrice.price;
        }, 0);
        let addAdditionalChargeTotal= this.state.addAdditionalChargeList && this.state.addAdditionalChargeList.reduce((previousValue, currentValue) => {
            return previousValue + Number.parseFloat(currentValue.value);
        }, 0);
        let discountTotal= this.state.selectedItems && this.state.selectedItems.reduce((previousValue, currentValue) => {
            return previousValue + Number.parseFloat(currentValue.discount);
        }, 0);
        return subTotal+addAdditionalChargeTotal-discountTotal;
    }

    addBill = () =>{
        console.log("this.state",this.state)
        let custProductSale = {
            customerId: this.state.customerId,
            discounts: this.state.discounts,
            wholeSaleTotals: 1.0,
            wholeSaleQnt: 1,
            retailSaleTotals: 1.0,
            retailSaleQnt:1,
            custProductRetailSaleList: [],
            custProductWholeSaleList: []
        }
        Object.entries(this.state.custProductRetailSaleMap).forEach(([productId,item])=>{
            let custProductRetailSale={
                name: item.name,
                desc: item.desc,
                purchasePrice: item.purchasePrice,
                purchaseUnitId: 1,
                retailQnt: item.qnt,
                retailPrice: item.retailPrice,
                retailUnitId: 1,
                custProductId: productId
            }
            custProductSale.custProductRetailSaleList.push(custProductRetailSale);
        })
        Object.entries(this.state.custProductWholeSaleMap).forEach(([productId,custProductWholeSale])=>{
            custProductSale.custProductWholeSaleList.push(custProductWholeSale);
        })
        
        this.props.addCustSale(custProductSale);
    }

    render() {

    const { open, close} = this.props;

    return (
        <BootstrapDialog
            aria-labelledby="Add Sale"
            aria-describedby="Modal for adding sales"
            open={open}
            onClose={close}
            maxWidth={'lg'}
            fullWidth={true}
        >
            <DialogTitle id="form-dialog-title">
                    <Typography variant="h2" component="h2">                
                    Add sale 
                    </Typography>
            </DialogTitle>
            <IconButton
            aria-label="close"
            onClick={close}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
            }}
            >
            <GridCloseIcon />
            </IconButton>
            <Divider></Divider>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={3}>
                        <TextField
                            id="datetime-local"
                            label="Bill Date"
                            variant='standard'
                            type="datetime-local"
                            defaultValue={this.state.billDate}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            onChange={this.changeBillDate}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                        <CustomerDropDwon label="Bill to" customerList = {this.props.vendorCustomerList} customerAction={this.customerAction}></CustomerDropDwon>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <ItemDropDwon label="Items" items={this.props.custProductList} itemAction={this.itemAction}></ItemDropDwon>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                            <div >
                            {
                                this.getSelectedItems()
                            }
                            </div>
                    </Grid>
                </Grid>
            </DialogContent>
            <Divider></Divider>
            <DialogActions>
                <Grid container spacing={2} padding={2}>
                    <Grid item  sx={{textAlign: 'left'}} xs={12} sm={12} md={6}>
                        <Button variant='text'>Total Bill : {this.getTotalBill()}</Button>
                    </Grid>
                    <Grid item  sx={{textAlign: 'right'}} xs={12} sm={12} md={6}>
                        <Button variant='contained' onClick={this.addBill}>Bill Generate</Button>
                    </Grid>
                </Grid>
            </DialogActions>
         </BootstrapDialog>
    );
};
  }



const styles = {
    addSaleButton: {
        color: '#FFF',
        backgroundColor: 'purple',
        marginLeft: 20, 
    },
    datepickers: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'center',
    }
};


const mapStateToProps = state => {
    const { custProductList } = state.custProductReducer;

    const { vendorCustomerList } = state.vendorCustomerReducer;

    return { custProductList, vendorCustomerList };
}

export default connect(mapStateToProps, { getCustProductList, getVendorCustomerList, addCustSale})(CustomerBill);