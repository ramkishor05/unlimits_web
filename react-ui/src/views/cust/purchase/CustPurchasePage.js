import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Fab, Tooltip } from '@material-ui/core';


import { 
    addCustPurchase, editCustPurchase, deleteCustPurchase, getCustPurchaseList, getVendorSupplierList
 } from '../../../actions';

 import MainCard from '../../../component/cards/MainCard';
 import AddIcon from '@material-ui/icons/Add';
import ConfirmModel from '../../../component/model/ConfirmModel';
import CollapsibleTable from '../../../component/table/CollapsibleTable';
import SupplierBill from './SupplierBill';
import { makeStyles } from '@material-ui/styles';
import PrintBill from './PrintBill';


const mainheaders = [
    {
        name: "idenNo",
        label: "Iden No",
        type: 'text'
    },
    {
        name: "purchaseDate",
        label: "Purchase Date",
        type: 'text'
    },
    {
        name: "supplierId",
        label: "Supplier",
        type: 'text',
        render: (value, row, header, props)=>{
            let supplier=  props.vendorSupplierList.find((vendorSupplier)=>vendorSupplier.id==value)
           return supplier?  supplier.name: value;
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

const custProductPurchaseItemHeaders = [
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
        name: "purchasePrice.price",
        label: "Price",
        type: 'text'
    },
    {
        name: "purchaseQnt",
        label: "Qnt",
        type: 'text'
    },
    {
        name: "discount",
        label: "Discount",
        type: 'text'
    },
    {
        name: "subTotal",
        label: "Sub Total",
        type: 'text',
        render: (value, row, header, props)=>{
           return row.purchaseQnt* row.purchasePrice.price;
        }
    }
];

const headers= { 
    headers: mainheaders,
    childrens :[
        {
            label: "Items",
            name: "custProductPurchaseItemList",
            headers: custProductPurchaseItemHeaders
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
  
  

class CustPurchasePage extends Component {
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
       this.setState({ dataObject: row, title:"Edit purchase", type:"Edit", saveModel: true  });
    }

    _add = () => {
        this._clearModel();
       this.setState({ dataObject: {}, title:"Add purchase", type:"Add", saveModel: true  });
    }

    _print = (row) => {
        this._clearModel();
        this.setState({ dataObject: row, title:"Print purchase", type:"Print", printModel: true  });
        console.log("_print")
     }

    _delete = row => {
        this._clearModel();
        this.setState({ dataObject: row, title:"Delete purchase", type:"Delete", deleteModel: true  });
    };
    
     saveObject = (type, row) => {
        if(type=='Add')
            this.props.addCustPurchase(row, this.clearAndRefresh)
        if(type=='Edit')
            this.props.editCustPurchase(row.id,row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteCustPurchase(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.props.getCustPurchaseList();
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false  });
    }
    
   async componentDidMount() {
        this.props.getCustPurchaseList();
        await this.props.getVendorSupplierList();
    }
    

    render() {
        return (
            <>
                
                <MainCard title="Purchase List" 
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
                            dataList={this.props.custPurchaseList}
                            vendorSupplierList= {this.props.vendorSupplierList}
                            deleteAction = {this._delete}
                            editAction = {this._edit}
                            printAction= {this._print}
                            >

                        </CollapsibleTable>
                    </MainCard>
                {
                    this.state.saveModel && <SupplierBill
                    title={this.state.title}
                    open={this.state.saveModel}
                    close={()=> this.setState({saveModel: false})}
                    data={this.state.dataObject} 
                    type={this.state.type}
                    fields= {modelheaders}
                    saveAction = {this.saveObject}
                >
                </SupplierBill>
                }
                
                {
                    this.state.printModel && <PrintBill
                    title={this.state.title}
                    open={this.state.printModel}
                    headers={headers} 
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
    const { custPurchaseList} = state.custPurchaseReducer;
    const { vendorSupplierList} = state.vendorSupplierReducer;
    return { user, custPurchaseList, vendorSupplierList};
};

const styles = {
    addSupplierButton: {
        color: 'white',
        backgroundColor: 'purple'
    },
};

export default connect(mapStateToProps, { addCustPurchase, editCustPurchase,deleteCustPurchase, getCustPurchaseList, getVendorSupplierList})(CustPurchasePage);
