import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LocalizationProvider} from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

// project imports
import MainCard from '../../../component/cards/MainCard';
import DynamicModel from '../../../component/model/DynamicModel';
import ConfirmModel from '../../../component/model/ConfirmModel';
import { getCustTransationList, getCustTransationFiltedList, addCustTransation, editCustTransation, deleteCustTransation } from '../../../actions';
import { Grid } from '@material-ui/core';
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
]

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });

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
        this.props.custTransationList.forEach(custTransation=>{
            transations.push({
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
        let start=ranges[0] && ranges[0].$d;
        let end=ranges[1] && ranges[1].$d;
        
        if(start && end){
            let startFormat= format(start,'yyyy-MM-dd')+" 00:00:00";
            let endFormat=format(end,'yyyy-MM-dd')+" 23:59:59";
            console.log(startFormat);
            console.log(endFormat);
           await this.props.getCustTransationFiltedList(startFormat, endFormat);
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
        if(type=='Add')
            this.props.addCustTransation(row, this.clearAndRefresh)
        if(type=='Edit')
            this.props.editCustTransation(row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteCustTransation(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.props.getCustTransationList();
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false  });
    }
    
    componentDidMount() {
        this.props.getCustTransationList();
        console.log("componentDidMount")
        this.updateTransations();
    }

    getDebit=()=>{
        let transactionAmountTotal= this.props.custTransationList &&  this.props.custTransationList.filter(custTransation=>custTransation.transactionType=='Debit').reduce((previousValue, currentValue) => {
            return previousValue + Number.parseFloat(currentValue.transactionAmount);
        }, 0)
        return transactionAmountTotal;
     }

     getCredit=()=>{
        let transactionAmountTotal= this.props.custTransationList &&  this.props.custTransationList.filter(custTransation=>custTransation.transactionType=='Credit').reduce((previousValue, currentValue) => {
            return previousValue + Number.parseFloat(currentValue.transactionAmount);
        }, 0)
        return transactionAmountTotal;
     }

     getOnhand=()=>{
        let cashCreditTotal= this.props.custTransationList &&  this.props.custTransationList.filter(custTransation=>custTransation.transactionMode=='Cash' && custTransation.transactionType=='Credit').reduce((previousValue, currentValue) => {
            return previousValue + Number.parseFloat(currentValue.transactionAmount);
        }, 0)

        let cashDebitTotal= this.props.custTransationList &&  this.props.custTransationList.filter(custTransation=>custTransation.transactionMode=='Cash' && custTransation.transactionType=='Debit').reduce((previousValue, currentValue) => {
            return previousValue + Number.parseFloat(currentValue.transactionAmount);
        }, 0)
        return cashCreditTotal-cashDebitTotal;
     }

     getOnline=()=>{
        let onlineCreditTotal= this.props.custTransationList &&  this.props.custTransationList.filter(custTransation=>custTransation.transactionMode=='Online' && custTransation.transactionType=='Credit').reduce((previousValue, currentValue) => {
            return previousValue + Number.parseFloat(currentValue.transactionAmount);
        }, 0)

        let onlineDebitTotal= this.props.custTransationList &&  this.props.custTransationList.filter(custTransation=>custTransation.transactionMode=='Online'&& custTransation.transactionType=='Debit').reduce((previousValue, currentValue) => {
            return previousValue + Number.parseFloat(currentValue.transactionAmount);
        }, 0)
        return onlineCreditTotal-onlineDebitTotal;
     }

 render() {
        return (
                <>
                
                    <MainCard title="Cash Book" 
                        button ={
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DateRangePicker 
                              value={this.state.selectionRange}
                              localeText={{ start: 'Check-in', end: 'Check-out' }}
                              onChange={(newValue) => this.handleSelect(newValue)}
                              />
                          </LocalizationProvider>
                        }
                    >
                        <Grid container spacing={0} >
                            <Grid item sx={9} md={9}>  
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
                            
                        <Grid container spacing={2}>
                            <Grid item sx={12} md={12}>
                                Transations
                            </Grid>
                        </Grid> 
                        <Grid container spacing={1}>
                        <Grid item sx={12} md={12}>

                                <table className="table mb-0" style={{border:1, borderStyle:'dashed'}}>
                                <thead>
                                    <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Mode</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">You give
                                    </th>
                                    <th scope="col">
                                        You Got
                                    </th>
                                    <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                   this.state.transations && this.state.transations.map(transation=>
                        
                                    <tr className="fw-normal">
                                    <th>
                                         <span className="ms-2">{transation.date}</span>
                                    </th>
                                    <th>
                                         <span className="ms-2">{transation.desc}</span>
                                    </th>
                                    <th>
                                         <span className="ms-2">{transation.type}</span>
                                    </th>
                                    <th>
                                         <span className="ms-2">{transation.status}</span>
                                    </th>
                                    <td className="align-middle">
                                        <h6 className="mb-0"><span className="badge bg-danger">{transation.giveAmount}</span></h6>
                                    </td>
                                    <td className="align-middle">
                                        <h6 className="mb-0"><span className="badge bg-success">{transation.gotAmount}</span></h6>
                                    </td>
                                    <td className="align-middle">
                                        <a href="#!" data-mdb-toggle="tooltip" title="Done"><i
                                            className="fas fa-check fa-lg text-success me-3"></i></a>
                                        <a href="#!" data-mdb-toggle="tooltip" title="Remove"><i
                                            className="fas fa-trash-alt fa-lg text-warning"></i></a>
                                    </td>
                                    </tr>
                                    )
                                }
                                </tbody>
                            </table>
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
                fields= {headers}
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
    const { custTransationList } = state.custTransationReducer;
    return { custTransationList};
};


export default connect(mapStateToProps, { getCustTransationList, getCustTransationFiltedList, addCustTransation, editCustTransation, deleteCustTransation })(CustTransation);


