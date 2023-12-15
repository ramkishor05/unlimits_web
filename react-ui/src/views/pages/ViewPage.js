import React from "react";
import { PageMapper } from "../../constants/PageMapper";


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