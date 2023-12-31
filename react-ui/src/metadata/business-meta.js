import { REGEX_EMAIL_ADDRESS, REGEX_MOBILE_NUMBER, REGEX_PHONE_NUMBER } from "../constants/RegexFormat";

const businessMetas = {
    table:  [
        {
            name: "name",
            label: "Bussiness Name",
            type: 'text'
        },
        {
            name: "emailAddress",
            label: "Bussiness Email",
            type: 'email'
        },
        {
            name: "phoneNumber",
            label: "Bussiness Phone",
            type: 'text'
        },
        {
            name: "permamentAddress",
            label: "Bussiness Address",
            type: 'text'
        },
        {
            name: "actions",
            label: "Actions"
        }
    ],
    model: [
        {
            "id":"name",
            name: "name",
            label: "Bussiness Name",
            type: 'text',
            grid: 4,
            "required" : {
                value : '',
                message: "Bussiness name is required!"
            }
        },
        {
            name: "emailAddress",
            label: "Bussiness Email",
            type: 'email',
            grid: 4,
            "required" : {
                value : '',
                message: "Bussiness email is required!"
            },
            format : {
                regex : REGEX_EMAIL_ADDRESS,
                message: "Invalid email address format!"
            }
        },
        {
            name: "phoneNumber",
            label: "Bussiness Phone",
            type: 'text',
            grid: 4,
            "required" : {
                value : '',
                message: "Bussiness phone is required!"
            },
            format : {
                regex : REGEX_PHONE_NUMBER,
                message: "Invalid phone number format!"
            }
        },
        {
            name: "permamentAddress",
            label: "Business Address",
            grid: 12,
            type: 'textarea',
            "required" : {
                value : '',
                message: "Address is required!"
            }
        },
        {
            "key": "countryId",
            "name": "countryId",
            "label": "Country",
            "type": "select",
            "onItems":(value, row, header, props)=>{
                return props.globalCountryList;
            },
            itemKey: 'id',
            itemVal: 'name',
            "required" : {
                value : '',
                message: "Country is required!"
            }
        }
    ]
}

export default businessMetas;