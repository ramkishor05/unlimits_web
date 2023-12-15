import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import MainPage from '../views/pages/MainPage';
import MainLayout from './../layout/MainLayout';
import AuthGuard from './../utils/route-guard/AuthGuard';
import { PageMapper } from '../constants/PageMapper'; 
import ViewPage from '../views/pages/ViewPage';
import { getMenuGroupByRoleId, getUser } from '../actions';
import PageNotFound from '../views/utilities/PageNotFound';

//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {

    const location = useLocation();

    const dispatch=useDispatch();
    const {isLoggedIn, token, defaultPath}= useSelector((state) => state.accountReducer);
    const {userDetail}= useSelector((state) => state.userReducer);
    const userRole = userDetail?.userRole;
    
    const userMenuGroupReducer = useSelector((state) => state.userMenuGroupReducer);

    let menuGroups = userMenuGroupReducer.userMenuGroups;
    
    const getRouteGroups=(menuGroups)=>{
        let list=[];
        
        for(let menuGroupIndex in menuGroups){
            let menuGroup= menuGroups[menuGroupIndex];
            list.push(<Route key={menuGroup.id} exact path={menuGroup.url} render={(props) => <MainPage menuGroup={menuGroup} {...props}></MainPage>} />)
            for(let menuItemIdex in menuGroups[menuGroupIndex].menuItems){
                let menuItem= menuGroups[menuGroupIndex].menuItems[menuItemIdex];
                let component= PageMapper[menuItem.url];
                if(component)
                  list.push(<Route key={menuItem.id} exact path={menuItem.url} component={component} />)
                else
                  list.push(<Route key={menuItem.id} exact path={menuItem.url} render={(props) => <ViewPage menuItem={menuItem} {...props}></ViewPage>} />)
            }
        }
        return list;
    }

    const getRouteUrls=(menuGroups)=>{
        let list=[];
        
        for(let menuGroupIndex in menuGroups){
            let menuGroup= menuGroups[menuGroupIndex];
            list.push(menuGroup.url)
            for(let menuItemIdex in menuGroups[menuGroupIndex].menuItems){
                 let menuItem= menuGroups[menuGroupIndex].menuItems[menuItemIdex];
                list.push(menuItem.url)
            }
        }
        return list;
    }

    useEffect(()=>{
        if(isLoggedIn){
            dispatch(getUser(token));
            if(userRole){
                dispatch(getMenuGroupByRoleId(userRole.id))
            }
        }
    },[getUser,getMenuGroupByRoleId])

    return (
        <Route
                path={[...getRouteUrls(menuGroups),"/invalidUrl"]}
            >
                <MainLayout>
                    <Switch location={location} key={location.pathname}>
                        <AuthGuard>
                            {
                                getRouteGroups(menuGroups)
                            }
                            <Route key="invalidUrl" exact path="/invalidUrl" component={PageNotFound} ></Route>
                        </AuthGuard>
                    </Switch>
                </MainLayout>
            </Route>
        );
    
};

export default MainRoutes;

