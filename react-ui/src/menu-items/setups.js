// assets
import { IconMapper } from '../constants/IconMapper';

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
            icon: IconMapper['BrandChrome'],
            breadcrumbs: false
        },
        {
            id: 'category-list',
            title: 'Category List',
            type: 'item',
            url: '/category/list',
            icon: IconMapper['Help'],
            breadcrumbs: false
        },
        {
            id: 'unit-group',
            title: 'Unit Group',
            type: 'item',
            url: '/unit/group',
            icon: IconMapper['Help'],
            breadcrumbs: false
        },
        {
            id: 'unit-list',
            title: 'Unit List',
            type: 'item',
            url: '/unit/list',
            icon: IconMapper['Help'],
            breadcrumbs: false
        },
        {
            id: 'currency-group',
            title: 'Currency Group',
            type: 'item',
            url: '/currency/group',
            icon: IconMapper['Help'],
            breadcrumbs: false
        },
        {
            id: 'Currency-list',
            title: 'Currency List',
            type: 'item',
            url: '/currency/list',
            icon: IconMapper['Help'],
            breadcrumbs: false
        },
        {
            id: 'count-freq',
            title: 'Count Freq',
            type: 'item',
            url: '/count/freq',
            icon: IconMapper['Help'],
            breadcrumbs: false
        }
    ]
};
