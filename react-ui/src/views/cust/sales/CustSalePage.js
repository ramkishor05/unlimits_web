import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Fab, Tooltip } from '@material-ui/core';


import { 
    addCustSale, editCustSale, deleteCustSale, getCustSaleList, getVendorCustomerList, getCustProductList
 } from '../../../actions';

 import MainCard from '../../../component/cards/MainCard';
 import AddIcon from '@material-ui/icons/Add';
 import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';
import CollapsibleTable from '../../../component/table/CollapsibleTable';
import CustomerBill from './CustomerBill';
import { makeStyles } from '@material-ui/styles';
import PrintBill from './PrintBill';


const mainheaders = [
    {
        name: "idenNo",
        label: "Iden No",
        type: 'text'
    },
    {
        name: "saleDate",
        label: "Sale Date",
        type: 'text'
    },
    {
        name: "customerId",
        label: "Customer",
        type: 'text',
        render: (value, row, header, props)=>{
           //let customer= props.vendorCustomerList.find((vendorCustomer)=>vendorCustomer.id==value);
           return value;
        }
    },
    {
        name: "totalPrice",
        label: "Total Price",
        type: 'text'
    },
    {
        name: "totalQnt",
        label: "Total Qnt",
        type: 'text'
    },
    {
        name: "actions",
        label: "Actions"
    }
];

const custProductSaleItemListHeaders = [
    {
        name: "custProduct.idenNo",
        label: "Iden No",
        type: 'text'
    },
    {
        name: "custProduct.name",
        label: "Name",
        type: 'text'
    },
    {
        name: "salePrice.price",
        label: "Price",
        type: 'text'
    },
    {
        name: "saleQnt",
        label: "Qnt",
        type: 'text'
    },
    {
        name: "subTotal",
        label: "Sub Total",
        type: 'text',
        render: (value, row, header, props)=>{
           return value;// row.salePrice.price*row.saleQnt;
        }
    }
];
const headers= { 
    headers: mainheaders,
    childrens :[
        {
            label: "Items",
            name: "custProductSaleItemList",
            headers: custProductSaleItemListHeaders
        }
    ]
}

const modelheaders = [
    {
        name: "name",
        label: "Name",
        type: 'text'
    },
    {
        name: "emailAddress",
        label: "Email address",
        type: 'email'
    },
    {
        name: "phoneNumber",
        label: "Phone number",
        type: 'text'
    },
    {
        name: "mobileNumber",
        label: "mobileNumber",
        type: 'text'
    },
    {
        name: "permamentAddress",
        label: "Permament address",
        type: 'text'
    },
    {
        name: "presentAddress",
        label: "Present Address",
        type: 'text'
    }
];

const useStyles = makeStyles((theme) => ({
    fab: {
      margin: theme.spacing(2),
    },
    absolute: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(3),
    },
  }));
  
  

class CustSalePage extends Component {
    state={
        saveModel: false,
        deleteModel: false,
        printModel: false,
        dataObject: {},
        title: "",
        type: ""
    }
    _clearModel=()=>{
        this.setState({ deleteModel:false, saveModel:false, printModel: false });
    }
    _edit = row => {
        this._clearModel();
       this.setState({ dataObject: row, title:"Edit sale", type:"Edit", saveModel: true  });
    }

    _add = () => {
        this._clearModel();
       this.setState({ dataObject: {}, title:"Add sale", type:"Add", saveModel: true  });
    }

    _print = (row) => {
        this._clearModel();
        this.setState({ dataObject: row, title:"Print sale", type:"Print", printModel: true  });
        console.log("_print")
     }

    _delete = row => {
        this._clearModel();
        this.setState({ dataObject: row, title:"Delete sale", type:"Delete", deleteModel: true  });
    };
    
     saveObject = (type, row) => {
        if(type=='Add')
            this.props.addCustSale(row, this.clearAndRefresh)
        if(type=='Edit')
            this.props.editCustSale(row.id,row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteCustSale(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.props.getCustSaleList();
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false  });
    }
    
   async componentDidMount() {
        this.props.getCustSaleList();
        this.props.getCustProductList();
        await this.props.getVendorCustomerList();
    }
    

    render() {
        return (
            <>
                
                <MainCard title="Sale List" 
                        button ={
                            
                            <Tooltip title="Add" aria-label="add">
                                <Button variant='contained' color="error" className={useStyles.absolute} onClick={this._add}>
                                    <AddIcon />
                                </Button>
                            </Tooltip>
                        }
                        content={false}
                    >
                        <CollapsibleTable 
                            headers={headers} 
                            dataList={this.props.custSaleList}
                            vendorCustomerList= {this.props.vendorCustomerList}
                            deleteAction = {this._delete}
                            editAction = {this._edit}
                            printAction= {this._print}
                            >

                        </CollapsibleTable>
                    </MainCard>
                {
                    this.state.saveModel && <CustomerBill
                    title={this.state.title}
                    open={this.state.saveModel}
                    close={()=> this.setState({saveModel: false})}
                    data={this.state.dataObject} 
                    type={this.state.type}
                    fields= {modelheaders}
                    custProductList={this.props.custProductList}
                    saveAction = {this.saveObject}
                >
                </CustomerBill>
                }
                
                {
                    this.state.printModel && <PrintBill
                    title={this.state.title}
                    open={this.state.printModel}
                    headers={headers} 
                    vendorCustomerList={this.props.vendorCustomerList}
                    close={()=> this.setState({printModel: false})}
                    data={this.state.dataObject} 
                    type={this.state.type}
                    fields= {modelheaders}
                    saveAction = {this.saveObject}
                >
                </PrintBill>
                }
            
                <ConfirmModel
                    openAction={this.state.deleteModel}
                    closeAction={()=> this.setState({deleteModel: false})}
                    data={this.state.dataObject} 
                    type={this.state.type}
                    message= 'Do you want to delete'
                    saveAction = {this.saveObject}
                    >
                </ConfirmModel>
            </>
        );
    }
}

const mapStateToProps = state => {
    const { user } = state.userReducer;
    const { custSaleList} = state.custSaleReducer;
    const { vendorCustomerList} = state.vendorCustomerReducer;
    const {custProductList} = state.custProductReducer;
    return { user, custSaleList, vendorCustomerList, custProductList};
};

const styles = {
    addCustomerButton: {
        color: 'white',
        backgroundColor: 'purple'
    },
};

export default connect(mapStateToProps, { addCustSale, editCustSale,deleteCustSale, getCustSaleList, getVendorCustomerList, getCustProductList})(CustSalePage);
