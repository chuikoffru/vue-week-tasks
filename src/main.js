import Vue from 'vue';
import moment from 'moment';
import 'moment/locale/ru';
import VueDragscroll from 'vue-dragscroll';

import App from './App.vue';
import './registerServiceWorker';
import store from './store';

Vue.config.productionTip = false;

Vue.prototype.moment = moment;
Vue.use(VueDragscroll);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
