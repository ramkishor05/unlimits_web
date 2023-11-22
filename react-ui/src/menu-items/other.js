import { IconMapper } from "../constants/IconMapper";


//-----------------------|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||-----------------------//

export const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'sample-page',
            title: 'User profile',
            type: 'item',
            url: '/user/profile',
            icon: IconMapper['BrandChrome'],
            breadcrumbs: false
        },
        {
            id: 'documentation',
            title: 'Documentation',
            type: 'item',
            url: 'https://docs.appseed.us/products/react/node-js-berry-dashboard',
            icon: IconMapper['Help'],
            external: true,
            target: true
        }
    ]
};
