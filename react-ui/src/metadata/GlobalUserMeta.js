import { Grid } from "@material-ui/core";

const globalUserMeta = {
    "table": {
        title: 'User',
        name: 'Users',
        headers : [
            {
                name: "username",
                label: "Username",
                type: 'text',
                render: (value, row, header, props ) =>{
                    return <Grid container>
                            <Grid item>
                              <img style={{textAlign :'center'}} src={value} width={60} height={60}></img>
                            </Grid> 
                            <Grid item>
                                <h5>{row.username}</h5>
                                <h6>{row.registeredEmail}</h6>
                            </Grid>
                        </Grid> 
                }
            },
            {
                name: "registeredMobile",
                label: "Registered Mobile",
                type: 'text'
            },
            {
                name: "type",
                label: "User Type",
                type: 'text'
            },
            {
                name: "userRole.roleId",
                label: "User Role",
                type: 'text'
            },
            {
                name: "actions",
                label: "Actions",
                "align": "right"
            }
        ],
        pageField: {
            name: "pageSize",
            label: "Page Size",
            type: 'select',
            "onItems": (value, data, field, props )=>{
                return [5,7,10,20,50,100]
            }
        }
    },
    model : [
        {
            name: "userProfile.pictureURL",
            label: "Profile Img",
            type: 'img',
            width: 200,
            height:200,
            grid:12,
            render: (value, row, header, props ) =>{
                return <img style={{textAlign :'center'}} src={value} width={50} height={50}></img>
            }
        },
        {
            name: "username",
            label: "Username",
            type: 'text',
            "required" : {
                value : '',
                message: "Username is required!"
            }
        },
        {
            name: "registeredEmail",
            label: "Registered Email",
            type: 'email'
        },
        {
            name: "registeredMobile",
            label: "Registered mobile",
            type: 'text'
        },
        {
            name: "type",
            label: "User Type",
            type: 'text',
            "required" : {
                value : '',
                message: "User type is required!"
            }
        },
        {
            name: "userRoleId",
            key: "userRoleId",
            label: "User Role",
            type: 'select',
            "required" : {
                value : '',
                message: "User role is required!"
            },
            onItems: (value, row, header, props ) =>{
                return props.userRoleList? props.userRoleList: [];
            },
            itemKey: 'id',
            itemVal: 'roleName'
        }
    ],
    
    filter : [
        {
            name: "username",
            label: "Username",
            type: 'text'
        },
        {
            name: "registeredMobile",
            label: "Registered Mobile",
            type: 'text'
        },
        {
            name: "type",
            label: "User Type",
            type: 'text'
        },
        {
            name: "userRoleId",
            key: "userRoleId",
            label: "User Role",
            type: 'select',
            "required" : {
                value : '',
                message: "User role is required!"
            },
            onItems: (value, row, header, props ) =>{
                return props.userRoleList? props.userRoleList: [];
            },
            itemKey: 'id',
            itemVal: 'roleName'
        }
    ]
}

export default globalUserMeta;