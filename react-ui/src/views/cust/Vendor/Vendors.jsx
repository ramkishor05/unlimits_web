import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, IconButton, DeleteIcon } from 'material-ui';
import { AddAlert } from 'material-ui-icons';

import SaveVendorModal from './Modals/addVendorModal';
import EditVendorModal from './Modals/EditVendorModal';
import UpdateVendorModal from './Modals/UpdateVendorModal';

import { RegularCard, VendorTable, ItemGrid, Snackbar } from 'components';

import Loader from 'Loader';

import { getVendorList, addVendor } from '../../../actions';

class Vendors extends Component {
    state = {
        notificationGroup: 'add',
        showAddVendorModal: false,
        showEditVendorModal: false,
        showUpdateVendorModal: false,
        tr: false,
        tc: false,
    };

    componentDidMount() {
        this.props.getVendorList();
    }

    // Check if the user is super admin.
    isSuperAdmin = () => {
        return true; //this.props.user.role.name === 'super_admin';
    };

    tableHead = () => {
        return this.isSuperAdmin()
            ? ['Logo','Name','Phone number', 'Mobile number', 'Email address', 
            'Create Dt','Updated Dt', 'Actions']
            : ['Logo','Name','Phone number', 'Mobile number', 'Email address', 
            'Created Dt','Updated Dt', 'Actions']
    };

    showNotification(place) {
        var x = [];
        x[place] = true;
        this.setState(x);

        setTimeout(function() {
            x[place] = false;
            this.setState(x);
        }.bind(this), 3000);
    }

    notificationMessage = type => {
        if (type === 'success') {
            if (this.state.notificationGroup === 'add') {
                return 'Vendor added successfully';
            } else if (this.state.notificationGroup === 'edit') {
                return 'Vendor edited successfully';
            } else {
                return 'Vendor updated successfully';
            }
        } else if (type === 'error') {
            if (this.state.notificationGroup === 'edit') {
                return 'Error vendor could not be edited';
            } else if (this.state.notificationGroup === 'add') {
                return 'Error vendor could not be added';
            } else {
                return 'Error vendor could not be updated';
            }
        }
    };

    render() {
        return (
            <div>
                <Grid container>
                    <ItemGrid xs={12} sm={12} md={12}>
                        <RegularCard
                            padIt
                            cardTitle="Vendors"
                            cardSubtitle="This is a list of all vendor in the system"
                            button={
                                this.isSuperAdmin() && (
                                    <Button
                                        style={ styles.addVendorButton }
                                        onClick={() => this.setState({ showAddVendorModal: true, notificationGroup: 'add' })}>ADD</Button>
                                )
                            }
                            content={
                                <VendorTable
                                    tableHeaderColor="primary"
                                    tableHead={this.tableHead()}
                                    tableData={this.props.vendorList}
                                    editVendor={() => this.setState({ showEditVendorModal: true, notificationGroup: 'edit' })}
                                    updateVendor={() => this.setState({ showUpdateVendorModal: true, notificationGroup: 'update' })}
                                />
                            }
                        />
                    </ItemGrid>
                </Grid>

                <Grid container justify='center'>
                    <ItemGrid xs={12} sm={12} md={10} lg={8}>
                        <Grid container>
                            <ItemGrid xs={12} sm={12} md={4}>
                                <Snackbar
                                    place="tr"
                                    color="success"
                                    icon={AddAlert}
                                    message={this.notificationMessage('success')}
                                    open={this.state.tr}
                                    closeNotification={() => this.setState({'tr': false})}
                                    close
                                />
                            </ItemGrid>
                        </Grid>
                    </ItemGrid>
                </Grid>

                <Grid container justify='center'>
                    <ItemGrid xs={12} sm={12} md={10} lg={8}>
                        <Grid container>
                            <ItemGrid xs={12} sm={12} md={4}>
                                <Snackbar
                                    place="tc"
                                    color="danger"
                                    icon={AddAlert}
                                    message={this.notificationMessage('error')}
                                    open={this.state.tc}
                                    closeNotification={() => this.setState({'tc': false})}
                                    close
                                />
                            </ItemGrid>
                        </Grid>
                    </ItemGrid>
                </Grid>

                <SaveVendorModal
                    open={this.state.showAddVendorModal}
                    close={() => this.setState({ showAddVendorModal: false })}
                    addVendor={this.props.addVendor}
                    refresh={this.props.getAllVendorList}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <EditVendorModal
                    open={this.state.showEditVendorModal}
                    close={() => this.setState({ showEditVendorModal: false })}
                    refresh={this.props.getAllVendorList}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <UpdateVendorModal
                    open={this.state.showUpdateVendorModal}
                    close={() => this.setState({ showUpdateVendorModal: false })}
                    refresh={this.props.getAllVendorList}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <Loader open={this.props.show_vendor_loader} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { user } = state.userReducer;
    const { vendorList, show_vendor_loader } = state.vendorReducer;

    return { user, vendorList, show_vendor_loader };
};

const styles = {
    addVendorButton: {
        color: 'white',
        backgroundColor: 'purple'
    },
};

export default connect(mapStateToProps, { getAllVendorList, addVendor })(Vendors);
