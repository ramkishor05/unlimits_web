import React, { Component} from 'react';

import Button from '@material-ui/core/Button';


import MainCard from '../../../component/cards/MainCard';
import DynamicTable from '../../../component/table/DynamicTable';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';

import { getGlobalMindSetLibraryPageList, addGlobalMindSetLibrary, editGlobalMindSetLibrary, deleteGlobalMindSetLibrary } 
from '../../../actions';
import { connect } from 'react-redux';
import config from '../../../config';


const globalMindSetMeta = {
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
                name: "content",
                label: "URL",
                type: 'text',
                "required" : {
                    value : '',
                    message: "URL is required!"
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
            name: "content",
            label: "URL",
            type: 'text',
            grid:12,
            "required" : {
                value : '',
                message: "URL is required!"
            }
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
class GlobalMindSetLibrary extends Component {
    state={
        saveModel: false,
        deleteModel: false,
        dataObject: {},
        title: "",
        type: ""
    }
    
    _edit = row => {
       this.setState({ dataObject: row, title:"Edit MindSet Library", type:"Edit", saveModel: true  });
    }

    _add = () => {
       this.setState({ dataObject: {}, title:"Add MindSet Library", type:"Add", saveModel: true  });
    }

    _delete = row => {
        this.setState({ dataObject: row, title:"Delete MindSet Library", type:"Delete", deleteModel: true  });
    };
    
     saveObject = (type, row) => {
        
        if(type=='Add')
            this.props.addGlobalMindSetLibrary(row, this.clearAndRefresh)
        if(type=='Edit')
            this.props.editGlobalMindSetLibrary(row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteGlobalMindSetLibrary(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.props.getGlobalMindSetLibraryPageList(0, config.pageSize);
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false  });
    }
    
    componentDidMount() {
        this.clearAndRefresh();
    }
    render() {
        return (
            <>
                
                <MainCard title="Mindset Library" 
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
                        pageSize= {config.pageSize}
                        pageCount= {this.props.globalMindSetLibraryPageData.pageCount}
                        totalPages= {this.props.globalMindSetLibraryPageData.totalPages}
                        pageAction={this.props.getGlobalMindSetLibraryPageList}
                        headers={globalMindSetMeta.table.headers} 
                        dataList={this.props.globalMindSetLibraryPageData.elements}
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
                            fields= {globalMindSetMeta.model}
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
    const { globalMindSetLibraryList, globalMindSetLibraryPageData } = state.globalMindSetLibraryReducer;

    return { globalMindSetLibraryList, globalMindSetLibraryPageData };
};


export default connect(mapStateToProps, { getGlobalMindSetLibraryPageList, addGlobalMindSetLibrary, editGlobalMindSetLibrary, deleteGlobalMindSetLibrary })(GlobalMindSetLibrary);


