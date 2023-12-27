import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Switch } from '@material-ui/core';
import AmountField from '../fields/AmountField';
import QuantityField from '../fields/QuantityField';
import ImageUploadCard from '../image/ImageUploadCard';
import { connect } from 'react-redux';
import MainCard from '../cards/MainCard';

import { getValue, setChecked, setField, setValue } from '../utils/CommanUtil';


class DynamicForm extends React.Component {

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
    this.setState({...this.state, data:newData})
  }

  checkValidation = (field, value)=>{
    const validationMap=this.state.validationMap;
    let status=true;
    if(field.required && (value=='' || undefined==value|| null===value) ){
      validationMap[field.name]=field.required.message;
      status= false;
    } else{
      if(field.format && field.format.regex ){
        if(!new RegExp(field.format.regex).test(value)){
          validationMap[field.name]=field.format.message;
        } else{
          delete validationMap[field.name];
          status= false;
        }
      } else{
        delete validationMap[field.name];
        status= true;
      }
     
    }
    
    console.log("status,", status, value)
    console.log("this.state.validationMap=",validationMap)
    this.setState({...this.state, validationMap:{...validationMap}});
    return status;
  }

  saveForm=(fields, type, data)=>{
    for(var fieldIndex in  fields){
      let field= fields[fieldIndex];
      this.checkValidation(field,getValue(data,field.name));
    };
    if(Object.keys(this.state.validationMap).length === 0){
      this.props.saveAction(type, data);
    }
  }

  isError = (field)=>{
    return this.state.validationMap[field.name]!=null;
  }

  errorMessage = (field)=>{
    return this.state.validationMap[field.name];
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
                <Grid key={field.name} item xs={6}>
                  {
                    this.renderSwitch(field, data, props)
                  }
              </Grid>)
          )
            }
        </Grid>)
       
  }

  render() {
    const { title, type, fields, loader, closeAction , saveAction} = this.props;
    const {data} = this.state;
    return (
             <MainCard title={title}
                  button ={
                      <Button variant="outlined" 
                      color="primary" 
                      onClick={closeAction}
                      >
                          Close
                      </Button>
                  }
                  content={true}
              >
                {this.rendorFields(fields, data, this.props)}
                <Grid container spacing={2}>
                  <Grid key={'action'} item xs={12} textAlign={'right'}>
                    <Button variant='outlined' color="primary" disabled={loader} onClick={(event)=>this.saveForm(fields, type, data)} >
                      {type}
                    </Button>
                  </Grid>
                </Grid>
         </MainCard>
        );
  }
}

const mapStateToProps = state => {
  const { user } = state.userReducer;
  const { loader } =  state.loaderReducer
  const { custBusinessList, show_business_loader } = state.custBusinessReducer;
  return { user, custBusinessList, show_business_loader , loader};
};

export default connect(mapStateToProps, { })(DynamicForm);
