import Axios from 'axios';
const WIFI = `localhost`;

// Setup the baseURL or api endpoint
export const axios = Axios.create({
    baseURL: `http://${WIFI}:5000`,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
});

// Intercept each request and set the bearer token for user
axios.interceptors.request.use(async config => {
    let account = await JSON.parse(localStorage.getItem('pos-account'));
    if (account && !config.headers.common.Authorization) {
        config.headers.common.Authorization = account.token;
        config.headers.common.ownerId = account.ownerId;
        config.headers.common.businessId = account.businessId;
    }/*
    let userDetail=await JSON.parse(account.userDetail);
    if (userDetail) {
        config.headers.common.ownerId = userDetail.ownerId;
        config.headers.common.userId = userDetail.id;
        config.headers.common.businessId = account.businessId;
    }
   */
    return config;
});

