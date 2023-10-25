import Axios from 'axios';

const WIFI = `localhost`;

// Setup the baseURL or api endpoint
const axios = Axios.create({
    baseURL: `http://${WIFI}:5000`,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
});

// Intercept each request and set the bearer token for user
axios.interceptors.request.use(async config => {
    let posAccount = await JSON.parse(localStorage.getItem('pos-account'));
    let userDetail= await JSON.parse(posAccount.userDetail);
    console.log("posAccount====",posAccount)
    console.log("posAccount.userDetail.ownerId====",userDetail.ownerId)
    if (posAccount && !config.headers.common.Authorization) {
        config.headers.common.Authorization = `${posAccount.token}`;
        config.headers.common.ownerId = `${userDetail.ownerId}`;
    }
    return config;
});

export default axios;
