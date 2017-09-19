import Vue from 'vue';

export default {
    login: function(user, pass) {
        return Vue.http.post('/api/login', {
            email : user,
            password : pass
        })
    }
}