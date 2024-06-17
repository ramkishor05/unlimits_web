const globalJournalsMeta = {
    "table": {
        headers : [
            {
                name: "name",
                label: "Question",
                type: 'text',
                "required" : {
                    value : '',
                    message: "Question is required!"
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
                name: "actions",
                label: "Actions"
            }
        ]
    },
    model : [
        {
            name: "name",
            label: "Question",
            type: 'text',
            "required" : {
                value : '',
                message: "Question is required!"
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

export default globalJournalsMeta;