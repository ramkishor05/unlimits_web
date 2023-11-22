// assets
import { IconMapper } from '../constants/IconMapper';

//-----------------------|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||-----------------------//

export const vendor = {
    id: 'vendor',
    title: 'vendor',
    type: 'group',
    url: '/vendor',
    icon: IconMapper['BrandChrome'],
    children: [
        {
            id: 'vendor-business',
            title: 'Business',
            type: 'item',
            url: '/vendor/business',
            icon: IconMapper['BrandChrome'],
            breadcrumbs: false
        },
        {
            id: 'vendor-customer',
            title: 'Customer',
            type: 'item',
            url: '/vendor/customer',
            icon: IconMapper['Help'],
            breadcrumbs: false
        },
        {
            id: 'vendor-supplier',
            title: 'Supplier',
            type: 'item',
            url: '/vendor/supplier',
            icon: IconMapper['Help'],
            breadcrumbs: false
        },
        {
            id: 'vendor-employee',
            title: 'Employee',
            type: 'item',
            url: '/vendor/employee',
            icon: IconMapper['Help'],
            breadcrumbs: false
        },
        {
            id: 'vendor-users',
            title: 'Users',
            type: 'item',
            url: '/vendor/users',
            icon: IconMapper['Help'],
            breadcrumbs: false
        }
    ]
};
