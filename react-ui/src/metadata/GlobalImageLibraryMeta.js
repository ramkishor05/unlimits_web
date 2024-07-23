const types = [{
    id: 1,
    name: "VISUALISE_WITH_WORDS",
    desc: "Visualise With Words"
},
{
    id: 0,
    name: "VISUALISE_WITH_IMAGES",
    desc: "Visualise With Images"
}, ,
{
    id: 2,
    name: "VISUALISE_WITH_EXAMPLES",
    desc: "Visualise With Examples"
}
]
const globalImageLibraryMeta = {
"table": {
    headers: [{
            name: "imageUrl",
            label: "Image",
            width: 30,
            height: 30,
            type: 'img',
            "required": {
                value: '',
                message: "File is required!"
            }
        },
        {
            name: "name",
            label: "Name",
            type: 'text',
            sortable: true
        },
        {
            name: "type",
            label: "Type",
            type: 'text',
            sortable: true,
            "render": (value, row, header, props) => {
                if (value) {
                    return types.find(type => type.name == value).desc;
                }
                return value;
            }
        },
        {
            name: "subCategoryId",
            "key": "subCategoryId",
            label: "Sub Category",
            type: 'text',
            sortable: true,
            "render": (value, row, header, props) => {
                if (value) {
                    let findglobalCategoryItem = props.globalCategoryItemList.find(globalCategoryItem => globalCategoryItem.id == value)
                    return findglobalCategoryItem ? findglobalCategoryItem.name : value;
                }
                return value;
            }
        },
        {
            name: "tagLibararyId",
            "key": "tagLibararyId",
            label: "Tag",
            type: 'text',
            sortable: true,
            "render": (value, row, header, props) => {
                if (value) {
                    let subCategoryId = row['subCategoryId']
                    let findglobalTagItem = props.globalTagItemList.find(globalTagItem => globalTagItem.id == value && globalTagItem.subCategoryId == subCategoryId)
                    return findglobalTagItem ? findglobalTagItem.name : value;
                }
                return value;
            }
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
        "onItems": (value, data, field, props) => {
            return [5, 7, 10, 20, 50, 100]
        }
    }
},
model: [{
        grid: 6,
        fields: [{
            name: "imageUrl",
            label: "Image",
            width: 200,
            height: 200,
            grid: 12,
            type: 'img',
            "required": {
                value: '',
                message: "Image is required!"
            },
            onchange: (value, data, field, props, setData) => {
                if (data) {
                    data['fileResource'] = value
                    setData && setData(data);
                } else {
                    data = {};
                    data['fileResource'] = value
                    setData && setData(data);
                }
            }
        }]
    },
    {
        grid: 6,
        fields: [{
                name: "name",
                label: "Name",
                type: 'text',
                "required": {
                    value: '',
                    message: "Name is required!"
                }
            },
            {
                name: "type",
                label: "Type",
                type: 'select',
                "required": {
                    value: '',
                    message: "Type is required!"
                },
                "onItems": (value, data, field, props) => {
                    return types
                },
                "itemKey": "name",
                "itemVal": "desc"
            },
            {
                name: "subCategoryId",
                label: "Sub Category",
                type: 'select',
                "required": {
                    value: '',
                    message: "Sub Category is required!"
                },
                "onItems": (value, data, field, props) => {
                    return props.globalCategoryItemList ? props.globalCategoryItemList : []
                },
                "onDisplay": (data) => {
                    return < h7 > < img
                    width = {
                        30
                    }
                    height = {
                        20
                    }
                    src = {
                        data.logoUrl
                    }
                    /> {data.name}</h7 >
                },
                "itemKey": "id",
                "itemVal": "name"
            }, ,
            {
                name: "tagLibararyId",
                label: "Tag Libarary",
                type: 'select',
                "required": {
                    value: '',
                    message: "Tag Libarary is required!"
                },
                "onItems": (value, data, field, props) => {
                    let subCategoryId = data['subCategoryId'] ? data['subCategoryId'] : 0;
                    return props.globalTagItemList ? props.globalTagItemList.filter(globalTagItem => globalTagItem.subCategoryId === subCategoryId) : []
                },
                "onDisplay": (data) => {
                    return < h7 > < img
                    width = {
                        30
                    }
                    height = {
                        20
                    }
                    src = {
                        data.logoUrl
                    }
                    /> {data.name}</h7 >
                },
                "itemKey": "id",
                "itemVal": "name"
            }
        ]
    }
],

filter: [

    {
        grid: 12,
        fields: [{
                name: "name",
                label: "Name",
                type: 'text',
                sortable: true
            },
            {
                name: "type",
                label: "Type",
                type: 'select',
                "onItems": (value, data, field, props) => {
                    return types
                },
                "itemKey": "name",
                "itemVal": "desc"
            },
            {
                name: "subCategoryId",
                label: "Sub Category",
                type: 'select',
                "onItems": (value, data, field, props) => {
                    return props.globalCategoryItemList ? props.globalCategoryItemList : []
                },
                "onDisplay": (data) => {
                    return < h7 > < img
                    width = {
                        30
                    }
                    height = {
                        20
                    }
                    src = {
                        data.logoUrl
                    }
                    /> {data.name}</h7 >
                },
                "itemKey": "id",
                "itemVal": "name"
            }, ,
            {
                name: "tagLibararyId",
                label: "Tag Libarary",
                type: 'select',
                "onItems": (value, data, field, props) => {
                    let subCategoryId = data['subCategoryId'] ? data['subCategoryId'] : 0;
                    return props.globalTagItemList ? props.globalTagItemList.filter(globalTagItem => globalTagItem.subCategoryId === subCategoryId) : []
                },
                "onDisplay": (data) => {
                    return < h7 > < img
                    width = {
                        30
                    }
                    height = {
                        20
                    }
                    src = {
                        data.logoUrl
                    }
                    /> {data.name}</h7 >
                },
                "itemKey": "id",
                "itemVal": "name"
            }
        ]
    }
]

}

export default globalImageLibraryMeta;