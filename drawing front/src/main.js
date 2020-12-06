import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
export const bus = new Vue()
export const buse = new Vue()
export const busr = new Vue()
export const buss = new Vue()
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
