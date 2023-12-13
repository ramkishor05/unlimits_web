import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fab, TableCell } from '@material-ui/core';


import { getGlobalCustomerList , addGlobalCustomer, editGlobalCustomer, deleteGlobalCustomer, getGlobalVendorList} from '../../../actions';
import MainCard from '../../../component/cards/MainCard';
import { AddIcCallOutlined, AddTask } from '@material-ui/icons';
import DynamicTable from '../../../component/table/DynamicTable';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';
import Loader from '../../../component/Loader';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import GlobalCustomerDetail from './GlobalCustomerDetail';

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

class GlobalCustomerPage extends Component {
    state={
        saveModel: false,
        deleteModel: false,
        viewModel: false,
        dataObject: {},
        title: "",
        type: ""
    }
    
    _edit = row => {
       this.setState({ dataObject: row, title:"Edit customer", type:"Edit", saveModel: true  });
    }

    _preview = row => {
        this.setState({ dataObject: row, title:"View customer", type:"View", viewModel: true  });
     }

    _add = () => {
       this.setState({ dataObject: {}, title:"Add customer", type:"Add", saveModel: true  });
    }

    _delete = row => {
        this.setState({ dataObject: row, title:"Delete customer", type:"Delete", deleteModel: true  });
    };
    
     saveObject = (type, row) => {
        console.log(type+"=",row)
        if(type=='Add')
            this.props.addGlobalCustomer(row, this.clearAndRefresh)
        if(type=='Edit')
            this.props.editGlobalCustomer(row.id,row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteGlobalCustomer(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.props.getGlobalCustomerList();
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false,viewModel: false  });
    }
    
    componentDidMount() {
        this.props.getGlobalVendorList();
        this.props.getGlobalCustomerList();
    }

    render() {
        return (
             <>
                 {
                            !this.state.viewModel &&  
                <MainCard title="Customer List" 
                        button ={
                            
                            <Fab size="medium" color="primary" aria-label="Add" className={styles.button}
                                onClick={this._add}>
                                <AddTask/>
                            </Fab>
                        }
                    >
                        <DynamicTable 
                        headers={tableheaders} 
                        dataList={this.props.globalCustomerList}
                        deleteAction = {this._delete}
                        editAction = {this._edit}
                        previewAction={this._preview}
                        ></DynamicTable>
                    </MainCard>
                    } {
                this.state.viewModel && 
                <GlobalCustomerDetail customer={this.state.dataObject}>

                </GlobalCustomerDetail>
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
                {
                    this.props.show_customer_loader && <Loader></Loader>
                }
                
            </>
        );
    }
}

const mapStateToProps = state => {
    const { user } = state.userReducer;
    const { globalCustomerList, show_customer_loader } = state.globalCustomerReducer;

    return { user, globalCustomerList, show_customer_loader };
};

const styles = {
    addCustomerButton: {
        color: 'white',
        backgroundColor: 'purple'
    },
};

export default connect(mapStateToProps, { getGlobalCustomerList, addGlobalCustomer,editGlobalCustomer, deleteGlobalCustomer, getGlobalVendorList })(GlobalCustomerPage);
