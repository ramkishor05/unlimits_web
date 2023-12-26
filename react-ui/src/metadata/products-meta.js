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
                "type": "amount"
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
            },
            format : {
                regex : '^[0-9]+$',
                message: "Title should be number!"
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
            "label": "Purchase",
            "type": "amount",
            "prefix" : {
                "id": "purchasePricePreFix",
                "key": "id",
                "value": "id",
                "name": "purchasePrice.currencyId",
                "label" : "name",
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
            "prefix" : {
                "id": "retailPricePreFix",
                "key": "id",
                "value": "id",
                "name": "retailPrice.currencyId",
                "label" : "name",
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
                "label" : "name",
                "onItems": (value, data, field, props )=>{
                    return props.custCurrencyItemList? props.custCurrencyItemList: []
                }
            }
        }
    ]
}

export default productsMeta;