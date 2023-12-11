import {axios} from './index';

const USER_MENU_URL="http://localhost:2222/api/menu/item";

const headers = {
    'Content-Type': 'application/json'
};

export default {
   findByRoleId(roleId){
        return axios.get(USER_MENU_URL+'/role/'+roleId,{headers:headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    getAll(){
        return axios.get(USER_MENU_URL,{headers:headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    add(menuItem) {
        return axios.post(USER_MENU_URL, menuItem)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    update(id, menuItem) {
        return axios.put(USER_MENU_URL+`/${id}`, menuItem)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    delete(id) {
        return axios.delete(USER_MENU_URL+`/${id}`)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    }
};