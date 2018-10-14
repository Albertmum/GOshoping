<template>
<div>
  <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-show="cartData.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            
                                <!-- 如果有数据的时候显示的数据 -->
                                 <tr v-show="cartData.length!=0" v-for="(item,index) in cartData" :key="item.id">
                                    <td width="48" align="center">
                                        <el-switch v-model="item.isSelected"  active-color="#409eff" inactive-color="#555555">
                                        </el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <div class="shopInfo"><img :src="item.img_url" alt="" style="width: 50px; height: 50px; margin-right: 10px;">
                                            <span>{{item.title}}</span>
                                        </div>
                                    </td>
                                    <td width="220" align="left">{{item.sell_price}}</td>
                                    <td width="104" align="center">

                                        <el-input-number @change='changeCount(item.id,$event)' v-model="item.buycount"  :min="1" :max="99" label="描述文字"></el-input-number>

                                    </td>
                                    <td width="104" align="left">{{item.buycount*item.sell_price}}</td>
                                    <td width="54" align="center">
                                       <el-button type="text" @click="delOne(item.id)">删除</el-button>
                                    </td>
                                </tr>
                                <tr>
                                
                                <!-- 购物车底部价格综合 -->
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{selsetNum}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{selsetPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                            <button class="submit" >
                            <router-link to='/payOrder'>
                            立即结算
                            </router-link>
                        </button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>


</div>
</template>
<script type='text/ecmascript-6'>

export default {
    name : 'buyCar',
    data(){
        return{
            //购物车详情
            cartData:[],
            // 登陆状态
            code:true
           
        }
    },
    methods:{
        changeCount(id,newCount){
            // console.log(id,newCount)
            this.$store.commit('updateBuyCount',{
                id,newCount
            })
        },
        delOne(id) {
        this.$confirm('您确定不需要这个宝贝吗?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            //删除VUEX中的某个值
            this.$store.commit('delGood',id)
            //删除页面上的商品
            this.cartData.forEach((v,i)=>{
            if(v.id==id){
                this.cartData.splice(i,1)
            }
          })

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }

    },
    beforeCreate(){
         this.$axios.get('site/account/islogin').then(res=>{
             // console.log(res)
             if(res.data.code=='nologin'){
                this.$message({
                     message:'您还没有登陆,请先登陆再查看购物车哦!',
                     type:'warning'
                 });
                this.code=false;
             }
        });

        

    },
    created(){
        let ids ='';
         for( const key in this.$store.state.shopCartData){
          
            ids+=key;
            ids+=','
         }
          ids=ids.slice(0,-1)
        
        this.$axios.get('site/comment/getshopcargoods/'+ids).then(res=>{
           console.log(res);
           res.data.message.forEach(v=>{
            for (let value in this.$store.state.shopCartData) {
                v.buycount=this.$store.state.shopCartData[v.id]
                v.isSelected=true
            }

           })
           this.cartData=res.data.message;
           // console.log(this.cartData)
           
        })
    },
    watch:{

    },
    computed:{
        selsetNum(){
            let num= 0;
            this.cartData.forEach(v=>{
                if(v.isSelected==true){
                    num+=v.buycount
                }
            })
            return num;
        },
        selsetPrice(){
            let price =0;
            this.cartData.forEach(v=>{
                if(v.isSelected==true){
                    price+=(v.buycount*v.sell_price)
                }
               
            })
             return price;
        }
    }
}



</script>
<style >
</style>