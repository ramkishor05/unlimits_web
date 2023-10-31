// assets
import { IconBrandChrome, IconHelp, IconSitemap } from '@tabler/icons';

// constant
const icons = {
    IconBrandChrome: IconBrandChrome,
    IconHelp: IconHelp,
    IconSitemap: IconSitemap
};

//-----------------------|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||-----------------------//

export const vendor = {
    id: 'vendor',
    title: 'vendor',
    type: 'group',
    url: '/vendor',
    icon: icons['IconBrandChrome'],
    children: [
        {
            id: 'vendor-business',
            title: 'Business',
            type: 'item',
            url: '/vendor/business',
            icon: icons['IconBrandChrome'],
            breadcrumbs: false
        },
        {
            id: 'vendor-customer',
            title: 'Customer',
            type: 'item',
            url: '/vendor/customer',
            icon: icons['IconHelp'],
            breadcrumbs: false
        },
        {
            id: 'vendor-supplier',
            title: 'Supplier',
            type: 'item',
            url: '/vendor/supplier',
            icon: icons['IconHelp'],
            breadcrumbs: false
        },
        {
            id: 'vendor-employee',
            title: 'Employee',
            type: 'item',
            url: '/vendor/employee',
            icon: icons['IconHelp'],
            breadcrumbs: false
        }
    ]
};
