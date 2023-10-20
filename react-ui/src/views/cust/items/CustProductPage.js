import React, { useEffect, useReducer, useState,Component } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

// project imports
import MainCard from '../../../component/cards/MainCard';
import DynamicTable from '../../../component/table/DynamicTable';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';
import { 
    getCustProductList, addCustProduct, editCustProduct, deleteCustProduct,
    getCustUnitList
 } from '../../../actions';

function createData(name, description, typeId, actions) {
    return { name, description, typeId, actions};
}
const headers = [
    {
        "key": "title",
        "name": "title",
        "label": "Title",
        "type": "text"
    },
    {
        "key": "name",
        "name": "name",
        "label": "Name",
        "type": "text"
    },
    {
        "key": "desc",
        "name": "desc",
        "label": "Description",
        "type": "text"
    },
    {
        "key": "title",
        "name": "purchasePrice",
        "label": "Purchase",
        "type": "text"
    },
    {
        "key": "purchaseUnit.id",
        "name": "purchaseUnitId",
        "label": "Unit",
        "type": "select",
        "items": [],
        "itemKey": "id",
        "itemVal": "name"
    },
    {
        "key": "retailPrice",
        "name": "retailPrice",
        "label": "Retail",
        "type": "text"
    },
    {
        "key": "retailUnit.id",
        "name": "retailUnitId",
        "label": "Unit",
        "type": "select",
        "items": [],
        "itemKey": "id",
        "itemVal": "name"
    },
    {
        "key": "wholePrice",
        "name": "wholePrice",
        "label": "Whole",
        "type": "text"
    },
    {
        "key": "wholeUnit.id",
        "name": "wholeUnitId",
        "label": "Unit",
        "type": "select",
        "items": [],
        "itemKey": "id",
        "itemVal": "name"
    },
    {
        name: "actions",
        label: "Actions"
    }
];

function actions(){
    return ['edit', 'update']
}


let dataList = [
    createData('Frozen yoghurt', 'Frozen yoghurt', 'Home', actions),
    createData('Ice cream sandwich', 'Ice cream sandwich', 'Home', actions),
    createData('Eclair', 'Eclair', 'Home', actions),
];
  console.log("rows=",dataList)
//==============================|| SAMPLE PAGE ||==============================//
const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });

class CustCategoryGroup extends Component {
    state={
        saveModel: false,
        deleteModel: false,
        dataObject: {},
        title: "",
        type: ""
    }
    
    _edit = row => {
       console.log("row=",row)
       this.setState({ dataObject: row, title:"Edit category group", type:"Edit", saveModel: true  });
    }

    _add = () => {
       this.setState({ dataObject: {}, title:"Add category group", type:"Add", saveModel: true  });
    }

    _delete = row => {
        this.setState({ dataObject: row, title:"Delete category group", type:"Delete", deleteModel: true  });
    };
    
     saveObject = (type, row) => {
        console.log(type+"=",row)
        if(type=='Add')
            this.props.addCustProduct(row, this.clearAndRefresh)
        if(type=='Edit')
            this.props.editCustProduct(row.id, row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteCustProduct(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.props.getCustProductList();
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false  });
    }
    
    async componentDidMount() {
        await this.props.getCustProductList();
        await this.props.getCustUnitList();
         headers.forEach(header=>{
            if(header.type==='select'){
                let custUnitList=this.props.custUnitList;
                if(custUnitList){
                    header['items']=custUnitList;
                }
                console.log("header=",header)
            }
        })
    }

 render() {
        return (
                <>
                
                    <MainCard title="Product" 
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
                        dataList={this.props.custProductList}
                        deleteAction = {this._delete}
                        editAction = {this._edit}
                        ></DynamicTable>
                    </MainCard>
                
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
    const { custProductList} = state.custProductReducer;
    const { custUnitList} = state.custUnitReducer;
    console.log("custUnitList=",custUnitList)
    return { custProductList, custUnitList};
};


export default connect(mapStateToProps, { getCustProductList, addCustProduct, editCustProduct, deleteCustProduct, getCustUnitList })(CustCategoryGroup);


