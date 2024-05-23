const globalMainTagMeta = {
    "table": {
        name: 'Main tags',
        headers : [
            {
                name: "logoUrl",
                key: "logoUrl",
                label: "Logo",
                type:'img',
                grid: 2,
                width: 30,
                height: 30,
                container: 'main_tag_logo'
            },
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
                name: "description",
                label: "Description",
                type: 'text'
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
                        let globalSubCategory=props.globalCategoryList.find(globalSubCategory=>globalSubCategory.id==value)
                        return globalSubCategory ? globalSubCategory.name : value;
                    }
                    return value;
                }
            },
            {
                name: "actions",
                label: "Actions"
            }
        ]
    },
    model : [
        {
            name: "logoUrl",
            key: "logoUrl",
            label: "Logo",
            type:'img',
            grid: 12,
            width: 200,
            height: 200,
            container: 'main_tag_logo'
        },
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
            name: "description",
            label: "Description",
            type: 'text'
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
                return props.globalCategoryList? props.globalCategoryList: []
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

export default globalMainTagMeta