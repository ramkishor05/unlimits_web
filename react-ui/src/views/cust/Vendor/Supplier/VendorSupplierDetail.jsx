import { Button, Divider, Grid, TableRow } from "@material-ui/core";
import MainCard from "../../../../component/cards/MainCard";
import UserProfile from "../../../profile/UserProfile";
import UserAccount from "../../../profile/UserAccount";
import OwnerAccount from "../../../profile/OwnerAccount";
import { Component } from "react";
import { connect } from "react-redux";
import { getCustPurchaseListBySupplier } from "../../../../actions";
import { Table, TableBody, TableCell, TableHead } from "@mui/material";

class VendorSupplierDetail extends Component {
   
    state={
        transations:[]
    }

    constructor(props){
        super(props);
        this.props.custPurchaseList.forEach(custPurchase=>{
                this.state.transations.push({
                    date:custPurchase.purchaseDate,
                    desc: "Bill : "+custPurchase.totalPrice,
                    type: "#Purchase",
                    giveAmount: '',
                    gotAmount:  custPurchase.totalPrice
                })

                custPurchase.custProductPurchasePaymentList.forEach(custProductPurchasePayment => {
                    this.state.transations.push({
                        date:custProductPurchasePayment.purchaseDate,
                        desc: custProductPurchasePayment.mode+" : "+custProductPurchasePayment.amount,
                        type: "# Payment Out",
                        giveAmount: custProductPurchasePayment.amount,
                        gotAmount:  ''
                    })
                });
           }
          );
    }
   
    async componentDidMount() {
       await this.props.getCustPurchaseListBySupplier(this.props.supplier.id);
       
    }

    render() {
        return (
            <MainCard title="Supplier Detail">
                <Grid container spacing={2}>
                    <Grid item sx={4} md={4}>
                        Name : {this.props.supplier.name}
                    </Grid>
                    
                    <Grid item sx={4} md={4}>
                        Mobile Number : {this.props.supplier.mobileNumber}
                    </Grid>
                    <Grid item sx={4} md={4}>
                        Phone Number : {this.props.supplier.phoneNumber}
                    </Grid>
                    <Grid item sx={4} md={4}>
                        Email Address : {this.props.supplier.emailAddress}
                    </Grid>
                    <Grid item sx={4} md={4}>
                       Permament Address : {this.props.supplier.permamentAddress}
                    </Grid>
                    <Grid item sx={4} md={4}>
                       Present Address : {this.props.supplier.presentAddress}
                    </Grid>
                </Grid>
                <Divider></Divider>
                <Grid container spacing={3}>
                    <Grid item sx={12} md={12}>
                        Transations
                    </Grid>
                </Grid>  
                <Divider></Divider>
                <Grid container spacing={1}>
                   <Grid item sx={12} md={12}>

                        <table className="table mb-0" style={{border:1, borderStyle:'outset'}}>
                        <thead>
                            <tr>
                            <th scope="col">Task</th>
                            <th scope="col">You give
                            <h6 className="mb-0"><span className="badge bg-danger">
                            Total: {
                                   
                                   this.state.transations && this.state.transations.filter(transation=> transation.giveAmount!=='').reduce((previousValue, currentValue) => {
                                       return previousValue + Number.parseFloat(currentValue.giveAmount);
                                   }, 0)
                               }
                               </span>
                               </h6>
                            </th>
                            <th scope="col">
                                You Got
                                <h6 className="mb-0"><span className="badge bg-success">
                                Total: {
                                   
                                    this.state.transations && this.state.transations.filter(transation=> transation.gotAmount!=='').reduce((previousValue, currentValue) => {
                                        return previousValue + Number.parseFloat(currentValue.gotAmount);
                                    }, 0)
                                }
                                </span>
                                </h6>
                            </th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.transations.map(transation=>
                
                            <tr className="fw-normal">
                            <th>
                                <span className="ms-2">{transation.date}</span><br/>
                                <span className="ms-2">{transation.desc}</span><br/>
                                <Button className="ms-2" size="small" variant="outlined">{transation.type}</Button>
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
        );
    }
};

const mapStateToProps = state => {
    const { userDetail, } = state.account;
    const { custPurchaseList} = state.custPurchaseReducer;
    return { userDetail, custPurchaseList };
};

export default connect(mapStateToProps, { getCustPurchaseListBySupplier })(VendorSupplierDetail);