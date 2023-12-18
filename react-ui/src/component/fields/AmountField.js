import * as React from 'react';
import { MenuItem, Select, TextField } from '@material-ui/core';
import { getValue, setField } from '../utils/CommanUtil';

export default function AmountField(props) {
  const {field, data}=props;
  return (
        <TextField
          label={field.label}
          id={field.id}
          sx={{ m: 1}}
          defaultValue={getValue(data,field.name)}
          InputProps={{
            startAdornment: <Select
            labelId={field.id}
            id={field.id+'_'+field.itemName}
            defaultValue={getValue(data,field.itemName)}
            label={field.label}
            onChange={(event)=>setField(event.target.value, field.itemName, field, data, props, props.setData )}
          >
            {
              field.onItems ? 
              field.onItems(getValue(data,field.name),data, field, props ).
              map(item=> 
                <MenuItem key={item[field.itemKey]} value={item[field.itemKey]}>
                  {item[field.itemVal]}</MenuItem>
              )
              :
              field.items.map(item=> 
              <MenuItem key={item[field.itemKey]} value={item[field.itemKey]}>
                {item[field.itemVal]}</MenuItem>)
            }
          </Select>
          }}
          onChange={(event)=>setField(event.target.value, field.name, field, data, props, props.setData)}
          variant="standard"
        />
  );
}