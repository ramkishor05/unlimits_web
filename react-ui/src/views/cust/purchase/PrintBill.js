import React, { Component } from 'react';
import 'date-fns';

import moment from 'moment';


// material-ui
import { Avatar, Box, Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, FormLabel, Grid, IconButton, List, ListItem, ListItemText, Modal, Paper, Radio, RadioGroup, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography} from '@material-ui/core';
import CustomerDropDwon from '../../../component/dropdwons/CustomerDropDwon';
// project imports
import { makeStyles, styled } from '@material-ui/styles';
import ItemDropDwon from '../../../component/dropdwons/ItemDropDwon';
import { 
    getCustProductList, getVendorCustomerList
 } from '../../../actions';

import ShoppingCartButton from '../../../component/buttons/ShoppingCartButton';
import DynamicField from '../../../component/fields/DynamicField';
import { connect } from 'react-redux';
import { GridCloseIcon } from '@mui/x-data-grid';
import { LabelImportant } from '@material-ui/icons';
import PaymentField from '../../../component/fields/PaymentField';

  const ToggleSwitch = styled((props) => (
    <Switch fullWidth focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

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

  const DATE_TIME_FORMAT_UI="YYYY-MM-DD HH:MM";
  class PrintBill extends Component {

    
    state = {
        id:null,
        selectedItems: [],
        custProductSaleAdditionalList:[],
        saleDate: moment(new Date()).format(DATE_TIME_FORMAT_UI),
        customerId: 0,
        userId: 0,
        discounts : null,
        payment : {
            mode: '',
            amount: null
        }
    }

    constructor (props){
        super(props)
        let {data}=this.props;
        let object={
            id:data.id,
            idenNo:data.idenNo,
            selectedItems: [],
            custProductSaleAdditionalList:data.custProductSaleAdditionalList? data.custProductSaleAdditionalList: [],
            custProductSalePaymentList:data.custProductSalePaymentList? data.custProductSalePaymentList: [],
            saleDate: data.saleDate?  moment(data.saleDate).format(DATE_TIME_FORMAT_UI):  moment(new Date()).format(DATE_TIME_FORMAT_UI),
            customerId: data.customerId?data.customerId:0,
            userId: data.userId?data.userId:0,
            discounts : data.discounts? data.discounts:0,
            payment : {
                mode: 'unpaid',
                amount: null
            }
        }
        data.custProductRetailSaleList && data.custProductRetailSaleList.forEach(custProductRetailSale=>{
            let custProductRetailSaleObj={...custProductRetailSale};
            custProductRetailSaleObj['id']=custProductRetailSale.id;
            custProductRetailSaleObj['isWholeSale']=false;
            custProductRetailSaleObj['wholeSale']=custProductRetailSale.custProduct.wholePrice;
            custProductRetailSaleObj['discount']=0;
            custProductRetailSaleObj['qnt']=custProductRetailSale.retailQnt;
            object.selectedItems.push(custProductRetailSaleObj)
        })
        data.custProductWholeSaleList && data.custProductWholeSaleList.forEach(custProductWholeSale=>{
            let custProductWholeSaleObj={...custProductWholeSale};
            custProductWholeSaleObj['id']=custProductWholeSale.id;
            custProductWholeSaleObj['retailSale']=custProductWholeSale.custProduct.retailSale;
            custProductWholeSaleObj['isWholeSale']=true;
            custProductWholeSaleObj['discount']=0;
            custProductWholeSaleObj['qnt']=custProductWholeSale.wholeQnt;
            object.selectedItems.push(custProductWholeSaleObj)
        })
        this.state={ ...object};
        this.print = this.print.bind(this);
    }

    print() {
        var content = document.getElementById('printarea');
        var pri = document.getElementById('ifmcontentstoprint').contentWindow;
        pri.document.open();
        pri.document.write(content.innerHTML);
        pri.document.close();
        pri.focus();
        pri.print();

        
    }

    componentDidMount() {
        this.props.getVendorCustomerList();
        this.props.getCustProductList(); 
    }

    changeSaleDate = (event) => {
        this.setState({saleDate: event.target.value});
    };

    setDiscounts = (event) => {
        console.log(event)
        this.setState({discounts: event.target.value});
    };

     itemAction=(custProduct)=>{
        if(custProduct){
            const newSelectedItems = [...this.state.selectedItems];
            let itemObject = {};
            itemObject['custProduct']=custProduct;
            itemObject['qnt']=1;
            itemObject['discount']=0;
            itemObject['isWholeSale']=false;
            itemObject['wholePrice']=custProduct.wholePrice;
            itemObject['retailPrice']=custProduct.retailPrice;
            itemObject['purchasePrice']=custProduct.purchasePrice;
            newSelectedItems.push(itemObject);
            console.log("newSelectedItems=",newSelectedItems)
            this.setState({selectedItems: newSelectedItems});
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
    }

    toggleWholeSale=(custProduct)=>{
        custProduct.isWholeSale=!custProduct.isWholeSale;
        const newSelectedItems = [...this.state.selectedItems];
        this.setState({selectedItems: newSelectedItems});
    }
    
    addProductAdditionalList=(formValues)=>{
        this.setState({custProductSaleAdditionalList:formValues});
    }

    addProductPaymentList=(formValues)=>{
        this.setState({custProductSalePaymentList:formValues});
    }

    setDiscount=(item, amount)=>{
        item['discount']=amount;
        const newSelectedItems = [...this.state.selectedItems];
        this.setState({selectedItems: newSelectedItems, discounts: this.getDiscounts()});
    }

    getDiscounts=()=>{
        let discountTotal=this.state.selectedItems && this.state.selectedItems.reduce((previousValue, currentValue) => {
            return previousValue + Number.parseFloat(currentValue.discount);
        }, 0)
        return discountTotal;
     }

     changePaymentMode=(event)=>{
        let object={...this.state};
        let {payment}=object
        payment.mode=event.target.value;
        this.setState({...object});
     }

     getSubTotal=()=>{
       return this.state.selectedItems && this.state.selectedItems.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.qnt * (currentValue.isWholeSale? currentValue.wholePrice.price : currentValue.retailPrice.price);
        }, 0)
     }

     getSelectedItems=(data)=>{
        return (
       <TableContainer className={useStyles.container}>
        <Table stickyHeader  sx={{border:1, borderStyle: 'groove'}}>
            <TableHead stickyHeader>
                <TableRow alignItems="flex-start" key={'selectedItem_header_row'} >
                    <TableCell key={'selectedItem_header_image'} >
                     Image
                    </TableCell>
                    <TableCell key={'selectedItem_header_title'}>Title</TableCell>
                    <TableCell key={'selectedItem_header_price'}>Price</TableCell>
                    <TableCell key={'selectedItem_header_discount'} >Discount</TableCell>
                    <TableCell key={'selectedItem_header_qnt'}>Qnt</TableCell>
                    <TableCell key={'selectedItem_header_action'}>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody sx={{overflowX : true, maxHeight:50}}>
            {
            this.state.selectedItems && this.state.selectedItems.map(selectedItem=>
                <TableRow key={'selectedItem_'+selectedItem.custProduct.id}>
                    <TableCell key={'selectedItem_'+selectedItem.id+'_image'}>
                        <Avatar alt="Remy Sharp" src={selectedItem.custProduct.image} />
                    </TableCell>
                    <TableCell key={'selectedItem_'+selectedItem.custProduct.id+'_title'} >
                        {selectedItem.custProduct.title}
                    </TableCell>
                    <TableCell key={'selectedItem_'+selectedItem.custProduct.id+'_price'}>
                        {selectedItem.isWholeSale? selectedItem.wholePrice.price: selectedItem.retailPrice.price}
                    </TableCell>
                    <TableCell key={'selectedItem_'+selectedItem.custProduct.id+'_discount'}>
                        <TextField type='number' variant='standard' onChange={(event)=> this.setDiscount(selectedItem, event.target.value)}></TextField>
                    </TableCell>
                    <TableCell key={'selectedItem_'+selectedItem.custProduct.id+'_qnt'} sx={{  textAlign: 'center'}}>
                        <ShoppingCartButton  
                            counter={selectedItem.qnt} 
                            updateCounter={(counter)=> this.itemQnt(selectedItem, counter )}>
                        </ShoppingCartButton>                        
                    </TableCell>
                    <TableCell key={'selectedItem_'+selectedItem.custProduct.id+'_switch'} sx={{ textAlign: 'right'}}>
                    Whole Sale <ToggleSwitch name="Whole Sale" label="Whole Sale" value={selectedItem.isWholeSale} checked={selectedItem.isWholeSale} onClick={()=>this.toggleWholeSale(selectedItem)} ></ToggleSwitch>
                    </TableCell>
                </TableRow>
            )}
             <TableRow key={1000}>
             <TableCell colSpan={6} align='right' >
                <Grid container spacing={1}>
                    <Grid item xs={12} xl={12}>
                        <Typography>  
                            
                            Sub Total <LabelImportant></LabelImportant> 
                            {
                                <Button variant='outlined'> {this.getSubTotal()}  </Button>  
                            }
                            
                        </Typography>  
                    </Grid>
                    <Grid item xs={12} xl={12}>
                        <TextField label="Discounts" value={this.getDiscounts()} defaultValue={this.getDiscounts()} onChange={this.setDiscounts} variant='standard'></TextField>
                    </Grid>
                </Grid>
            </TableCell>
            </TableRow>
            <TableRow>
            <TableCell colSpan={6} align='right' >
                    <DynamicField list={this.state.custProductSaleAdditionalList} onSave={this.addProductAdditionalList}></DynamicField>
                     
                     <List>
                     {
                       this.state.custProductSaleAdditionalList && this.state.custProductSaleAdditionalList.map((addAdditionalCharge,i)=>
                             <ListItem  key={'addAdditionalCharge'+i}>
                                 <ListItemText 
                                 sx={{textSizeAdjust: 100, width:100}}>{addAdditionalCharge.field} : </ListItemText>
                                 <ListItemText
                                 sx={{textSizeAdjust: 100, width:100}}>{addAdditionalCharge.value}</ListItemText>
                             </ListItem>
                         )
                     }
                     </List>
            </TableCell>
            </TableRow>
            <TableRow>
            <TableCell colSpan={6} align='right' >
                <PaymentField list={this.state.custProductSalePaymentList} onSave={this.addProductPaymentList}></PaymentField>
                <List>
                     {
                       this.state.custProductSalePaymentList && this.state.custProductSalePaymentList.map((custProductPayment, i)=>
                             <ListItem key={'custProductPayment'+i}>
                                 <ListItemText
                                 sx={{textSizeAdjust: 100, width:100}}>{custProductPayment.mode} : </ListItemText>
                                 <ListItemText
                                 sx={{textSizeAdjust: 100, width:100}}>{custProductPayment.amount?':'+custProductPayment.amount : custProductPayment.amount}</ListItemText>
                             </ListItem>
                         )
                     }
                     </List>
            </TableCell>
            </TableRow>
            
            </TableBody>
        </Table>
        </TableContainer>
        )
    }

    

     getTotalSale = () =>{
        let subTotal=  this.state.selectedItems && this.state.selectedItems.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.qnt * currentValue.isWholeSale ? currentValue.wholePrice.price: currentValue.retailPrice.price;
        }, 0);
        let otherItemTotal= this.state.custProductSaleAdditionalList && this.state.custProductSaleAdditionalList.reduce((previousValue, currentValue) => {
            return previousValue + Number.parseFloat(currentValue.value);
        }, 0);
        let discountTotal= this.state.selectedItems && this.state.selectedItems.reduce((previousValue, currentValue) => {
            return previousValue + Number.parseFloat(currentValue.discount);
        }, 0);
        return subTotal+otherItemTotal-discountTotal;
    }

    addSale = (type) =>{
        let custProductSale = {
            id:this.state.id,
            idenNo:this.state.idenNo,
            saleDate: moment(this.state.saleDate).format(DATE_TIME_FORMAT_UI),
            customerId: this.state.customerId,
            discounts: this.state.discounts,
            wholeSaleTotals: 0,
            wholeSaleQnt: 0,
            retailSaleTotals: 0,
            retailSaleQnt:0,
            custProductRetailSaleList: [],
            custProductWholeSaleList: [],
            custProductSaleAdditionalList:this.state.custProductSaleAdditionalList,
            custProductSalePaymentList:this.state.custProductSalePaymentList
        }
        this.state.selectedItems.forEach((item)=>{
            if(item.isWholeSale){
                custProductSale.wholeSaleQnt+=item.qnt;
                custProductSale.wholeSaleTotals+=item.wholePrice.price;
                let custProductWholeSale={
                    id:item.id,
                    name: item.name,
                    desc: item.desc,
                    purchasePrice: item.purchasePrice,
                    purchaseUnitId: 1,
                    wholeQnt: item.qnt,
                    wholePrice: item.wholePrice,
                    wholeUnitId: 1,
                    custProductId: item.custProduct.id
                }
                custProductSale.custProductWholeSaleList.push(custProductWholeSale);
            } else{
                custProductSale.retailSaleQnt+=item.qnt;
                custProductSale.retailSaleTotals+=item.retailPrice.price;
                let custProductRetailSale={
                    id:item.id,
                    name: item.name,
                    desc: item.desc,
                    purchasePrice: item.purchasePrice,
                    purchaseUnitId: 1,
                    retailQnt: item.qnt,
                    retailPrice: item.retailPrice,
                    retailUnitId: 1,
                    custProductId: item.custProduct.id
                }
                custProductSale.custProductRetailSaleList.push(custProductRetailSale);
            }
        })

        
        this.props.saveAction(type,custProductSale);
        
    }

    init=(data)=>{
        this.setState({...data});
    }

   getValue=(data, keyStr)=>{
        let keys=keyStr.split("\.");
        let val=data;
        for (let i = 0; i < keys.length; i++){
          if( typeof val === 'object')
          val=val[keys[i]];
        }
        return val;
    }

    render() {

    const { open, close, title, type, data, headers} = this.props;
    
    return (
        <>
        <iframe id="ifmcontentstoprint" style={{
            height: '0px',
            width: '0px',
            position: 'absolute'
        }}></iframe>    
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
                    {title}
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
            <DialogContent id='printarea'>
                <Grid container spacing={3}>
               
                    {headers && headers.headers.map(header=>
                        <Grid item xs={12} sm={12} md={6}>
                            {header.label} : 
                            {header.render ? header.render(data[header.name], this.props) :  data[header.name]}
                        </Grid>
                        )
                    }
                    <Grid item xs={12} sm={12} md={12}>
                    {
                    headers &&  headers.childrens.map(children=>
                        <Box sx={{ margin:0, padding:0 }} >
                            <Typography variant="h6" gutterBottom component="div">
                                {children.label}
                            </Typography>
                            <Table size="small" aria-label="purchases" sx={{border:2}}>
                                <TableHead>
                                <TableRow key={data.id+'_data_child_collapse_row_header_'+children.name}>
                                {children.headers.map((header)=>
                                <TableCell key={data.id+'_data_child_collapse_row_header_cel_'+children.name+'_'+header.name}>{header.label}</TableCell>
                                )}
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                    data[children.name].map((childrenRow) => (
                                    <TableRow key={data.id+'_data_child_collapse_row_body_'+children.name+'_'+childrenRow.id}>
                                    {
                                        children.headers.map((header)=>
                                            <TableCell key={data.id+'_data_child_collapse_row_body_cel_'+children.name+'_'+childrenRow.id+'_'+header.name}>{
                                            header.render ? header.render(this.getValue(childrenRow,header.name),this.props ):
                                            this.getValue(childrenRow,header.name)
                                            }</TableCell>
                                        )}
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                            </Box>
                    )
                    }
                    </Grid>
                </Grid>
            </DialogContent>
            <Divider></Divider>
            <DialogActions>
                <Grid container spacing={2} padding={2}>
                    <Grid item  sx={{textAlign: 'left'}} xs={12} sm={12} md={6}>
                        <Button variant='text'>Total Sale : {this.getTotalSale()}</Button>
                    </Grid>
                    <Grid item  sx={{textAlign: 'right'}} xs={12} sm={12} md={6}>
                        <Button variant='contained' onClick={()=>this.print()}>{type}</Button>
                    </Grid>
                </Grid>
            </DialogActions>
         </BootstrapDialog>
         </>
    );
};
  }



const mapStateToProps = state => {
    const { custProductList } = state.custProductReducer;

    const { vendorCustomerList } = state.vendorCustomerReducer;

    return { custProductList, vendorCustomerList };
}

export default connect(mapStateToProps, { getCustProductList, getVendorCustomerList})(PrintBill);