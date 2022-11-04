import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { routes } from "./routes/routes";

// fontawesome imports
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCar } from '@fortawesome/free-solid-svg-icons'
Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faCar)

Vue.config.productionTip = false

Vue.use(VueRouter);

const router = new VueRouter({
  routes, 
  mode : 'history' 
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
