const types=[
    {
        id: 1,
        name: "VISUALISE_WITH_WORDS",
        desc: "Visualise With Words"
    },
    {
        id: 0,
        name: "VISUALISE_WITH_IMAGES",
        desc: "Visualise With Images"
    },
    ,
    {
        id: 2,
        name: "VISUALISE_WITH_EXAMPLES",
        desc: "Visualise With Examples"
    }
]
const globalTaglibraryMeta = {
    "table": {
        name: 'Tag library',
        headers : [
            {
                name: "name",
                label: "Name",
                type: 'text',
                sortable: true
            },
            {
                name: "color",
                label: "Color",
                type: 'color',
                sortable: true
            },
            {
                name: "type",
                label: "Type",
                type: 'text',
                sortable: true,
                "render":(value, row, header, props)=>{
                    if(value){
                        return types.find(type=>type.name==value).desc;
                    }
                    return value;
                }
            },
            {
                name: "subCategoryId",
                label: "Sub Category",
                type: 'text',
                sortable: true,
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
        ],
        pageField: {
            name: "pageSize",
            label: "Page Size",
            type: 'select',
            "onItems": (value, data, field, props )=>{
                return [5,7,10,20,50,100]
            }
        }
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
            name: "type",
            label: "Type",
            type: 'select',
            "required" : {
                value : '',
                message: "Type is required!"
            },
            "onItems": (value, data, field, props )=>{
                return types
            },
            "itemKey": "name",
            "itemVal": "desc"
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
            type: 'text'
        },
        {
            name: "type",
            label: "Type",
            type: 'select',
            "onItems": (value, data, field, props )=>{
                return types
            },
            "itemKey": "name",
            "itemVal": "desc"
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