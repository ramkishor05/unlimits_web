import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, MenuItem, Select, TextField } from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";

export default function AmountField(props) {
  const classes = makeStyles();
  const {field, data}=props;
  
  const getValue=(data, keyStr)=>{
    let keys=keyStr.split("\.");
    let val=data;
    for (let i = 0; i < keys.length; i++){
      if( typeof val === 'object')
      val=val[keys[i]];
    }
    return val;
  }
  
  const setField= (event, keyStr, data)=>{
    let keys=keyStr.split("\.");
    let val=data;
    for (let i = 0; i < keys.length-1; i++){
      if( typeof val === 'object'){
        let key=keys[i];
        if(!val[key]){
          val[key]={};
        }
        val=val[key];
      }
    }
    let key=keys[keys.length-1];
    val[key]=event.target.value;
  }

  return (
    <div>
      <TextField
          label={field.label}
          id={field.id}
          sx={{ m: 1}}
          InputProps={{
            startAdornment: <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={getValue(data,field.key)}
            defaultValue={getValue(data,field.key)}
            label="{field.label}"
            onChange={(event)=>setField(event, field.itemName, data)}
          >
            {
              field.items.map(item=> <MenuItem key={item[field.itemKey]} value={item[field.itemKey]}>{item[field.itemVal]}</MenuItem>)
            }
          </Select>
          }}
          onChange={(event)=>setField(event, field.name, data)}
          variant="standard"
        />
    </div>
  );
}