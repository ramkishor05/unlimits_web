const productsMeta = {
    "id": "",
    "table": {
        "type": "",
        "headers": [
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
                "render":(value, row, header, props)=>{
                    console.log("purchasePrice row=",row,  props)
                    let custCurrency=props.custCurrencyItemList.find(custCurrencyItem=>custCurrencyItem.id==row.purchasePrice.currencyId)
                    return custCurrency.symbol +""+ value;
                }
            },
            {
                "key": "retailPrice",
                "name": "retailPrice.price",
                "label": "Retail",
                "type": "amount"
            },
            {
                "key": "wholePrice",
                "name": "wholePrice.price",
                "label": "Whole",
                "type": "amount"
            },
            {
                "name": "actions",
                "label": "Actions"
            }
        ],
        "childrens":[
            {
                "label": "Stocks",
                "name": "custProductStockList",
                "headers": [
                    {
                        "name": "idenNo",
                        "label": "Iden No",
                        "type": "text"
                    },
                    {
                        "name": "name",
                        "label": "Name",
                        "type": "text"
                    },
                    {
                        "name": "purchasePrice",
                        "label": "Purchase Price",
                        "type": "text",
                        "render":(value, row, header, props)=>{
                            return value;
                        }
                    },
                    {
                        "name": "salePrice",
                        "label": "Sale Price",
                        "type": "text",
                        "render":(value, row, header, props)=>{
                            return value;
                        }
                    },
                    {
                        "name": "status",
                        "label": "Stock",
                        "type": "text"
                    }
                ]
            }
        ]
    },
    "model" :[
        {
            "id": "title",
            "key": "title",
            "name": "title",
            "label": "Title",
            "type": "text",
            "required" : {
                value : '',
                message: "Title is required!"
            }
        },
        {
            "id": "name",
            "key": "name",
            "name": "name",
            "label": "Name",
            "type": "text"
        },
        {
            "id": "description",
            "key": "description",
            "name": "description",
            "label": "Description",
            "type": "text"
        },
        {
            "id": "purchasePrice",
            "key": "purchasePrice.price",
            "name": "purchasePrice.price",
            "label": "Purchase Price",
            "type": "amount",
            "required" : {
                value : '',
                message: "Purchase price is required!"
            },
            "prefix" : {
                "id": "purchasePricePreFix",
                "key": "id",
                "value": "id",
                "name": "purchasePrice.currencyId",
                "label" : "symbol",
                "required" : {
                    value : '',
                    message: "Purchase currency is required!"
                },
                "onItems": (value, data, field, props )=>{
                    return props.custCurrencyItemList? props.custCurrencyItemList: []
                }
            }
        },
        {
            "id": "retailPrice",
            "key": "retailPrice",
            "name": "retailPrice.price",
            "label": "Retail",
            "type": "amount",
            "required" : {
                value : '',
                message: "Retail price is required!"
            },
            "prefix" : {
                "id": "retailPricePreFix",
                "key": "id",
                "value": "id",
                "name": "retailPrice.currencyId",
                "label" : "symbol",
                "required" : {
                    value : '',
                    message: "Retail currency is required!"
                },
                "onItems": (value, data, field, props )=>{
                    return props.custCurrencyItemList? props.custCurrencyItemList: []
                }
            }
        },
        {
            "id": "wholePrice",
            "key": "wholePrice",
            "name": "wholePrice.price",
            "label": "Whole",
            "type": "amount",
            "prefix" : {
                "id": "wholePricePreFix",
                "key": "id",
                "value": "id",
                "name": "wholePrice.currencyId",
                "label" : "symbol",
                "onItems": (value, data, field, props )=>{
                    return props.custCurrencyItemList? props.custCurrencyItemList: []
                }
            }
        }
    ]
}

export default productsMeta;