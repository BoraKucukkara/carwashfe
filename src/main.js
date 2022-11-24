import Vue from 'vue'
import App from './App.vue'
import { store } from "./store/store"
import { router } from "./routes/routes"

// fontawesome imports
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSackDollar,faCoins,faCar,faUserPlus, faSpinner,faPlay,faSoap,faCircleCheck,faClockRotateLeft,faGear,faPowerOff,faTrash,faUser,faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faSackDollar,faCoins,faCar,faUserPlus, faSpinner,faPlay,faSoap,faCircleCheck,faClockRotateLeft,faGear,faPowerOff,faTrash,faUser,faCircleExclamation)

Vue.config.productionTip = false

// VEE VALIDATE 
import { ValidationObserver, ValidationProvider} from 'vee-validate'
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
extend('email', email);
extend('required', {
  ...required,
  message: 'This field is required'
});


// VUE APP
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
