  
  export const findTargetObject=(data, keyStr)=>{
    if(!keyStr){
      return '';
    }
    let keys=keyStr.split("\.");
    let val=data;
    for (let i = 0; i < keys.length-1; i++){
      if(val==null){
        val={};
      }
      if( typeof val === 'object'){
        if(!val[keys[i]]){
          val[keys[i]]={};
        }
        val=val[keys[i]];
      }
    }
    return val;
  }

  export const findTargetKey=(keyStr)=>{
    if(!keyStr){
      return '';
    }
    let keys=keyStr.split("\.");
    let key=keyStr;
    for (let i = 0; i < keys.length; i++){
      key=keys[i];
    }
    return key;
  }
  

  export const setValue= (value, name, data, setData)=>{
    let newdata={...data}
    let targetObject= findTargetObject(newdata,name);
    console.log("targetObject=",targetObject)
    let targetKey= findTargetKey(name);
    console.log("targetKey=",targetKey)
    targetObject[targetKey]=value;
    console.log("newdata=",newdata)
    if(setData ){
        setData(newdata)
    }
  }

  export const getValue=(data, name)=>{
    if(!name){
      return '';
    }
    let targetObject= findTargetObject(data,name);
    console.log("targetObject=",targetObject)
    let targetKey= findTargetKey(name);
    console.log("targetKey=",targetKey)
    console.log("targetObject[targetKey]=",targetObject[targetKey])
    return targetObject[targetKey];
  }

  export const setField= (value, name,  field, data, props, setData)=>{
    let val = field.find ?  field.find(value, data, field, props) : value;
     setValue(val, name,  data, setData )
  }
 
   export const setChecked= (event, name, data, setData)=>{
     let newdata={...data}
     newdata[name]=event.target.checked;
     if(setData )
     setData(newdata)
   }
 
