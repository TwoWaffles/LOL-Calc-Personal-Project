import Vue from 'vue'

import App from './App.vue'
import router from './router'

import './assets/style.css'

// State management library
import { createPinia, PiniaVuePlugin } from 'pinia'

Vue.use(PiniaVuePlugin)

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faPlus } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faPlus)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  pinia: createPinia(),
  render: (h) => h(App)
}).$mount('#app')
