import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl, FormGroup, FormLabel, TextField } from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";

export default function AdditionalCharges(props) {
  const classes = makeStyles();
  const [open, setOpen] = React.useState(false);
  const [formValues, setFormValues] = React.useState([...props.list]);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.onSave(formValues);
  };

  
  const handleChange = (i, e) => {
    if(formValues.length==0){
        setFormValues([{ key: "", value: "" }])
    }
    
    let newformValues = [...formValues];
    newformValues[i][e.target.name] = e.target.value;
    console.log("newformValues=",newformValues)
    setFormValues(newformValues);
  }

  const  addFormFields= ()=> {
    setFormValues([...formValues, { key: "", value: "" }])
  }

  const removeFormFields=(i) =>{
    let newformValues = [...formValues];
    newformValues.splice(i, 1);
    setFormValues(newformValues);
  }

  const handleSubmit=(event) =>{
    event.preventDefault();
    alert(JSON.stringify(formValues));
  }

  const renderFormValues =()=>{
    return (
        <>{
            formValues.length===0 ?
                <Box variant='standard' className={classes.form}>
                    <TextField variant='standard' label="Key" type="text" name="key" value={""} onChange={e => handleChange(0, e)} />
                    <TextField variant='standard'  label="Value" type="text" name="value" value={""} onChange={e => handleChange(0, e)} />
                </Box>
            :
            formValues && formValues.length>0 && formValues.map((element, index) => (
                <Box variant='standard' className={classes.form}>
                        <TextField variant='standard' label="Key" type="text" name="key" value={element.key || ""} onChange={e => handleChange(index, e)} />
                        <TextField variant='standard'  label="Value" type="text" name="value" value={element.value || ""} onChange={e => handleChange(index, e)} />
                        {
                        index ? 
                            <Button type="button"  className="button remove" onClick={(event) => removeFormFields(index)}>Remove</Button> 
                        : null
                        }
                </Box>
            ))
        }
        </>
    )
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
      Additional charges
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Additional charges
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
           {
             renderFormValues()
           }
          
          <div className="button-section">
              <Button type="button" onClick={() => addFormFields()}>Add more</Button>
          </div>
           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}