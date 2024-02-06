import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@material-ui/styles';
import {
    Button,
    ButtonBase,
    Drawer,
    Fab,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    Radio,
    RadioGroup,
    Slider,
    Tooltip,
    Typography
} from '@material-ui/core';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import SubCard from '../../../component/cards/SubCard';
import AnimateButton from '../../../component/extended/AnimateButton';
import { SET_BORDER_RADIUS, SET_FONT_FAMILY } from '../../../store/actions'; // THEME_RTL
import { gridSpacing } from '../../../store/constant';
import ShoppingCartCheckout from '@mui/icons-material/ShoppingCartCheckout';
// assets
import { IconSettings } from '@tabler/icons';
import ShoppingCartButton from '../../../component/buttons/ShoppingCartButton';

// concat 'px'
function valueText(value) {
    return `${value}px`;
}

//-----------------------|| CustOrderCart ||-----------------------//

const CustOrderCart = () => {

    const theme = useTheme();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);
    const custProductReducer = useSelector((state) => state.custProductReducer);
    // drawer on/off
    const [open, setOpen] = React.useState(false);
    const handleToggle = () => {
        setOpen(!open);
    };

    // state - border radius
    const [borderRadius, setBorderRadius] = React.useState(customization.borderRadius);
    const handleBorderRadius = (event, newValue) => {
        setBorderRadius(newValue);
    };

    useEffect(() => {
        dispatch({ type: SET_BORDER_RADIUS, borderRadius: borderRadius });
    }, [dispatch, borderRadius]);

    let initialFont;
    switch (customization.fontFamily) {
        case `'Inter', sans-serif`:
            initialFont = 'Inter';
            break;
        case `'Poppins', sans-serif`:
            initialFont = 'Poppins';
            break;
        case `'Roboto', sans-serif`:
        default:
            initialFont = 'Roboto';
            break;
    }

    // state - font family
    const [fontFamily, setFontFamily] = React.useState(initialFont);
    useEffect(() => {
        let newFont;
        switch (fontFamily) {
            case 'Inter':
                newFont = `'Inter', sans-serif`;
                break;
            case 'Poppins':
                newFont = `'Poppins', sans-serif`;
                break;
            case 'Roboto':
            default:
                newFont = `'Roboto', sans-serif`;
                break;
        }
        dispatch({ type: SET_FONT_FAMILY, fontFamily: newFont });
    }, [dispatch, fontFamily]);

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
                        top: 130,
                        m: 2,
                        position: 'fixed',
                        right: 10,
                        zIndex: (theme) => theme.zIndex.speedDial,
                        boxShadow: theme.shadows[8]
                    }}
                >
                   <IconButton color="error" size="large" disableRipple>
                        <ShoppingCartCheckout />
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
                                       custProductReducer.custProductList &&    custProductReducer.custProductList.map(custProduct=>
                                                    <Grid container spacing={2}>                        
                                                    <Grid item xs={12} lg={2} md={2}>
                                                        <img
                                                            width={40}
                                                            height={40}
                                                            src={custProduct.logoUrl}
                                                        />
                                                        
                                                    </Grid>
                                                    <Grid item xs={12} lg={5} md={5}>
                                                        <Typography>{custProduct.title}</Typography>
                                                        <Typography>{custProduct.retailPrice.price}</Typography>
                                                    </Grid>
                                                    <Grid item xs={12} lg={5} md={5} sx={{padding:2}}>
                                                    <ShoppingCartButton  
                                                        counter={1} 
                                                        updateCounter={(counter)=> this.itemQnt(custProduct, counter )}>
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
                                    <Grid item xs={2} lg={2} md={2}>1200</Grid>
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
