// assets
import { IconBrandChrome, IconHelp, IconSitemap } from '@tabler/icons';

// constant
const icons = {
    IconBrandChrome: IconBrandChrome,
    IconHelp: IconHelp,
    IconSitemap: IconSitemap
};

//-----------------------|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||-----------------------//

export const sales = {
    id: 'sales',
    title: 'Items',
    type: 'group',
    children: [
        {
            id: 'cust-sales',
            title: 'Sales',
            type: 'item',
            url: '/cust/sales',
            icon: icons['IconBrandChrome'],
            breadcrumbs: false
        }
    ]
};
