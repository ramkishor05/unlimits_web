import {axios} from './index';
import config from '../config';

const CUST_PURCHASE_URL=`${config.API_ITEM_SERVER}/api/cust/purchases`
const headers = {
    'Content-Type': 'application/json'
};

export default {
    getAll() {
        return axios.get(CUST_PURCHASE_URL,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    }, 
    getAllBySupplier(supplierId) {
        return axios.get(CUST_PURCHASE_URL+`/supplier/${supplierId}`,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    getAllByUser(userId) {
        return axios.get(CUST_PURCHASE_URL+`/user/${userId}`,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    find(minimum){
        return axios.get(CUST_PURCHASE_URL+'/find', { params: { minimum } },{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    add(item) {
        return axios.post(CUST_PURCHASE_URL, item,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    update(id, item) {
        item['id']=id;
        return axios.put(CUST_PURCHASE_URL, item,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    delete(id) {
        return axios.delete(CUST_PURCHASE_URL+`/${id}`,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    }, 
    getByDate(from, to){
        return axios.get(CUST_PURCHASE_URL+`/filter?from=${from}&to=${to}`,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    getByDate(supplierId,from, to){
        return axios.get(CUST_PURCHASE_URL+`/filter/supplier/`+supplierId+`?from=${from}&to=${to}`,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    }
};