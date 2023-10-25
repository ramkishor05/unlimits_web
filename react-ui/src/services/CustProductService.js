import axios from './index';
import config from '../config';

const CUST_PRODUCT_URL=`${config.API_ITEM_SERVER}/api/cust/product`;

const headers = {
    'Content-Type': 'application/json',
    'custAppId': config.PRODUCTION_APP_ID
};

export default {
    getAll() {
        return axios.get(CUST_PRODUCT_URL,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    getByDate(from, to) {
        return axios.get(CUST_PRODUCT_URL+'/filter', { params: {from, to} },{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    serach(text) {
        return axios.get(CUST_PRODUCT_URL+'/filter', { params: {text} },{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    add(PRODUCT) {
        return axios.post(CUST_PRODUCT_URL, PRODUCT,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    update(PRODUCT) {
        return axios.put(CUST_PRODUCT_URL, PRODUCT,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    delete(id) {
        return axios.delete(CUST_PRODUCT_URL+`/${id}`,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    }
};
