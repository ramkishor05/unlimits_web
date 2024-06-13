const globalMainCategoryMeta = {
    "id": "",
    "table": {
         name: 'Main categories',
        "headers": [
            {
                name: "logoUrl",
                key: "logoUrl",
                label: "Image",
                type:'img',
                grid: 12,
                width: 30,
                height: 30,
                container: 'category_logo'
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
                "id": "color",
                "key": "color",
                "name": "color",
                "label": "Color",
                "type": "color",
                width: 50,
                height: 50,
                "required" : {
                    value : '',
                    message: "Color is required!"
                }
            },
            {
                "name": "actions",
                "label": "Actions",
                "align": "right"
            }
        ]
    },
    "model" :[
         {
            grid: 6,
            fields:[
                {
                    name: "logoUrl",
                    key: "logoUrl",
                    label: "Image",
                    type:'img',
                    grid: 12,
                    container: 'main_category',
                    onchange: (file, data, field, props, setData)=>{
                        if(data){
                            data['content']=file;
                            setData && setData(data);
                        }
                        else{
                            data={};
                            data['content']=file
                            setData && setData(data);
                        }
                    }
                }
            ]
         },
         {
            grid: 6,
            fields:[
                {
                    "id": "name",
                    "key": "name",
                    "name": "name",
                    "label": "Name",
                    "type": "text",
                    grid: 12,
                    "required" : {
                        value : '',
                        message: "Name is required!"
                    }
                },
                {
                    "id": "color",
                    "key": "color",
                    "name": "color",
                    "label": "Color",
                    "type": "color",
                    grid: 12,
                    "required" : {
                        value : '',
                        message: "Color is required!"
                    }
                }
            ]
         }
    ]
}

export default globalMainCategoryMeta;