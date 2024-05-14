import React, { Component} from 'react';

import Button from '@material-ui/core/Button';


import MainCard from '../../../component/cards/MainCard';
import DynamicTable from '../../../component/table/DynamicTable';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';

import { getGlobalImageLibraryList, addGlobalImageLibrary, editGlobalImageLibrary, deleteGlobalImageLibrary } 
from '../../../actions';
import { connect } from 'react-redux';


const globalTagListMeta = {
    "table": {
        headers : [
            {
                name: "content",
                label: "Content",
                width: 50,
                height: 50,
                type: 'img',
                "required" : {
                    value : '',
                    message: "Content is required!"
                }
            },
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
                type: 'text',
                "required" : {
                    value : '',
                    message: "Group id is required!"
                },
                "render":(value, row, header, props)=>{
                    if(value){
                        let globalImageLibrary=props.globalImageLibraryList.find(globalImageLibrary=>globalImageLibrary.id==value)
                        return globalImageLibrary ? globalImageLibrary.name : value;
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
            name: "content",
            label: "Content",
            width: 150,
            height: 150,
            type: 'img',
            "required" : {
                value : '',
                message: "Content is required!"
            }
        },
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
                return props.globalImageLibraryList? props.globalImageLibraryList: []
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
class GlobalImageLibrary extends Component {
    state={
        saveModel: false,
        deleteModel: false,
        dataObject: {},
        title: "",
        type: ""
    }
    
    _edit = row => {
       this.setState({ dataObject: row, title:"Edit Image Library", type:"Edit", saveModel: true  });
    }

    _add = () => {
       this.setState({ dataObject: {}, title:"Add Image Library", type:"Add", saveModel: true  });
    }

    _delete = row => {
        this.setState({ dataObject: row, title:"Delete Image Library", type:"Delete", deleteModel: true  });
    };
    
     saveObject = (type, row) => {
        
        if(type=='Add')
            this.props.addGlobalImageLibrary(row, this.clearAndRefresh)
        if(type=='Edit')
            this.props.editGlobalImageLibrary(row.id, row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteGlobalImageLibrary(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.props.getGlobalImageLibraryList();
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false  });
    }
    
    componentDidMount() {
        this.props.getGlobalImageLibraryList();
    }
    render() {
        return (
            <>
                
                <MainCard title="Image Library" 
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
                        headers={globalTagListMeta.table.headers} 
                        dataList={this.props.globalImageLibraryList}
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
                            fields= {globalTagListMeta.model}
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
    const { globalImageLibraryList } = state.globalImageLibraryReducer;

    return { globalImageLibraryList };
};


export default connect(mapStateToProps, { getGlobalImageLibraryList, addGlobalImageLibrary, editGlobalImageLibrary, deleteGlobalImageLibrary })(GlobalImageLibrary);


