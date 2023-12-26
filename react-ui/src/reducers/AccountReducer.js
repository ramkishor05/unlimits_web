// action - state management
import MenuGroupService from '../services/GlobalMenuGroupService';

import {
    ACCOUNT_INITIALIZE,LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, SET_OWNER_ACCOUNT, SET_BUSSINESS_ACCOUNT
} from '../types';

const collapse=(item)=>{
    let paths=[];
    item.children.map((menu) => {
        switch (menu.type) {
            case 'collapse':
                paths.push(...collapse(menu))
            break;
            case 'item':
                paths.push(menu.url);
            break
            default:
                break;
        }
    });
    return paths
}

export const initialState = {
    token: null,
    isLoggedIn: false,
    isInitialized: false,
    businessId: null,
    ownerId : null,
    loadMenuGroupByRole : async (roleId)=>{
        return await MenuGroupService.findByRoleId(roleId);
    },
    defaultPath: (userDetail, location,isLoggedIn)=>{
        if(!isLoggedIn){
            return "/login";
        } else{
            if(!userDetail || !userDetail.userRole){
                return location.pathname;
            }
            let userRole=userDetail.userRole;
            let roleMenuItems=userRole.roleMenuItems;
                     
            for(let menuItemIndex in roleMenuItems){
                let menuItem= roleMenuItems[menuItemIndex];
                if(menuItem.disabled){
                    continue;
                }
                if(location.pathname===menuItem.url){
                    return menuItem.url;
                }
            }

            if(userDetail.onBoarding){
                for(let onBoardingIndex in userDetail.onBoardingList){
                    let onBoarding= userDetail.onBoardingList[onBoardingIndex];
                    if(onBoarding.onBoardingActive){
                        return onBoarding.roleMenuItem.url;
                    }
                }
            }
    
            for(let menuItemIndex in roleMenuItems){
                let menuItem= roleMenuItems[menuItemIndex];
                if(menuItem.disabled){
                    continue;
                }
                if(location.pathname=="/" || location.pathname=="/login"){
                    if(menuItem.homePage){
                        return menuItem.url;
                    }
                }
            }
        }
        return '/invalidUrl';
    },
    contains : (id, userRole) => {
        return userRole.roleMenuItems.find(roleEndpoint=>roleEndpoint.type===id) !=null;
     },
     filter: (itemChildrenList, userRole)=>{
        let roleMenuItems= userRole.roleMenuItems;
        return itemChildrenList.filter(itemChildren=>roleMenuItems.find(roleEndpoint=>roleEndpoint.url===itemChildren.url) !=null)
     },
     paths: (userRole) => {
       let paths=[];
       userRole.roleMenuItems.forEach(roleEndpoint=>{
        paths.push(roleEndpoint.url);
       })
       return  paths;
    },
     urls: (menuItem) => {
        let roleEndPointBuild= [];
        menuItem.items.forEach(item => {
            item.children.map((menu) => {
                switch (menu.type) {
                    case 'collapse':
                        //paths.push(...collapse(menu))
                    break;
                    case 'item':
                        roleEndPointBuild.push({title:menu.title, type:item.id, url:menu.url })
                    break
                    default:
                        break;
                }
            });
        })
        let roleEndPointObjects= {
            "id": "GlobalUserEndpoint",
            "order": 1,
            "objects": [

            ]
        };

        roleEndPointBuild.forEach(roleEndPoint=>{
             let roleEndPointObject= {
                "id": "UserEndpoint_"+roleEndPoint.title.replace(" ", "_"),
                "type": "com.brijframwork.authorization.model.EOUserEndpoint",
                "name": "GlobalUserEndpoint",
                "properties": roleEndPoint
            }
            roleEndPointObjects.objects.push(roleEndPointObject)
        })

        return roleEndPointObjects;
    }
};

//-----------------------|| ACCOUNT REDUCER ||-----------------------//

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACCOUNT_INITIALIZE: {
            const { isLoggedIn,  token } = action.payload;
            return {
                ...state,
                isLoggedIn,
                isInitialized: true,
                token,
                businessId :null,
                ownerId: null
            };
        }
        
        case LOGIN_SUCCESS: {
            return {
                ...state,
                token: action.payload,
                isLoggedIn: true,
                businessId :null,
                ownerId: null
            };
        }

        case LOGIN_FAIL:
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                businessId :null,
                ownerId: null
            };
        }
        
        case SET_BUSSINESS_ACCOUNT:
              return { ...state, businessId:action.payload };
        case SET_OWNER_ACCOUNT:
              return { ...state, ownerId:action.payload };
        default: {
            return { ...state };
        }
    }
};

export default accountReducer;
