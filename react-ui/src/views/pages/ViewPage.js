import React from "react";
import { PageMapper } from "../../constants/PageMapper";
import { MataMapper } from "../../constants/MataMapper";


const ViewPage=(props)=>{
    const DynamicPage= PageMapper[props.menuItem.url]
   
    return(
        <>
        {
            DynamicPage &&  <DynamicPage metadata={MataMapper[props.menuItem.url]} {...props} ></DynamicPage>
        }
        </>
    )
}

export default ViewPage;