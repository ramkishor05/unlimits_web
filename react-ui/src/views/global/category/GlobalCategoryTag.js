import React, { Component} from 'react';

import Button from '@material-ui/core/Button';


import MainCard from '../../../component/cards/MainCard';
import DynamicTable from '../../../component/table/DynamicTable';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';

import { getGlobalTagItemPageList, getGlobalCategoryList, addGlobalTagItem, editGlobalTagItem, deleteGlobalTagItem } 
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
class GlobalTagItem extends Component {
    state={
        saveModel: false,
        deleteModel: false,
        dataObject: {},
        title: "",
        type: ""
    }
    
    _edit = row => {
       this.setState({ dataObject: row, title:"Edit Tag Library", type:"Edit", saveModel: true  });
    }

    _add = () => {
       this.setState({ dataObject: {}, title:"Add Tag Library", type:"Add", saveModel: true  });
    }

    _delete = row => {
        this.setState({ dataObject: row, title:"Delete sub tag", type:"Delete", deleteModel: true  });
    };
    
     saveObject = (type, row) => {
        
        if(type=='Add')
            this.props.addGlobalTagItem(row, this.clearAndRefresh)
        if(type=='Edit')
            this.props.editGlobalTagItem(row.id,row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteGlobalTagItem(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = async() => {
        await this.props.getGlobalCategoryList();

        this.props.getGlobalTagItemPageList(0, config.pageSize);
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
                        pageCount= {this.props.globalTagItemPageData.pageCount}
                        totalPages= {this.props.globalTagItemPageData.totalPages}
                        pageAction={this.props.getGlobalTagItemPageList}
                        headers={this.props.metadata.table.headers} 
                        dataList={this.props.globalTagItemPageData.elements}
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
    const { globalCategoryList} = state.globalCategoryReducer;

    const { globalTagItemList, globalTagItemPageData } = state.globalTagItemReducer;

    return { globalTagItemList, globalTagItemPageData, globalSubCategoryList: globalCategoryList };
};


export default connect(mapStateToProps, { getGlobalTagItemPageList, getGlobalCategoryList, addGlobalTagItem, editGlobalTagItem, deleteGlobalTagItem })(GlobalTagItem);


