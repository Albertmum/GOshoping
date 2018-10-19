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
                                        <span>1</span> 放进购物车
                                    </div>
                                </li>
                                <li class="active">
                                    <div class="progress">
                                        <span>2</span> 填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span> 支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <div id="orderForm" name="orderForm" url="">
                            <div class="form-box address-info">
                                <el-form status-icon :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                    <el-form-item label="姓名" prop="accept_name">
                                        <el-input v-model="ruleForm.accept_name" style='width:500px;'></el-input>
                                    </el-form-item>
                                    <el-form-item label="省市区" prop="address">
                                        <v-distpicker @selected='changeArea' :province='ruleForm.area.province.value' :city='ruleForm.area.city.value' :area='ruleForm.area.area.value'></v-distpicker>
                                    </el-form-item>
                                    <el-form-item label="详细地址" prop="address">
                                        <el-input v-model="ruleForm.address" style='width:500px;'></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机号码" prop="mobile">
                                        <el-input v-model="ruleForm.mobile" style='width:500px;'></el-input>
                                    </el-form-item>
                                    <el-form-item label="电子邮箱" prop="email">
                                        <el-input v-model="ruleForm.email" style='width:500px;'></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮政编码" prop="post_code">
                                        <el-input v-model="ruleForm.post_code" style='width:500px;'></el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <h2 class="slide-tit">
                                <span>2、支付方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <label>
                                        
                                        <el-radio v-model="ruleForm.payment_id" label="6">在线支付</el-radio>
                                        <em>手续费：0.00元</em>
                                    </label>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>3、配送方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <label>
                                        <el-radio @change='expressPrice(20)' v-model="ruleForm.express_id" label="1">顺丰快递</el-radio>
                                        &nbsp;
                                        <em>费用：20.00元</em>
                                        
                                    </label>
                                     <label>
                                        &nbsp;&nbsp;&nbsp;
                                        <el-radio @change='expressPrice(-2)' v-model="ruleForm.express_id" label="2">圆通快递</el-radio>
                                        &nbsp;
                                        <em>费用：-2.00元</em>
                                        
                                    </label>
                                     <label>
                                        &nbsp;&nbsp;&nbsp;
                                        <el-radio @change='expressPrice(0)' v-model="ruleForm.express_id" label="3">韵达快递</el-radio>
                                        &nbsp;
                                        <em>费用：0.00元</em>
                                        
                                    </label>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>4、商品清单</span>
                            </h2>
                            <div class="line15"></div>
                            <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                <tbody>
                                    <tr>
                                        <th colspan="2" align="left">商品信息</th>
                                        <th width="84" align="left">单价</th>
                                        <th width="84" align="center">购买数量</th>
                                        <th width="104" align="left">金额(元)</th>
                                    </tr>
                                    <tr v-for="item in goodsList" :key='item.id'>
                                        <td width="68">
                                           <router-link target="_blank" to="'/goodsinfo'+item.id"  >
                                                <img :src="item.img_url" class="img">
                                          </router-link>
                                        </td>
                                        <td>
                                            <router-link target="_blank" to="'/goodsinfo'+item.id"  >
                                           {{item.title}}
                                            </router-link>
                                        </td>
                                        <td>
                                            <span class="red">
                                                    ￥{{item.totalamount}}.00
                                                </span>
                                        </td>
                                        <td align="center">{{item.buycount}}</td>
                                        <td>
                                            <span class="red">
                                                    ￥{{item.buycount*item.totalamount}}.00
                                                </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="line15"></div>
                            <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                            <div class="buy-foot clearfix">
                                <div class="left-box">
                                    <dl>
                                        <dt>订单备注(100字符以内)</dt>
                                        <dd>
                                            
                                            <textarea v-model='ruleForm.message' name="message" class="input" style="height:35px;"></textarea>
                                            
                                        </dd>
                                    </dl>
                                </div>
                                <div class="right-box">
                                    <p>
                                        商品
                                        <label class="price">{{totalNum}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                        <label id="goodsAmount" class="price">{{totalMoney}}.00</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p>
                                        运费：￥
                                        <label id="expressFee" class="price">{{ruleForm.expressMonent}}.00</label> 元
                                    </p>
                                    <p class="txt-box">
                                        应付总金额：￥
                                        <label id="totalAmount" class="price">{{ruleForm.goodsAmount + ruleForm.expressMoment}}.00</label>
                                    </p>
                                    <p class="btn-box">
                                        <router-link to="/buyCar" class='btn button'>返回购物车</router-link>
                                       <a href="javascript:;" lass='btn submit' @click='submitOrder'>确认提交 </a>
                                        
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
//引入省市联动插件
import VDistpicker from "v-distpicker";
export default {
  components: { VDistpicker },
  name: "payOrder",
  data() {
    //   自定义的手机号验证
    // rule 是规则的名字
    // value 数据的值
    // callback 类似于 next()
    var validateMobile = (rule, value, callback) => {
      // 正则判断
      let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      // 非空判断
      setTimeout(() => {
        if (value === "") {
          callback(new Error("请输入手机号"));
        } else if (reg.test(value) == false) {
          callback(new Error("请输入正确的手机号"));
        } else {
          // 没有问题
          callback();
        }
      }, 1000);
    };
    // 邮箱
    var validateEmail = (rule, value, callback) => {
      // 正则判断
      let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      // 非空判断
      setTimeout(() => {
        if (reg.test(value) == false) {
          callback(new Error("请输入正确的邮箱地址"));
        } else {
          // 没有问题
          callback();
        }
      }, 1000);
    };
    // 邮编
    var validatePostCode = (rule, value, callback) => {
      // 正则判断
      let reg = /^[1-9]\d{5}(?!\d)$/;
      // 非空判断
      setTimeout(() => {
        if (reg.test(value) == false) {
          callback(new Error("请输入邮政编码"));
        } else {
          // 没有问题
          callback();
        }
      }, 1000);
    };

    return {
      ruleForm: {
        accept_name: "麦子",
        address: "深圳宝安留仙17楼",
        email: "jjdou2010@sina.com",
        mobile: "13003290829",
        post_code: "100000",
        area: {
          province: { code: "310000", value: "上海市" },
          city: { code: "310100", value: "上海城区" },
          area: { code: "310107", value: "普陀区" }
        },
        payment_id: "6",
        express_id: "1",
        //运费
        expressMoment: "20",
        //价格
        goodsAmount: "",
        //留言信息
        message: "到我别墅门口打电话!",
        //商品的ID
        goodsids: "",
        //商品对象
        cargoodsobj: {}
      },
      rules: {
        accept_name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "change"
          }
        ],
        address: [
          // 规则1: required 必填,message 提示信息,trigger 触发时机 blur 失去焦点
          { required: true, message: "请输入详细地址", trigger: "blur" },
          // 规则2: min 最小长度  trigger 触发时机 change 数据改变
          {
            min: 3,
            message: "最少3个字符",
            trigger: "change"
          }
        ],
        mobile: [
          {
            validator: validateMobile,
            tigger: "change"
          }
        ],
        email: [
          {
            validator: validateEmail,
            tigger: "change"
          }
        ],
        post_code: [
          {
            validator: validatePostCode,
            tigger: "change"
          }
        ]
      },
      goodsList: []
    };
  },
  methods: {
    changeArea(data) {
      this.ruleForm.area = data;
    },
    expressPrice(price) {
      this.ruleForm.expressMoment = price;
    },
    submitOrder() {
      this.$axios
        .post("site/validate/order/setorder", this.ruleForm)
        .then(res => {
          console.log(res);
          if (res.data.status == 0) {
            this.$message.success("The order is OK!");
            for (const key in this.ruleForm.cargoodsobj) {
              this.$store.commit("delGood", key);
            }
            this.$router.push("/confirmOrder/" + res.data.message.orderid);
          }else{
              this.$message.error('The order is fail!')
          }
        });
    }
  },
  created() {
    let ids = this.$route.params.ids;
    this.ruleForm.goodsids = ids;
    this.$axios.get("site/validate/order/getgoodslist/" + ids).then(res => {
      res.data.message.forEach(v => {
        v.buycount = this.$store.state.shopCartData[v.id];
        this.ruleForm.cargoodsobj[v.id] = v.buycount;
      });
      this.goodsList = res.data.message;
    });
  },
  computed: {
    totalNum() {
      let num = 0;
      this.goodsList.forEach(v => {
        num += v.buycount;
      });
      return num;
    },
    totalMoney() {
      let money = 0;
      this.goodsList.forEach(v => {
        money += v.buycount * v.sell_price;
      });
      this.ruleForm.goodsAmount = money;
      return money;
    }
  }
};
</script>
<style>
</style>