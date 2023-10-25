import axios from './index';

const BUSINESS_URL="http://localhost:3333/api/business";
const headers = {
    'Content-Type': 'application/json',
    'custAppId': 1,
     vendorId: 31
};

export default {
    getAll() {
        return axios.get(BUSINESS_URL,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    find(minimum){
        return axios.get('items/find', { params: { minimum } })
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    add(item) {
        if(item['vendorId']){
            headers['vendorId']=item['vendorId']
        }
        return axios.post(BUSINESS_URL, item,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    update(id, item) {
        item['id']=id;
        return axios.put(BUSINESS_URL, item,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    delete(id) {
        return axios.delete(BUSINESS_URL+`/${id}`)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    }
};