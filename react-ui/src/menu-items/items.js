// assets
import { IconBrandChrome, IconHelp, IconSitemap } from '@tabler/icons';

// constant
const icons = {
    IconBrandChrome: IconBrandChrome,
    IconHelp: IconHelp,
    IconSitemap: IconSitemap
};

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
            icon: icons['IconBrandChrome'],
            breadcrumbs: false
        }
    ]
};
