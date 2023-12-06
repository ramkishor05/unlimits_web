import { Divider, Grid, TableRow } from "@material-ui/core";
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
        
    }
   
    async componentDidMount() {
       await this.props.getCustPurchaseListBySupplier(this.props.supplier.id);
    }

    render() {
        return (
            <MainCard title="Supplier Detail">
                <Grid container spacing={1}>
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
                <Grid container spacing={1}>
                    <Grid item sx={12} md={12}>
                        Transations
                    </Grid>
                </Grid>  
                <Grid container spacing={1} style={{border:1, borderStyle: "groove"}}>
                    <Grid item sx={4} md={4}>
                        Entties
                    </Grid>
                    <Grid item sx={4} md={4}>
                        You Give
                    </Grid>
                    <Grid item sx={4} md={4}>
                        You Got
                    </Grid>
                </Grid>
                    {
                    this.props.custPurchaseList.map(custPurchase=>
                        <Grid container spacing={2} style={{border:1, borderStyle: "groove"}}>
                            <Grid item sx={4} md={4}>
                                <Grid container spacing={2}>
                                    <Grid item sx={12} md={12}>
                                        {custPurchase.purchaseDate}
                                    </Grid>
                                    <Grid item sx={12} md={12}>
                                        {custPurchase.totalPrice}
                                    </Grid>
                                    <Grid item sx={12} md={12}>
                                        Purchase
                                    </Grid>
                                </Grid>  
                            </Grid>
                            <Grid item sx={4} md={4}>

                            </Grid>
                            <Grid item sx={4} md={4}>

                            </Grid>
                        </Grid>
                     )
                    }
                
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