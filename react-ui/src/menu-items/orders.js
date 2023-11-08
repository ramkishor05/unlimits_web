// assets
import { IconBrandChrome, IconHelp, IconSitemap } from '@tabler/icons';

// constant
const icons = {
    IconBrandChrome: IconBrandChrome,
    IconHelp: IconHelp,
    IconSitemap: IconSitemap
};

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
            icon: icons['IconBrandChrome'],
            breadcrumbs: false
        },
        {
            id: 'cust-purchase',
            title: 'Purchase Order',
            type: 'item',
            url: '/cust/purchase',
            icon: icons['IconBrandChrome'],
            breadcrumbs: false
        }
    ]
};
