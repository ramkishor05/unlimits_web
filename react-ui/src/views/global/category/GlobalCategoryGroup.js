import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';

// project imports
import MainCard from '../../../component/cards/MainCard';
import DynamicTable from '../../../component/table/DynamicTable';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';
import { getGlobalCategoryGroupList, addGlobalCategoryGroup, editGlobalCategoryGroup, deleteGlobalCategoryGroup } from '../../../actions';

const headers = [
    {
        name: "name",
        label: "Name",
        type: 'text'
    },
    {
        name: "description",
        label: "Description",
        type: 'text'
    },
    {
        name: "typeId",
        label: "Type",
        type: 'text'
    },
    {
        name: "actions",
        label: "Actions"
    }
]

function actions(){
    return ['edit', 'update']
}

//==============================|| SAMPLE PAGE ||==============================//
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
       this.setState({ dataObject: row, title:"Edit category group", type:"Edit", saveModel: true  });
    }

    _add = () => {
       this.setState({ dataObject: {}, title:"Add category group", type:"Add", saveModel: true  });
    }

    _delete = row => {
        this.setState({ dataObject: row, title:"Delete category group", type:"Delete", deleteModel: true  });
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
                    >
                        <DynamicTable 
                        headers={headers} 
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
                                fields= {headers}
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


export default connect(mapStateToProps, { getGlobalCategoryGroupList, addGlobalCategoryGroup, editGlobalCategoryGroup, deleteGlobalCategoryGroup })(GlobalCategoryGroup);


