<template>
  <view class="psu-page">
    <!--psu-head start-->
    <view class="psu-head" v-for="item in shopList" :key="item.goods_idgoods_id">
      <view class="head-img">
        <image class="img" :src="item.image"></image>
      </view>
      <view class="head-txt">
        <view class="t">{{item.good_name}}</view>
        <view class="c">
          <view class="s">
            <block v-for="(items,index) in item.attrs" :key="{index}">
              <block v-if="index!=0">,</block> {{items}}
            </block>
          </view>
          <view class="price">
            RM<text class="f-34">{{$filter.formatValue(item.price, 'split')[0]}}</text>.{{$filter.formatValue(item.price, 'split')[1] ? $filter.formatValue(item.price, 'split')[1] : '00'}}
          </view>
        </view>
      </view>
    </view>
    <!--psu-head end-->
    <view class="psu-line"></view>
    <!--psu-box start-->
    <view class="psu-box">
      <view class="hd">
        <view class="icon">
          <image class="img" src="../../static/images/time1.png"></image>
        </view>
        <text v-if="userList.length==2">{{$t('home.psuccess.ptcgqnxddfh')}}</text>
        <text v-else>{{$t('home.psuccess.fkcg')}}</text>
      </view>
      <view class="mid">
        <view class="li" v-for="item,k in userList" :key="item.u_id">
          <image class="img" :src="item.avatar"></image>
          <view class="tip" v-if="k==0">{{$t('home.psuccess.tz')}}</view>
        </view>
        <view class="li" v-if="userList.length==1">?</view>
      </view>
      <view class="bd">
        <view class="li">
          <view class="li-con">
            <button class="public-btn gray" @click="onGOclick">{{$t('home.psuccess.ckxq')}}</button>
          </view>
        </view>
        <view class="li">
          <view class="li-con">
            <button class="public-btn" @click="onHome" v-if="userList.length==2">{{$t('home.psuccess.fhsy')}}</button>
            <button class="public-btn" v-else>{{$t('home.psuccess.yqhyct')}}</button>
          </view>
        </view>
      </view>
    </view>
    <!--psu-box end-->
  </view>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      userList: [],
      shopList: [],
      order_no: ''
    }
  },
  onLoad (e) {
    this.order_no = e.order_no
    this.shopList = JSON.parse(e.shopCont).cartdata[0].list
    this.userList = JSON.parse(e.userList)
  },
  onShow () {

  },
  methods: {
    onGOclick () {
      uni.navigateTo({
        url: '/pages/mine/order/detail?order_no=' + this.order_no
      })
    },
    onHome () {
      uni.switchTab({
        url: '/pages/index/index'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.psu-page {
  .psu-head {
    padding: 30rpx;
    display: flex;
    .head-img {
      width: 155rpx;
      height: 155rpx;
      border-radius: 10rpx;
      overflow: hidden;
      margin-right: 25rpx;
      min-width: 155rpx;
      max-width: 155rpx;
    }
    .head-txt {
      width: 600rpx;
      .t {
        font-size: 28rpx;
        line-height: 48rpx;
      }
      .c {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 20rpx;
        .s {
          color: #999;
        }
        .price {
          font-size: 22rpx;
          color: #fc0609;
          font-weight: 550;
        }
      }
    }
  }
  .psu-line {
    height: 20rpx;
    background: #f9f9f9;
  }
  .psu-box {
    padding: 45rpx 30rpx;
    .hd {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28rpx;
      .icon {
        width: 29rpx;
        height: 29rpx;
        margin-right: 15rpx;
      }
    }
    .mid {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin: 30rpx 0;
      .li {
        width: 103rpx;
        height: 103rpx;
        margin: 20rpx 30rpx;
        position: relative;
        background: #f9f9f9;
        border-radius: 50%;
        text-align: center;
        line-height: 103rpx;
        font-size: 50rpx;
        color: red;
        font-weight: bold;
        .tip {
          width: 86rpx;
          height: 32rpx;
          background: #fc0609;
          border-radius: 16rpx;
          line-height: 32rpx;
          text-align: center;
          font-size: 18rpx;
          color: #fff;
          position: absolute;
          left: 50%;
          margin-left: -43rpx;
          bottom: -10rpx;
        }
        .img {
          border-radius: 100%;
        }
      }
    }
    .bd {
      display: flex;
      justify-content: space-between;
      .li {
        width: 50%;
      }
      .li-con {
        margin: 10rpx;
        .gray {
          background: #dfdfdf;
          color: #000;
        }
      }
    }
  }
}
</style>