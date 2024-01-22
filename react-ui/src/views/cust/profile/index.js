import React, { Component } from 'react';

// material-ui
import { Divider} from '@material-ui/core';

// project imports
import MainCard from '../../../component/cards/MainCard';
import CustUserProfile from './CustUserProfile';
import CustUserAccount from './CustUserAccount';
import CustOwnerAccount from './CustOwnerAccount';
import { getUserVendor , getUserVendorList} from '../../../actions';
import { connect } from 'react-redux';

//==============================|| SAMPLE PAGE ||==============================//

class CustUserProfilePage extends Component {
   
    state={
    }
   
    async componentDidMount() {
        this.props.getUserVendorList();
        await this.props.getUserVendor(this.props.ownerId);
    }

    render() {
        return (
            this.props.userDetail &&
            <MainCard title="Profile" content = {false}>
                <CustUserProfile userProfile={this.props.userDetail.userProfile}/>
                <Divider></Divider>
                
                <CustUserAccount userAccount={this.props.userDetail}/>
                <Divider></Divider>
                <CustOwnerAccount 
                vendorAccount={this.props.userVendor} 
                userAccount={this.props.userDetail}
                vendorList={this.props.userVendorList}
                />
            </MainCard>            
        );
    }
};

const mapStateToProps = state => {
    const { ownerId} = state.accountReducer;
    const { userDetail} = state.userReducer;
    const { userVendor, userVendorList} = state.userVendorReducer;
    console.log("userVendor=",userVendor)
    return { userDetail, userVendor, userVendorList, ownerId };
};

export default connect(mapStateToProps, { getUserVendor, getUserVendorList })(CustUserProfilePage);