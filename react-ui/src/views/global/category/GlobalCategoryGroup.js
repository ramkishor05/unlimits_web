import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';

// project imports
import MainCard from '../../../component/cards/MainCard';
import DynamicTable from '../../../component/table/DynamicTable';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';
import { getGlobalCategoryGroupList,getGlobalCategoryGroupPageList, addGlobalCategoryGroup, editGlobalCategoryGroup, deleteGlobalCategoryGroup } from '../../../actions';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });

class GlobalCategoryGroup extends Component {
    state={
        saveModel: false,
        deleteModel: false,
        dataObject: {},
        title: "",
        type: ""
    }
    
    _edit = row => {
       this.setState({ dataObject: row, title:"Edit main category", type:"Edit", saveModel: true  });
    }

    _add = () => {
       this.setState({ dataObject: {}, title:"Add main category", type:"Add", saveModel: true  });
    }

    _delete = row => {
        this.setState({ dataObject: row, title:"Delete main category", type:"Delete", deleteModel: true  });
    };
    
     saveObject = (type, row) => {
        
        if(type=='Add')
            this.props.addGlobalCategoryGroup(row, this.clearAndRefresh)
        if(type=='Edit')
            this.props.editGlobalCategoryGroup(row.id,row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteGlobalCategoryGroup(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.props.getGlobalCategoryGroupList();
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false  });
    }
    
    componentDidMount() {
        this.props.getGlobalCategoryGroupList();
        
    }

 render() {
    console.log("this.props.metadata=",this.props.metadata)
        return (
                <>
                
                    <MainCard title="Category Group" 
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
                        pageAction={this.props.getGlobalCategoryGroupPageList}
                        headers={this.props.metadata.table.headers} 
                        dataList={this.props.globalCategoryGroupList}
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
    const { globalCategoryGroupList, show_global_category_group_loader } = state.globalCategoryGroupReducer;
    return { globalCategoryGroupList, show_global_category_group_loader };
};


export default connect(mapStateToProps, { getGlobalCategoryGroupList, getGlobalCategoryGroupPageList,addGlobalCategoryGroup, editGlobalCategoryGroup, deleteGlobalCategoryGroup })(GlobalCategoryGroup);


