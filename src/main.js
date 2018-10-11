import Vue from 'vue'
import App from './App.vue'
//  引入路由
import VueRouter from 'vue-router';
//引入主页的视口
import index from './components/index.vue';
// 引入详情页的视口
import details from './components/details';
// 用VUE调用一下use router
Vue.use(VueRouter);

// 引入主页需要用到的CSS样式
import './assets/statics/site/css/style.css';

//引入ELement ui组件
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 用VUE调用一下Element
Vue.use(Element);



//给路由添加规则,
const routes = [{
    path: '/',
    component: index
  },
  {
    path: '/index',
    component: index
  },{
    path:'/details',
    name:'details',
    component:details
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

