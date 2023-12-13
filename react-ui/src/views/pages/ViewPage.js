import React from "react";
import { PageMapper } from "./dynamicpage";


const ViewPage=(props)=>{
    const DynamicPage= PageMapper[props.menuItem.url]
  
    return(
        <>
        
        {
            DynamicPage &&  <DynamicPage {...props}></DynamicPage>
           
        }
        
        </>
    )
}

export default ViewPage;