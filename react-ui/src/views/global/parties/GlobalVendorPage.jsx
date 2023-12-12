import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVendorList, addVendor } from '../../../actions';
import MainCard from '../../../component/cards/MainCard';
import DynamicTable from '../../../component/table/DynamicTable';
import DynamicModel from '../../../component/model/DynamicModel';
import { Button, Fab, Grid, TableCell } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PreviewIcon from '@mui/icons-material/Preview';

const tableheaders = [
    {
        name: "name",
        label: "Name",
        type: 'text'
    },
    {
        name: "emailAddress",
        label: "Email address",
        type: 'email'
    },
    {
        name: "phoneNumber",
        label: "Phone number",
        type: 'text'
    },
    {
        name: "mobileNumber",
        label: "mobileNumber",
        type: 'text'
    },
    {
        name: "permamentAddress",
        label: "Permament address",
        type: 'text'
    },
    {
        name: "presentAddress",
        label: "Present Address",
        type: 'text'
    },
    {
        name: "actions",
        label: "Actions",
        render: (value, row, rowIndex, header, props)=>{
            return <TableCell key={header.name+'_'+rowIndex} align='right'>
                        <Fab color="secondary" aria-label="Edit"  onClick={() => props.editAction(row)}>
                        <EditIcon/>
                    </Fab>
                    <Fab color="secondary" aria-label="Delete"  onClick={() => props.deleteAction(row)} >
                        <DeleteIcon />
                    </Fab>
                    <Fab color="secondary" aria-label="View"  onClick={() => props.previewAction(row)} >
                        <PreviewIcon />
                    </Fab>
                </TableCell>
        }
    }
];

const modelheaders = [
    {
        name: "name",
        label: "Name",
        type: 'text'
    },
    {
        name: "emailAddress",
        label: "Email address",
        type: 'email'
    },
    {
        name: "phoneNumber",
        label: "Phone number",
        type: 'text'
    },
    {
        name: "mobileNumber",
        label: "mobileNumber",
        type: 'text'
    },
    {
        name: "permamentAddress",
        label: "Permament address",
        type: 'text'
    },
    {
        name: "presentAddress",
        label: "Present Address",
        type: 'text'
    }
];

class GlobalVendorPage extends Component {
    state = {
        saveModel: false,
        deleteModel: false,
        dataObject: {},
        viewModel: false,
        title: "",
        type: ""
    };

    
    _edit = row => {
        this.setState({ dataObject: row, title:"Edit supplier", type:"Edit", saveModel: true  });
     }
 
     _preview = row => {
         this.setState({ dataObject: row, title:"View supplier", type:"View", viewModel: true  });
      }
 
     _add = () => {
        this.setState({ dataObject: {}, title:"Add supplier", type:"Add", saveModel: true  });
     }
 
     _delete = row => {
         this.setState({ dataObject: row, title:"Delete supplier", type:"Delete", deleteModel: true  });
     };
     
      saveObject = (type, row) => {
         console.log(type+"=",row)
         if(type=='Add')
             this.props.addVendorSupplier(row, this.clearAndRefresh)
         if(type=='Edit')
             this.props.editVendorSupplier(row.id,row, this.clearAndRefresh)
         if(type=='Delete')
             this.props.deleteVendorSupplier(row.id, this.clearAndRefresh)
 
     };
 
     clearAndRefresh = () => {
         this.props.getVendorSupplierList();
         this.setState({ dataObject: {}, saveModel: false,deleteModel:false  });
     }

    componentDidMount() {
        this.props.getVendorList();
    }

    render() {
        return (
            <div>
                <Grid container>
                    <Grid xs={12} sm={12} md={12}>
                        <MainCard
                            padIt
                            cardTitle="Vendors"
                            cardSubtitle="This is a list of all vendor in the system"
                            button={
                                    <Button
                                        style={ styles.addVendorButton }
                                        onClick={() => this.setState({ showAddVendorModal: true, notificationGroup: 'add' })}>ADD</Button>
                            
                            }
                        > <DynamicTable 
                        headers={tableheaders} 
                        dataList={this.props.vendorList}
                        deleteAction = {this._delete}
                        editAction = {this._edit}
                        previewAction={this._preview}
                        ></DynamicTable>
                        </MainCard>
                    </Grid>
                </Grid>

                <Grid container justify='center'>
                    <Grid xs={12} sm={12} md={10} lg={8}>
                        <Grid container>
                            <Grid xs={12} sm={12} md={4}>
                                
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container justify='center'>
                    <Grid xs={12} sm={12} md={10} lg={8}>
                        <Grid container>
                            <Grid xs={12} sm={12} md={4}>
                                
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <DynamicModel
                    title={this.state.title}
                    openAction={this.state.saveModel}
                    closeAction={()=> this.setState({saveModel: false})}
                    data={this.state.dataObject} 
                    type={this.state.type}
                    fields= {modelheaders}
                    saveAction = {this.saveObject}
                />

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

export default connect(mapStateToProps, { getVendorList, addVendor })(GlobalVendorPage);
