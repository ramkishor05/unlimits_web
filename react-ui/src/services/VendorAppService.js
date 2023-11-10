import {axios} from './index';

export default {
    getAll(url) {
        return axios.get(url)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    add(url, item) {
        return axios.post(url, item)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    update(url, id, item) {
        item['id']=id;
        return axios.put(url, item)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    delete(url, id) {
        return axios.delete(url+`/${id}`)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    }
};