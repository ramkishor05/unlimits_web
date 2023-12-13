import React, { Component } from 'react';

// material-ui
import { Divider} from '@material-ui/core';

// project imports
import MainCard from '../../component/cards/MainCard';
import UserProfile from './UserProfile';
import UserAccount from './UserAccount';
import OwnerAccount from './OwnerAccount';
import { getUserVendor } from '../../actions';
import { connect } from 'react-redux';

//==============================|| SAMPLE PAGE ||==============================//

class UserProfilePage extends Component {
   
    state={
    }
   
    async componentDidMount() {
        await this.props.getUserVendor(this.props.userDetail.ownerId);
    }

    render() {
        return (
            this.props.userDetail &&
            <MainCard title="Profile" content = {false}>
                <UserProfile userProfile={this.props.userDetail.userProfile}></UserProfile>
                <Divider></Divider>
                
                <UserAccount userAccount={this.props.userDetail}></UserAccount>
                <Divider></Divider>
                <OwnerAccount vendorAccount={this.props.vendor} userAccount={this.props.userDetail}></OwnerAccount>
            </MainCard>
        
            
        );
    }
};

const mapStateToProps = state => {
    const { userDetail, } = state.account;
    const { vendor} = state.userVendorReducer;
    return { userDetail, vendor };
};

export default connect(mapStateToProps, { getUserVendor })(UserProfilePage);