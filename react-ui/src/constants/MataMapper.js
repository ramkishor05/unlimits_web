import globalMainCategoryMeta from '../metadata/GlobalMainCategoryMeta'
import globalSubCategoryMeta from '../metadata/GlobalSubCategoryMeta'
import globalTaglibraryMeta from '../metadata/GlobalTagLibraryMeta'
import globalImageLibraryMeta from '../metadata/GlobalImageLibraryMeta'
import globalPromptsMeta from '../metadata/GlobalPromptsMeta'
import globalJournalsMeta from '../metadata/GlobalJournalsMeta'
import globalUserMeta from '../metadata/GlobalUserMeta'

export const MataMapper = {
    "/global/portal/content/main/categories": globalMainCategoryMeta,
    "/global/portal/content/sub/categories": globalSubCategoryMeta,
    "/global/portal/content/tag/library": globalTaglibraryMeta,
    "/global/portal/content/image/library": globalImageLibraryMeta,
    "/global/portal/content/prompts": globalPromptsMeta,
    "/global/portal/content/journals": globalJournalsMeta,
    "/global/portal/organizations/users": globalUserMeta
}