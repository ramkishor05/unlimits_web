import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
// project imports
import MainCard from '../../../component/cards/MainCard';
import DynamicTable from '../../../component/table/DynamicTable';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';
import { 
    getCustProductList, addCustProduct, editCustProduct, deleteCustProduct,
    getCustUnitList, getCustCurrencyItemList
 } from '../../../actions';
import CollapsibleTable from '../../../component/table/CollapsibleTable';
import CustProductStockService from '../../../services/CustProductStockService';
function createData(name, description, typeId, actions) {
    return { name, description, typeId, actions};
}

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

function actions(){
    return ['edit', 'update']
}


let dataList = [
    createData('Frozen yoghurt', 'Frozen yoghurt', 'Home', actions),
    createData('Ice cream sandwich', 'Ice cream sandwich', 'Home', actions),
    createData('Eclair', 'Eclair', 'Home', actions),
];
//==============================|| SAMPLE PAGE ||==============================//
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
        saveModel: false,
        deleteModel: false,
        dataObject: {},
        title: "",
        type: ""
    }
    
    _edit = row => {
       console.log("row=",row)
       this.setState({ dataObject: row, title:"Edit product", type:"Edit", saveModel: true  });
    }

    _add = () => {
       this.setState({ dataObject: {}, title:"Add product", type:"Add", saveModel: true  });
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
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false  });
    }

     getCustProductStock= async (custProduct)=>{
        custProduct['custProductStockList']= await CustProductStockService.getAll(custProduct.id);
    }
    
    async componentDidMount() {
        
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
        console.log("this.props.custProductList=",this.props.custProductList)
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
                        content={false}
                    >
                     <CollapsibleTable
                        headers={headers} 
                        dataList={this.props.custProductList}
                        deleteAction = {this._delete}
                        editAction = {this._edit}
                        
                        ></CollapsibleTable>
                    </MainCard>
                
                <DynamicModel
                title={this.state.title}
                openAction={this.state.saveModel}
                closeAction={()=> this.setState({saveModel: false})}
                data={this.state.dataObject} 
                type={this.state.type}
                fields= {modelheaders}
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

    const { custCurrencyItemList} = state.custCurrencyItemReducer;
    return { custProductList, custCurrencyItemList, custUnitList};
};


export default connect(mapStateToProps, { getCustProductList, addCustProduct, editCustProduct, deleteCustProduct, getCustUnitList, getCustCurrencyItemList })(CustProductPage);


