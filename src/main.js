import Vue from 'vue'
import App from './App.vue'
//  引入路由
import VueRouter from 'vue-router';
//引入主页的视口
import index from './components/index.vue';
// 引入详情页的视口
import goodsinfo from './components/goodsinfo';
//引入登陆的视口
import login from './components/login.vue';
// 用VUE调用一下use router
Vue.use(VueRouter);

// 引入主页需要用到的CSS样式
import './assets/statics/site/css/style.css';

// 引入懒加载VUE
import lazyload from "vue-lazyload";



Vue.use(lazyload, {

  error: require('./assets/error.jpg'),
  loading: require('./assets/loading.jpg'),

})

//引入ELement ui组件
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 用VUE调用一下Element
Vue.use(Element);


//引入iview
import iview from "iview";
import 'iview/dist/styles/iview.css';
Vue.use(iview);
// 引入axios
import axios from "axios";
// //引入moment
import moment from "moment";

// 抽取路由基地址
axios.defaults.baseURL = "http://111.230.232.110:8899/";

Vue.prototype.$axios = axios;



//给路由添加规则,
const routes = [{
  path: '/',
  component: index
},
{
  path: '/index',
  component: index
}, {
  path: '/goodsinfo/:goodsid',
  name: 'goodsinfo',
  component: goodsinfo
},{
  path:'/login',
  component:login
}
];
//实例化路由对象
const router = new VueRouter({
  routes
})

Vue.config.productionTip = false;

Vue.filter('beautifulTime',
  function (value) {
    return moment(value).format("YYYY年MM月DD日");
  }
)

// 实例化VUE和挂载路由到VUE上面
new Vue({
  el: '#app',
  render: h => h(App),
  router
})

