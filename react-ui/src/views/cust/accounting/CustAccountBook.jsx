import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import Button from '@material-ui/core/Button';

// project imports
import MainCard from '../../../component/cards/MainCard';
import DynamicTable from '../../../component/table/DynamicTable';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';
import { getCustTransationList, getCustTransationFiltedList, addCustTransation, editCustTransation, deleteCustTransation } from '../../../actions';
import { Grid, TextField } from '@material-ui/core';
import dayjs from 'dayjs';
import { format } from 'date-fns';


const headers = [
    {
        name: "transactionId",
        label: "Id",
        type: 'text'
    },
    {
        name: "transactionDate",
        label: "Date",
        type: 'text'
    },
    {
        name: "transactionAmount",
        label: "Amount",
        type: 'text'
    },
    {
        name: "transactionType",
        label: "Type",
        type: 'text'
    },
    {
        name: "transactionStatus",
        label: "Status",
        type: 'text'
    },
    {
        name: "transactionMode",
        label: "Mode",
        type: 'text'
    },
    {
        name: "transactionSenderId",
        label: "Sender",
        type: 'text'
    },
    {
        name: "transactionReciverId",
        label: "Reciver",
        type: 'text'
    }
];

const model = [
    {
        name: "transactionAmount",
        label: "Amount",
        type: 'text'
    },
    {
        name: "transactionType",
        label: "Type",
        type: 'select',
        "onItems":(value, row, header, props)=>{
            let status=['Credit', 'Debit'];
            return status;
        },
        "required" : {
            value : '',
            message: "Country is required!"
        }
    },
    {
        name: "transactionStatus",
        label: "Status",
        type: 'select',
        "onItems":(value, row, header, props)=>{
            let status=['Paid', 'Unpaid'];
            return status;
        },
        "required" : {
            value : '',
            message: "Country is required!"
        }
    },
    {
        name: "transactionMode",
        label: "Mode",
        type: 'select',
        "onItems":(value, row, header, props)=>{
            let status=['Cash','Online'];
            return status;
        },
        "required" : {
            value : '',
            message: "Country is required!"
        }
    }
];

class CustTransation extends Component {
    state={
        saveModel: false,
        deleteModel: false,
        dataObject: {},
        title: "",
        type: "",
        transations:[],
        selectionRange: [
            dayjs(format(new Date(),'yyyy/MM/dd')),
            dayjs(format(new Date(),'yyyy/MM/dd'))
        ]
    }

    updateTransations=()=>{
        let transations=[]
        this.setState({...this.state, transations:[]})
        this.props.custTransationFiltedList.forEach(custTransation=>{
            transations.push({
                id:custTransation.transactionDate,
                date:custTransation.transactionDate,
                desc: custTransation.transactionMode,
                type: custTransation.transactionType,
                status: custTransation.transactionStatus,
                giveAmount: custTransation.transactionType=="Debit"? custTransation.transactionAmount:'',
                gotAmount:  custTransation.transactionType=="Credit"? custTransation.transactionAmount:''
            })
        })
        this.setState({...this.state, transations:transations})
    }

    constructor(props){
        super(props)
        console.log("constructor")
    }

   async handleSelect(ranges){
        let selectionRange= [
            ranges[0],
            ranges[1]
        ]
        this.setState({...this.state, selectionRange: selectionRange});
        this.dataCall();
   }
    
   dataCall= async() =>{
        let selectionRange=this.state.selectionRange;
        let start=selectionRange[0] && selectionRange[0].$d;
        let end=selectionRange[1] && selectionRange[1].$d;
        let serviceType='ACCOUNT';
        if(start && end){
           let startFormat= format(start,'yyyy-MM-dd')+" 00:00:00";
           let endFormat=format(end,'yyyy-MM-dd')+" 23:59:59";
           await this.props.getCustTransationFiltedList(startFormat, endFormat, serviceType);
           this.updateTransations();
        }
   }

    _edit = row => {
       this.setState({ dataObject: row, title:"Edit cash book", type:"Edit", saveModel: true  });
    }

    _add = () => {
       this.setState({ dataObject: {}, title:"Add cash book", type:"Add", saveModel: true  });
    }

    _delete = row => {
        this.setState({ dataObject: row, title:"Delete cash book", type:"Delete", deleteModel: true  });
    };
    
     saveObject = (type, row) => {
        row['transactionReciverId']=this.props.userDetail.id;
        row['transactionSenderId']=this.props.userDetail.id;
        row['transactionMakerId']=this.props.userDetail.id;
        row['transactionService']='ACCOUNT';
        if(type=='Add')
            this.props.addCustTransation(row, this.clearAndRefresh)
        if(type=='Edit')
            this.props.editCustTransation(row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteCustTransation(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.dataCall();
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false  });
    }
    
    componentDidMount() {
        this.clearAndRefresh();
    }

    getDebit=()=>{
        let transactionAmountTotal= this.props.custTransationFiltedList &&  this.props.custTransationFiltedList.filter(custTransation=>custTransation.transactionType=='Debit').reduce((previousValue, currentValue) => {
            return previousValue + Number.parseFloat(currentValue.transactionAmount);
        }, 0)
        return transactionAmountTotal;
     }

     getCredit=()=>{
        let transactionAmountTotal= this.props.custTransationFiltedList &&  this.props.custTransationFiltedList.filter(custTransation=>custTransation.transactionType=='Credit').reduce((previousValue, currentValue) => {
            return previousValue + Number.parseFloat(currentValue.transactionAmount);
        }, 0)
        return transactionAmountTotal;
     }

     getOnhand=()=>{
        let cashCreditTotal= this.props.custTransationFiltedList &&  this.props.custTransationFiltedList.filter(custTransation=>custTransation.transactionMode=='Cash' && custTransation.transactionType=='Credit').reduce((previousValue, currentValue) => {
            return previousValue + Number.parseFloat(currentValue.transactionAmount);
        }, 0)

        let cashDebitTotal= this.props.custTransationFiltedList &&  this.props.custTransationFiltedList.filter(custTransation=>custTransation.transactionMode=='Cash' && custTransation.transactionType=='Debit').reduce((previousValue, currentValue) => {
            return previousValue + Number.parseFloat(currentValue.transactionAmount);
        }, 0)
        return cashCreditTotal-cashDebitTotal;
     }

     getOnline=()=>{
        let onlineCreditTotal= this.props.custTransationFiltedList &&  this.props.custTransationFiltedList.filter(custTransation=>custTransation.transactionMode=='Online' && custTransation.transactionType=='Credit').reduce((previousValue, currentValue) => {
            return previousValue + Number.parseFloat(currentValue.transactionAmount);
        }, 0)

        let onlineDebitTotal= this.props.custTransationFiltedList &&  this.props.custTransationFiltedList.filter(custTransation=>custTransation.transactionMode=='Online'&& custTransation.transactionType=='Debit').reduce((previousValue, currentValue) => {
            return previousValue + Number.parseFloat(currentValue.transactionAmount);
        }, 0)
        return onlineCreditTotal-onlineDebitTotal;
     }

 render() {
        return (
                <>
                
                    <MainCard title="Account Book" 
                        button ={
                            <>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DateRangePicker 
                              value={this.state.selectionRange}
                              localeText={{ start: 'Check-in', end: 'Check-out' }}
                              onChange={(newValue) => this.handleSelect(newValue)}
                              />
                          </LocalizationProvider>
                          
                          </>
                        }
                    >
                        <Grid container spacing={0} >
                            <Grid item sx={9} md={9}>  
                            <Grid container spacing={0}  >
                                    <Grid item sx={4} md={4}> 
                                        
                                        <TextField
                                         value={this.getCredit()}
                                        label="Opening Balance"
                                        variant={'standard'}
                                        disabled
                                        ></TextField>
                                    </Grid>
                                    <Grid item sx={4} md={4}> 
                                        <TextField
                                         value={this.getCredit()}
                                        label="Closing Balance"
                                        variant={'standard'}
                                        disabled
                                        ></TextField>
                                    </Grid>
                                    <Grid item sx={4} md={4}> 
                                        
                                        <TextField
                                        value={this.getCredit()}
                                        label="Current Balance"
                                        variant={'standard'}
                                        disabled
                                        ></TextField>
                                    </Grid>
                                    
                                </Grid>
                            </Grid>
                            <Grid item sx={3} md={3} >  
                                <Grid container spacing={0}  >
                                    <Grid item sx={8} md={8}> 
                                        Your Cash Amount  
                                    </Grid>
                                    <Grid item sx={1} md={1}>:</Grid>
                                    <Grid item sx={3} md={3} alignContent={'flex-end'} 
                                     alignItems={'end'} style={{textAlign:'end'}}> 
                                    <span className="badge bg-danger">  
                                    {
                                        this.getOnhand()
                                    }
                                    </span>
                                    </Grid>
                                </Grid>
                                
                                <Grid container spacing={0} >
                                    <Grid item sx={8} md={8}> 
                                        Your Online Amount  
                                    </Grid>
                                    <Grid item sx={1} md={1}>:</Grid>
                                    <Grid item sx={3} md={3} alignContent={'flex-end'} 
                                    alignItems={'end'} style={{textAlign:'end'}}>  
                                    <span className="badge bg-danger">  
                                    {
                                        this.getOnline()
                                    }
                                    </span>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={0} >
                                    <Grid item sx={8} md={8}> 
                                        Debit 
                                    </Grid>
                                    <Grid item sx={1} md={1}>:</Grid>
                                    <Grid item sx={3} md={3} alignContent={'flex-end'} 
                                    alignItems={'end'} style={{textAlign:'end'}}>  
                                    <span className="badge bg-danger">  
                                    {
                                        this.getDebit()
                                    }
                                    </span>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={0} >
                                    <Grid item sx={8} md={8}> 
                                        Credit 
                                    </Grid>
                                    <Grid item sx={1} md={1}>:</Grid>
                                    <Grid item sx={3} md={3} alignContent={'flex-end'} 
                                    alignItems={'end'} style={{textAlign:'end'}}>  
                                    <span className="badge bg-success">  
                                    {
                                        this.getCredit()
                                    }
                                    </span>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                            
                        <Grid container spacing={2} padding={1} paddingLeft={0} paddingRight={0}>
                            <Grid item sx={10} md={10}>
                                Transations 
                            </Grid>
                            <Grid item sx={2} md={2} textAlign={'end'}>    
                             <Button variant="outlined" 
                          color="primary" 
                          
                          onClick={this._add}
                          >
                              Add Transation
                          </Button>
                            </Grid>
                        </Grid> 
                        <Grid container spacing={1}>
                        <Grid item sx={12} md={12}>

                        <DynamicTable 
                        headers={headers} 
                        dataList={this.props.custTransationFiltedList}
                        deleteAction = {this._delete}
                        editAction = {this._edit}
                        ></DynamicTable>

                            </Grid>
                        </Grid>
                    </MainCard>
                {
                    this.state.saveModel && 
                    <DynamicModel
                title={this.state.title}
                openAction={this.state.saveModel}
                closeAction={()=> this.setState({saveModel: false})}
                data={this.state.dataObject} 
                type={this.state.type}
                fields= {model}
                saveAction = {this.saveObject}
                >
                </DynamicModel>
                }
                
            
                <ConfirmModel
                openAction={this.state.deleteModel}
                closeAction={()=> this.setState({deleteModel: false})}
                data={this.state.dataObject} 
                type={this.state.type}
                message= 'Do you want to delete'
                saveAction = {this.saveObject}
                >
                </ConfirmModel>
            </>
        );
    };
}


const mapStateToProps = state => {
    const { userDetail } = state.userReducer;
    const { custTransationFiltedList } = state.custTransationReducer;
    return { custTransationFiltedList, userDetail};
};


export default connect(mapStateToProps, { getCustTransationList, getCustTransationFiltedList, addCustTransation, editCustTransation, deleteCustTransation })(CustTransation);


