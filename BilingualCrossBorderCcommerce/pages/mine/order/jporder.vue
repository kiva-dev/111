<template>
  <view class="order-page">
    <!--order-head start-->
    <view class="order-head" v-if="shopCont.status==0">
      <!-- {{$filter.to_date_time(shopCont.remain_pay_time)}} -->
      <text>需付款：RM{{shopCont.pay_price}} 剩余：20小时40分钟</text>
    </view>
    <!--order-head end-->
    <!--order-sec1 start-->
    <view class="order-sec1">
      <view class="sec1-icon">
        <image class="img" src="../../../static/images/submit1.png"></image>
      </view>
      <view class="sec1-txt">
        <view class="sec1-h">{{shopCont.a_detail}}</view>
        <view class="sec1-c">
          <text class="name">{{shopCont.a_name}}</text>
          <text class="phone">{{shopCont.a_mobile}}</text>
        </view>
      </view>
    </view>
    <!--order-sec1 end-->
    <!--order-sec2 start-->
    <view class="order-sec2">
      <!--order-li start-->
      <view class="order-li">
        <view class="li-hd">
          <view class="hd-fl">
            <view class="icon">
              <image class="img" src="../../../static/images/index/dianpu.png"></image>
            </view>
            <view class="name">{{shopCont.shop_name}}</view>
          </view>
        </view>
        <!--order-mid start-->
        <view class="order-mid" v-for="item,k in shopCont.goods" :key="k">
          <view class="mid-img">
            <image class="img" :src="item.image"></image>
          </view>
          <view class="mid-txt">
            <view class="h-flex">
              <view class="t">{{item.goods_name}}</view>
            </view>
            <view class="b-flex">
              <view class="s">{{item.goods_attrs}}</view>
              <view class="num">*{{item.total_num}}</view>
            </view>
            <view class="price color-red f-22">
              RM<text class="f-34">{{$filter.formatValue(item.goods_price, 'split')[0]}}</text>.{{$filter.formatValue(item.goods_price, 'split')[1] ? $filter.formatValue(item.goods_price, 'split')[1] : '00'}}
            </view>
          </view>
        </view>
        <!--order-mid end-->
        <!--order-bd start-->
        <view class="order-bd">
          <view class="label">留言</view>
          <view class="gray">{{shopCont.remark?shopCont.remark:'无'}}</view>
        </view>
        <!--order-bd end-->
      </view>
      <!--order-li end-->
    </view>
    <!--order-sec2 end-->
    <!--order-sec3 start-->
    <view class="order-sec3">
      <view class="sec3-li">
        <view class="label">商品金额</view>
        <view class="price f-22">
          RM<text class="f-26">{{$filter.formatValue(shopCont.total_price, 'split')[0]}}</text>.{{$filter.formatValue(shopCont.total_price, 'split')[1] ? $filter.formatValue(shopCont.total_price, 'split')[1] : '00'}}
        </view>
      </view>
      <!-- <view class="sec3-li">
        <view class="label">运费</view>
        <view class="price f-22">免运费
          RM<text class="f-26">{{$filter.formatValue(shopCont.goods_price, 'split')[0]}}</text>.{{$filter.formatValue(shopCont.goods_price, 'split')[1] ? $filter.formatValue(shopCont.goods_price, 'split')[1] : '00'}}
        </view>
      </view> -->
      <view class="sec3-li">
        <view class="label">优惠券</view>
        <view class="price f-22 color-red">
          -RM<text class="f-26">{{$filter.formatValue(shopCont.coupon_price, 'split')[0]}}</text>.{{$filter.formatValue(shopCont.coupon_price, 'split')[1] ? $filter.formatValue(shopCont.coupon_price, 'split')[1] : '00'}}
        </view>
      </view>
      <view class="sec3-bot">
        <view class="price">
          <text class="color-999 f-26">共{{num}}件</text>
          <text class="f-228">小计：</text>
          <text class="color-red f-22">RM<text class="f-28">{{$filter.formatValue(shopCont.pay_price, 'split')[0]}}</text>.{{$filter.formatValue(shopCont.pay_price, 'split')[1] ? $filter.formatValue(shopCont.pay_price, 'split')[1] : '00'}}</text>
        </view>
      </view>
    </view>
    <!--order-sec3 end-->
    <!--order-sec4 start-->
    <view class="order-sec4">
      <view class="sec4-t">订单信息</view>
      <view class="sec4-li">
        <view class="label">订单编号：</view>
        <view class="c">{{shopCont.order_no}}</view>
      </view>
      <view class="sec4-li" v-if="shopCont.status==2||shopCont.status==3||shopCont.status==4">
        <view class="label">支付方式：</view>
        <view class="c" v-if="shopCont.pay_type==1">余额支付</view>
        <view class="c" v-if="shopCont.pay_type==2">三方支付</view>
      </view>
      <view class="sec4-li" v-if="shopCont.status==3||shopCont.status==4">
        <view class="flex">
          <view class="label">发货方式：</view>
          <view class="c">{{shopCont.express_company}} {{shopCont.express_no}}</view>
        </view>
        <view class="copy-btn color-red f-26 m-l-40">复制</view>
      </view>
      <view class="sec4-li">
        <view class="label">创建时间：</view>
        <view class="c">{{$filter.to_date_time(shopCont.addtime)}}</view>
      </view>
      <view class="sec4-li" v-if="shopCont.status==2||shopCont.status==3||shopCont.status==4">
        <view class="label">付款时间：</view>
        <view class="c">{{$filter.to_date_time(shopCont.pay_time)}}</view>
      </view>
      <view class="sec4-li" v-if="shopCont.status==3||shopCont.status==4">
        <view class="label">发货时间：</view>
        <view class="c">{{$filter.to_date_time(shopCont.freight_time)}}</view>
      </view>
      <view class="sec4-li" v-if="shopCont.status==4">
        <view class="label">收货时间：</view>
        <view class="c">{{$filter.to_date_time(shopCont.receipt_time)}}</view>
      </view>
      <view class="sec4-li" v-if="shopCont.status=='-2'||shopCont.status=='-1'||shopCont.status==6">
        <view class="label">关闭时间：</view>
        <view class="c">{{$filter.to_date_time(shopCont.receipt_time)}}</view>
      </view>
    </view>
    <!--order-sec4 end-->
    <!--order-fixed start-->
    <view class="order-fixed">
      <view class="fixed-con">
        <view class="fixed-fl color-red f-26" v-if="shopCont.status==3">12:25:63后自动收货</view>
        <view class="fixed-fr">
          <!-- <button class="order-gray" @click="toggle1('center')">取消订单</button>
          <button class="order-btn" @click="toggle2('bottom')">立即支付</button> -->
          <!--待付款-->
          <block v-if="shopCont.status==0">
            <button class="order-gray" @click.stop="onQueryClick">取消订单</button>
            <button class="order-btn" @click.stop="onorderPwdClick">去支付</button>
          </block>
          <!-- 交易关闭  ptddgb -->
          <block v-if="shopCont.status=='-2'||shopCont.status=='-1'||shopCont.status==6">
            <button class="order-btn gray" @click.stop="onDelClick">删除订单</button>
          </block>
          <!-- 已支付待成团 -->
          <block v-if="shopCont.status==1"></block>
          <!-- 等待卖家发货  ddfh -->
          <block v-if="shopCont.status==2">
            <button class="order-gray" @click.stop="onQueryClick">取消订单</button>
          </block>
          <!-- 单个已发货  ptqrsh -->
          <block v-if="shopCont.status==3">
            <button class="order-btn" @click.stop="onshopClick">确认收货</button>
          </block>
          <!-- 待评价 -->
          <block v-if="shopCont.status==4">
            <button class="order-btn" @click.stop="onPingClick">待评价</button>
          </block>
          <!-- 已完成 -->
          <block v-if="shopCont.status==5">
            <button class="order-btn gray" @click.stop="onDelClick">删除订单</button>
          </block>
        </view>
      </view>
    </view>
    <!--order-fixed end-->
    <!--支付方式弹出 start-->
    <uni-popup ref="popup2">
      <view class="mode-pop">
        <view class="mode-tit">
          <text>选择支付方式</text>
          <view class="cancel" @click="toggle2Close">取消</view>
        </view>
        <view class="mode-li">
          <view class="label">
            余额支付（可用余额<text class="color-red">RM200.00</text>）
          </view>
          <view class="li-fr">
            <radio checked="true" value="r1" />
          </view>
        </view>
        <view class="mode-li">
          <view class="label">
            银联支付（5555****542）
          </view>
          <view class="li-fr">
            <text class="color-red">更换银行卡</text>
            <radio value="r2" />
          </view>
        </view>
        <view class="mode-li">
          <view class="label">
            PayPal支付（555k***456）
          </view>
          <view class="li-fr">
            <radio value="r3" />
          </view>
        </view>
        <view class="mode-bot">
          <button class="public-btn" @click="toggle3('center')">确定</button>
        </view>
      </view>
    </uni-popup>
    <!--支付方式弹出 end-->
    <!--取消订单弹出 start-->
    <uni-popup ref="QueryPopup" type="center">
      <view class="public-pop">
        <view class="pop-con">
          <view class="pop-t">提示</view>
          <view class="pop-c">您确定要取消当前订单吗？</view>
          <view class="pop-b">
            <button class="pop-btn" @click.stop="onQuery">取消</button>
            <button class="pop-btn red" @click.stop="onOrderNotpayCancelOrder">确认</button>
          </view>
        </view>
      </view>
    </uni-popup>
    <!--取消订单弹出 start-->
    <!--删除订单弹出 start-->
    <uni-popup ref="DelPopup" type="center">
      <view class="public-pop">
        <view class="pop-con">
          <view class="pop-t">提示</view>
          <view class="pop-c">您确定要删除当前订单吗？</view>
          <view class="pop-b">
            <button class="pop-btn" @click.stop="onDel">取消</button>
            <button class="pop-btn red" @click.stop="onOrderDeleteOrder">确认</button>
          </view>
        </view>
      </view>
    </uni-popup>
    <!--删除订单弹出 start-->
    <!--确认收货弹出 start-->
    <uni-popup ref="shopPopup" type="center">
      <view class="public-pop">
        <view class="pop-con">
          <!-- <view class="pop-t">提示</view> -->
          <view class="pop-c">确定已收到商品？</view>
          <view class="pop-b">
            <button class="pop-btn" @click.stop="onshopQuery">取消</button>
            <button class="pop-btn red" @click.stop="onOrderReceiptOrder">确认</button>
          </view>
        </view>
      </view>
    </uni-popup>
    <!--确认收货弹出 start-->
    <!--支付密码弹出 start-->
    <uni-popup ref="pwdPopup" type="center">
      <view class="public-pop">
        <view class="pop-con">
          <view class="pop-t">
            <text>请输入支付密码</text>
            <view class="pay-close" @click="onPwdQuery">
              <image class="img" src="../../../static/images/close1.png"></image>
            </view>
          </view>
          <view class="pop-c">
            <view class="pay-input">
              <input class="input" type="password" placeholder-class="color-999" v-model="pay_pwd" placeholder="请输入支付密码" />
            </view>
          </view>
          <view class="pay-bot">
            <button class="pay-btn" @click="onPwdClick">确认</button>
          </view>
        </view>
      </view>
    </uni-popup>
    <!--支付密码弹出 end-->
  </view>
</template>
<script>
import jsencrypt from '@/common/jsencrypt-Rsa/jsencrypt/jsencrypt.vue';
//公钥.
const publiukey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCSjs8JJr/Nyb+nOG77agUDf7uT
c+kswdVEXbU8v5EL98brAw7fu4dQc1vkh1KSXqiC9EC7YmJzkkFoXUzTH2pvvDlq
UuCwtdmXOsq/b1JWKyEXzQlPIiwdHnAUjGbmHOEMAY3jKEy2dY2I6J+giJqo8B2H
NoR+zv3KaEmPSHtooQIDAQAB
-----END PUBLIC KEY-----`
export default {
  data () {
    return {
      order_no: '',
      shopCont: '',// 查看详情
      num: 0,// 总数量
      pay_pwd: '',// 支付密码
    }
  },
  onLoad (args) {
    this.order_no = args.order_no
    this.onOrderDetailOrder()
  },
  methods: {
    // 订单详情
    onOrderDetailOrder () {
      this.$http.post(this.$apiObj.OrderDetailOrder, { order_no: this.order_no }).then(res => {
        if (res.code == 1) {
          let num = 0
          for (let i in res.data.goods) {
            num = num + res.data.goods[i].total_num
          }
          this.num = num
          this.shopCont = res.data
        }
      })
    },
    // 点击支付
    onorderPwdClick () {
      this.$refs.pwdPopup.open()
    },
    // 关闭支付密码
    onPwdQuery () {
      this.$refs.pwdPopup.close()
    },
    // 点击支付密码
    onPwdClick () {
      if (!this.pay_pwd) return uni.showToast({ title: '请输入密码', icon: 'none' })
      const pay_pwd = jsencrypt.setEncrypt(publiukey, String(this.pay_pwd))
      this.$http.post(this.$apiObj.OrderBalancePay, {
        major_no: this.major_no,// 购物车支付的主订单号
        order_no: this.order_no,// 小订单号
        money: this.shopCont.pay_price,// 支付总金额
        pay_pwd: pay_pwd,// rsa加密后的支付密码
      }).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: '支付成功', icon: 'none' })
          this.onOrderDetailOrder()
          this.$refs.pwdPopup.close()
        }
      })
    },
    // 取消订单
    onQueryClick () {
      this.$refs.QueryPopup.open()
    },
    // 点击取消弹框
    onQuery () {
      this.$refs.QueryPopup.close()
    },
    // 取消订单接口
    onOrderNotpayCancelOrder () {
      if (this.shopCont.status == 0) {
        // 未支付取消订单
        this.$http.post(this.$apiObj.OrderNotpayCancelOrder, { order_no: this.shopCont.order_no }).then(res => {
          if (res.code == 1) {
            uni.showToast({ title: '取消订单成功', icon: 'none' })
            this.onOrderDetailOrder()
            this.$refs.QueryPopup.close()
          }
        })
      } else if (this.shopCont.status == 2) {
        // 待发货取消订单（涉及退款）
        this.$http.post(this.$apiObj.OrderPayCancelOrder, { order_no: this.shopCont.order_no }).then(res => {
          if (res.code == 1) {
            uni.showToast({ title: '取消订单成功', icon: 'none' })
            this.onOrderDetailOrder()
            this.$refs.QueryPopup.close()
          }
        })
      }
    },
    // 删除订单
    onDelClick () {
      this.$refs.DelPopup.open()
    },
    // 点击删除弹框
    onDel () {
      this.$refs.DelPopup.close()
    },
    // 删除订单接口
    onOrderDeleteOrder () {
      this.$http.post(this.$apiObj.OrderDeleteOrder, { order_no: this.order_no }).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: '删除订单成功', icon: 'none' })
          setTimeout(() => {
            uni.navigateBack({ delta: 1 })
          }, 1000);
        }
      })
    },
    // 确认收货订单
    onshopClick () {
      this.$refs.shopPopup.open()
    },
    // 点击确认收货取消弹框
    onshopQuery () {
      this.$refs.shopPopup.close()
    },
    // 确认收货
    onOrderReceiptOrder () {
      this.$http.post(this.$apiObj.OrderReceiptOrder, { order_no: this.order_no }).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: '收货成功', icon: 'none' })
          this.onOrderDetailOrder()
          this.$refs.shopPopup.close()
        }
      })
    },
    // 待评价
    onPingClick () {
      uni.navigateTo({
        url: './evaluate?order_no=' + this.order_no
      })
    },
    // 申请售后
    onSengqing (items, item) {
      uni.navigateTo({
        url: './sqsh?conter=' + JSON.stringify(items) + '&cent=' + JSON.stringify(item)
      })
    },
    toggle3 (type) {
      this.type = type
      // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
      this.$refs.popup3.open(type)
    },
    toggle3Close (type) {
      this.type = type
      // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
      this.$refs.popup3.close(type)
    }
  }
}
</script>
<style lang="less" scoped>
page {
  background: #f9f9f9;
}
.order-page {
  padding-bottom: 100rpx;
  .order-head {
    font-size: 22rpx;
    color: #fff;
    text-align: center;
    padding: 20rpx 0;
    background: linear-gradient(90deg, #9a3064 0%, #59499b 100%);
  }
  //order-sec1 S
  .order-sec1 {
    background: #ffffff;
    border-radius: 0px 0px 30rpx 30rpx;
    padding: 30rpx;
    display: flex;
    align-items: center;
    .sec1-icon {
      width: 73rpx;
      height: 73rpx;
      border-radius: 100%;
      overflow: hidden;
      min-width: 73rpx;
      max-width: 73rpx;
      margin-right: 35rpx;
    }
    .sec1-txt {
      .sec1-h {
        font-size: 26rpx;
      }
      .sec1-m {
        font-size: 28rpx;
        margin: 10rpx 0;
      }
      .sec1-c {
        display: flex;
        .name {
          font-size: 28rpx;
          margin-right: 30rpx;
        }
        .phone {
          font-size: 26rpx;
          color: #999;
        }
      }
    }
  }
  //order-sec1 E
  //order-sec2 S
  .order-sec2 {
    background: #ffffff;
    border-radius: 30rpx;
    padding: 30rpx;
    margin: 20rpx 0;
    //order-li S
    .order-li {
      background: #ffffff;
      border-radius: 20rpx;
      margin: 20rpx 0;
      .li-hd {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .hd-fl {
          display: inline-flex;
          align-items: center;
          font-size: 28rpx;
          flex: 1;
          width: calc(100% - 180rpx);
          margin-right: 20rpx;
          .icon {
            width: 26rpx;
            height: 26rpx;
            min-width: 26rpx;
            max-width: 26rpx;
            margin-right: 15rpx;
          }
          .name {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .status {
          color: #fc0609;
          white-space: nowrap;
        }
        .status.gray {
          color: #999;
        }
      }
      .order-mid {
        display: flex;
        padding: 30rpx 0;
        .mid-img {
          width: 130rpx;
          height: 130rpx;
          border-radius: 10rpx;
          overflow: hidden;
          margin-right: 20rpx;
          min-width: 130rpx;
          max-width: 130rpx;
        }
        .mid-txt {
          width: calc(100% - 150rpx);
          .h-flex {
            display: flex;
            align-items: center;
            justify-content: space-between;
            line-height: 36rpx;
            .t {
              font-size: 26rpx;
              line-height: 36rpx;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .num {
              font-size: 24rpx;
              color: #999;
              white-space: nowrap;
              margin-left: 20rpx;
            }
          }
          .price {
            font-size: 22rpx;
            color: #fc0609;
            font-weight: 550;
          }
          .b-flex {
            margin: 10rpx 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .s {
              font-size: 24rpx;
              color: #999;
            }
          }
        }
      }
      .order-bd {
        padding: 0 0rpx 0rpx 0rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .label {
          font-size: 28rpx;
        }
        .gray {
          color: #999;
          font-size: 26rpx;
          margin-left: 20rpx;
        }
      }
    }
    //order-li E
  }
  //order-sec2 E
  //order-sec3 S
  .order-sec3 {
    margin: 20rpx 0;
    background: #ffffff;
    border-radius: 30rpx;
    padding: 20rpx 30rpx;
    .sec3-li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20rpx 0;
      .label {
        font-size: 28rpx;
      }
      .price {
        font-weight: 550;
      }
    }
    .sec3-bot {
      display: flex;
      justify-content: flex-end;
      font-weight: 550;
      padding: 20rpx 0;
      align-items: center;
      .color-999 {
        margin-right: 10rpx;
      }
    }
  }
  //order-sec3 E
  //order-sec4 S
  .order-sec4 {
    background: #ffffff;
    border-radius: 20rpx;
    margin: 20rpx;
    padding: 30rpx;
    .sec4-t {
      font-size: 28rpx;
      font-weight: 550;
      margin-bottom: 20rpx;
    }
    .sec4-li {
      padding: 16rpx 0;
      display: flex;
      align-items: center;
      .label {
        white-space: nowrap;
        margin-right: 10rpx;
        font-size: 28rpx;
      }
      .c {
        font-size: 26rpx;
      }
    }
  }
  //order-sec4 E
  //order-fixed S
  .order-fixed {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 999;
    background: #fff;
    .fixed-con {
      padding: 15rpx 30rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .fixed-fr {
        flex: 1;
        display: flex;
        justify-content: flex-end;
      }
    }
    .order-btn {
      width: 180rpx;
      height: 70rpx;
      background: #fc0609;
      border-radius: 35rpx;
      font-size: 26rpx;
      color: #fff;
      padding: 0;
      margin: 0 0 0 10rpx;
      line-height: 70rpx;
    }
    .order-gray {
      width: 180rpx;
      height: 70rpx;
      background: #ffffff;
      border: 1px solid #dfdfdf;
      border-radius: 35rpx;
      line-height: 70rpx;
      margin: 0 0 0 10rpx;
      padding: 0;
      font-size: 16rpx;
      color: #999;
    }
  }
  //order-fixed E
  //支付方式弹出 S
  .mode-pop {
    background: #ffffff;
    border-radius: 20rpx 20rpx 0px 0px;
    .mode-tit {
      padding: 38rpx 30rpx;
      line-height: 1;
      font-size: 32rpx;
      font-weight: 550;
      border-bottom: 1px solid #f5f5f5;
      position: relative;
      text-align: center;
      .cancel {
        position: absolute;
        right: 30rpx;
        top: 38rpx;
        color: #999;
        font-size: 26rpx;
      }
    }
    .mode-li {
      padding: 36rpx 0;
      margin: 0 30rpx;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 28rpx;
      .li-fr {
        display: flex;
        align-items: center;
        /deep/ uni-radio {
          margin-left: 20rpx;
        }
        /deep/ uni-radio .uni-radio-input.uni-radio-input-checked {
          background: #fc0609 !important;
          border-color: #fc0609 !important;
        }
      }
    }
    .mode-bot {
      padding: 50rpx 30rpx 50rpx 30rpx;
    }
  }
  //支付方式弹出 E

  //支付密码弹出 S
  .pay-close {
    width: 18rpx;
    height: 18rpx;
    position: absolute;
    right: 0;
    top: 10rpx;
  }
  .pay-input {
    height: 78rpx;
    background: #f5f5f5;
    border-radius: 10rpx;
    padding: 0 20rpx;
    .input {
      width: 100%;
      height: 78rpx;
      font-size: 28rpx;
      text-align: left;
    }
  }
  .pay-bot {
    .pay-btn {
      width: 260rpx;
      height: 80rpx;
      background: #fc0609;
      border-radius: 40rpx;
      display: block;
      margin: 0 auto;
      line-height: 80rpx;
      font-size: 32rpx;
      color: #fff;
    }
  }
  //支付密码弹出 E
}
</style>