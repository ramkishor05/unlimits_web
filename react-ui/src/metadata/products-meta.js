const productsMeta = {
    "id": "",
    "table": {
        "type": "",
        "headers": [
            {
                name: "logoUrl",
                key: "logoUrl",
                label: "Logo",
                type:'img',
                grid: 2,
                width: 50,
                height: 50
            },
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
                "key": "custCategoryId",
                "name": "custCategoryId",
                "label": "Category",
                "type": "text",
                "render":(value, row, header, props)=>{
                    if(value){
                        let custCategory=props.custCategoryItemList.find(custCategoryItem=>custCategoryItem.id==value)
                        return custCategory ? custCategory.name : value;
                    }
                    return value;
                }
            },
            {
                "key": "purchasePrice.price",
                "name": "purchasePrice.price",
                "label": "Purchase",
                "type": "amount",
                "render":(value, row, header, props)=>{
                    if(value){
                        let custCurrency=props.custCurrencyItemList.find(custCurrencyItem=>custCurrencyItem.id==row.purchasePrice.currencyId)
                        return custCurrency ? custCurrency.symbol +""+ value : value;
                    }
                    return value;
                }
            },
            {
                "key": "retailPrice",
                "name": "retailPrice.price",
                "label": "Retail",
                "type": "amount",
                "render":(value, row, header, props)=>{
                    if(value){
                        let custCurrency=props.custCurrencyItemList.find(custCurrencyItem=>custCurrencyItem.id==row.retailPrice.currencyId)
                        return custCurrency ? custCurrency.symbol +""+ value : value;
                    } 
                    return value;
                }
            },
            {
                "key": "wholePrice",
                "name": "wholePrice.price",
                "label": "Whole",
                "type": "amount",
                "render":(value, row, header, props)=>{
                    if(value){
                        let custCurrency=props.custCurrencyItemList.find(custCurrencyItem=>custCurrencyItem.id==row.wholePrice.currencyId)
                        return custCurrency ? custCurrency.symbol +""+ value : value;
                   } 
                   return value;
                }
            },
            {
                "name": "actions",
                "label": "Actions",
                "align": "center"
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
            name: "logoUrl",
            key: "logoUrl",
            label: "Logo",
            type:'img',
            grid: 2,
            width: 100,
            height: 100
        },
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
            "type": "text",
            "required" : {
                value : '',
                message: "Title is required!"
            }
        },
        {
            "id": "description",
            "key": "description",
            "name": "description",
            "label": "Description",
            "type": "text"
        },
        {
            "id": "custCategoryId",
            "name": "custCategoryId",
            "label" : "Category",
            "type": "select",
            "required" : {
                value : '',
                message: "Category is required!"
            },
            "onItems": (value, data, field, props )=>{
                return props.custCategoryItemList? props.custCategoryItemList: []
            },
            "onDisplay" : (data)=>{
                return <h7><img
                        width={30}
                        height={20}
                        src={data.logoUrl}
                    /> {data.name}</h7> 
            },
            "itemKey": "id",
            "itemVal": "name",
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
                },
                "selected": (value, data, field, props )=>{
                    let custCurrencyItemList=props.custCurrencyItemList? props.custCurrencyItemList: []
                    if(props.custBusineess){
                        let globalCountry=props.globalCountryList.find(globalCountry=>globalCountry.id=props.custBusineess.countryId);
                        if(globalCountry){
                           let custCurrency= custCurrencyItemList.find(custCurrency=>custCurrency.name===globalCountry.currency.name);
                           if(custCurrency){
                            return custCurrency.id;
                           }
                        }
                    }
                    return value;
                }
            }
        },
        {
            "id": "retailPrice",
            "key": "retailPrice",
            "name": "retailPrice.price",
            "label": "Retail Price",
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
                },
                "selected": (value, data, field, props )=>{
                    let custCurrencyItemList=props.custCurrencyItemList? props.custCurrencyItemList: []
                    if(props.custBusineess){
                        let globalCountry=props.globalCountryList.find(globalCountry=>globalCountry.id=props.custBusineess.countryId);
                        if(globalCountry){
                           let custCurrency= custCurrencyItemList.find(custCurrency=>custCurrency.name===globalCountry.currency.name);
                           if(custCurrency){
                            return custCurrency.id;
                           }
                        }
                    }
                    return value;
                }
            }
        },
        {
            "id": "wholePrice",
            "key": "wholePrice",
            "name": "wholePrice.price",
            "label": "Wholesale Price",
            "type": "amount",
            "prefix" : {
                "id": "wholePricePreFix",
                "key": "id",
                "value": "id",
                "name": "wholePrice.currencyId",
                "label" : "symbol",
                "onItems": (value, data, field, props )=>{
                    return props.custCurrencyItemList? props.custCurrencyItemList: []
                },
                "selected": (value, data, field, props )=>{
                    let custCurrencyItemList=props.custCurrencyItemList? props.custCurrencyItemList: []
                    if(props.custBusineess){
                        let globalCountry=props.globalCountryList.find(globalCountry=>globalCountry.id=props.custBusineess.countryId);
                        if(globalCountry){
                           let custCurrency= custCurrencyItemList.find(custCurrency=>custCurrency.name===globalCountry.currency.name);
                           if(custCurrency){
                            return custCurrency.id;
                           }
                        }
                    }
                    return value;
                }
            }
        }
    ]
}

export default productsMeta;