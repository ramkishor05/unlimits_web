import { Filter } from "@material-ui/icons";

const globalJournalsMeta = {
    "table": {
        headers : [
            {
                name: "journalDate",
                label: "Journal Date",
                type: 'text',
                sortable: true,
                "required" : {
                    value : '',
                    message: "Date is required!"
                }
            },{
                name: "name",
                sortable: true,
                label: "Journal Question",
                type: 'text',
                "required" : {
                    value : '',
                    message: "Question is required!"
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
            name: "journalDate",
            label: "Journal Date",
            type: 'date',
            format:"MM/DD/YY",
            "required" : {
                value : '',
                message: "Date is required!"
            }
        },
        {
            name: "name",
            label: "Journal Question",
            type: 'text',
            "required" : {
                value : '',
                message: "Question is required!"
            }
        }
    ],
    filter : [
        {
            name: "journalDate",
            label: "Journal Date",
            type: 'date',
            format:"MM/DD/YY"
        },
        {
            name: "name",
            label: "Journal Question",
            type: 'text'
        }
    ]
}

export default globalJournalsMeta;