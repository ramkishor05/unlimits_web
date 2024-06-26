import React, { Component} from 'react';

import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';


import MainCard from '../../../component/cards/MainCard';
import DynamicTable from '../../../component/table/DynamicTable';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';

import { getGlobalCategoryPageList, addGlobalCategory, editGlobalCategory, deleteGlobalCategory, getGlobalCategoryGroupList } 
from '../../../actions';
import { connect } from 'react-redux';
import config from '../../../config';

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
       this.setState({ dataObject: row, title:"Update Sub Category", type:"Update", saveModel: true  });
    }

    _add = () => {
       this.setState({ dataObject: {}, title:"Add Sub Category", type:"Add", saveModel: true  });
    }

    _delete = row => {
        this.setState({ dataObject: row, title:"Delete Sub Category", type:"Delete", deleteModel: true  });
    };
    
     saveObject = (type, row) => {
        
        if(type=='Add')
            this.props.addGlobalCategory(row, this.clearAndRefresh)
        if(type=='Update')
            this.props.editGlobalCategory(row.id, row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteGlobalCategory(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.props.getGlobalCategoryGroupList();
        this.props.getGlobalCategoryPageList(0, config.pageSize);
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false  });
    }
    
    componentDidMount() {
        this.clearAndRefresh();
    }
    render() {
        return (
            <>
                
                <MainCard title={this.props.metadata.table.name} 
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
                        pageCount= {this.props.globalCategoryItemPageData.pageCount}
                        totalPages={this.props.globalCategoryItemPageData.totalPages}
                        pageAction={this.props.getGlobalCategoryPageList}
                        headers={this.props.metadata.table.headers} 
                        dataList={this.props.globalCategoryItemPageData.elements}
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
                        fields= {this.props.metadata.model}
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
    const { globalCategoryList, globalCategoryItemPageData} = state.globalCategoryReducer;
    const { globalCategoryGroupList} = state.globalCategoryGroupReducer;
    return { globalCategoryItemPageData, globalCategoryList, globalCategoryGroupList };
};


export default connect(mapStateToProps, { getGlobalCategoryPageList, addGlobalCategory, editGlobalCategory, deleteGlobalCategory, getGlobalCategoryGroupList })(GlobalCategoryItem);


