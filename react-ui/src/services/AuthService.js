import config from '../config';
import {axios} from './index';

var endpoint = config.AUTH_SERVER_HOST+`/api/auth`;

let headers={
    'authority':"ADMIN",
    "Content-Type": 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':'Content-Type',
    'Accept':'*'
}

export default {
    
    generateToken(user) {
        console.log("user=",user)
        return axios.post(endpoint+'/login', user ,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },

    validateToken(token) {
        return axios.post(endpoint+'/token/validate', token)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    }
    ,

    expiredToken(token) {
        return axios.post(endpoint+'/token/expired', token)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    }
    ,
    getUser(token) {
        let headers={};
        headers['Authorization']=token;
        return axios.get(endpoint+'/userdetail', {headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    }
};