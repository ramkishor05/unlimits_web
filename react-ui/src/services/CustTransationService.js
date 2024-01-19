import {axios} from './index';
import config from '../config';

const CUST_TRANSATION_URL=`${config.ITEM_SERVER_HOST}/api/cust/account/transation`
const headers = {
    'Content-Type': 'application/json'
};

export default {
    getAll() {
        return axios.get(CUST_TRANSATION_URL,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    getFilted(startFormat, endFormat, serviceType) {
        return axios.get(CUST_TRANSATION_URL+'/filted', { params: { startDate: startFormat, endDate: endFormat, serviceType: serviceType } },{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    find(minimum){
        return axios.get(CUST_TRANSATION_URL+'/find', { params: { minimum } },{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    add(item) {
        return axios.post(CUST_TRANSATION_URL, item,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    update(id, item) {
        item['id']=id;
        return axios.put(CUST_TRANSATION_URL, item,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    delete(id) {
        return axios.delete(CUST_TRANSATION_URL+`/${id}`,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    }
};