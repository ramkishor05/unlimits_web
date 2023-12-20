import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import configData from '../../../../config';

// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    useMediaQuery
} from '@material-ui/core';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';

// project imports
import useScriptRef from '../../../../hooks/useScriptRef';
import AnimateButton from './../../../../component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from '../../../../utils/password-strength';

// assets
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import UserService from '../../../../services/UserService';
import UserVendorService from '../../../../services/UserVendorService';
import { useDispatch } from 'react-redux';
import { login } from '../../../../actions';

// style constant
const useStyles = makeStyles((theme) => ({
    redButton: {
        fontSize: '1rem',
        fontWeight: 500,
        backgroundColor: theme.palette.grey[50],
        border: '1px solid',
        borderColor: theme.palette.grey[100],
        color: theme.palette.grey[700],
        textTransform: 'none',
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.875rem'
        }
    },
    signDivider: {
        flexGrow: 1
    },
    signText: {
        cursor: 'unset',
        margin: theme.spacing(2),
        padding: '5px 56px',
        borderColor: theme.palette.grey[100] + ' !important',
        color: theme.palette.grey[900] + '!important',
        fontWeight: 500
    },
    loginIcon: {
        marginRight: '16px',
        [theme.breakpoints.down('sm')]: {
            marginRight: '8px'
        }
    },
    loginInput: {
        ...theme.typography.customInput
    }
}));

//===========================|| API JWT - REGISTER ||===========================//

const RestRegister = ({ ...others }) => {
    const dispatch=useDispatch()
    const classes = useStyles();
    let history = useHistory();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [showPassword, setShowPassword] = React.useState(false);
    const [checked, setChecked] = React.useState(true);

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState('');

    const [form, setForm] = React.useState('registeration');

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    const doProcess=(values, {setErrors, setStatus, setSubmitting })=>{
        try {
            UserService.exists(values.username).then(function (exists) {
                if(exists){
                    setStatus({ success: false });
                    setErrors({ submit: "User already exists."});
                    setSubmitting(false);
                } else {
                    UserVendorService.add({
                        emailAddress: values.email
                    }).then(function (owner) {
                        if (owner) {
                            let password= values.password;
                            let username= values.username;
                            UserService.add({
                                username: username,
                                password: password,
                                ownerId: owner.id
                            })
                            .then(function (user) {
                                if (user) {
                                    dispatch(login({username,password}));
                                } else {
                                    setStatus({ success: false });
                                    setErrors({ submit: ''});
                                    setSubmitting(false);
                                }
                            })
                            .catch(function (error) {
                                setStatus({ success: false });
                                setErrors({ submit: 'User not registed!' });
                                setSubmitting(false);
                            });
                        } else {
                            setStatus({ success: false });
                            setErrors({ submit: 'Vendor error!'});
                            setSubmitting(false);
                        }
                    })
                    .catch(function (error) {
                        setStatus({ success: false });
                        setErrors({ submit: error.response.data.msg });
                        setSubmitting(false);
                    });
                    
                }
                
            })
            .catch(function (error) {  
            }); 
            
        } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
            }
        }
    }

    const businessForm=({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
            <Grid container spacing={matchDownSM ? 0 : 2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Email address"
                        margin="normal"
                        name="emailAddress"
                        id="emailAddress"
                        type="email"
                        value={values.emailAddress}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className={classes.loginInput}
                        error={touched.emailAddress && Boolean(errors.emailAddress)}
                    />
                    {touched.emailAddress && errors.emailAddress && (
                        <FormHelperText error id="standard-weight-helper-text--register">
                            {errors.emailAddress}
                        </FormHelperText>
                    )}
                </Grid>
            </Grid>
            <FormControl fullWidth error={Boolean(touched.phoneNumber && errors.phoneNumber)} 
            className={classes.loginInput}>
                <InputLabel htmlFor="outlined-adornment-phoneNumber-register">PhoneNumber</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-email-register"
                    type="phoneNumber"
                    value={values.phoneNumber}
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{
                        classes: {
                            notchedOutline: classes.notchedOutline
                        }
                    }}
                />
                {touched.phoneNumber && errors.phoneNumber && (
                    <FormHelperText error id="standard-weight-helper-text--register">
                        {' '}
                        {errors.phoneNumber}{' '}
                    </FormHelperText>
                )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.permamentAddress && errors.permamentAddress)} className={classes.loginInput}>
                <InputLabel htmlFor="outlined-adornment-password-register">permamentAddress</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password-register"
                    type={showPassword ? 'text' : 'password'}
                    value={values.permamentAddress}
                    name="permamentAddress"
                    label="permamentAddress"
                    onBlur={handleBlur}
                    onChange={(e) => {
                        handleChange(e);
                        changePassword(e.target.value);
                    }}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    inputProps={{
                        classes: {
                            notchedOutline: classes.notchedOutline
                        }
                    }}
                />
                {touched.permamentAddress && errors.permamentAddress && (
                    <FormHelperText error id="standard-weight-helper-text-permamentAddress-register">
                        {errors.permamentAddress}
                    </FormHelperText>
                )}
            </FormControl>

            {strength !== 0 && (
                <FormControl fullWidth>
                    <Box
                        sx={{
                            mb: 2
                        }}
                    >
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Box
                                    backgroundColor={level.color}
                                    sx={{
                                        width: 85,
                                        height: 8,
                                        borderRadius: '7px'
                                    }}
                                ></Box>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" fontSize="0.75rem">
                                    {level.label}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </FormControl>
            )}

            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checked}
                                onChange={(event) => setChecked(event.target.checked)}
                                name="checked"
                                color="primary"
                            />
                        }
                        label={
                            <Typography variant="subtitle1">
                                Agree with &nbsp;
                                <Typography variant="subtitle1" component={Link} to="#">
                                    Terms & Condition.
                                </Typography>
                            </Typography>
                        }
                    />
                </Grid>
            </Grid>
            {errors.submit && (
                <Box
                    sx={{
                        mt: 3
                    }}
                >
                    <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
            )}

            <Box
                sx={{
                    mt: 2
                }}
            >
                <AnimateButton>
                    <Button
                        disableElevation
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="secondary"
                    >
                        Add business
                    </Button>
                </AnimateButton>
            </Box>
        </form>
    );

    const bussinessProcess=()=>{
         return <Formik
                initialValues={{
                    phoneNumber: '',
                    emailAddress: '',
                    permamentAddress: '',
                    presentAddress: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    permamentAddress: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    phoneNumber: Yup.string().required('Phone number is required')
                })}
                onSubmit={
                    (values, { setErrors, setStatus, setSubmitting }) => 
                    businessForm(values, { setErrors, setStatus, setSubmitting })
                 }
            >
                {
                   ({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values })=> registerationForm({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values })
                }
            </Formik>
    }

    const registerationForm=({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
            <Grid container spacing={matchDownSM ? 0 : 2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Username"
                        margin="normal"
                        name="username"
                        id="username"
                        type="text"
                        value={values.username}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className={classes.loginInput}
                        error={touched.username && Boolean(errors.username)}
                    />
                    {touched.username && errors.username && (
                        <FormHelperText error id="standard-weight-helper-text--register">
                            {errors.username}
                        </FormHelperText>
                    )}
                </Grid>
            </Grid>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} className={classes.loginInput}>
                <InputLabel htmlFor="outlined-adornment-email-register">Email</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-email-register"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{
                        classes: {
                            notchedOutline: classes.notchedOutline
                        }
                    }}
                />
                {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text--register">
                        {' '}
                        {errors.email}{' '}
                    </FormHelperText>
                )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} className={classes.loginInput}>
                <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password-register"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    label="Password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                        handleChange(e);
                        changePassword(e.target.value);
                    }}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    inputProps={{
                        classes: {
                            notchedOutline: classes.notchedOutline
                        }
                    }}
                />
                {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-register">
                        {errors.password}
                    </FormHelperText>
                )}
            </FormControl>

            {strength !== 0 && (
                <FormControl fullWidth>
                    <Box
                        sx={{
                            mb: 2
                        }}
                    >
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Box
                                    backgroundColor={level.color}
                                    sx={{
                                        width: 85,
                                        height: 8,
                                        borderRadius: '7px'
                                    }}
                                ></Box>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" fontSize="0.75rem">
                                    {level.label}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </FormControl>
            )}

            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checked}
                                onChange={(event) => setChecked(event.target.checked)}
                                name="checked"
                                color="primary"
                            />
                        }
                        label={
                            <Typography variant="subtitle1">
                                Agree with &nbsp;
                                <Typography variant="subtitle1" component={Link} to="#">
                                    Terms & Condition.
                                </Typography>
                            </Typography>
                        }
                    />
                </Grid>
            </Grid>
            {errors.submit && (
                <Box
                    sx={{
                        mt: 3
                    }}
                >
                    <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
            )}

            <Box
                sx={{
                    mt: 2
                }}
            >
                <AnimateButton>
                    <Button
                        disableElevation
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="secondary"
                    >
                        Sign UP
                    </Button>
                </AnimateButton>
            </Box>
        </form>
    );

    useEffect(() => {
        changePassword('123456');
    }, []);

    const registerationProcess=()=>{
        return <Formik
        initialValues={{
            username: '',
            email: '',
            password: '',
            submit: null
        }}
        validationSchema={Yup.object().shape({
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            username: Yup.string().required('Username is required'),
            password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={
            (values, { setErrors, setStatus, setSubmitting }) => 
               doProcess(values, { setErrors, setStatus, setSubmitting }
            )
        }
    >
        {
           ({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values })=> registerationForm({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values })
        }
    </Formik>
    }

    return (
        <React.Fragment>
            {
                bussinessProcess()

            }
        </React.Fragment>
    );
};

export default RestRegister;
