import {axios} from './index';
import config from '../config';

const CUST_SALE_URL=`${config.API_ITEM_SERVER}/api/cust/sales`
const headers = {
    'Content-Type': 'application/json'
};

export default {
    getAll() {
        return axios.get(CUST_SALE_URL,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    getAllByCustomer(customerId) {
        return axios.get(CUST_SALE_URL+`/customer/${customerId}`,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    getAllByUser(userId) {
        return axios.get(CUST_SALE_URL+`/user/${userId}`,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    find(minimum){
        return axios.get(CUST_SALE_URL+'/find', { params: { minimum } },{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    add(item) {
        return axios.post(CUST_SALE_URL, item,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    update(id, item) {
        item['id']=id;
        return axios.put(CUST_SALE_URL, item,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    delete(id) {
        return axios.delete(CUST_SALE_URL+`/${id}`,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    }, 
    getByDate(from, to){
        return axios.get(CUST_SALE_URL+`/filter?from=${from}&to=${to}`,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    }
};