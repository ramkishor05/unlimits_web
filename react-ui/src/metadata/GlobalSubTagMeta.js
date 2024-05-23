const globalSubTagMeta = {

    "table": {
        name: 'Sub tags',
        headers : [
            {
                name: "logoUrl",
                key: "logoUrl",
                label: "Logo",
                type:'img',
                grid: 2,
                width: 30,
                height: 30,
                container: 'sub_tag_logo'
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
                name: "groupId",
                label: "Main Tag",
                type: 'text',
                "required" : {
                    value : '',
                    message: "Main tag is required!"
                },
                "render":(value, row, header, props)=>{
                    if(value){
                        let globalTagGroup=props.globalTagGroupList.find(globalTagGroup=>globalTagGroup.id==value)
                        return globalTagGroup ? globalTagGroup.name : value;
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
            container: 'sub_tag_logo'
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
            name: "groupId",
            label: "Main Tag",
            type: 'select',
            "required" : {
                value : '',
                message: "Main tag id is required!"
            },
            "onItems": (value, data, field, props )=>{
                return props.globalTagGroupList? props.globalTagGroupList: []
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

export default globalSubTagMeta