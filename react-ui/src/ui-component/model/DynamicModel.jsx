import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';

export default class DynamicModel extends React.Component {
  
  setField= (event, name, data)=>{
    data[name]=event.target.value;
  }

  rendorFields = (fields, data)=>{
    return (
      <Grid container spacing={2}>
        {
          fields.map(field=>
              (
                <Grid key={field.name} item xs={6}>
                  {
                field.type==='select' ? 
                  <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={data[field.name]}
                    label="{field.label}"
                    onChange={(event)=>this.setField(event, field.name, data)}
                  >
                    {
                      field.items.map(item=> <MenuItem key={item[field.itemKey]} value={item[field.itemKey]}>{item[field.itemVal]}</MenuItem>)
                    }
                  </Select>
                </FormControl>
                :
                  <TextField
                  key={field.id}
                  autoFocus
                  margin="dense"
                  id={field.id}
                  label={field.label}
                  type={field.type}
                  value={data[field.name]}
                  defaultValue={data[field.name]}
                  onChange={(event)=>this.setField(event, field.name, data)}
                  fullWidth>
                  </TextField>
              }
              </Grid>)
          )
            }
        </Grid>)
       
  }

  render() {
    const { title, type, fields, data } = this.props;
    return (
      <div>
        <Dialog
          open={this.props.openAction}
          onClose={this.props.closeAction}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title"><h2>{title}</h2></DialogTitle>
          <DialogContent>
            <DialogContentText>
                 {this.rendorFields(fields, data)}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.closeAction} color="primary">
              Cancel
            </Button>
            <Button onClick={(event)=>this.props.saveAction(type, data)} color="primary">
              {type}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}