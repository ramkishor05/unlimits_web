// assets
import { IconMapper } from "../constants/IconMapper";
//-----------------------|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||-----------------------//

export const items = {
    id: 'items',
    title: 'Items',
    type: 'group',
    children: [
        {
            id: 'cust-product',
            title: 'Products',
            type: 'item',
            url: '/cust/products',
            icon: IconMapper['BrandChrome'],
            breadcrumbs: false
        }
    ]
};
