import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.use(ElementUI);
locale.use(lang);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
