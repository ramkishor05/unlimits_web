import React, { Component} from 'react';

import Button from '@material-ui/core/Button';


import MainCard from '../../../component/cards/MainCard';
import DynamicTable from '../../../component/table/DynamicTable';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';

import { getGlobalJournalPageList, addGlobalJournal, editGlobalJournal, deleteGlobalJournal } 
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
class GlobalJournals extends Component {
    state={
        saveModel: false,
        deleteModel: false,
        dataObject: {},
        title: "",
        type: ""
    }
    
    _edit = row => {
       this.setState({ dataObject: row, title:"Update Journal", type:"Update", saveModel: true  });
    }

    _add = () => {
       this.setState({ dataObject: {}, title:"Add Journal", type:"Add", saveModel: true  });
    }

    _delete = row => {
        this.setState({ dataObject: row, title:"Delete Journal", type:"Delete", deleteModel: true  });
    };
    
     saveObject = (type, row) => {
        
        if(type=='Add')
            this.props.addGlobalJournal(row, this.clearAndRefresh)
        if(type=='Update')
            this.props.editGlobalJournal(row.id,row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteGlobalJournal(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.props.getGlobalJournalPageList(0, config.pageSize);
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false  });
    }
    
    componentDidMount() {
        this.clearAndRefresh();
    }

    render() {
        return (
            <>
                
                <MainCard title="Journals" 
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
                        headers={this.props.metadata.table.headers} 
                        dataList={this.props.globalJournalPageData.elements}
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

    const { globalJournalPageData } = state.globalJournalReducer;

    return { globalJournalPageData };
};


export default connect(mapStateToProps, { getGlobalJournalPageList, addGlobalJournal, editGlobalJournal, deleteGlobalJournal })(GlobalJournals);


