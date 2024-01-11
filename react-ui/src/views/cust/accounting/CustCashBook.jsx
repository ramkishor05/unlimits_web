import React, { useEffect, useReducer, useState,Component } from 'react';
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
import { getCustCashBookList, addCustCashBook, editCustCashBook, deleteCustCashBook } from '../../../actions';
import { Grid } from '@material-ui/core';

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

class CustCashBook extends Component {
    state={
        saveModel: false,
        deleteModel: false,
        dataObject: {},
        title: "",
        type: "",
        transations:[]
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
            this.props.addCustCashBook(row, this.clearAndRefresh)
        if(type=='Edit')
            this.props.editCustCashBook(row, this.clearAndRefresh)
        if(type=='Delete')
            this.props.deleteCustCashBook(row.id, this.clearAndRefresh)

    };

    clearAndRefresh = () => {
        this.props.getCustCashBookList();
        this.setState({ dataObject: {}, saveModel: false,deleteModel:false  });
    }
    
    componentDidMount() {
        this.props.getCustCashBookList();
        this.props.custCashBookList.forEach(custCashBook=>{
            this.state.transations.push({
                date:custCashBook.transactionDate,
                desc: custCashBook.transactionMode,
                type: custCashBook.transactionType,
                status: custCashBook.transactionStatus,
                giveAmount: custCashBook.transactionType=="Debit"? custCashBook.transactionAmount:'',
                gotAmount:  custCashBook.transactionType=="Credit"? custCashBook.transactionAmount:''
            })
        })
    }

    getDebit=()=>{
        let transactionAmountTotal= this.props.custCashBookList &&  this.props.custCashBookList.filter(custCashBook=>custCashBook.transactionType=='Debit').reduce((previousValue, currentValue) => {
            return previousValue + Number.parseFloat(currentValue.transactionAmount);
        }, 0)
        return transactionAmountTotal;
     }

     getCredit=()=>{
        let transactionAmountTotal= this.props.custCashBookList &&  this.props.custCashBookList.filter(custCashBook=>custCashBook.transactionType=='Credit').reduce((previousValue, currentValue) => {
            return previousValue + Number.parseFloat(currentValue.transactionAmount);
        }, 0)
        return transactionAmountTotal;
     }

     getOnhand=()=>{
        let cashCreditTotal= this.props.custCashBookList &&  this.props.custCashBookList.filter(custCashBook=>custCashBook.transactionMode=='Cash' && custCashBook.transactionType=='Credit').reduce((previousValue, currentValue) => {
            return previousValue + Number.parseFloat(currentValue.transactionAmount);
        }, 0)

        let cashDebitTotal= this.props.custCashBookList &&  this.props.custCashBookList.filter(custCashBook=>custCashBook.transactionMode=='Cash' && custCashBook.transactionType=='Debit').reduce((previousValue, currentValue) => {
            return previousValue + Number.parseFloat(currentValue.transactionAmount);
        }, 0)
        return cashCreditTotal-cashDebitTotal;
     }

     getOnline=()=>{
        let onlineCreditTotal= this.props.custCashBookList &&  this.props.custCashBookList.filter(custCashBook=>custCashBook.transactionMode=='Online' && custCashBook.transactionType=='Credit').reduce((previousValue, currentValue) => {
            return previousValue + Number.parseFloat(currentValue.transactionAmount);
        }, 0)

        let onlineDebitTotal= this.props.custCashBookList &&  this.props.custCashBookList.filter(custCashBook=>custCashBook.transactionMode=='Online'&& custCashBook.transactionType=='Debit').reduce((previousValue, currentValue) => {
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
                              <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} />
                          </LocalizationProvider>
                        }
                    >
                        <Grid container spacing={2}>
                            <Grid item sx={4} md={4}>  
                            </Grid>
                            <Grid item sx={2} md={2} 
                            alignContent={'flex-end'} 
                            alignItems={'end'} style={{textAlign:'end'}}>  
                            <h6 className="mb-0">
                            Onhand : <span className="badge bg-danger">  
                            {
                                this.getOnhand()
                            }
                            </span>
                            </h6>
                            </Grid>
                            <Grid item sx={2} md={2} 
                            alignContent={'flex-end'} 
                            alignItems={'end'} style={{textAlign:'end'}}>  
                            <h6 className="mb-0">
                            Online : <span className="badge bg-danger">  
                            {
                                this.getOnline()
                            }
                            </span>
                            </h6>
                            </Grid>
                            <Grid item sx={2} md={2} 
                            alignContent={'flex-end'} 
                            alignItems={'end'} style={{textAlign:'end'}}>  
                            <h6 className="mb-0">
                            Debit : <span className="badge bg-danger">  
                            {
                                this.getDebit()
                            }
                            </span>
                            </h6>
                            </Grid>
                            <Grid item sx={2} md={2} alignContent={'flex-end'}
                            style={{textAlign:'end'}}>  

                            <h6 className="mb-0">
                            Credit : <span className="badge bg-success">
                            {
                                this.getCredit()
                            }
                            </span></h6>
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
                                    this.state.transations.map(transation=>
                        
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
    const { custCashBookList } = state.custCashBookReducer;
    
    console.log("custCashBookList=",custCashBookList)
    return { custCashBookList};
};


export default connect(mapStateToProps, { getCustCashBookList, addCustCashBook, editCustCashBook, deleteCustCashBook })(CustCashBook);


