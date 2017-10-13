<template src="./login.html"></template>
<style src="./login.css"></style>

<script lang="ts">
import Vue from "vue";
import AuthService from '../services/auth-service';
let as = new AuthService();

export default Vue.extend({
    props: ['user', 'pass'],

    data() {
        if (as.isLogged()) this.goDashboard();
        return {
            user: 'admin',
            pass: 'password'
        }
    },
    methods: {
        login() {
            as.login(this.user, this.pass)
                .then(response => {
                    this.goDashboard();
                })
        },
        goDashboard() {
            this.$router.push('/dashboard');
        }
    }
});
</script>