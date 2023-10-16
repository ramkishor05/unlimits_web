import axios from 'axios';
const hostname = `localhost`;

var endpoint = `http://${hostname}:2222/api/authentication/`;

export default {
    
    generateToken(user) {
        return axios.post(endpoint+'token/generate', user)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    validateToken(token) {
        return axios.post(endpoint+'token/validate', token)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    }
    ,

    expiredToken(token) {
        return axios.post(endpoint+'token/expired', token)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    getUser(token) {
        return axios.post(endpoint+'token/user', token)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    }
};