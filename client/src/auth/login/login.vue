<template src="./login.html"> </template>
<style src="./login.css"></style>

<script>
import AuthService from '../services/auth-service';

export default {
    data: function() {
        return {
            user: 'mundo',
            pass: ''
        }
    },
    methods: {
        login: function() {
            AuthService.login(this.user, this.pass)
            .then(response => {
                console.log(response);
            })
        }
    }
}
</script>