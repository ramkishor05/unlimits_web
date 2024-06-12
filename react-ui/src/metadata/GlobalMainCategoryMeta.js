const globalMainCategoryMeta = {
    "id": "",
    "table": {
         name: 'Main categories',
        "headers": [
            {
                name: "logoUrl",
                key: "logoUrl",
                label: "Logo",
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
        ],
        "childrens":[
            
        ]
    },
    "model" :[
        {
            name: "logoUrl",
            key: "logoUrl",
            label: "Logo",
            type:'img',
            grid: 12,
            width: 200,
            height: 200,
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
                message: "Name is required!"
            }
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
        }
    ]
}

export default globalMainCategoryMeta;