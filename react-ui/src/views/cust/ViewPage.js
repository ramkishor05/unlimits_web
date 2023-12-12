import React from "react";
import { PageMapper } from "../pages/dynamicpage";


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