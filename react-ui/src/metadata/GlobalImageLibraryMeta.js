
const  globalImageLibraryMeta = {
    "table": {
        headers : [
            {
                name: "url",
                label: "Image",
                width: 30,
                height: 30,
                type: 'img',
                "required" : {
                    value : '',
                    message: "File is required!"
                }
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
                name: "type",
                label: "Type",
                type: 'text',
                "required" : {
                    value : '',
                    message: "Type is required!"
                }
            },
            {
                name: "groupId",
                "key": "groupId",
                label: "Sub Category",
                type: 'text',
                "required" : {
                    value : '',
                    message: "Sub category is required!"
                },
                "render":(value, row, header, props)=>{
                    if(value){
                        let findglobalCategoryItem=props.globalCategoryItemList.find(globalCategoryItem=>globalCategoryItem.id==value)
                        return findglobalCategoryItem ? findglobalCategoryItem.name : value;
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
            grid: 6,
            fields:[{
            name: "url",
            label: "Image",
            width: 200,
            height: 200,
            grid: 12,
            type: 'img',
            container: 'tags_with_images',
            "required" : {
                value : '',
                message: "url is required!"
            },
            onchange: (value, data, field, props, setData)=>{
                if(data){
                    data['content']=value.fileContent;
                    data['name']=value.fileName;
                    data['type']=value.fileType;
                    setData && setData(data);
                }
                else{
                    data={};
                    data['content']=value.fileContent;
                    data['name']=value.fileName;
                    data['type']=value.fileType;
                    setData && setData(data);
                }
            }
        }]
    },
        {
            grid: 6,
            fields:[ {
            name: "name",
            label: "Name",
            type: 'text',
            "required" : {
                value : '',
                message: "Name is required!"
            }
        },
        {
            name: "type",
            label: "Type",
            type: 'text',
            "required" : {
                value : '',
                message: "Type id is required!"
            }
        },
        {
            name: "groupId",
            label: "Sub Category",
            type: 'select',
            "required" : {
                value : '',
                message: "Sub Category is required!"
            },
            "onItems": (value, data, field, props )=>{
                return props.globalCategoryItemList? props.globalCategoryItemList: []
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
        }]
    }
    ]
}

export default globalImageLibraryMeta;