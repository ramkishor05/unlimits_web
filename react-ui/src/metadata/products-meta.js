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
            "type": "text"
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
            "key": "purchasePrice",
            "name": "purchasePrice.price",
            "label": "Purchase",
            "type": "amount",
            "onItems": (value,data, field, props )=>{
                return props.custCurrencyItemList? props.custCurrencyItemList: []
            },
            "itemKey": "id",
            "itemVal": "name",
            "itemName": "purchasePrice.currencyId"
        },
        {
            "id": "retailPrice",
            "key": "retailPrice",
            "name": "retailPrice.price",
            "label": "Retail",
            "type": "amount",
            "onItems": (value,data, field, props )=>{
                return props.custCurrencyItemList? props.custCurrencyItemList: []
            },
            "itemKey": "id",
            "itemVal": "name",
            "itemName": "retailPrice.currencyId"
        },
        {
            "id": "wholePrice",
            "key": "wholePrice",
            "name": "wholePrice.price",
            "label": "Whole",
            "type": "amount",
            "onItems": (value,data, field, props )=>{
                return props.custCurrencyItemList? props.custCurrencyItemList: []
            },
            "itemKey": "id",
            "itemVal": "name",
            "itemName": "wholePrice.currencyId"
        }
    ]
}

export default productsMeta;