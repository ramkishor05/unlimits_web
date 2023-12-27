import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, IconButton, DeleteIcon, Fab } from '@material-ui/core';
import { AddAlert, AddIcCallOutlined } from '@material-ui/icons';

import { getCustBusinessList, addCustBusiness, editCustBusiness, deleteCustBusiness, getCustVendorList} from '../../../actions';
import MainCard from '../../../component/cards/MainCard';
import DynamicTable from '../../../component/table/DynamicTable';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';
import DynamicForm from '../../../component/pages/DynamicForm';

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
        "id":"name",
        name: "name",
        label: "Name",
        type: 'text',
        "required" : {
            value : '',
            message: "Name is required!"
        }
    },
    {
        name: "emailAddress",
        label: "Email address",
        type: 'email',
        "required" : {
            value : '',
            message: "Email address is required!"
        },
        format : {
            regex : '/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/',
            message: "Invalid format!"
        }
    },
    {
        name: "phoneNumber",
        label: "Phone number",
        type: 'text',
        format : {
            regex : '^[0-9]+$',
            message: "Title should be number!"
        }
    },
    {
        name: "mobileNumber",
        label: "Mobile Number",
        type: 'text',
        "required" : {
            value : '',
            message: "Mobile number is required!"
        },
        format : {
            regex : '^[0-9]+$',
            message: "Title should be number!"
        }
        
    },
    {
        name: "permamentAddress",
        label: "Permament address",
        type: 'text'
    },
    {
        name: "presentAddress",
        label: "Present Address",
        type: 'text',
        "required" : {
            value : '',
            message: "Address is required!"
        }
    }
];
class CustBusiness extends Component {
    state={
        configPage : true,
        saveModel: false,
        deleteModel: false,
        savePage : false,
        dataObject: {},
        title: "",
        type: ""
    }
    
    _edit = row => {
        if(this.state.configPage){
            this.setState({ dataObject: row, title:"Edit business", type:"Edit", savePage: true  });
        } else{
            this.setState({ dataObject: row, title:"Edit business", type:"Edit", saveModel: true  });
        }
    }

    _add = () => {
        if(this.state.configPage){
            this.setState({ dataObject: {}, title:"Add business", type:"Add", savePage: true  });
        } else{
            this.setState({ dataObject: {}, title:"Add business", type:"Add", saveModel: true  });
        }
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

    clearAndRefresh = async() => {
        await this.props.getCustBusinessList();
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false , savePage: false  });
        console.log("this.props.menuItem=",this.props.menuItem)
        //if(this.props.menuItem.onBoarding){
            this.props.updateOnboarding(this.props.custBusinessList.length!==0);
       // }
    }
    
   async componentDidMount() {
        this.props.getCustVendorList();
        this.clearAndRefresh();
    }

    render() {
        return (
            <>
                {
                    !this.state.savePage &&
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
                }

                {
                this.state.savePage &&
                <DynamicForm
                title={this.state.title}
                openAction={this.state.saveModel}
                closeAction={this.clearAndRefresh}
                data={this.state.dataObject} 
                type={this.state.type}
                fields= {modelheaders}
                saveAction = {this.saveObject}
                {... this.props}
                >
                </DynamicForm>
               }
                
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
    
    const { loader } =  state.loaderReducer
    const { custBusinessList, show_business_loader } = state.custBusinessReducer;
    return { custBusinessList, show_business_loader , loader};
};

const styles = {
    addBusinessButton: {
        color: 'white',
        backgroundColor: 'purple'
    },
};

export default connect(mapStateToProps, { getCustVendorList, getCustBusinessList, addCustBusiness , editCustBusiness, deleteCustBusiness})(CustBusiness);
