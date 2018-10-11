<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="(item,index) in catelist" :key='item.id'>
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="(item2,index) in item.subcates" :key='item2.id'>
                                                {{item2.title}}&nbsp;
                                            </span>
                                          
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="(item2,index) in item.subcates" :key='item2.id' href="/goods/43.html">{{item2.title}}</a>
                                               
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                              
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片- 轮播图-->

                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                                <el-carousel height="341px">
                                     <el-carousel-item v-for="item in sliderlist" :key="item.id">
                                     <a href="#">
                                         <img style='height:100%;' :src="item.img_url" alt="">
                                     </a>
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                        </div>
                    </div>


                    <!-- 幻灯片- 右侧热卖-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item,index) in sliderlist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time | beautifulTime}}</span>
                                </div>
                            </li>
                           
                        </ul>
                    </div>
                </div>
            </div>
        </div>


        <div v-for="(item,index) in goodList" :key='item.id' class="section">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a v-for="(item2,index) in item.level2catelist" :key='item2.subcateid' href="/goods/43.html">{{item2.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="(item3,index) in item.datas" :key="item3.artID">
                            <router-link to='/details'>
                           
                            <!-- <a href="#/site/goodsinfo/87" class=""> -->
                                <div class="img-box">
                                    <img :src="item3.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{item3.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{item3.market_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{item3.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{item.sell_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            <!-- </a> -->
                            </router-link>
                        </li>
                       
                    </ul>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
//引入axios
import axios from "axios";
//引入时间处理插件
import moment from "moment";




export default {
  name: "index",
  data: function() {
    return {
      catelist: [],
      sliderlist: [],
      toplist: [],
      goodList:[]
     
      
    };
  },
  created() {
    axios.get("http://111.230.232.110:8899/site/goods/gettopdata/goods").then(res => {
        this.catelist = res.data.message.catelist;
        this.sliderlist = res.data.message.sliderlist;
        this.toplist = res.data.message.toplist;
   
      });
      axios.get("http://111.230.232.110:8899/site/goods/getgoodsgroup").then(res=>{
       
          this.goodList=res.data.message;
          
          
      })
  },
  filters: {
    beautifulTime: function(value) {
      return moment(value).format("YYYY年MM月DD日");
    }
  }
};
</script>


<style>
</style>

