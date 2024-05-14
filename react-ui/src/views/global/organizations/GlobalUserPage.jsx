import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fab } from '@material-ui/core';


import { getGlobalUserList, addGlobalUser, editGlobalUser, deleteGlobalUser, getGlobalVendorList , getUserRoleList} from '../../../actions';
import { getUsers } from '../../../actions';
import MainCard from '../../../component/cards/MainCard';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';
import { AddTaskOutlined } from '@material-ui/icons';
import CollapsibleTable from '../../../component/table/CollapsibleTable';

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
        render: (value, row, header, props ) =>{
            return <img style={{textAlign :'center'}} src={value} width={50} height={50}></img>
        }
    },
    {
        name: "username",
        label: "Name",
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
        name: "userRoleId",
        key: "userRoleId",
        label: "User Role",
        type: 'select',
        onItems: (value, row, header, props ) =>{
            return props.userRoleList
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
        this.props.getGlobalUserList();
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false });
    }
    
   async componentDidMount() {
        this.props.getGlobalVendorList();
        this.props.getUserRoleList();
        this.props.getGlobalUserList();
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
                        content = {false}
                    >
                       <CollapsibleTable 
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
    console.log("userRoleList=",userRoleList)
    return { user, globalUserList,users, show_user_loader, userDetail, userRoleList };
};

const styles = {
    addUserButton: {
        color: 'white',
        backgroundColor: 'purple'
    },
};

export default connect(mapStateToProps, { getGlobalUserList, addGlobalUser,editGlobalUser, deleteGlobalUser, getGlobalVendorList , getUsers , getUserRoleList})(GlobalUserPage);
