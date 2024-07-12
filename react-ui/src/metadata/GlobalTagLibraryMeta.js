const globalTaglibraryMeta = {
    "table": {
        name: 'Tag library',
        headers : [
            {
                name: "name",
                label: "Name",
                type: 'text',
                "required" : {
                    value : '',
                    message: "Name is required!"
                }
            },
            {
                name: "color",
                label: "Color",
                type: 'color',
                "required" : {
                    value : '',
                    message: "Color is required!"
                }
            },
            {
                name: "subCategoryId",
                label: "Sub Category",
                type: 'text',
                "required" : {
                    value : '',
                    message: "Sub category is required!"
                },
                "render":(value, row, header, props)=>{
                    if(value){
                        let globalSubCategory=props.globalSubCategoryList.find(globalSubCategory=>globalSubCategory.id==value)
                        return globalSubCategory ? globalSubCategory.name : value;
                    }
                    return value;
                }
            },
            {
                name: "actions",
                label: "Actions",
               "align": "right"
            }
        ]
    },
    model : [
        {
            name: "name",
            label: "Name",
            type: 'text',
            "required" : {
                value : '',
                message: "Name is required!"
            }
        },
        {
            name: "color",
            label: "Color",
            type: 'color',
            "required" : {
                value : '',
                message: "Color is required!"
            }
        },
        {
            name: "subCategoryId",
            label: "Sub Category",
            type: 'select',
            "required" : {
                value : '',
                message: "Sub Category is required!"
            },
            "onItems": (value, data, field, props )=>{
                return props.globalSubCategoryList? props.globalSubCategoryList: []
            },
            "onDisplay" : (data)=>{
                return <h7><img
                        width={30}
                        height={20}
                        src={data.logoUrl}
                    /> {data.name}</h7> 
            },
            "itemKey": "id",
            "itemVal": "name"
        }
    ],
    
    filter : [
        {
            name: "name",
            label: "Name",
            type: 'text'
        },
        {
            name: "color",
            label: "Color",
            type: 'color'
        },
        {
            name: "subCategoryId",
            label: "Sub Category",
            type: 'select',
            "onItems": (value, data, field, props )=>{
                return props.globalSubCategoryList? props.globalSubCategoryList: []
            },
            "onDisplay" : (data)=>{
                return <h7><img
                        width={30}
                        height={20}
                        src={data.logoUrl}
                    /> {data.name}</h7> 
            },
            "itemKey": "id",
            "itemVal": "name"
        }
    ]
}

export default globalTaglibraryMeta