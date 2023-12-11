import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import MainPage from '../views/cust/MainPage';
import MainLayout from './../layout/MainLayout';
import AuthGuard from './../utils/route-guard/AuthGuard';
import { UrlMapper } from '../constants/UrlMapper';
import { getMenuGroupByRoleId } from '../actions';
import ViewPage from '../views/cust/ViewPage';

//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {
    const dispatch=useDispatch()

    const location = useLocation();
    const [isLoading, setLoading]=useState(true);
    const accountReducer = useSelector((state) => state.account);
    
    const menuGroupReducer = useSelector((state) => state.menuGroupReducer);

    let menuGroups = menuGroupReducer.userMenuGroups;
    const userRole = accountReducer?.userDetail?.userRole;
        
    console.log("userMenuGroups=",menuGroups)
    const getRouteGroups=(menuGroups)=>{
        let list=[];
        
        for(let menuGroupIndex in menuGroups){
            let menuGroup= menuGroups[menuGroupIndex];
            list.push(<Route key={menuGroup.id} exact path={menuGroup.url} render={(props) => <MainPage menuGroup={menuGroup} {...props}></MainPage>} />)
            for(let menuItemIdex in menuGroups[menuGroupIndex].menuItems){
                let menuItem= menuGroups[menuGroupIndex].menuItems[menuItemIdex];
                let component= UrlMapper[menuItem.url];
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
        if(userRole)
            dispatch(getMenuGroupByRoleId(userRole.id));
            setLoading(false)
    },[getMenuGroupByRoleId])

    return (
        <Route
                path={[...getRouteUrls(menuGroups)]}
            >
                <MainLayout>
                    <Switch location={location} key={location.pathname}>
                        <AuthGuard>
                            {
                                getRouteGroups(menuGroups)
                            }
                        </AuthGuard>
                    </Switch>
                </MainLayout>
            </Route>
        );
    
};

export default MainRoutes;

