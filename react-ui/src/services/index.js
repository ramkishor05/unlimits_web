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
    if (account) {
        config.headers.common.Authorization = account.token;
        config.headers.common.ownerId = account.ownerId;
        config.headers.common.businessId = account.businessId;
        config.headers.common.userId = account.userId;
        config.headers.common['ngrok-skip-browser-warning']="OK";
    }
    return config;
});

