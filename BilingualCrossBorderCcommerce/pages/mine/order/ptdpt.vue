<template>
  <view class="order-page">
    <!--order-sec1 start-->
    <view class="order-sec1">
      <view class="sec1-icon">
        <image class="img" src="../../../static/images/submit1.png"></image>
      </view>
      <view class="sec1-txt">
        <view class="sec1-h">河南省郑州市金水区</view>
        <view class="sec1-m">花园路36号国贸360A座206室</view>
        <view class="sec1-c">
          <text class="name">张三</text>
          <text class="phone">177****6722</text>
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
            <view class="name">卡西欧官方旗舰店</view>
          </view>
        </view>
        <!--order-mid start-->
        <view class="order-mid">
          <view class="mid-img">
            <image class="img" src="../../../static/images/auc7.png"></image>
          </view>
          <view class="mid-txt">
            <view class="h-flex">
              <view class="t">卡西欧手表男官方旗舰PRX8000光能电波海神户外登山男士运动表</view>

            </view>
            <view class="b-flex">
              <view class="s">蓝色，75-88mm</view>
              <view class="num">*1</view>
            </view>
            <view class="price color-red f-22">
              RM<text class="f-34">868</text>.00
            </view>
          </view>
        </view>
        <!--order-mid end-->
        <!--order-bd start-->
        <view class="order-bd">
          <view class="label">留言</view>
          <view class="gray">无</view>
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
          RM<text class="f-26">163</text>.00
        </view>
      </view>
      <!-- <view class="sec3-li">
				<view class="label">运费</view>
				<view class="price f-22">
					RM<text class="f-26">30</text>.00
				</view>
			</view> -->
      <view class="sec3-li">
        <view class="label">优惠券</view>
        <view class="price f-22 color-red">
          -RM<text class="f-26">10</text>.00
        </view>
      </view>
      <view class="sec3-bot">
        <view class="price">
          <text class="color-999 f-26">共1件</text>
          <text class="f-228">小计：</text>
          <text class="color-red f-22">RM<text class="f-28">153</text>.00</text>
        </view>
      </view>
    </view>
    <!--order-sec3 end-->
    <!--order-sec4 start-->
    <view class="order-sec4">
      <view class="sec4-t">订单信息</view>
      <view class="sec4-li">
        <view class="label">订单编号:</view>
        <view class="c">14654654646555464</view>
      </view>
      <view class="sec4-li">
        <view class="label">创建时间：</view>
        <view class="c">2020-03-06 22:22:22</view>
      </view>
    </view>
    <!--order-sec4 end-->
    <!--order-fixed start-->
    <view class="order-fixed">
      <view class="fixed-con">
        <view class="fixed-fl color-red f-26">剩余拼团时间：12:25:26</view>
        <view class="fixed-fr">
          <button class="order-gray" @click="toggle1('center')">取消订单</button>
          <button class="order-btn">邀请拼团</button>
        </view>
      </view>
    </view>
    <!--order-fixed end-->
    <!--取消订单弹出 start-->
    <uni-popup ref="popup1">
      <view class="public-pop">
        <view class="pop-con">
          <view class="pop-t">提示</view>
          <view class="pop-c">您确定要取消当前订单吗？</view>
          <view class="pop-b">
            <button class="pop-btn" @click="toggle1Close">取消</button>
            <button class="pop-btn red" @click="toggle1Close">确认</button>
          </view>
        </view>
      </view>
    </uni-popup>
    <!--取消订单弹出 start-->
  </view>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    toggle1 (type) {
      this.type = type
      // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
      this.$refs.popup1.open(type)
    },
    toggle1Close (type) {
      this.type = type
      // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
      this.$refs.popup1.close(type)
    },
    toggle2 (type) {
      this.type = type
      // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
      this.$refs.popup2.open(type)
    },
    toggle2Close (type) {
      this.type = type
      // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
      this.$refs.popup2.close(type)
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
    },
    //导航点击的跳转处理函数
    navClick (url) {
      uni.navigateTo({
        url
      })
    },
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