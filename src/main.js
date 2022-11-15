import Vue from 'vue'
import App from './App.vue'
import { store } from "./store/store"
import { router } from "./routes/routes"

// fontawesome imports
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCar,faUserPlus, faSpinner,faPlay,faSoap,faCircleCheck,faClockRotateLeft,faGear,faPowerOff,faTrash,faUser,faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faCar,faUserPlus, faSpinner,faPlay,faSoap,faCircleCheck,faClockRotateLeft,faGear,faPowerOff,faTrash,faUser,faCircleExclamation)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
