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
        },
        {
            id: 'unit-group',
            title: 'Unit Group',
            type: 'item',
            url: '/unit/group',
            icon: icons['IconHelp'],
            breadcrumbs: false
        },
        {
            id: 'unit-list',
            title: 'Unit List',
            type: 'item',
            url: '/unit/list',
            icon: icons['IconHelp'],
            breadcrumbs: false
        },
        {
            id: 'currency-group',
            title: 'Currency Group',
            type: 'item',
            url: '/currency/group',
            icon: icons['IconHelp'],
            breadcrumbs: false
        },
        {
            id: 'Currency-list',
            title: 'Currency List',
            type: 'item',
            url: '/currency/list',
            icon: icons['IconHelp'],
            breadcrumbs: false
        },
        {
            id: 'count-freq',
            title: 'Count Freq',
            type: 'item',
            url: '/count/freq',
            icon: icons['IconHelp'],
            breadcrumbs: false
        }
    ]
};
