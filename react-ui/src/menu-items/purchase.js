// assets
import { IconBrandChrome, IconHelp, IconSitemap } from '@tabler/icons';

// constant
const icons = {
    IconBrandChrome: IconBrandChrome,
    IconHelp: IconHelp,
    IconSitemap: IconSitemap
};

//-----------------------|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||-----------------------//

export const purchase = {
    id: 'purchase',
    title: 'Purchase',
    type: 'group',
    children: [
        {
            id: 'cust-purchase',
            title: 'Purchase',
            type: 'item',
            url: '/cust/purchase',
            icon: icons['IconBrandChrome'],
            breadcrumbs: false
        }
    ]
};
