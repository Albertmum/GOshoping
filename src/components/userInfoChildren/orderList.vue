<template>
    <div class="bg-wrap" style="min-height: 765px;">
                                        <div class="sub-tit">
                                            <ul>
                                                <li class="selected">
                                                    <a href="/user/order-list.html">交易订单</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="table-wrap">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="ftable">
                                                <tbody>
                                                    <tr>
                                                        <th width="16%" align="left">订单号</th>
                                                        <th width="10%">姓名</th>
                                                        <th width="12%">订单金额</th>
                                                        <th width="11%">下单时间</th>
                                                        <th width="10%">状态</th>
                                                        <th width="12%">操作</th>
                                                    </tr>
                                                    <tr v-for="item in orderList" :key='item.id'>
                                                        <td>{{item.order_no}}</td>
                                                        <td align="left">ivanyb1212</td>
                                                        <td align="left">
                                                            <strong style="color: red;">￥{{item.order_amount}}</strong>
                                                            <br> 在线支付
                                                        </td>
                                                        <td align="left">{{item.add_time}}</td>
                                                        <td align="left">
                                                           {{item.statusName}}
                                                        </td>
                                                        <td align="left">
                                                            <router-link :to="'orderInfo/'+item.id">查看订单</router-link>
                                                            <!-- <a href="#/site/member/orderinfo/12" class=""></a> -->
                                                            <br>
                                                            <a href="#/site/goods/payment/12" class="">|去付款</a>
                                                            <!-- <br>
                                                            <a href="javascript:void(0)">|取消</a>
                                                            <br> -->
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class="page-foot">
                                                 <el-pagination background
     
      
                                                    :page-sizes="[5, 10]"
                                                    :page-size="pageSize"
                                                    layout="total, sizes, prev, pager, next, jumper"
                                                    :total="totalcount" @current-change='changeIndex' @size-change='changpageSize'>
                                                    </el-pagination>
                                               
                                            </div>
                                        </div>
                                    </div>
</template>
<script>
export default {
  name: "orderList",
  data() {
    return {
      orderList: [],
      pageSize: 10,
      pageIndex: 1,
      totalcount: 0,
      
    };
  },

  methods: {
    changeIndex(pageindex) {
      this.pageIndex = pageindex;
      this.getList();
    },
    changpageSize(pageSize) {
      this.pageSize = pageSize;
      this.getList();
    },
    getList() {
      this.$axios
        .get(
          "site/validate/order/userorderlist?pageIndex=" +
            this.pageIndex +
            "&pageSize=" +
            this.pageSize
        )
        .then(res => {
            console.log(res)
          this.orderList = res.data.message;
          this.totalcount = res.data.totalcount;
        });
    }
  },
  created() {
    this.getList();
    
  }
};
</script>
<style>
</style>
