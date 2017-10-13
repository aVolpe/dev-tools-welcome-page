<template src="./login.html"></template>
<style src="./login.css"></style>

<script>
import AuthService from '../services/auth-service';

export default {
    data: function() {
        if (AuthService.isLogged()) this.goDashboard();
        return {
            user: 'admin',
            pass: 'password'
        }
    },
    methods: {
        login: function() {
            AuthService.login(this.user, this.pass)
            .then(response => {
                this.goDashboard();
            })
        },
        goDashboard: function() {
            this.$router.push('/dashboard');
        }

    }
}
</script>