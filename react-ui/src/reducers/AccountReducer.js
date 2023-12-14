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
    token: '',
    isLoggedIn: false,
    isInitialized: false,
    businessId: null,
    ownerId : null,
    loadMenuGroupByRole : async (roleId)=>{
        return await MenuGroupService.findByRoleId(roleId);
    },
    defaultPath: (userRole, location,isLoggedIn)=>{
        if(!isLoggedIn){
            return "/login";
        } else{
            if(!userRole){
                return location.pathname;
            }
            let roleEndpoints=userRole.roleEndpoints;
    
            for(let menuItemIndex in roleEndpoints){
                let menuItem= roleEndpoints[menuItemIndex];
                if(location.pathname===menuItem.url){
                    return menuItem.url;
                }
            }
    
            for(let menuItemIndex in roleEndpoints){
                let menuItem= roleEndpoints[menuItemIndex];
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
        return userRole.roleEndpoints.find(roleEndpoint=>roleEndpoint.type===id) !=null;
     },
     filter: (itemChildrenList, userRole)=>{
        let roleEndpoints= userRole.roleEndpoints;
        return itemChildrenList.filter(itemChildren=>roleEndpoints.find(roleEndpoint=>roleEndpoint.url===itemChildren.url) !=null)
     },
     paths: (userRole) => {
       let paths=[];
       userRole.roleEndpoints.forEach(roleEndpoint=>{
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
            const { userDetail } = action.payload;
            return {
                ...state,
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
                token: '',
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
