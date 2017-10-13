<template>
<button v-on:click="logout()">
    Logout
</button>
</template>

<style>
</style>

<script>
import AuthService from '../auth/services/auth-service';

export default {
    data: function() {
        return {}
    },
    methods: {
        logout: function() {
            AuthService.logout().then(data => {
                this.$router.push('/');
            })
        }
    }
}
</script>