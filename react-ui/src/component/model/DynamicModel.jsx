import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Switch } from '@material-ui/core';
import AmountField from '../fields/AmountField';
import QuantityField from '../fields/QuantityField';
import ImageUploadCard from '../image/ImageUploadCard';
import { connect } from 'react-redux';
import { getValue, setChecked, setField, setValue } from '../utils/CommanUtil';

class DynamicModel extends React.Component {

  state={
    data:{},
    validationMap : {}
  }

  constructor(props){
    super(props);
    let {data}=this.props;
    this.state={ data:data, validationMap : {}};
  }

  setData=(newData)=>{
    this.setState({data:newData})
  }

  saveForm=(fields, type, data)=>{
      for(var fieldIndex in fields){
        let field= fields[fieldIndex];
        if(field.required && field.required.state){

        }
        console.log("field===",field)
      }
  }

  isError = (field)=>{
    return this.state.validationMap[field.id]!=null;
  }

  errorMessage = (field)=>{
    console.log("field====",field)
    return this.state.validationMap[field.id];
  }

  checkValidation = (field, value)=>{
    console.log("checkValidation=",field, value, this.state.validationMap)
    if(field.required && value===field.value ){
      this.state.validationMap[field.id]=field.required.message
      return false;
    } else{
      
      if(field.format && field.format.regex && !new RegExp(field.format.regex).test(value)){
        this.state.validationMap[field.id]=field.format.message
        return false;
      } else{
        delete this.state.validationMap[field.id];
        return true;
      }
    }

  }

  renderSwitch(field, data, props) {
    switch(field.type) {
      case 'select':
        return  <FormControl>
        <InputLabel id="demo-simple-select-label">{field.label}</InputLabel>
        <Select
          variant='standard'
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={getValue(data,field.name)}
          defaultValue={getValue(data,field.name)}
          label="{field.label}"
          onChange={(event)=>setField(event.target.value, field, data, props, this.setData, this.checkValidation)}
        >
          {
            field.onItems ? 
            field.onItems(getValue(data,field.name),data, field, props ).
            map(item=> 
            
              <MenuItem key={item[field.itemKey]} value={item[field.itemKey]}>{item[field.itemVal]}</MenuItem>
            )
            :
            field.items.map(item=> 
            <MenuItem key={item[field.itemKey]} value={item[field.itemKey]}>{item[field.itemVal]}</MenuItem>
            )
          }
        </Select>
      </FormControl>;
      case 'switch':
         return <FormControlLabel
         control={
           <Switch 
            checked={getValue(data,field.name)}
            onChange={(event)=>setChecked(event, field.name, data, props , this.setData)}
            name={field.name} 
            {...props }
            />
         }
         label={field.label}
       />
      case 'img':
         return <ImageUploadCard name="pictureURL" 
         value={getValue(data,field.name)} 
         setUserProfileImge={(value)=> setValue(value,field.name, data, props , this.setData)}
         {...props }
         >
         </ImageUploadCard>
      case 'qnt':
        return <QuantityField field={field} {...props  } setData={this.setData} ></QuantityField>
      case 'amount':
        return <AmountField field={field} {...props} setData={this.setData}  ></AmountField>
      default:
        return <FormControl>
          <TextField
          helperText={this.errorMessage(field)}
          error={this.isError(field)}
          key={field.id}
          variant='standard'
          id={field.id}
          label={field.label}
          name={field.name}
          type={field.type}
          value={getValue(data,field.name)}
          defaultValue={getValue(data,field.name)}
          onChange={(event)=>setValue(event.target.value, field.name, field, data, this.setData, this.checkValidation)}
          fullWidth>
        </TextField></FormControl>
    }
  }
  

  rendorFields = (fields, data, props)=>{
    return (
      <Grid container spacing={2}>
        {
          fields.map(field=>
              (
                <Grid key={field.name} item xs={4}>
                  {
                    this.renderSwitch(field, data, props)
                  }
              </Grid>)
          )
            }
        </Grid>)
       
  }

  render() {
    const { title, type, fields } = this.props;
    return (
      <div>
        <Dialog
          open={this.props.openAction}
          onClose={this.props.closeAction}
          aria-labelledby="form-dialog-title"
          maxWidth={'lg'}
        >
          <DialogTitle id="form-dialog-title"><h2>{title}</h2></DialogTitle>
          <DialogContent>
            <DialogContentText>
                 {this.rendorFields(fields, this.state.data)}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.closeAction} color="primary">
              Cancel
            </Button>
            <Button disabled={this.props.loader} onClick={(event)=>this.props.saveAction(type, this.state.data)} color="primary">
              {type}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


const mapStateToProps = state => {
  const { user } = state.userReducer;
  const { loader } =  state.loaderReducer
  const { custBusinessList, show_business_loader } = state.custBusinessReducer;
  return { user, custBusinessList, show_business_loader , loader};
};

export default connect(mapStateToProps, { })(DynamicModel);
