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

class DynamicModel extends React.Component {

   state={
    data:{}
  }

  constructor(props){
    super(props);
    let {data}=this.props;
    this.state={ data:data};
    
  }

  getValue=(data, keyStr)=>{
    if(!keyStr){
      return '';
    }
    let keys=keyStr.split("\.");
    let val=data;
    for (let i = 0; i < keys.length; i++){
      if(!val){
        return "";
      }
      if( typeof val === 'object')
      val=val[keys[i]];
    }
    return val;
  }

  findTargetObject=(data, keyStr)=>{
    if(!keyStr){
      return '';
    }
    let keys=keyStr.split("\.");
    let val=data;
    for (let i = 0; i < keys.length-1; i++){
      if( typeof val === 'object'){
        val=val[keys[i]];
        if(!val){
          val[keys[i]]={};
        }
      }
    }
    return val;
  }

  findTargetKey=(keyStr)=>{
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
  
  setField= (event, field, data, props)=>{
    let name=field.name
    let value = field.find ?  field.find(event.target.value, data, field, props) : event.target.value;
    this.setValue(value, field.key ?  field.key : field.name,  data )
  }

  setChecked= (event, name, data)=>{
    let newdata={...data}
    newdata[name]=event.target.checked;
    this.setState({data:newdata})
  }

  setValue= (value, name, data)=>{
    let newdata={...data}
    let findTargetObject= this.findTargetObject(newdata,name);
    let findTargetKey= this.findTargetKey(name);
   
    findTargetObject[findTargetKey]=value;
    this.setState({data:newdata})
  }

  renderSwitch(field, data) {
    switch(field.type) {
      case 'select':
        return  <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{field.label}</InputLabel>
        <Select
          variant='standard'
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={this.getValue(data,field.name)}
          defaultValue={this.getValue(data,field.key)}
          label="{field.label}"
          onChange={(event)=>this.setField(event, field, data, this.props)}
        >
          {
            field.onItems ? 
            field.onItems(this.getValue(data,field.name),data, field, this.props ).
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
            checked={this.getValue(data,field.name)}
            onChange={(event)=>this.setChecked(event, field.name, data)}
            name={field.name} />
         }
         label={field.label}
       />
      case 'img':
         return <ImageUploadCard name="pictureURL" 
         value={this.getValue(data,field.name)} 
         setUserProfileImge={(value)=> this.setValue(value,field.name, data)}>
         </ImageUploadCard>
      case 'qnt':
        return <QuantityField field={field} data={data}></QuantityField>
      case 'amount':
        return <AmountField field={field} data={data}></AmountField>
      default:
        return <TextField
        key={field.id}
        variant='standard'
        id={field.id}
        label={field.label}
        name={field.name}
        type={field.type}
        value={data[field.name]}
        defaultValue={data[field.name]}
        onChange={(event)=>this.setField(event, field, data, this.props)}
        fullWidth>
        </TextField>;
    }
  }
  

  rendorFields = (fields, data)=>{
    return (
      <Grid container spacing={2}>
        {
          fields.map(field=>
              (
                <Grid key={field.name} item xs={6}>
                  {
                    this.renderSwitch(field, data)
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
