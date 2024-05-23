import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';

// project imports
import MainCard from '../../../component/cards/MainCard';
import DynamicTable from '../../../component/table/DynamicTable';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';
import { getGlobalCategoryList, getGlobalTagGroupPageList, addGlobalTagGroup, editGlobalTagGroup, deleteGlobalTagGroup } from '../../../actions';
import config from '../../../config';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });

class GlobalTagGroup extends Component {
    state={
        saveModel: false,
        deleteModel: false,
        dataObject: {},
        title: "",
        type: ""
    }
    
    _edit = row => {
       this.setState({ dataObject: row, title:"Edit main tag", type:"Edit", saveModel: true  });
    }

    _add = () => {
       this.setState({ dataObject: {}, title:"Add main tag", type:"Add", saveModel: true  });
    }

    _delete = row => {
        this.setState({ dataObject: row, title:"Delete main tag", type:"Delete", deleteModel: true  });
    };
    
     saveObject = (type, row) => {
        
        if(type=='Add')
            this.props.addGlobalTagGroup(row, this.clearAndRefresh)
        if(type=='Edit')
            this.props.editGlobalTagGroup(row.id,row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteGlobalTagGroup(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.props.getGlobalTagGroupPageList(0, config.pageSize);
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false  });
    }
    
    componentDidMount() {
        this.props.getGlobalCategoryList();
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
                        pageCount= {this.props.globalTagGroupPageData.pageCount}
                        totalPages= {this.props.globalTagGroupPageData.totalPages}
                        pageAction={this.props.getGlobalTagGroupPageList}
                        headers={this.props.metadata.table.headers} 
                        dataList={this.props.globalTagGroupPageData.elements}
                        {...this.props}
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
    const { globalCategoryList} = state.globalCategoryReducer;

    const { globalTagGroupList, globalTagGroupPageData} = state.globalTagGroupReducer;
    return { globalTagGroupList, globalTagGroupPageData, globalCategoryList};
};


export default connect(mapStateToProps, {getGlobalCategoryList, getGlobalTagGroupPageList, addGlobalTagGroup, editGlobalTagGroup, deleteGlobalTagGroup })(GlobalTagGroup);


