import {axios} from './index';
import config from '../config';

const GLOBAL_RESOURCE_URL=`${config.ITEM_SERVER_HOST}`;

export default {
    getAll() {
        return axios.get(GLOBAL_RESOURCE_URL)
                    .then(response => Promise.resolve(response.data.data))
                    .catch(error => Promise.reject(error));
    },
    find(minimum){
        return axios.get(GLOBAL_RESOURCE_URL+'/find', { params: { minimum } })
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    add(endpoint,item) {
        return axios.post(GLOBAL_RESOURCE_URL+endpoint, item)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    update(id, item) {
        item['id']=id;
        return axios.put(GLOBAL_RESOURCE_URL, item)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    delete(id) {
        return axios.delete(GLOBAL_RESOURCE_URL+`/${id}`)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    getPageList(pageNumber,pageCount) {
        return axios.get(GLOBAL_RESOURCE_URL+"/page/list"+`/${pageNumber}/count/${pageCount}`)
                    .then(response => Promise.resolve(response.data.data))
                    .catch(error => Promise.reject(error));
    }
};