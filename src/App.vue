<template>
    <div id="app">
        <div class="header">
            <!-- 1.0 导航栏头部 -->
            <div class="head-top">
                <div class="section">
                    <div class="left-box">
                        <span>黑马买买买</span>
                        <a target="_blank" href="#"></a>
                        <a target="_blank" href="#"></a>
                    </div>
                    <div id="menu" class="right-box">
                        <span v-show='$store.state.loginState==false'>
                        <router-link to="/login"  >登录
                        <!-- <a href="" class="">登录</a> -->
                        </router-link>
                        <strong>|</strong>
                        <a href="" class="">注册</a>
                        <strong>|</strong>
                    </span>
                        <span v-show='$store.state.loginState!=false' >
                            <router-link to="/userInfo">会员中心</router-link>
                        <!-- <a href="" class=""></a> -->
                        <strong>|</strong>
                        <a @click='loginOut' >退出</a>
                        <strong>|</strong>
                    </span>
                        <router-link to="/buyCar">
                            <i class="iconfont icon-cart" ref='cart'></i>购物车(
                            <span id="shoppingCartCount">
                            <span>{{$store.getters.cartGoodCount}}</span>
                            </span>)
                        </router-link>
                    </div>
                </div>
            </div>
            <Affix>
                <div class="demo-affix">
                    <!-- 2.0 导航条 -->
                    <div class="head-nav">
                        <div class="section">
                            <div id="menu2" class="nav-box menuhd">
                                <ul>
                                    <li class="index">
                                        <!-- <a href="#" class=""> -->
                                        <router-link to="/index">
                                            <span class="out" style="top: 0px;">首页</span>
                                        </router-link>
                                        <!-- </a> -->
                                    </li>
                                    <li class="news">
                                        <a href="#" class="">
                                <span class="out" style="top: 0px;">每日精选</span>
                            </a>
                                    </li>
                                    <li class="photo">
                                        <a href="#" class="">
                                <span class="out" style="top: 0px;">秒杀专区</span>
                            </a>
                                    </li>
                                    <li class="video">
                                        <a href="#" class="">
                                <span class="out" style="top: 0px;">黑马超市</span>
                            </a>
                                    </li>
                                    <li class="down">
                                        <a href="#" class="">
                                <span class="out" style="top: 0px;">会员权益</span>
                            </a>
                                    </li>
                                    <li class="goods">
                                        <a href="" class="router-link-exact-active ">
                                <span class="out" style="top: 0px;">购物商城</span>
                            </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="search-box">
                                <div class="input-box">
                                    <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){};" placeholder="输入关健字" x-webkit-speech="">
                                </div>
                                <a href="javascript:;">
                        <i class="iconfont icon-search"></i>
                    </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Affix>
        </div>
        <router-view></router-view>
        <div class="footer">
            <div class="section">
                <div class="foot-nav">
                    <a href="">关于我们</a>
                    <strong>|</strong>
                    <a href="">联系我们</a>
                    <strong>|</strong>
                    <a href="">联系客服</a>
                    <strong>|</strong>
                    <a href="">合作招商</a>
                    <strong>|</strong>
                    <a href="">商家帮助</a>
                    <strong>|</strong>
                    <a href="">营销中心</a>
                    <strong>|</strong>
                    <a href="">隐私政策</a>
                </div>
                <div class="foot-box">
                    <div class="copyright">
                        <p>版权所有 黑马买买买 </p>
                        <p>公司地址： 联系电话：</p>
                        <p class="gray">Copyright © 2009-2018 itcast Corporation,All Rights Reserved.</p>
                    </div>
                    <div class="service">
                        <p>周一至周日 9:00-24:00</p>
                        <a href="#">
                                <i class="iconfont icon-phone"></i>在线客服</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- //点击返回顶部 -->
        <BackTop :height="100" :bottom="50" :right='100'>
            <div class="top">返回顶端</div>
        </BackTop>
    </div>
</template>
<script>
import $ from "jquery";
export default {
    name: "app",
    mounted() {
        $("#menu2 li a").wrapInner('<span class="out"></span>');
        $("#menu2 li a").each(function() {
            $('<span class="over">' + $(this).text() + "</span>").appendTo(this);
        });

        $("#menu2 li a").hover(
            function() {
                $(".out", this)
                    .stop()
                    .animate({ top: "48px" }, 300); // move down - hide
                $(".over", this)
                    .stop()
                    .animate({ top: "0px" }, 300); // move down - show
            },
            function() {
                $(".out", this)
                    .stop()
                    .animate({ top: "0px" }, 300); // move up - show
                $(".over", this)
                    .stop()
                    .animate({ top: "-48px" }, 300); // move up - hide
            }
        );
    },
    data() {
        return {

        }
    },
    methods: {
        loginOut() {
                //点击退出弹出的提示细心
            this.$confirm('确定已经购物完毕,不再逛一下了吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                    //如果确定,则取调用退出接口,提示登出成功
                this.$axios.get('site/account/logout').then(res => {
                    console.log(res);
                    this.$store.commit('loginOut',false);
                    if (res.data.status == 0) {
                        this.$message({
                            type: 'success',
                            message: '退出成功!'
                        });

                    };
                    this.$router.push('/index')
                })


            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消退出!'
                });
            });


        }
    }
};
</script>
<style>
.menuhd ul li a span.over {
    background-color: hotpink;
}

.top {
    padding: 10px;
    background: rgba(0, 153, 229, .7);
    color: #fff;
    text-align: center;
    border-radius: 2px;
}
</style>