import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@material-ui/styles';
import {
    Badge,
    Button,
    Drawer,
    Fab,
    Grid,
    IconButton,
    Tooltip,
    Typography
} from '@material-ui/core';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import SubCard from '../../../component/cards/SubCard';
import { gridSpacing } from '../../../store/constant';
import ShoppingCartCheckout from '@mui/icons-material/ShoppingCartCheckout';

import ShoppingCartButton from '../../../component/buttons/ShoppingCartButton';

//-----------------------|| CustOrderCart ||-----------------------//

const CustOrderCart = ({addToCart}) => {

    const theme = useTheme();
    const dispatch = useDispatch();
   
    const custSaleReducer = useSelector((state) => state.custSaleReducer);
    const {custCartList} =custSaleReducer;
    // drawer on/off
    const [open, setOpen] = React.useState(false);
    const handleToggle = () => {
        setOpen(!open);
    };

    const itemQnt=(cartItem, saleQnt)=>{
        console.log("cartItem=", cartItem)
        cartItem['saleQnt']=saleQnt;
        addToCart(cartItem);
    }

    const getSubTotal=()=>{
        return custCartList && custCartList.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.saleQnt * currentValue.salePrice.price;
        }, 0)
    }
 
    useEffect(() => {

    }, [dispatch]);

    
    return (
        <React.Fragment>
            {/* toggle button */}

            <Tooltip title="Shopping Cart">
                <Fab
                    component="div"
                    onClick={handleToggle}
                    size="medium"
                    variant="string"
                    color="secondary"
                    sx={{
                        top: 80,
                        m: 2,
                        position: 'fixed',
                        right: 10,
                        zIndex: (theme) => theme.zIndex.speedDial,
                        boxShadow: theme.shadows[8]
                    }}
                >
                    
                        <IconButton color="warning" size="large"  >
                            <Badge  badgeContent={custSaleReducer.custCartList.length} color="primary">
                                 <ShoppingCartCheckout > </ShoppingCartCheckout>
                            </Badge>
                        </IconButton>
                    
                </Fab>
            </Tooltip>

            <Drawer
                anchor="right"
                onClose={handleToggle}
                open={open}
                PaperProps={{
                    sx: {
                        width: 380
                    }
                }}
            >
                <PerfectScrollbar component="div">
                    <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                       
                        <Grid item xs={12}>
                            {/* border radius */}
                            <SubCard title="Cart Items">
                            {
                            custSaleReducer.custCartList &&    custSaleReducer.custCartList.map(custCart=>
                                    <Grid container spacing={2}>                        
                                    <Grid item xs={12} lg={2} md={2}>
                                        <img
                                            width={40}
                                            height={40}
                                            src={custCart.custProduct.logoUrl}
                                        />
                                        
                                    </Grid>
                                    <Grid item xs={12} lg={5} md={5}>
                                        <Typography>{custCart.custProduct.title}</Typography>
                                        <Typography>{custCart.salePrice.price}</Typography>
                                    </Grid>
                                    <Grid item xs={12} lg={5} md={5} sx={{padding:2}}>
                                    <ShoppingCartButton  
                                        counter={1} 
                                        updateCounter={(counter)=> itemQnt(custCart, counter )}>
                                    </ShoppingCartButton>  
                                    </Grid>
                                    </Grid>
                                )
                            }
                            </SubCard>
                        </Grid>
                        <Grid item xs={12}>
                            {/* font family */}
                            <SubCard title="Order summary">
                                <Grid container spacing={1}>
                                    <Grid item xs={10} lg={10} md={10}>Sub Total</Grid>
                                    <Grid item xs={2} lg={2} md={2}>{getSubTotal()}</Grid>
                                </Grid>
                                <Grid container spacing={1}>
                                    <Grid item xs={10} lg={10} md={10}>Coupon Discount</Grid>
                                    <Grid item xs={2} lg={2} md={2}>0</Grid>
                                </Grid>
                                <Grid container spacing={1}>
                                    <Grid item xs={10} lg={10} md={10}>Shipping Charges</Grid>
                                    <Grid item xs={2} lg={2} md={2}>0</Grid>
                                </Grid>
                                <Grid container spacing={1}>
                                    <Grid item xs={10} lg={10} md={10}>Total</Grid>
                                    <Grid item xs={2} lg={2} md={2}>1200</Grid>
                                </Grid>
                            </SubCard>
                            
                            <Button variant='outlined' color='error' fullWidth>Checkout</Button>
                            
                        </Grid>
                    </Grid>
                </PerfectScrollbar>
            </Drawer>
        </React.Fragment>
    );
};

export default CustOrderCart;
