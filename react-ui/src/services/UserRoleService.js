import {axios} from './index';
const hostname = `localhost`;

var endpoint = `http://${hostname}:2222/api/user/role`;

const headers = {
    'Content-Type': 'application/json'
};
export default {
   
    getAll() {
        return axios.get(endpoint)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    getAllByType(type) {
        return axios.get(endpoint+`/${type}`)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    update(id, data) {
        return axios.put(endpoint+`/${id}`, data)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    add(user) {
        return axios.post(endpoint, user)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    delete(id) {
        return axios.delete(endpoint+`/${id}`)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    get(id) {
        return axios.delete(endpoint+`/${id}`)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    }    
};