import Vue from 'vue'
import App from './App.vue'
import TextareaAutosize from 'vue-textarea-autosize'
import router from './router'
import vuetify from './plugins/vuetify'
import CKEditor from '@ckeditor/ckeditor5-vue'

require('./assets/sass/style.scss')

Vue.config.productionTip = false
Vue.use(TextareaAutosize)
Vue.use(CKEditor)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
