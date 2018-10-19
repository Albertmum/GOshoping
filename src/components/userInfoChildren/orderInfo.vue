<template>
    <div class="bg-wrap" style="min-height: 765px;">
                                        <div class="sub-tit">
                                            <a href="javascript:void(0)" class="add">
                                                <i class="iconfont icon-reply"></i>返回</a>
                                            <ul>
                                                <li class="selected">
                                                    <a href="javascript:;">查看订单</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="order-progress">
                                            <ul>
                                                <li class="first active">
                                                    <div class="progress">下单</div>
                                                    <div class="info">{{orderInfo.complete_time}}</div>
                                                </li>
                                                <li :class="orderInfo.status>1?'active':''">
                                                    <div class="progress">已付款</div>
                                                    <div class="info">{{orderInfo.complete_time}}</div>
                                                </li>
                                                <li :class="orderInfo.status>2?'active':''">
                                                    <div class="progress">已经发货</div>
                                                    <div class="info">{{orderInfo.complete_time}}</div>
                                                </li>
                                                <li :class="orderInfo.status>3?'active last':'last'">
                                                    <div class="progress">已完成</div>
                                                    <div class="info">{{orderInfo.complete_time}}</div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="form-box accept-box form-box1">
                                            <dl class="head form-group">
                                                <dd>
                                                    订单号：{{orderInfo.order_no}}

                                                    <a href="#/site/goods/payment/12" class="btn-pay">{{orderInfo.statusName}}</a>
                                                    <!---->
                                                </dd>
                                            </dl>
                                            <dl class="form-group">
                                                <dt>订单状态：</dt>
                                                <dd>
                                                   {{orderInfo.statusName}}
                                                </dd>
                                            </dl>
                                            <dl class="form-group">
                                                <dt>快递单号：</dt>
                                                <dd>

                                                </dd>
                                            </dl>
                                            <dl class="form-group">
                                                <dt>支付方式：</dt>
                                                <dd>支付宝</dd>
                                            </dl>
                                        </div>
                                        <div class="table-wrap">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="5" class="ftable">
                                                <tbody>
                                                    <tr>
                                                        <th align="left">商品信息</th>
                                                        <th width="60%">名称</th>
                                                        <th width="10%">单价
                                                        </th>
                                                        <th width="10%">数量</th>
                                                        <th width="10%">金额</th>
                                                    </tr>
                                                    <tr v-for="item in goodlist" :key='item.id'>
                                                        <td width="60">
                                                            <img :src="item.imgurl" class="img">
                                                        </td>
                                                        <td align="left">
                                                            <a target="_blank" href="/goods/show-92.html">{{item.goods_title}}</a>
                                                        </td>
                                                        <td align="center">
                                                            <s>￥{{item.real_price}}</s>
                                                            <p>￥{{item.real_price}}</p>
                                                        </td>
                                                        <td align="center">{{item.quantity}}</td>
                                                        <td align="center">￥{{item.quantity*item.real_price}}</td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="7" align="right">
                                                            <p>商品金额：
                                                                <b class="red">￥{{totalPrice}}</b>&nbsp;&nbsp;+&nbsp;&nbsp;运费：
                                                                <b class="red">￥{{express_fee}}</b>
                                                            </p>
                                                            <p style="font-size: 22px;">应付总金额：
                                                                <b class="red">￥{{totalPrice+express_fee}}</b>
                                                            </p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="form-box accept-box">
                                            <dl class="head form-group">
                                                <dd>收货信息</dd>
                                            </dl>
                                            <dl class="form-group">
                                                <dt>顾客姓名：</dt>
                                                <dd>{{orderInfo.accept_name}}</dd>
                                            </dl>
                                            <dl class="form-group">
                                                <dt>送货地址：</dt>
                                                <dd>{{orderInfo.area}} {{orderInfo.address}}</dd>
                                            </dl>
                                            <dl class="form-group">
                                                <dt>联系电话：</dt>
                                                <dd>{{orderInfo.mobile}}</dd>
                                            </dl>
                                            <dl class="form-group">
                                                <dt>电子邮箱：</dt>
                                                <dd> {{orderInfo.email}}</dd>
                                            </dl>
                                            <dl class="form-group">
                                                <dt>备注留言：</dt>
                                                <dd>{{orderInfo.message}}</dd>
                                            </dl>
                                        </div>
                                    </div>
</template>
<script>
export default {
  name: "orderInfo",
  data(){
        return {
            goodlist:[],
            orderid:'',
            orderInfo:{},
            express_fee:''
        }
    },
    created(){
       this.orderid=this.$route.params.orderid
        this.$axios.get('site/validate/order/getorderdetial/'+this.orderid).then(res=>{
        console.log(res)
        this.goodlist=res.data.message.goodslist;
        this.orderInfo=res.data.message.orderinfo;
        this.express_fee=res.data.message.orderinfo.express_fee
    })
    },
    computed:{
        
        totalPrice(){
            let money = 0;
            this.goodlist.forEach(v=>{
                money+=v.quantity*v.real_price
            })
            return money;
        },
        total(){}
    }
};
</script>
<style>
</style>
