import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';


import { getGlobalUserPageList, addGlobalUser, editGlobalUser, deleteGlobalUser, getGlobalVendorList , getUserRoleList} from '../../../actions';
import { getUsers } from '../../../actions';
import MainCard from '../../../component/cards/MainCard';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';
import CollapsibleTable from '../../../component/table/CollapsibleTable';
import config from '../../../config';

const mainheaders = [
    {
        name: "userProfile.pictureURL",
        label: "Profile Img",
        type: 'img',
        width: 30,
        height:30,
        render: (value, row, header, props ) =>{
            return <img style={{textAlign :'center'}} src={value} width={30} height={30}></img>
        }
    },
    {
        name: "username",
        label: "Username",
        type: 'text'
    },
    {
        name: "registeredEmail",
        label: "Registered Email",
        type: 'email'
    },
    {
        name: "registeredMobile",
        label: "Registered Mobile",
        type: 'text'
    },
    {
        name: "type",
        label: "User Type",
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
        width: 200,
        height:200,
        grid:12,
        render: (value, row, header, props ) =>{
            return <img style={{textAlign :'center'}} src={value} width={50} height={50}></img>
        }
    },
    {
        name: "username",
        label: "Username",
        type: 'text',
        "required" : {
            value : '',
            message: "Username is required!"
        }
    },
    {
        name: "registeredEmail",
        label: "Registered Email",
        type: 'email'
    },
    {
        name: "registeredMobile",
        label: "Registered mobile",
        type: 'text'
    },
    {
        name: "type",
        label: "User Type",
        type: 'text',
        "required" : {
            value : '',
            message: "User type is required!"
        }
    },
    {
        name: "userRoleId",
        key: "userRoleId",
        label: "User Role",
        type: 'select',
        "required" : {
            value : '',
            message: "User role is required!"
        },
        onItems: (value, row, header, props ) =>{
            return props.userRoleList? props.userRoleList: [];
        },
        itemKey: 'id',
        itemVal: 'roleName'
    }
];

class GlobalUserPage extends Component {
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
            this.props.addGlobalUser(row, this.clearAndRefresh)
        if(type=='Edit'){
            delete row['enableAccess'];
           
            this.props.editGlobalUser(row.id,row, this.clearAndRefresh)
        }
        
        if(type=='Delete')
            this.props.deleteGlobalUser(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.props.getGlobalUserPageList(0, config.pageSize);
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false });
    }
    
   async componentDidMount() {
        //this.props.getGlobalVendorList();
        this.props.getUserRoleList();
        this.clearAndRefresh();
    }

    render() {
        return (
            <>
                
                <MainCard title="User List" 
                        button ={
                            <Button variant="outlined" 
                            color="primary" 
                            className={styles.button}
                            onClick={this._add}
                            >
                                Add
                            </Button>
                        }
                        content = {false}
                    >
                       <CollapsibleTable 
                            pageSize= {config.pageSize}
                            pageAction={this.props.getGlobalUserPageList}
                            headers={headers} 
                            dataList={this.props.globalUserList}
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
                    userRoleList={this.props.userRoleList}
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
    const { user, users} = state.userReducer;
    const { userDetail } = state.userReducer;
    const { userRoleList } = state.userRoleReducer

    const { globalUserList, show_user_loader } = state.globalUserReducer;
    return { user, globalUserList,users, show_user_loader, userDetail, userRoleList };
};

const styles = {
    addUserButton: {
        color: 'white',
        backgroundColor: 'purple'
    },
};

export default connect(mapStateToProps, { getGlobalUserPageList, addGlobalUser,editGlobalUser, deleteGlobalUser, getGlobalVendorList , getUsers , getUserRoleList})(GlobalUserPage);
