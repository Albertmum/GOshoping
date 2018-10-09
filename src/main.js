import Vue from 'vue'
import App from './App.vue'
//  引入路由
import VueRouter from 'vue-router';
//引入主页的视口
import index from './components/index.vue';
// 用VUE调用一下use router
Vue.use(VueRouter);
//给路由添加规则,
const routes = [{
    path: '/',
    component: index
  },
  {
    path: '/index',
    component: index
  }
];
//实例化路由对象
const router=new VueRouter({
  routes
})

Vue.config.productionTip = false
// 实例化VUE和挂载路由到VUE上面
new Vue({
  el: '#app',
  render: h => h(App),
  router
})

