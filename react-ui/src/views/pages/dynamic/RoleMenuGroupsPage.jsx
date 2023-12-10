import React, { useEffect, useReducer, useState,Component } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

// project imports
import MainCard from '../../../component/cards/MainCard';
import DynamicTable from '../../../component/table/DynamicTable';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';
import { getCustCategoryGroupList, addCustCategoryGroup, editCustCategoryGroup, deleteCustCategoryGroup } from '../../../actions';

function createData(name, description, typeId, actions) {
    return { name, description, typeId, actions};
}
const headers = [
    {
        name: "idenNo",
        label: "IdenNo",
        type: 'text'
    },
    {
        name: "userRole",
        label: "User Role",
        type: 'text'
    },
    {
        name: "menuGroup",
        label: "Menu Group",
        type: 'text'
    },
    {
        name: "actions",
        label: "Actions"
    }
]
const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });

class RoleMenuGroupsPage extends Component {
    state={
        saveModel: false,
        deleteModel: false,
        dataObject: {},
        title: "",
        type: ""
    }
    
    _edit = row => {
       this.setState({ dataObject: row, title:"Edit Role menu group", type:"Edit", saveModel: true  });
    }

    _add = () => {
       this.setState({ dataObject: {}, title:"Add Role menu group", type:"Add", saveModel: true  });
    }

    _delete = row => {
        this.setState({ dataObject: row, title:"Delete Role menu group", type:"Delete", deleteModel: true  });
    };
    
     saveObject = (type, row) => {
        console.log(type+"=",row)
        if(type=='Add')
            this.props.addCustCategoryGroup(row, this.clearAndRefresh)
        if(type=='Edit')
            this.props.editCustCategoryGroup(row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteCustCategoryGroup(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.props.getCustCategoryGroupList();
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false  });
    }
    
    componentDidMount() {
        this.props.getCustCategoryGroupList();
    }

 render() {
        return (
                <>
                
                    <MainCard title={this.props.menuItem.title}
                        button ={
                            <Button variant="outlined" 
                            color="primary" 
                            className={styles.button}
                            onClick={this._add}
                            >
                                Add
                            </Button>
                        }
                    >
                        <DynamicTable 
                        headers={headers} 
                        dataList={this.props.custCategoryGroupList}
                        deleteAction = {this._delete}
                        editAction = {this._edit}
                        ></DynamicTable>
                    </MainCard>
                
                <DynamicModel
                title={this.state.title}
                openAction={this.state.saveModel}
                closeAction={()=> this.setState({saveModel: false})}
                data={this.state.dataObject} 
                type={this.state.type}
                fields= {headers}
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
    };
}


const mapStateToProps = state => {
    const { custCategoryGroupList, show_cust_category_group_loader } = state.custCategoryGroupReducer;

    console.log("custCategoryGroupList=",custCategoryGroupList)
    return { custCategoryGroupList, show_cust_category_group_loader };
};


export default connect(mapStateToProps, { getCustCategoryGroupList, addCustCategoryGroup, editCustCategoryGroup, deleteCustCategoryGroup })(RoleMenuGroupsPage);

