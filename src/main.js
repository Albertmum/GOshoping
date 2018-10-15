import Vue from 'vue'
import './assets/statics/cavars.js'
import App from './App.vue'
//  引入路由
import VueRouter from 'vue-router';
//引入主页的视口
import index from './components/index.vue';
// 引入详情页的视口
import goodsinfo from './components/goodsinfo';
//引入登陆的视口
import login from './components/login.vue';
//引入购物车的视口文件
import buyCar from './components/buyCar.vue';
//引入支付订单的页面
import payOrder from './components/payOrder.vue';
//引入订单确认shikou
import confirmOrder from './components/confirmOrder.vue';
// 用VUE调用一下use router
Vue.use(VueRouter);

// 引入主页需要用到的CSS样式
import './assets/statics/site/css/style.css';

// 引入懒加载VUE
import lazyload from "vue-lazyload";
//引入jquery库
import $ from 'jquery';
Vue.prototype.$$=$;

//引入VUEX
import Vuex from "vuex";
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        shopCartData: JSON.parse(localStorage.getItem('cartData')) || {}
    },
    mutations: {
        addCart(state, opt) {
            if (state.shopCartData[opt.id] == undefined) {
                // 没有 增加这个key
                // state.shopCartData[opt.id] = opt.buyCount
                // 为了让Vue可以观察到这个数据的改变 我们需要使用 Vue.set进行设置
                // Vue.set(obj, 'newProp', 123)
                Vue.set(state.shopCartData, opt.id, opt.buyCount);
            } else {
                // 有 累加 对象也支持 对象[属性名]
                state.shopCartData[opt.id] += opt.buyCount;
            }
        },
        //定义传过来的值{id:id,newCount}
        updateBuyCount(state,opt){
          state.shopCartData[opt.id]=opt.newCount;
        },
        //定义传过来的值{id:id}
        delGood(state,id){
          
          Vue.delete(state.shopCartData,id);

        }
    },
    getters: {
        cartGoodCount(state) {
            let totalCount = 0;
            for (const key in state.shopCartData) {
                totalCount += state.shopCartData[key]
            };
            return totalCount;
        }
    }
})

//在页面关闭或者刷新的时候存储加入购物车的数量和商品ID
window.onbeforeunload = function() {
    window.localStorage.setItem('cartData', JSON.stringify(store.state.shopCartData))
}

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
//将axios放入到vue的原型中去,在各个组件都可以使用了
Vue.prototype.$axios = axios;
// //引入moment
import moment from "moment";

//引入放大镜的插件
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)

//引入省市联动的插件
import VueAreaLinkage from 'vue-area-linkage';
import 'vue-area-linkage/dist/index.css';
Vue.use(VueAreaLinkage)

// 抽取路由基地址
axios.defaults.baseURL = "http://111.230.232.110:8899/";
//axios请求默认是不带cookie的,所以要设置携带
axios.defaults.withCredentials=true;





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
    }, {
        path: '/login',
        component: login
    },
    {
        path: '/buyCar',
       
        component: buyCar

    },
    {
        path: '/payOrder',
        component: payOrder
    },
    {
      path:'/confirmOrder',
      component:confirmOrder
    }
];




//实例化路由对象
const router = new VueRouter({
    routes
})
//导航守卫
router.beforeEach((to,from,next)=>{
    if(to.path=='/payOrder'){
          axios.get('site/account/islogin').then(res=>{
            
             if(res.data.code=='nologin'){
                Vue.prototype.$message.warning('请先登录再带回家!')
                router.push('/login')
             }else{
                next();
             }
        });
    }else{
        next();
    }
})


Vue.config.productionTip = false;

Vue.filter('beautifulTime',
    function(value) {
        return moment(value).format("YYYY年MM月DD日");
    }
)

// 实例化VUE和挂载路由到VUE上面
new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store
})