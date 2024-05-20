const globalSubCategoryMeta = {
    table: {
        headers : [
            {
                name: "logoUrl",
                key: "logoUrl",
                label: "Logo",
                type:'img',
                grid: 2,
                width: 30,
                height: 30
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
                "id": "color",
                "key": "color",
                "name": "color",
                "label": "Color",
                "type": "color",
                "required" : {
                    value : '',
                    message: "Color is required!"
                }
            },
            {
                name: "groupId",
                "key": "groupId",
                label: "Main Category",
                type: 'text',
                "required" : {
                    value : '',
                    message: "Main category is required!"
                },
                "render":(value, row, header, props)=>{
                    if(value){
                        let findglobalCategoryGroup=props.globalCategoryGroupList.find(globalCategoryGroup=>globalCategoryGroup.id==value)
                        return findglobalCategoryGroup ? findglobalCategoryGroup.name : value;
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
            height: 200
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
            "id": "color",
            "key": "color",
            "name": "color",
            "label": "Color",
            "type": "color",
            "required" : {
                value : '',
                message: "Color is required!"
            }
        },
        {
            name: "groupId",
            label: "Main Category",
            type: 'select',
            "required" : {
                value : '',
                message: "Main Category is required!"
            },
            "onItems": (value, data, field, props )=>{
                return props.globalCategoryGroupList? props.globalCategoryGroupList: []
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

export default globalSubCategoryMeta;