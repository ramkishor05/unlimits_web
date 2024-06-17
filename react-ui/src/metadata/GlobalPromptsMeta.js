const globalPromptsMeta={
    "table": {
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
                name: "description",
                label: "Description",
                type: 'text',
                row: 10,
                col:10
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
                name: "actions",
                label: "Actions"
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
            name: "type",
            label: "Type",
            type: 'text',
            "required" : {
                value : '',
                message: "Type is required!"
            }
        },
        {
            name: "description",
            label: "Description",
            type: 'textarea',
            rows: 10,
            grid: 12
        }
    ]
}

export default globalPromptsMeta;