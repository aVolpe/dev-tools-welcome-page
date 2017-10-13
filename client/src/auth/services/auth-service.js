import Vue from 'vue';

export default {
    currentUser: null,
    login: function(user, pass) {
        return Vue.http.post('/api/login', {
            email : user,
            password : pass
        }).then(response => {
            this.currentUser = response.body;
            this._storeUser();
            return response.body;
        })
    },
    isLogged: function() {
        this._checkLocalStorate();
        if (this.currentUser) return true;
        else return false;
    },
    logout: function() {
        return new Promise((resolve, reject) => {
            this.currentUser = null;
            this._cleanStorage();
            resolve();
        });
    },
    _checkLocalStorate() {
        let user = localStorage.getItem('user');
        if (user) {
            this.currentUser = JSON.parse(user);
        }
    },
    _storeUser() {
        localStorage.setItem('user', JSON.stringify(this.currentUser));
    },
    _cleanStorage() {
        localStorage.removeItem('user');
    }
}