import {axios} from './index';
import config from '../config';

const CUST_UNIT_URL=`${config.API_ITEM_SERVER}/api/cust/unit`;

const headers = {
    'Content-Type': 'application/json',
    'custAppId': config.PRODUCTION_APP_ID
};

export default {
    getAll() {
        return axios.get(CUST_UNIT_URL,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    getByDate(from, to) {
        return axios.get(CUST_UNIT_URL+'/filter', { params: {from, to} },{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    add(unit) {
        return axios.post(CUST_UNIT_URL, unit,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    update(id, unit) {
        return axios.put(CUST_UNIT_URL+`/${id}`, unit,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    delete(id) {
        return axios.delete(CUST_UNIT_URL+`/${id}`,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    }
};
