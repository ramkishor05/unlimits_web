import axios from 'axios';
import config from '../config';

const CUST_COUNT_FREQ_URL=`${config.API_ITEM_SERVER}/api/cust/countfreq`
const headers = {
    'Content-Type': 'application/json',
    'custAppId': config.PRODUCTION_APP_ID
};

export default {
    getAll() {
        return axios.get(CUST_COUNT_FREQ_URL,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    find(minimum){
        return axios.get(CUST_COUNT_FREQ_URL+'/find', { params: { minimum } },{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    add(item) {
        return axios.post(CUST_COUNT_FREQ_URL, item,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    update(id, item) {
        item['id']=id;
        return axios.put(CUST_COUNT_FREQ_URL, item,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    delete(id) {
        return axios.delete(CUST_COUNT_FREQ_URL+`/${id}`,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    }
};