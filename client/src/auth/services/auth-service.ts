import Vue from 'vue';

// 2. Specify a file with the types you want to augment
//    Vue has the constructor type in types/vue.d.ts
declare module 'vue/types/vue' {
    // 3. Declare augmentation for Vue
    interface Vue {
        http: any
    }
}
class AuthService {

    currentUser: any = null;
    vm = new Vue();

    login(user, pass) {
        return this.vm.http.post('/api/login', {
            email: user,
            password: pass
        }).then(response => {
            this.currentUser = response.body;
            this.storeUser();
            return response.body;
        })
    }

    isLogged() {
        this.checkLocalStorate();
        if (this.currentUser) return true;
        else return false;
    }

    logout() {
        return new Promise((resolve, reject) => {
            this.currentUser = null;
            this.cleanStorage();
            resolve();
        });
    }

    private checkLocalStorate() {
        let user = localStorage.getItem('user');
        if (user) {
            this.currentUser = JSON.parse(user);
        }
    }

    private storeUser() {
        localStorage.setItem('user', JSON.stringify(this.currentUser));
    }

    private cleanStorage() {
        localStorage.removeItem('user');
    }
}

export default new AuthService();