import Vue from 'vue'
import App from './App.vue'
import TextareaAutosize from 'vue-textarea-autosize'
import router from './router'
require('./assets/sass/style.scss')

Vue.config.productionTip = false
Vue.use(TextareaAutosize)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
