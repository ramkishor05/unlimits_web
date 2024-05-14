import React, { Component} from 'react';

import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';


import MainCard from '../../../component/cards/MainCard';
import DynamicTable from '../../../component/table/DynamicTable';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';

import { getGlobalCategoryList, addGlobalCategory, editGlobalCategory, deleteGlobalCategory, getGlobalCategoryGroupList } 
from '../../../actions';
import { connect } from 'react-redux';

const globalCategoryListMeta = {
    "table": {
        headers : [
            {
                name: "name",
                label: "Name",
                type: 'text',
                "required" : {
                    value : '',
                    message: "Name is required!"
                }
            },
            {
                name: "description",
                label: "Description",
                type: 'text'
            },
            {
                name: "typeId",
                label: "Type",
                type: 'text',
                "required" : {
                    value : '',
                    message: "Type id is required!"
                }
            },
            {
                name: "groupId",
                "key": "groupId",
                label: "Group Id",
                type: 'text',
                "required" : {
                    value : '',
                    message: "Group id is required!"
                },
                "render":(value, row, header, props)=>{
                    if(value){
                        let findglobalCategoryGroup=props.globalCategoryGroupList.find(globalCategoryGroup=>globalCategoryGroup.id==value)
                        return findglobalCategoryGroup ? findglobalCategoryGroup.name : value;
                    }
                    return value;
                }
            },
            {
                name: "actions",
                label: "Actions"
            }
        ]
    },
    model : [
        {
            name: "name",
            label: "Name",
            type: 'text',
            "required" : {
                value : '',
                message: "Name is required!"
            }
        },
        {
            name: "description",
            label: "Description",
            type: 'text'
        },
        {
            name: "typeId",
            label: "Type",
            type: 'text',
            "required" : {
                value : '',
                message: "Type id is required!"
            }
        },
        {
            name: "groupId",
            label: "Group Id",
            type: 'select',
            "required" : {
                value : '',
                message: "Group id is required!"
            },
            "onItems": (value, data, field, props )=>{
                return props.globalCategoryGroupList? props.globalCategoryGroupList: []
            },
            "onDisplay" : (data)=>{
                return <h7><img
                        width={30}
                        height={20}
                        src={data.logoUrl}
                    /> {data.name}</h7> 
            },
            "itemKey": "id",
            "itemVal": "name"
        }
    ]
}

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
});
class GlobalCategoryItem extends Component {
    state={
        saveModel: false,
        deleteModel: false,
        dataObject: {},
        title: "",
        type: ""
    }
    
    _edit = row => {
       this.setState({ dataObject: row, title:"Edit category list", type:"Edit", saveModel: true  });
    }

    _add = () => {
       this.setState({ dataObject: {}, title:"Add category list", type:"Add", saveModel: true  });
    }

    _delete = row => {
        this.setState({ dataObject: row, title:"Delete category list", type:"Delete", deleteModel: true  });
    };
    
     saveObject = (type, row) => {
        
        if(type=='Add')
            this.props.addGlobalCategory(row, this.clearAndRefresh)
        if(type=='Edit')
            this.props.editGlobalCategory(row.id, row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteGlobalCategory(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.props.getGlobalCategoryGroupList();
        this.props.getGlobalCategoryList();
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false  });
    }
    
    componentDidMount() {
        this.clearAndRefresh();
    }
    render() {
        return (
            <>
                
                <MainCard title="Category List" 
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
                        <DynamicTable 
                        headers={globalCategoryListMeta.table.headers} 
                        dataList={this.props.globalCategoryList}
                        deleteAction = {this._delete}
                        editAction = {this._edit}
                        {...this.props}
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
                        fields= {globalCategoryListMeta.model}
                        saveAction = {this.saveObject}
                        {...this.props}
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
    };
}



const mapStateToProps = state => {
    const { globalCategoryList} = state.globalCategoryReducer;
    const { globalCategoryGroupList} = state.globalCategoryGroupReducer;
    return { globalCategoryList, globalCategoryGroupList };
};


export default connect(mapStateToProps, { getGlobalCategoryList, addGlobalCategory, editGlobalCategory, deleteGlobalCategory, getGlobalCategoryGroupList })(GlobalCategoryItem);


