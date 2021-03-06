import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import config from './config'

Vue.use(VueRouter);
Vue.use(VueResource);


// 1. Define route components.
// These can be imported from other files
import App from './app.vue';
import Login from './auth/login/login.vue';
import Template from './template.vue'

import Dashboard from '@/dashboard/dashboard.vue';

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/login', component: Login },
  {
    path: '/', component: Template,
    children: [{
      path: 'dashboard',
      alias: '',
      component: Dashboard

    }]
  }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes: routes // short for `routes: routes`
})

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
  ...App, // ES7 Object rest spread operator (or Object.assign)
   router
})

app.$mount('#app')

// Now the app has started!

/**
 * VUE resource intereptos
 */
Vue.http.interceptors.push(function(request, next) {

  console.log(request);
  if (request.url.indexOf('http') != 0) {
    request.url = config.url + request.url;
  }

  // continue to next interceptor
  next();
});