import { Card, CardContent, Grid} from "@material-ui/core";
import { IconMapper } from "../../constants/IconMapper";

import React from "react";
import { PageMapper } from "../pages/dynamic";


const ViewPage=(props)=>{
    const DynamicPage= PageMapper[props.menuItem.url]
  
    return(
        <>
        {
            JSON.stringify(props.menuItem)
        }
        {
            DynamicPage &&  <DynamicPage {...props}></DynamicPage>
           
        }
        
        </>
    )
}

export default ViewPage;