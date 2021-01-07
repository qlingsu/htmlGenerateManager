import Vue from 'vue'
import App from './App.vue'
import router from '@/router/mobileRouter'
import store from '@/store'

Vue.config.productionTip = false

import Vant from 'vant';
Vue.use(Vant);

import Acomponent from '@/plugin/Acomponent';
Vue.use(Acomponent);

import ChartsModelList from "@/plugin/ChartsModel";
Vue.use(ChartsModelList);

import zqComponent from '@/components';
Vue.use(zqComponent);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import "@/assets/iconfont/iconfont.css";

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')