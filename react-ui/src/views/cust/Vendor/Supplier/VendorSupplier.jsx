import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fab, TableCell } from '@material-ui/core';


import { getVendorSupplierList, addVendorSupplier, editVendorSupplier, deleteVendorSupplier, getVendorList } from '../../../../actions';
import MainCard from '../../../../component/cards/MainCard';
import DynamicTable from '../../../../component/table/DynamicTable';
import DynamicModel from '../../../../component/model/DynamicModel';
import ConfirmModel from '../../../../component/model/ConfirmModel';
import { AddTaskOutlined } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import VendorSupplierDetail from './VendorSupplierDetail';

const tableheaders = [
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
    },
    {
        name: "actions",
        label: "Actions",
        render: (value, row, rowIndex, header, props)=>{
            return <TableCell key={header.name+'_'+rowIndex} align='right'>
                        <Fab color="secondary" aria-label="Edit"  onClick={() => props.editAction(row)}>
                        <EditIcon/>
                    </Fab>
                    <Fab color="secondary" aria-label="Delete"  onClick={() => props.deleteAction(row)} >
                        <DeleteIcon />
                    </Fab>
                    <Fab color="secondary" aria-label="View"  onClick={() => props.previewAction(row)} >
                        <PreviewIcon />
                    </Fab>
                </TableCell>
        }
    }
];

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

class VendorSupplier extends Component {
    state={
        saveModel: false,
        deleteModel: false,
        dataObject: {},
        viewModel: false,
        title: "",
        type: ""
    }
    
    _edit = row => {
       this.setState({ dataObject: row, title:"Edit supplier", type:"Edit", saveModel: true  });
    }

    _preview = row => {
        this.setState({ dataObject: row, title:"View supplier", type:"View", viewModel: true  });
     }

    _add = () => {
       this.setState({ dataObject: {}, title:"Add supplier", type:"Add", saveModel: true  });
    }

    _delete = row => {
        this.setState({ dataObject: row, title:"Delete supplier", type:"Delete", deleteModel: true  });
    };
    
     saveObject = (type, row) => {
        console.log(type+"=",row)
        if(type=='Add')
            this.props.addVendorSupplier(row, this.clearAndRefresh)
        if(type=='Edit')
            this.props.editVendorSupplier(row.id,row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteVendorSupplier(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.props.getVendorSupplierList();
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false  });
    }
    
    componentDidMount() {
        this.props.getVendorList();
        this.props.getVendorSupplierList();
    }

    render() {
        return (
            <>
                 {
                            !this.state.viewModel && 
                <MainCard title="Supplier List" 
                        button ={
                            
                            <Fab size="medium" color="primary" aria-label="Add" className={styles.button}
                                onClick={this._add}>
                                <AddTaskOutlined/>
                            </Fab>
                        }
                    >
                       <DynamicTable 
                            headers={tableheaders} 
                            dataList={this.props.vendorSupplierList}
                            deleteAction = {this._delete}
                            editAction = {this._edit}
                            previewAction={this._preview}
                            ></DynamicTable>

                        
                        
                    </MainCard>
                    }

                {
                this.state.viewModel && 
                <VendorSupplierDetail supplier={this.state.dataObject}>

                </VendorSupplierDetail>
                }
                <DynamicModel
                title={this.state.title}
                openAction={this.state.saveModel}
                closeAction={()=> this.setState({saveModel: false})}
                data={this.state.dataObject} 
                type={this.state.type}
                fields= {modelheaders}
                saveAction = {this.saveObject}
                >
                </DynamicModel>
            
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
    const { vendorSupplierList, show_supplier_loader } = state.vendorSupplierReducer;

    return { user, vendorSupplierList, show_supplier_loader };
};

const styles = {
    addSupplierButton: {
        color: 'white',
        backgroundColor: 'purple'
    },
};

export default connect(mapStateToProps, { getVendorSupplierList, addVendorSupplier,editVendorSupplier, deleteVendorSupplier, getVendorList })(VendorSupplier);
