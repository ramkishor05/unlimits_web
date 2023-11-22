// assets
import { IconMapper } from "../constants/IconMapper";

//-----------------------|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||-----------------------//

export const orders = {
    id: 'orders',
    title: 'Orders',
    type: 'group',
    children: [
        {
            id: 'cust-sales',
            title: 'Sale Order',
            type: 'item',
            url: '/cust/sales',
            icon: IconMapper['BrandChrome'],
            breadcrumbs: false
        },
        {
            id: 'cust-purchase',
            title: 'Purchase Order',
            type: 'item',
            url: '/cust/purchase',
            icon: IconMapper['BrandChrome'],
            breadcrumbs: false
        }
    ]
};
