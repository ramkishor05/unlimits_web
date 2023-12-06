import { Divider, Grid } from "@material-ui/core";
import MainCard from "../../../../component/cards/MainCard";
import UserProfile from "../../../profile/UserProfile";
import UserAccount from "../../../profile/UserAccount";
import OwnerAccount from "../../../profile/OwnerAccount";
import { Component } from "react";
import { connect } from "react-redux";
import { getCustPurchaseListBySupplier } from "../../../../actions";

class VendorSupplierDetail extends Component {
   
    state={
        
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
                <Grid container spacing={2}>
                    <Grid item sx={12} md={12}>
                    </Grid>
                </Grid>   
                {
                    this.props.custPurchaseList.map(custPurchase=>
                        <Grid item sx={12} md={12}>
                             {custPurchase.idenNo}
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