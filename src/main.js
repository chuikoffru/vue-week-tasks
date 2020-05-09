import Vue from 'vue';
import moment from 'moment';
import 'moment/locale/ru';

import App from './App.vue';
import './registerServiceWorker';
import store from './store';

Vue.config.productionTip = false;

Vue.prototype.moment = moment;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
