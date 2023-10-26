import React, { Component } from 'react';
import 'date-fns';

// material-ui
import { Avatar, Button, Card, CardContent, CardHeader, Divider, Grid, List, ListItem, ListItemText, Table, TableCell, TableRow, TextField} from '@material-ui/core';
import CustomerDropDwon from '../../../component/dropdwons/CustomerDropDwon';
// project imports
import { makeStyles } from '@material-ui/styles';
import ItemDropDwon from '../../../component/dropdwons/ItemDropDwon';
import { 
    getCustProductList, getVendorCustomerList
 } from '../../../actions';

import { fetchProducts } from "../sales/dataApi";
import ShoppingCartButton from '../../../component/buttons/ShoppingCartButton';
import DynamicField from '../../../component/fields/DynamicField';
import { connect } from 'react-redux';


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

  class CustomerBill extends Component {

    state = {
        productData : [],
        selectedItems: [],
        addAdditionalChargeList:[],
        selectedDate: new Date()
    }

    componentDidMount() {
        // Set the dates (from and to) and pull corresponding sales from server.
        this.props.getVendorCustomerList();
        this.props.getCustProductList(); // Get all items (Useful in adding sales).
    }

     handleDateChange = (date) => {
        this.setSelectedDate(date);
    };

     itemAction=(newValue)=>{
        const newSelectedItems = [...this.state.selectedItems];
        newValue['qnt']=1;
        newValue['discount']=0;
        newSelectedItems.push(newValue);
        this.setState({selectedItems: newSelectedItems});
        console.log("select item= ",newSelectedItems);
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
        this.setState({selectedItems: newSelectedItems});
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
            this.state.selectedItems && this.state.selectedItems.map(selectedItem=>
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
            <TableRow>
            <TableCell colSpan={3} align='right'>
                <List>
                    <ListItem>
                        Discounts : <TextField value={this.getDiscounts()} defaultValue={this.getDiscounts()} variant='standard'></TextField>
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
            <TableRow>
                <TableCell colSpan={5}>
                        <Grid container spacing={2}>
                            <Grid item  sx={{textAlign: 'left'}} xs={12} sm={12} md={6}>
                                <Button variant='text'>Total Bill : {this.getTotalBill()}</Button>
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

    

     getTotalBill = () =>{
        let subTotal=  this.state.selectedItems && this.state.selectedItems.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.qnt * currentValue.retailPrice.price;
        }, 0);
        let addAdditionalChargeTotal= this.state.addAdditionalChargeList && this.state.addAdditionalChargeList.reduce((previousValue, currentValue) => {
            return previousValue + Number.parseFloat(currentValue.value);
        }, 0);
        console.log("addAdditionalChargeTotal=",addAdditionalChargeTotal);
        let discountTotal= this.state.selectedItems && this.state.selectedItems.reduce((previousValue, currentValue) => {
            console.log("currentValue=",currentValue)
            return previousValue + Number.parseFloat(currentValue.discount);
        }, 0);
        console.log("discountTotal=",discountTotal);
        return subTotal+addAdditionalChargeTotal-discountTotal;
    }
    render() {
      
    return (
        <>
        <Card variant="elevation">
           <CardHeader title="Bill Information" >  </CardHeader>
            <Divider />
           <CardContent >
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={3}>
                        <TextField
                            id="datetime-local"
                            label="Bill Date"
                            variant='standard'
                            type="datetime-local"
                            defaultValue="2017-05-24T10:30"
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                        <CustomerDropDwon label="Bill to" customerList = {this.props.vendorCustomerList}></CustomerDropDwon>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <ItemDropDwon label="Items" items={this.props.custProductList} itemAction={this.itemAction}></ItemDropDwon>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} sx={{minWidth:600}}>
                            {
                                this.getSelectedItems()
                            }
                    </Grid>
                </Grid>
            </CardContent>
         </Card>
         </>
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

export default connect(mapStateToProps, { getCustProductList, getVendorCustomerList})(CustomerBill);