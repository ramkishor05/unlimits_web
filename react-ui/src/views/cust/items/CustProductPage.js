import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
// project imports
import MainCard from '../../../component/cards/MainCard';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';
import { 
    getCustProductList, addCustProduct, editCustProduct, deleteCustProduct,
    getCustUnitList, getCustCurrencyItemList
 } from '../../../actions';
import CollapsibleTable from '../../../component/table/CollapsibleTable';
import CustProductStockService from '../../../services/CustProductStockService';
import DynamicForm from '../../../component/pages/DynamicForm';
import { MataMapper } from '../../../constants/MataMapper';

const mainheaders = [
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
        "key": "description",
        "name": "description",
        "label": "Description",
        "type": "text"
    },
    {
        "key": "title",
        "name": "purchasePrice.price",
        "label": "Purchase",
        "type": "amount",
        "items": [{
            id: "Kg",
            name: "Kg"
        }],
        "itemKey": "id",
        "itemVal": "name",
        "itemName": "purchasePrice.currencyId"
    },
    {
        "key": "retailPrice",
        "name": "retailPrice.price",
        "label": "Retail",
        "type": "amount",
        "items": [{
            id: "Kg",
            name: "Kg"
        }],
        "itemKey": "id",
        "itemVal": "name",
        "itemName": "retailPrice.currencyId"
    },
    {
        "key": "wholePrice",
        "name": "wholePrice.price",
        "label": "Whole",
        "type": "amount",
        "items": [{
            id: "Kg",
            name: "Kg"
        }],
        "itemKey": "id",
        "itemVal": "name",
        "itemName": "wholePrice.currencyId"
    },
    {
        name: "actions",
        label: "Actions"
    }
];

const custProductStockListHeaders = [
    {
        name: "idenNo",
        label: "Iden No",
        type: 'text'
    },
    {
        name: "name",
        label: "Name",
        type: 'text'
    },
    {
        name: "purchasePrice",
        label: "Purchase Price",
        type: 'text',
        render:(value, row, header, props)=>{
            return value;
        }
    },
    {
        name: "salePrice",
        label: "Sale Price",
        type: 'text',
        render:(value, row, header, props)=>{
            return value;
        }
    },
    {
        name: "status",
        label: "Stock",
        type: 'text'
    }
];
const headers= { 
    headers: mainheaders,
    childrens :[
        {
            label: "Stocks",
            name: "custProductStockList",
            headers: custProductStockListHeaders
        }
    ]
}


const modelheaders = [
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
        "key": "description",
        "name": "description",
        "label": "Description",
        "type": "text"
    },
    {
        "key": "title",
        "name": "purchasePrice.price",
        "label": "Purchase",
        "type": "amount",
        "items": [{
            id: "Kg",
            name: "Kg"
        }],
        "itemKey": "id",
        "itemVal": "name",
        "itemName": "purchasePrice.currencyId"
    },
    {
        "key": "retailPrice",
        "name": "retailPrice.price",
        "label": "Retail",
        "type": "amount",
        "items": [{
            id: "Kg",
            name: "Kg"
        }],
        "itemKey": "id",
        "itemVal": "name",
        "itemName": "retailPrice.currencyId"
    },
    {
        "key": "wholePrice",
        "name": "wholePrice.price",
        "label": "Whole",
        "type": "amount",
        "items": [{
            id: "Kg",
            name: "Kg"
        }],
        "itemKey": "id",
        "itemVal": "name",
        "itemName": "wholePrice.currencyId"
    }
];

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });

class CustProductPage extends Component {
    state={
        configPage : true,
        saveModel: false,
        deleteModel: false,
        savePage : false,
        dataObject: {},
        title: "",
        type: ""
    }
    
    _edit = row => {
        if(this.state.configPage){
            this.setState({ dataObject: row, title:"Edit product", type:"Edit", savePage: true  });
        } else{
            this.setState({ dataObject: row, title:"Edit product", type:"Edit", saveModel: true  });
        }
    }

    _add = () => {
        if(this.state.configPage){
            this.setState({ dataObject: {}, title:"Add product", type:"Add", savePage: true  });
        } else{
            this.setState({ dataObject: {}, title:"Add product", type:"Add", saveModel: true  });
        }
    }

    _delete = row => {
        this.setState({ dataObject: row, title:"Delete product", type:"Delete", deleteModel: true  });
    };
    
     saveObject = (type, row) => {
        if(type=='Add')
            this.props.addCustProduct(row, this.clearAndRefresh)
        if(type=='Edit')
            this.props.editCustProduct(row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteCustProduct(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.props.getCustProductList();
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false, savePage: false   });
    }

     getCustProductStock= async (custProduct)=>{
        custProduct['custProductStockList']= await CustProductStockService.getAll(custProduct.id);
    }
    
    async componentDidMount() {
        console.log("this.props",this.props)
        this.props.getCustUnitList();
        await this.props.getCustCurrencyItemList();
        modelheaders.forEach(header=>{
            if(header.items){
                let custCurrencyItemList=this.props.custCurrencyItemList;
                if(custCurrencyItemList){
                    header['items']=custCurrencyItemList;
                }
            }
        })
        await this.props.getCustProductList();
        this.props.custProductList.forEach(custProduct=>{
           this.getCustProductStock(custProduct);
        })
    }

 render() {
        return (
                <>
                { !this.state.savePage &&
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
                        content={false}
                    >
                     <CollapsibleTable
                        headers={this.props.metadata.table} 
                        dataList={this.props.custProductList}
                        deleteAction = {this._delete}
                        editAction = {this._edit}
                        
                        ></CollapsibleTable>
                    </MainCard>
                }
               {
                this.state.savePage &&
                <DynamicForm
                title={this.state.title}
                openAction={this.state.saveModel}
                closeAction={this.clearAndRefresh}
                data={this.state.dataObject} 
                type={this.state.type}
                fields= {modelheaders}
                saveAction = {this.saveObject}
                >
                </DynamicForm>
               }
              {
               this.state.saveModel &&
                <DynamicModel
                title={this.state.title}
                openAction={this.state.saveModel}
                closeAction={this.clearAndRefresh}
                data={this.state.dataObject} 
                type={this.state.type}
                fields= {modelheaders}
                saveAction = {this.saveObject}
                >
                </DynamicModel>
               } 
            
               {
                this.state.deleteModel && 
                <ConfirmModel
                openAction={this.state.deleteModel}
                closeAction={this.clearAndRefresh}
                data={this.state.dataObject} 
                type={this.state.type}
                message= 'Do you want to delete'
                saveAction = {this.saveObject}
                >
                </ConfirmModel>
               }
                
            </>
        );
    };
}


const mapStateToProps = state => {
    const { custProductList} = state.custProductReducer;
    const { custUnitList} = state.custUnitReducer;

    const { custCurrencyItemList} = state.custCurrencyItemReducer;
    return { custProductList, custCurrencyItemList, custUnitList};
};


export default connect(mapStateToProps, { getCustProductList, addCustProduct, editCustProduct, deleteCustProduct, getCustUnitList, getCustCurrencyItemList })(CustProductPage);


