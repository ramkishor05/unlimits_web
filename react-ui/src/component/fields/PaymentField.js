import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@material-ui/core';
export default function PaymentField(props) {
  
  const handleChange = (element, e) => {
    element[e.target.name] = e.target.value;
  }

  return (
      <Box variant='standard'>
          <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Payment {'#'+this.props.index}</FormLabel>
              <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="mode"
                  value={this.props.element?.mode} onChange={e => handleChange(this.props.element, e)}
              >
                  <FormControlLabel value="Unpaid" control={<Radio />} label="Unpaid" />
                  <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
                  <FormControlLabel value="Online" control={<Radio />} label="Online" />
              </RadioGroup>
          
              {
                this.props.element?.mode==='Cash' || this.props.element?.mode==='Online'?
              <TextField type='number' value={this.props.element?.amount} label="Amount" variant='standard' name='amount'  onChange={e => handleChange(this.props.element, e)}></TextField>
              :''
              }
        </FormControl>
        {
        this.props.index ? 
            <Button type="button"  className="button remove" onClick={(event) => this.props.removeField(this.props.index)}>Remove</Button> 
        : null
        }
   </Box>
  );
}