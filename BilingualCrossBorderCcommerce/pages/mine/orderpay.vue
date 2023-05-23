<template>
  <view class="sub-page">
    <!--sub-head start-->
    <view class="sub-head" @click="navClick('/pages/address/address')">
      <view class="head-fl" v-if="addCont">
        <view class="icon">
          <image class="img" src="../../static/images/submit1.png"></image>
        </view>
        <view class="txt">
          <view class="t">{{addCont.detail}}</view>
          <view class="b">
            <text class="name">{{addCont.name}}</text>
            <text class="phone">{{addCont.mobile.slice(0, 3)}}****{{addCont.mobile.substr(-4)}}</text>
          </view>
        </view>
      </view>
      <view class="head-fl" v-else>
        <view class="icon">
          <image class="img" src="../../static/images/submit1.png"></image>
        </view>
        <view class="txt">
          <view class="t">{{$t('order.addContXuanze')}}</view>
        </view>
      </view>
      <view class="more">
        <image class="img" src="../../static/images/more2.png"></image>
      </view>
    </view>
    <!--sub-head end-->
    <!--商品列表 start-->
    <view class="sub-box">
      <view class="li-hd">
        <view class="icon">
          <image class="img" src="../../static/images/index/dianpu.png"></image>
        </view>
        <view class="t">{{shopCont.shop_name}}</view>
        <view class="more">
          <image class="img" src="../../static/images/index/more.png"></image>
        </view>
      </view>
      <!--li-item start-->
      <view class="li-item">
        <view class="li-img">
          <image class="img" :src="shopCont.image"></image>
        </view>
        <view class="li-txt">
          <view class="t">{{shopCont.goods_name}}</view>
          <view class="b">
            <view class="price">
              RM<text class="f-34">{{shopCont.price}}</text>
            </view>
          </view>
        </view>
      </view>
      <!--li-item end-->
    </view>
    <!--商品列表 end-->
    <!--sub-bot start-->
    <view class="sub-bot">
      <view class="bot-li">
        <view class="t">{{$t('order.jingbiaojiner')}}</view>
        <view class="li-r f-22">
          RM<text class="f-26">{{$filter.formatValue(shopCont.single_money, 'split')[0]}}</text>.{{$filter.formatValue(shopCont.single_money, 'split')[1] ? $filter.formatValue(shopCont.single_money, 'split')[1] : '00'}}
        </view>
      </view>
      <view class="bot-end">
        <text class="color-999 f-26">{{$t('order.gong')}}1{{$t('order.jian')}}</text>
        <text class="f-28">{{$t('order.xiaoji')}}：</text>
        <text class="color-red f-22">RM<text class="f-28">{{$filter.formatValue(shopCont.single_money, 'split')[0]}}</text>.{{$filter.formatValue(shopCont.single_money, 'split')[1] ? $filter.formatValue(shopCont.single_money, 'split')[1] : '00'}}</text>
      </view>
    </view>
    <!--sub-bot end-->
    <!--竞拍信息 start-->
    <view class="jingbiaoCont">
      <view class="max-title">{{$t('jingpaixx')}}</view>
      <view class="list">
        <view class="title">{{$t('jingpaiqishu')}}：</view>
        <view class="num">{{shopCont.stage_num}}</view>
      </view>
      <view class="list">
        <view class="title">{{$t('dueihuanma')}}：</view>
        <view class="num">{{shopCont.num_id}}</view>
      </view>
      <view class="list">
        <view class="title">{{$t('xiadantime')}}：</view>
        <view class="num">{{$filter.to_date_time(shopCont.update_time)}}</view>
      </view>
    </view>
    <!--竞拍信息 end-->
    <!--底部 start-->
    <view class="sub-fixed">
      <view class="fixed-con">
        <view class="t"> </view>
        <button class="pay-btn" @click.stop="$noMultipleClicks(onAuctionorderReferPick)">{{$t('lijilinghuo')}}</button>
      </view>
    </view>
    <!--底部 end-->
  </view>
</template>

<script> 
export default {
  components: {},
  data () {
    return {
      noClick: true, // 防止重复点击 
      address_id: '',// 地址id
      addCont: '',// 收货地址
      price: '', // 选中价格
      shopCont: '',// 商品详情
    }
  },
  onLoad (e) {
    this.record_id = e.id
    this.shopCont = JSON.parse(e.conter)
  },
  onShow () {
    this.onAddressList()
  },
  methods: {
    // 收货地址
    onAddressList () {
      this.$http.post(this.$apiObj.AddressList, { page: 1, pagenum: 1000 }).then(res => {
        if (res.code == 1) {
          for (let i in res.data.data) {
            if (res.data.data[i].is_default == 1) {
              this.addCont = res.data.data[i]
              this.address_id = res.data.data[i].id
            }
          }
        }
      })
    },
    // 提交订单
    onAuctionorderReferPick () {
      if (!this.addCont) return uni.showToast({ icon: 'none', title: this.$t('order.addContXuanze') })
      this.$http.post(this.$apiObj.AuctionorderReferPick, {
        address_id: this.address_id,// 地址id 
        record_id: this.record_id,// 竞拍商品id
      }).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: this.$t('yitijiaosq'), icon: 'none' })
          setTimeout(() => {
            uni.navigateBack({ delta: 1 })
          }, 1000);
        }
      })
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
.sub-page {
  padding-bottom: 100rpx;
  .sub-head {
    background: #fff;
    padding: 30rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .head-fl {
      display: flex;
      align-items: center;
      .icon {
        width: 73rpx;
        height: 73rpx;
        min-width: 73rpx;
        margin-right: 35rpx;
      }
      .txt {
        .t {
          font-size: 26rpx;
        }
        .c {
          font-size: 28rpx;
          margin: 10rpx 0;
        }
        .b {
          display: flex;
          white-space: nowrap;
          .name {
            font-size: 28rpx;
            margin-right: 20rpx;
          }
          .phone {
            font-size: 26rpx;
            color: #999;
          }
        }
      }
    }
    .more {
      width: 16rpx;
      height: 32rpx;
      min-width: 16rpx;
      margin-left: 20rpx;
    }
  }
  .sub-box {
    margin: 20rpx 0;
    background: #fff;
    border-radius: 30rpx;
    padding: 20rpx 30rpx;
    .li-hd {
      display: flex;
      align-items: center;
      position: relative;
      .icon {
        width: 26rpx;
        height: 26rpx;
        margin-right: 15rpx;
        min-width: 26rpx;
      }
      .t {
        font-size: 26rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .more {
        width: 10rpx;
        height: 18rpx;
        min-width: 10rpx;
        margin-left: 15rpx;
      }
    }
    .li-item {
      margin: 36rpx 0;
      display: flex;
      position: relative;
      .li-img {
        // background: #fc5917;
        border-radius: 10rpx;
        width: 175rpx;
        height: 175rpx;
        min-width: 175rpx;
        margin-right: 20rpx;
      }
      .li-txt {
        width: 100%;
        .t {
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          font-size: 28rpx;
          line-height: 34rpx;
        }
        .specs {
          display: inline-flex;
          align-items: center;
          height: 43rpx;
          border-radius: 10rpx;
          align-items: center;
          padding: 0 10rpx;
          line-height: 43rpx;
          margin: 15rpx 0 20rpx 0;
          .c {
            font-size: 24rpx;
            color: #999;
          }
          .icon {
            width: 14rpx;
            height: 14rpx;
            margin-left: 10rpx;
            min-width: 14rpx;
          }
        }
        .b {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .cart-num {
            display: flex;
            align-items: center;
            border: 2rpx solid #eeeeee;
            border-radius: 6rpx;
            .num-btn {
              width: 40rpx;
              height: 40rpx;
              font-size: 24rpx;
              color: #999;
              padding: 0;
              margin: 0;
              line-height: 40rpx;
            }
            .num-input {
              width: 60rpx;
              height: 40rpx;
              border-left: 1px solid #eee;
              border-right: 1px solid #eee;
              text-align: center;
              font-size: 24rpx;
              font-weight: 550;
            }
          }
          .price {
            font-weight: 550;
            color: #fc0609;
            font-size: 22rpx;
          }
        }
      }
    }
    .li-leave {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .t {
        font-size: 28rpx;
      }
      .c {
        font-size: 26rpx;
        color: #999;
        input {
          font-size: 26rpx;
          width: 600rpx;
          text-align: right;
          color: #333;
        }
      }
    }
    .li-freight {
      margin: 30rpx 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .t {
        font-size: 28rpx;
      }
      .c {
        font-size: 20rpx;
      }
    }
  }

  .sub-bot {
    background: #ffffff;
    border-radius: 30rpx;
    margin: 20rpx;
    padding: 20rpx 30rpx;
    .bot-li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 28rpx;
      padding: 20rpx 0;
      .li-r {
        display: flex;
        align-items: center;
        .more {
          width: 10rpx;
          height: 19rpx;
          margin-left: 15rpx;
        }
      }
    }
    .bot-end {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-weight: 550;
      padding: 20rpx 0;
    }
  }

  .sub-fixed {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 99;
    background: #fff;
    .fixed-con {
      padding: 15rpx 30rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .pay-btn {
        width: 180rpx;
        height: 70rpx;
        background: #fc0609;
        border-radius: 35rpx;
        line-height: 70rpx;
        margin: 0;
        font-size: 26rpx;
        color: #fff;
      }
    }
  }
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

  //优惠券弹出 S
  .you-pop {
    background: #ffffff;
    border-radius: 20rpx 20rpx 0px 0px;
    .you-head {
      padding: 40rpx 35rpx;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      align-items: center;
      line-height: 1;
      justify-content: space-between;
      .t {
        font-size: 32rpx;
        font-weight: 550;
      }
      .cancel {
        font-size: 26rpx;
        color: #999;
      }
      .define {
        font-size: 26rpx;
        color: #fc0609;
      }
    }
    .you-ul {
      height: 600rpx;
      overflow-y: auto;
      padding: 30rpx 20rpx;
      .li {
        display: flex;
        height: 209rpx;
        position: relative;
        align-items: center;
        line-height: 50rpx;
        padding: 0 30rpx;
        justify-content: space-between;
        .li-bg {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
        .li-fl {
          position: relative;
          z-index: 22;
          width: 30%;
          text-align: center;
        }
        .li-fr {
          position: relative;
          z-index: 22;
          width: 60%;
          image {
            width: 40rpx;
            height: 40rpx;
          }
        }
        .li-t {
          font-weight: 550;
          padding: 6rpx 0;
        }
        .li-line {
          height: 1px;
          background: #e4e4e4;
        }
        .li-c {
          padding: 6rpx 0;
          .c {
            font-size: 28rpx;
            color: #fc0609;
          }
          .date {
            color: #666;
            font-size: 24rpx;
          }
        }
      }
    }
  }
  //优惠券弹出 E
}
//rule-pop S
.rule-pop {
  border-radius: 20rpx 20rpx 0rpx 0rpx;
  background: #fff;
  padding: 30rpx 24rpx;
  position: relative;
  .pop-close {
    width: 18rpx;
    height: 18rpx;
    position: absolute;
    right: 24rpx;
    top: 30rpx;
  }
  .pop-hd {
    display: flex;
    padding-right: 30rpx;
    .hd-txt {
      .t {
        font-size: 28rpx;
        line-height: 1.6;
      }
      .c {
        font-size: 26rpx;
        margin: 10rpx 0;
      }
      .price {
        color: #fc0609;
        font-weight: 550;
      }
    }
    .hd-img {
      width: 175rpx;
      height: 175rpx;
      border-radius: 10rpx;
      min-width: 175rpx;
      margin-right: 20rpx;
    }
  }
  .pop-li {
    margin: 30rpx 0;
    .li-t {
      font-size: 28rpx;
      margin-bottom: 20rpx;
    }
    .li-tags {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -10rpx;
      .tag {
        height: 62rpx;
        background: #eeeeee;
        border-radius: 32rpx;
        border: 1px solid #eee;
        padding: 0 20rpx;
        line-height: 62rpx;
        margin: 10rpx;
      }
      .active {
        border: 1px solid #f41a0c;
        background: #ffe9e8;
        color: #f41a0c;
      }
    }
  }
  .pop-num {
    display: flex;
    margin: 30rpx 0;
    align-items: center;
    justify-content: space-between;
    .t {
      font-size: 28rpx;
    }
    .num-coum {
      display: flex;
      .coum-btn {
        width: 54rpx;
        height: 45rpx;
        background: #eeeeee;
        border-radius: 10rpx 0px 0px 10rpx;
        text-align: center;
        line-height: 45rpx;
        color: #666;
        text-align: center;
      }
      .coum-btn.last {
        border-radius: 0px 10rpx 10rpx 0px;
      }
      .coum-input {
        width: 54rpx;
        height: 45rpx;
        background: #eeeeee;
        text-align: center;
        font-size: 30rpx;
        color: #666;
        text-align: center;
        margin: 0 3rpx;
      }
    }
  }
}
.pop-bot {
  margin: 50rpx 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .public-btn {
    width: 690rpx;
    height: 90rpx;
    line-height: 90rpx;
  }
}
//rule-pop E
.jingbiaoCont {
  color: #000;
  background: #fff;
  border-radius: 20rpx;
  margin: 20rpx;
  padding: 40rpx 30rpx;
  .max-title {
    font-size: 28rpx;
    font-weight: bold;
  }
  .list {
    font-size: 26rpx;
    display: flex;
    align-items: center;
    margin-top: 35rpx;
    .title {
    }
    .num {
    }
  }
}
</style>