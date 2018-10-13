<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <ProductZoomer v-if=" images.normal_size.length!=0 " :base-images="images" :base-zoomer-options="zoomerOptions" />
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="buyNum" @change="handleChange" :min="1" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="addcart" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a @click="selectedindex=1" href="javascript:;" :class="{selected:selectedindex==1}">商品介绍</a>
                                    </li>
                                    <li>
                                        <a @click="selectedindex=0" href="javascript:;" :class="{selected:selectedindex==0}">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            <div v-show="selectedindex==1" class="tab-content entry" style="display: block;" v-html="goodsinfo.content">
                            </div>
                            <div v-show="selectedindex==0" class="tab-content" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea @keyup.enter="addcomment" v-model.trim="inputvalue" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input @click="addcomment" id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="message.length==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-show="message.length!=0" v-for="item2 in message" :key="item2.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item2.user_name}}</span>
                                                    <span>{{item2.reply_time|beautifulTime}}</span>
                                                </div>
                                                <p>{{item2.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div v-show="message.length=!0" class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <Page placement='top' @on-change='pageChange' show-elevator show-sizer :total="totalcount" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/goodsinfo/'+item.id">
                                                <img :src="item.img_url">
                                                </router-link>
                                                <!-- </a> -->
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/goodsinfo/'+item.id">{{item.title}}
                                            </router-link>
                                            <span>{{item.add_time|beautifulTime}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// 导入放大镜chajian
// import mangnifier from 'mangnifier';

export default {
    name: 'goodsinfo',
    data: function() {
        return {
            //商品id
            goodsid: '',
            //商品信息
            goodsinfo: [],
            //热卖信息数组
            hotgoodslist: [],
            //内容详情页
            imglist: [],
            //评论详情
            message: [],

            //默认的购买数量
            buyNum: 1,
            //选中的
            selectedindex: 1,
            //textarea里面的输入内容
            inputvalue: '',
            //总的评论条数
            totalcount: 0,
            //一页的容量
            pageSize: 10,
            //页码
            pageIndex: 1,
            images: {

                normal_size: [{
                    id:1,
                    url:'www.baidu.com'
                }]
            },
            zoomerOptions: {
                zoomFactor: 4,
                pane: 'container-round',
                hoverDelay: 300,
                namespace: 'inline-zoomer',
                move_by_click: true,
                scroll_items: 5,
                choosed_thumb_border_color: "hotpink"
            }

        }
    },
    methods: {
        //购买数量改变的事件
        handleChange(value) {
            console.log(value);
        },
        getgoodinfo() { //获取商品信息的事件函数
            this.images.normal_size = [];
            this.$axios.get("/site/goods/getgoodsinfo/" + this.goodsid).then(res => {
                this.goodsinfo = res.data.message.goodsinfo;
                this.hotgoodslist = res.data.message.hotgoodslist;
                this.imglist = res.data.message.imglist;
                this.imglist.forEach(v => {

                   this.images.normal_size.push({
                        id:v.id,
                        url: v.thumb_path

                    })

                });
                

            })
        },
        getmessage() { //获取评论的事件函数
            this.$axios.get("/site/comment/getbypage/goods/" + this.goodsid + '?pageIndex=' + this.pageIndex + '&pageSize=' + this.pageSize).then(res => {
                this.totalcount = res.data.totalcount;
                this.pageIndex = res.data.pageIndex;
                this.pageSize = res.data.pageSize;

                this.message = res.data.message;


            })
        },
        addcomment() { //添加评论的事件
            this.goodsid = this.$route.params.goodsid;
            if (this.inputvalue == "") {
                this.$message({
                    message: '请输入评论内容!',
                    type: 'warning'
                })
                return;
            }
            this.$axios.post("site/validate/comment/post/goods/" + this.goodsid, { "commenttxt": this.inputvalue }).then(res => {

                this.inputvalue = '';
                this.getmessage();
                this.$message({
                    message: '评论成功!',
                    type: 'success'
                })

            })
        },
        pageChange(pageNum) { //页码的点击函数

            // 修改页码
            this.pageIndex = pageNum;
            // 重新发请求
            this.getmessage();
        },
        addcart() {
            console.log(111111)
            this.$store.commit("addCart", {
                id: this.goodsid,
                buyCount: this.buyNum
            });
        }

    },
    created() { //生命周期函数,在页面渲染完毕之后
        this.goodsid = this.$route.params.goodsid;

        this.getgoodinfo();
        this.getmessage();

    },
    watch: { //路由改变事件函数
        '$route'(to, from) {
            this.goodsid = to.params.goodsid;
            this.getgoodinfo();
            this.getmessage()
            // console.log(to);
            this.buyNum = 1;
        }
    }

}
</script>
<style>
.pic-box {
    width: 360px;
}

.inline-zoomer-hahaha-zoomer-box {
    height: 300px;
}

.preview-box img {
    height: 250px;
}

.control-box {
    height: 50px;
}

.control {
    margin: 0 auto;
}

.control-box>div {
    float: left;
    height: 50px;
}

.control-box .thumb-list img {
    width: 50px;
    height: 50px;
    float: left;
}
</style>