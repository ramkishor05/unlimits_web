import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'


// material-ui
import { Avatar, Button, Grid, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from '@material-ui/core';
import {makeStyles} from '@material-ui/styles'
// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from './../../../store/constant';
import { getCustDashboardList } from '../../../actions/cust/CustDashboardActions';
import MainCard from '../../../component/cards/MainCard';
import { Close } from '@material-ui/icons';
// assets
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';

//-----------------------|| DEFAULT DASHBOARD ||-----------------------//

// style constant
const useStyles = makeStyles((theme) => ({
    cardAction: {
        padding: '10px',
        paddingTop: 0,
        justifyContent: 'center'
    },
    primaryLight: {
        color: theme.palette.primary[200],
        cursor: 'pointer'
    },
    divider: {
        marginTop: '12px',
        marginBottom: '12px'
    },
    avatarSuccess: {
        width: '16px',
        height: '16px',
        borderRadius: '5px',
        backgroundColor: theme.palette.success.light,
        color: theme.palette.success.dark,
        marginLeft: '15px'
    },
    successDark: {
        color: theme.palette.success.dark
    },
    avatarError: {
        width: '16px',
        height: '16px',
        borderRadius: '5px',
        backgroundColor: theme.palette.orange.light,
        color: theme.palette.orange.dark,
        marginLeft: '15px'
    },
    errorDark: {
        color: theme.palette.orange.dark
    },
    fab: {
        margin: theme.spacing(2),
      },
      absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
      }
}));

const Dashboard = () => {
    const dispatch= useDispatch();
    const [isLoading, setLoading] = useState(true);
    const classes = useStyles();
    const [isLoadingView, setLoadingView] = useState(false);
    const {custDashboard} = useSelector((state) => state.custDashboardReducer);
    async function dashboardList() {
        await dispatch(getCustDashboardList());
    };

    const showMore=(id, status)=>{
        setLoadingView(status);
    }

    useEffect(() => {
        dashboardList();
        setLoading(false);
        setLoadingView(false);
    }, []);

    return (
        
            isLoadingView ? 
            <MainCard content={false}
                    title="Stock List" 
                        button ={
                            
                        <Tooltip title="Add" aria-label="add">
                            <Button variant='contained' color="error" className={useStyles.absolute} onClick={()=>setLoadingView(false)}>
                                <Close></Close>
                            </Button>
                        </Tooltip>
                        }
            >

               <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Table style={{border:1, borderStyle: 'groove'}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Name
                                    </TableCell>
                                    <TableCell>
                                        Gross Sale
                                    </TableCell>
                                    <TableCell>
                                        Gross Purchase
                                    </TableCell>
                                    <TableCell>
                                        Gross Profit/Loss
                                    </TableCell>
                                    <TableCell>
                                        Stock Qnt
                                    </TableCell>
                                    <TableCell>
                                        Stock Price
                                    </TableCell>
                                    <TableCell>
                                        Net Sale
                                    </TableCell>
                                    <TableCell>
                                        Net Purchase
                                    </TableCell>
                                    <TableCell>
                                        Net Profit/Loss
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    custDashboard.stocks && custDashboard.stocks.map(stock=>
                                    <TableRow>
                                        <TableCell>
                                            {stock.name}
                                        </TableCell>
                                        <TableCell>
                                            {stock.totalGrossSale}
                                        </TableCell>
                                        <TableCell>
                                            {stock.totalGrossPurchase}
                                        </TableCell>
                                        <TableCell>
                                            <Grid container alignItems="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="inherit">
                                                        $ {stock.totalGrossProfit.toFixed(2)}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    {
                                                        stock.totalGrossProfit>0?
                                                        <Avatar variant="rounded" className={classes.avatarSuccess}>
                                                            <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                                                        </Avatar>
                                                        :
                                                        <Avatar variant="rounded" className={classes.avatarError}>
                                                            <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                                                        </Avatar>
                                                    }
                                                    
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell>
                                            {stock.totalStockQnt}
                                        </TableCell>
                                        <TableCell>
                                            {stock.totalStockPrice}
                                        </TableCell>
                                        <TableCell style={{alignItems :  'center'}}>
                                            <Grid container alignItems="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="inherit">
                                                        $ {stock.totalNetSale.toFixed(2)}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Avatar variant="rounded" className={classes.avatarSuccess}>
                                                        <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                                                    </Avatar>
                                                </Grid>
                                            </Grid>
                                           
                                        </TableCell>
                                        <TableCell>
                                            {stock.totalNetPurchase}
                                        </TableCell>
                                        <TableCell>
                                            <Grid container alignItems="center" justifyContent="space-between">
                                                <Grid item>
                                                    <Typography variant="subtitle1" color="inherit">
                                                        $ {stock.totalNetProfit.toFixed(2)}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    {
                                                        stock.totalNetProfit>0?
                                                        <Avatar variant="rounded" className={classes.avatarSuccess}>
                                                            <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                                                        </Avatar>
                                                        :
                                                        <Avatar variant="rounded" className={classes.avatarError}>
                                                            <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                                                        </Avatar>
                                                    }
                                                    
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                    )
                                
                            }
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </MainCard>
            :
            <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={isLoading} custDashboard={custDashboard}/>
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={isLoading} custDashboard={custDashboard} />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeDarkCard isLoading={isLoading} custDashboard={custDashboard}/>
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeLightCard isLoading={isLoading} custDashboard={custDashboard}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        
    );
};

export default Dashboard;
