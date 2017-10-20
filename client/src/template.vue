<template>
    <div>

        <header class="bg-dark">
            <div class="container">
                <nav class="navbar navbar-expand-md no-gutters">
                    <div class="col-3 text-left">
                        <a href="https://www.froala.com">
                            <img src="~froala-design-blocks/dist/imgs/img_logo.png" height="30" alt="image">
                        </a>
                    </div>

                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse-4" aria-controls="navbarNav7" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse navbar-collapse-4 justify-content-center col-md-6" id="navbarNav7">
                        <ul class="navbar-nav justify-content-center">
                            <li class="nav-item active">
                                <a class="nav-link" href="">Projects
                                    <span class="sr-only">(current)</span>
                                </a>
                            </li>
                            
                            
                            
                        </ul>
                    </div>

                    <div class="collapse navbar-collapse navbar-collapse-4">

                        <ul class="navbar-nav col-2 justify-content-end d-none d-md-flex">
                            <li class="nav-item active">
                                <a class="nav-link" href="https://www.froala.com">
                                    <i class="fa fa-facebook"></i>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="https://www.froala.com">
                                    <i class="fa fa-twitter"></i>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="https://www.froala.com">
                                    <i class="fa fa-github"></i>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="https://www.froala.com">
                                    <i class="fa fa-google"></i>
                                </a>
                            </li>
                        </ul>

                        <a class="btn ml-md-3" href="" v-on:click="logout()">Log out</a>
                    </div>
                </nav>
            </div>
        </header>

        <router-view></router-view>

    </div>
</template>

<style>
@import "~bootstrap/dist/css/bootstrap.min.css";

@import "https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i";
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css";

@import "~froala-design-blocks/dist/css/froala_blocks.css";
</style>

<script>
import AuthService from '@/auth/services/auth-service';

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
