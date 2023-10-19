// assets
import { IconBrandChrome, IconHelp, IconSitemap } from '@tabler/icons';

// constant
const icons = {
    IconBrandChrome: IconBrandChrome,
    IconHelp: IconHelp,
    IconSitemap: IconSitemap
};

//-----------------------|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||-----------------------//

export const billing = {
    id: 'billing',
    title: 'Billing',
    type: 'group',
    children: [
        {
            id: 'cust-bill',
            title: 'Billing',
            type: 'item',
            url: '/cust/billing',
            icon: icons['IconBrandChrome'],
            breadcrumbs: false
        }
    ]
};
