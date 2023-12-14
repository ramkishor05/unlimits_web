import config from '../config';
import {axios} from './index';

var endpoint = config.AUTH_SERVER_HOST+`/api/authentication`;

export default {
    
    generateToken(user) {
        return axios.post(endpoint+'/token/generate', user)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    validateToken(token) {
        return axios.post(endpoint+'/token/validate', token)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    }
    ,

    expiredToken(token) {
        return axios.post(endpoint+'/token/expired', token)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    }
    ,
    getUser(token) {
        let headers={};
        headers['api_token']=token;
        console.log(endpoint+'/userdetail',headers)
        return axios.get(endpoint+'/userdetail', {headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    }
};