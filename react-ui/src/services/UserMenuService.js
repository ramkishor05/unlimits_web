import {axios} from './index';

const USER_MENU_URL="http://localhost:2222/api/menu";

const headers = {
    'Content-Type': 'application/json'
};

export default {
   findByRoleId(roleId){
        return axios.get(USER_MENU_URL+'/role/'+roleId,{headers:headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    }
};