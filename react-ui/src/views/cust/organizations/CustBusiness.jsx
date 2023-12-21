import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, IconButton, DeleteIcon, Fab } from '@material-ui/core';
import { AddAlert, AddIcCallOutlined } from '@material-ui/icons';

import { getCustBusinessList, addCustBusiness, editCustBusiness, deleteCustBusiness, getCustVendorList, updateOnboarding } from '../../../actions';
import MainCard from '../../../component/cards/MainCard';
import DynamicTable from '../../../component/table/DynamicTable';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';

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
        label: "Actions"
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
class CustBusiness extends Component {
    state={
        saveModel: false,
        deleteModel: false,
        dataObject: {},
        title: "",
        type: ""
    }
    
    _edit = row => {
       this.setState({ dataObject: row, title:"Edit business", type:"Edit", saveModel: true  });
    }

    _add = () => {
       this.setState({ dataObject: {}, title:"Add business", type:"Add", saveModel: true  });
    }

    _delete = row => {
        this.setState({ dataObject: row, title:"Delete business", type:"Delete", deleteModel: true  });
    };
    
     saveObject = (type, row) => {
        console.log(type+"=",row)
        if(type=='Add')
            this.props.addCustBusiness(row, this.clearAndRefresh)
        if(type=='Edit')
            this.props.editCustBusiness(row.id, row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteCustBusiness(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.props.getCustBusinessList();
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false  });
        this.props.updateOnboarding(this.props.userDetail, this.props.token, this.props.custBusinessList.length===0);

    }
    
    componentDidMount() {
        this.props.getCustVendorList();
        this.props.getCustBusinessList();
    }

    render() {
        return (
            <>
                
                <MainCard title="Bussiness List" 
                        button ={
                            
                            <Fab size="medium" color="primary" aria-label="Add" className={styles.button}
                                onClick={this._add}>
                                <AddIcCallOutlined />
                            </Fab>
                        }
                    >
                        <DynamicTable 
                        headers={tableheaders} 
                        dataList={this.props.custBusinessList}
                        deleteAction = {this._delete}
                        editAction = {this._edit}
                        ></DynamicTable>
                    </MainCard>
                {
                    this.state.saveModel &&
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
                }
                {
                    this.state.deleteModel &&
                    <ConfirmModel
                    openAction={this.state.deleteModel}
                    closeAction={()=> this.setState({deleteModel: false})}
                    data={this.state.dataObject} 
                    type={this.state.type}
                    message= 'Do you want to delete'
                    saveAction = {this.saveObject}
                    >
                    </ConfirmModel>
                }
            
                
            </>
        );
    }
}

const mapStateToProps = state => {
    const { userDetail } = state.userReducer;
    const { token } = state.accountReducer;
    const { loader } =  state.loaderReducer
    const { custBusinessList, show_business_loader } = state.custBusinessReducer;
    return { token, userDetail, custBusinessList, show_business_loader , loader};
};

const styles = {
    addBusinessButton: {
        color: 'white',
        backgroundColor: 'purple'
    },
};

export default connect(mapStateToProps, { getCustVendorList, getCustBusinessList, addCustBusiness , editCustBusiness, deleteCustBusiness, updateOnboarding})(CustBusiness);
