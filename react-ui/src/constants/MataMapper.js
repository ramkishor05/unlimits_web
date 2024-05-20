import CustProductPage from '../metadata/products-meta'
import businessMetas from '../metadata/business-meta'
import globalMainCategoryMeta from '../metadata/GlobalMainCategoryMeta'
import globalSubCategoryMeta from '../metadata/GlobalSubCategoryMeta'
import globalSubTagMeta from '../metadata/GlobalSubTagMeta'
import globalMainTagMeta from '../metadata/GlobalMainTagMeta'

export const MataMapper = {
    "/business/portal/items/products" :CustProductPage,
    "/business/portal/organizations/business": businessMetas,
    "/global/portal/content/main/categories": globalMainCategoryMeta,
    "/global/portal/content/sub/categories": globalSubCategoryMeta,
    "/global/portal/content/main/tags": globalMainTagMeta,
    "/global/portal/content/sub/tags": globalSubTagMeta,
}