import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fab } from '@material-ui/core';


import { getCustUserList, addCustUser, editCustUser, deleteCustUser, getCustVendorList , getCustRoleList} from '../../../../actions';
import MainCard from '../../../../component/cards/MainCard';
import DynamicModel from '../../../../component/model/DynamicModel';
import ConfirmModel from '../../../../component/model/ConfirmModel';
import { AddTaskOutlined } from '@material-ui/icons';
import CollapsibleTable from '../../../../component/table/CollapsibleTable';

const mainheaders = [
    {
        name: "userProfile.pictureURL",
        label: "Profile Img",
        type: 'img',
        render: (value, row, header, props ) =>{
            return <img style={{textAlign :'center'}} src={value} width={50} height={50}></img>
        }
    },
    {
        name: "username",
        label: "Username",
        type: 'text'
    },
    {
        name: "registeredEmail",
        label: "Registed Email",
        type: 'email'
    },
    {
        name: "registeredMobile",
        label: "Registed mobile",
        type: 'text'
    },
    {
        name: "type",
        label: "User type",
        type: 'text'
    },
    {
        name: "userRole.roleId",
        label: "User Role",
        type: 'text'
    },
    {
        name: "actions",
        label: "Actions"
    }
];

const profileheaders = [
    {
        name: "title",
        label: "Title",
        type: 'text'
    },
    {
        name: "firstName",
        label: "First Name",
        type: 'email'
    },
    {
        name: "lastName",
        label: "Last Name",
        type: 'text'
    }
];

const headers= { 
    headers: mainheaders,
    childrens :[
        {
            label: "User Profile",
            name: "userProfile",
            headers: profileheaders,
            onLoad : (value, parent, props)=>{
                if(parent.userProfile){
                    return parent.userProfile;
                }
                return null;
            }
        }
    ]
}

const modelheaders = [
    {
        name: "userProfile.pictureURL",
        label: "Profile Img",
        type: 'img',
        render: (value, row, header, props ) =>{
            return <img style={{textAlign :'center'}} src={value} width={50} height={50}></img>
        }
    },
    {
        name: "username",
        label: "Userame",
        type: 'text'
    },
    {
        name: "password",
        label: "Password",
        type: 'password'
    },
    {
        name: "registeredEmail",
        label: "Registed Email",
        type: 'email'
    },
    {
        name: "registeredMobile",
        label: "Registed mobile",
        type: 'text'
    },
    {
        name: "User type",
        label: "type",
        type: 'select',
        onItems: (value, row, header, props ) =>{
            return props.custRoleList
        },
        itemKey: 'id',
        itemVal: 'roleName'
    },
    {
        name: "userRoleId",
        key: "userRoleId",
        label: "User Role",
        type: 'select',
        onItems: (value, row, header, props ) =>{
            return props.custRoleList
        },
        itemKey: 'id',
        itemVal: 'roleName'
    }
];

class CustUser extends Component {
    state={
        saveModel: false,
        deleteModel: false,
        dataObject: {},
        title: "",
        type: ""
    }
    
    _edit = row => {
        row['enableAccess']=true;
      
        row['userRoleId']=row.userRole.id;
       this.setState({ dataObject: row, title:"Edit user", type:"Edit", saveModel: true  });
    }

    _add = () => {
       this.setState({ dataObject: {}, title:"Add user", type:"Add", saveModel: true  });
    }

    _delete = row => {
        this.setState({ dataObject: row, title:"Delete user", type:"Delete", deleteModel: true  });
    };
    
     saveObject = async (type, row) => {
        if(type=='Add')
            this.props.addCustUser(row, this.clearAndRefresh)
        if(type=='Edit'){
            delete row['enableAccess'];
           
            this.props.editCustUser(row.id,row, this.clearAndRefresh)
        }
        
        if(type=='Delete')
            this.props.deleteCustUser(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.props.getCustUserList();
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false });
    }
    
   async componentDidMount() {
        this.props.getCustVendorList();
        this.props.getCustRoleList();

        await this.props.getCustUserList();
    }

    render() {
        return (
            <>
                
                <MainCard title="User List" 
                        button ={
                            
                            <Fab size="medium" color="primary" aria-label="Add" className={styles.button}
                                onClick={this._add}>
                                <AddTaskOutlined/>
                            </Fab>
                        }
                    >
                       <CollapsibleTable 
                            headers={headers} 
                            dataList={this.props.custUserList}
                            userList= {this.props.users}
                            deleteAction = {this._delete}
                            editAction = {this._edit}
                            printAction= {this._print}
                            >

                        </CollapsibleTable>
                    </MainCard>
                
                    {this.state.saveModel  &&
                    <DynamicModel
                    title={this.state.title}
                    openAction={this.state.saveModel}
                    closeAction={()=> this.setState({saveModel: false})}
                    data={this.state.dataObject} 
                    custRoleList={this.props.custRoleList}
                    type={this.state.type}
                    fields= {modelheaders}
                    saveAction = {this.saveObject}
                    >
                    </DynamicModel>
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
    const { user, users, userDetail} = state.userReducer;
    const { custRoleList } = state.custRoleReducer

    const { custUserList, show_user_loader } = state.custUserReducer;
    return { user, custUserList,users, show_user_loader, userDetail, custRoleList };
};

const styles = {
    addUserButton: {
        color: 'white',
        backgroundColor: 'purple'
    },
};

export default connect(mapStateToProps, { getCustUserList, addCustUser,editCustUser, deleteCustUser, getCustVendorList , getCustRoleList})(CustUser);
