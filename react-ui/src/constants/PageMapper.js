import GlobalDashboard from "../views/global/dasboard";
import GlobalCategoryGroup from "../views/global/category/GlobalMainCategory";
import GlobalCategoryList from "../views/global/category/GlobalSubCategory";
import GlobalUserProfilePage from "../views/global/profile";
import GlobalMenuGroupsPage from "../views/global/menus/GlobalMenuGroupsPage";
import GlobalMenuItemsPage from "../views/global/menus/GlobalMenuItemsPage";
import GlobalRoleMenuGroupsPage from "../views/global/menus/GlobalRoleMenuGroupsPage";
import GlobalRoleMenuItemsPage from "../views/global/menus/GlobalRoleMenuItemsPage";
import GlobalUserPage from "../views/global/organizations/GlobalUserPage";
import GlobalMindSetLibrary from '../views/global/mindsets/GlobalMindSetLibrary';
import GlobalCategoryImage from "../views/global/category/GlobalCategoryImage";
import GlobalCategoryTag from "../views/global/category/GlobalCategoryTag";
import GlobalJournals from "../views/global/journals/GlobalJournals";
import GlobalPrompts from "../views/global/prompts/GlobalPrompts";


export const PageMapper = {
    "/global/dashboard/default": GlobalDashboard,
    "/global/portal/menus/groups": GlobalMenuGroupsPage,
    "/global/portal/menus/items": GlobalMenuItemsPage,
    "/global/portal/menus/role/groups": GlobalRoleMenuGroupsPage,
    "/global/portal/menus/role/items": GlobalRoleMenuItemsPage,
    "/global/portal/content/main/categories": GlobalCategoryGroup,
    "/global/portal/content/sub/categories": GlobalCategoryList,
    "/global/portal/content/tag/library": GlobalCategoryTag,
    "/global/portal/content/image/library": GlobalCategoryImage,
    "/global/portal/content/prompts": GlobalPrompts,
    "/global/portal/content/journals": GlobalJournals,
    "/global/portal/content/midsets": GlobalMindSetLibrary,
    "/global/portal/user/profile": GlobalUserProfilePage,
    "/global/portal/organizations/users":GlobalUserPage
}