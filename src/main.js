import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/css/tailwind.css'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import Paginate from 'vuejs-paginate'
import Vuelidate from 'vuelidate'

Vue.component('paginate', Paginate)
Vue.use(Loading)
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
