// assets
import { IconBrandChrome, IconHelp, IconSitemap } from '@tabler/icons';

// constant
const icons = {
    IconBrandChrome: IconBrandChrome,
    IconHelp: IconHelp,
    IconSitemap: IconSitemap
};

//-----------------------|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||-----------------------//

export const setups = {
    id: 'setups',
    title: 'Setups',
    type: 'group',
    children: [
        {
            id: 'category-group',
            title: 'Category Group',
            type: 'item',
            url: '/category/group',
            icon: icons['IconBrandChrome'],
            breadcrumbs: false
        },
        {
            id: 'category-list',
            title: 'Category List',
            type: 'item',
            url: '/category/list',
            icon: icons['IconHelp'],
            breadcrumbs: false
        }
    ]
};
