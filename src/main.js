import VueResource from 'vue-resource'
import AtComponents from 'at-ui'
import networks from './media'
import router from './router'
import i18n from './locale'
import store from './store'
import App from './App'
import Vue from 'vue'
import './mixins'

// Style
import 'at-ui-style'
import 'font-awesome/scss/font-awesome.scss'
import './assets/scss/index.scss'

// TODO Global translate AtComponents

// Use modules
Vue.use(AtComponents)
Vue.use(VueResource)

// Hide message
Vue.config.productionTip = false

// Add logs after each http call
Vue.http.interceptors.push((req, next) => {
  const isFind = networks.some(network => {
    if (req.url.indexOf(network.urlApi) !== -1) {
      network.logs(req, next)
      return true
    }
  })

  if (!isFind) {
    Vue.prototype.$Notify.warning({ title: 'Undefined API', message: req.url })
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
