const productsMeta = {
    "id": "",
    "table": {
        "headers": [
            {
                "key": "title",
                "name": "title",
                "label": "Title",
                "type": "text"
            },{
                "key": "title",
                "name": "title",
                "label": "Home",
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
                    "id": "Kg",
                    "name": "Kg"
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
                    "id": "Kg",
                    "name": "Kg"
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
                    "id": "Kg",
                    "name": "Kg"
                }],
                "itemKey": "id",
                "itemVal": "name",
                "itemName": "wholePrice.currencyId"
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
    }
}

export default productsMeta;