import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Fab, Tooltip } from '@material-ui/core';


import { 
    addCustSale, editCustSale, getCustSaleList, getVendorCustomerList
 } from '../../../actions';

 import MainCard from '../../../component/cards/MainCard';
 import AddIcon from '@material-ui/icons/Add';
 import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';
import CollapsibleTable from '../../../component/table/CollapsibleTable';
import CustomerBill from './CustomerBill';
import { makeStyles } from '@material-ui/styles';


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
        type: 'text'
    },
    {
        name: "retailSaleTotals",
        label: "Retail Total Price",
        type: 'text'
    },
    {
        name: "retailSaleQnt",
        label: "Retail Sale Qnt",
        type: 'text'
    },
    {
        name: "actions",
        label: "Actions"
    }
];

const custProductRetailSaleHeaders = [
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
        name: "retailPrice.price",
        label: "Price",
        type: 'text'
    },
    {
        name: "retailQnt",
        label: "Qnt",
        type: 'text'
    }
];

const custProductWholeSaleHeaders = [
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
        name: "wholePrice.price",
        label: "Price",
        type: 'text'
    },
    {
        name: "wholeQnt",
        label: "Qnt",
        type: 'text'
    }
];

const headers= { 
    headers: mainheaders,
    childrens :[
        {
            label: "Retail Sale",
            name: "custProductRetailSaleList",
            headers: custProductRetailSaleHeaders
        }
        ,
        {
            label: "Whole Sale",
            name: "custProductWholeSaleList",
            headers: custProductWholeSaleHeaders
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
  
  

class CustBillPage extends Component {
    state={
        saveModel: false,
        deleteModel: false,
        dataObject: {},
        title: "",
        type: ""
    }
    
    _edit = row => {
       this.setState({ dataObject: row, title:"Edit sale", type:"Edit", saveModel: true  });
    }

    _add = () => {
       this.setState({ dataObject: {}, title:"Add sale", type:"Add", saveModel: true  });
    }

    _delete = row => {
        this.setState({ dataObject: row, title:"Delete sale", type:"Delete", deleteModel: true  });
    };
    
     saveObject = (type, row) => {
        console.log(type+"=",row)
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
                    >
                        <CollapsibleTable 
                            headers={headers} 
                            dataList={this.props.custSaleList}
                            vendorCustomerList= {this.props.vendorCustomerList}
                            deleteAction = {this._delete}
                            editAction = {this._edit}
                            >

                        </CollapsibleTable>
                    </MainCard>
                
                <CustomerBill
                    title={this.state.title}
                    open={this.state.saveModel}
                    close={()=> this.setState({saveModel: false})}
                    data={this.state.dataObject} 
                    type={this.state.type}
                    fields= {modelheaders}
                    saveAction = {this.saveObject}
                >
                </CustomerBill>
            
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
    return { user, custSaleList, vendorCustomerList};
};

const styles = {
    addCustomerButton: {
        color: 'white',
        backgroundColor: 'purple'
    },
};

export default connect(mapStateToProps, { addCustSale, editCustSale, getCustSaleList, getVendorCustomerList})(CustBillPage);
