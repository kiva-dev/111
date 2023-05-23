<template>
  <view class="atte-page">
    <!--atte-box start-->
    <view class="atte-box">
      <view class="li">
        <view class="label">{{$t('user.attestation.smrz')}}</view>
        <view class="li-r" v-if="MineCont.status==1">
          <view class="gray">{{MineCont.firstName}}{{MineCont.lastName}}</view>
        </view>
        <view class="li-r" v-else @click="navClick('Vid')">
          <view class="red" v-if="MineCont.status==0">{{$t('user.attestation.dsh')}}</view>
          <view class="red" v-else-if="MineCont.status=='-1'">{{$t('user.attestation.sghwt')}}</view>
          <view class="red" v-else>{{$t('user.attestation.wrz')}}</view>
          <view class="more">
            <image class="img" src="../../static/images/mine/more1.png"></image>
          </view>
        </view>
      </view>
      <!-- <view class="li">
        <view class="label">{{$t('user.attestation.sjyz')}}</view>
        <view class="li-r" v-if="userCont.mobile" @click="navClick('Vphone')">
          <view class="gray">{{userCont.mobile}} </view>
        </view>
        <view class="li-r" v-else>
          <view class="red">{{$t('user.attestation.wrz')}}</view>
          <view class="more">
            <image class="img" src="../../static/images/mine/more1.png"></image>
          </view>
        </view>
      </view> -->
      <view class="li">
        <view class="label">{{$t('user.attestation.email')}}</view>
        <view class="li-r" v-if="userCont.email">
          <view class="gray">{{userCont.email}} </view>
        </view>
        <view class="li-r" v-else @click="navClick('Vemail')">
          <view class="red">{{$t('user.attestation.wrz')}}</view>
          <view class="more">
            <image class="img" src="../../static/images/mine/more1.png"></image>
          </view>
        </view>
      </view>
    </view>
    <!--atte-box end-->
  </view>
</template>
<script>
export default {
  data () {
    return {
      MineCont: '',// 实名认证信息
      userCont: '',// 个人信息
    }
  },
  onShow () {
    this.$http.post(this.$apiObj.MineInfo).then(res => {
      if (res.code == 1) {
        uni.setStorageSync('userCont', res.data)
        this.userCont = res.data
      }
    })
    // 实名认证
    this.$http.post(this.$apiObj.MineAuthDetail).then(res => {
      if (res.code == 1) {
        this.MineCont = res.data
      }
    })
  },
  methods: {
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
.atte-page {
  .atte-box {
    background: #fff;
    padding: 0 30rpx;
    margin-bottom: 30rpx;
    .li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 36rpx 0;
      border-bottom: 1px solid #f5f5f5;
      .label {
        font-size: 28rpx;
      }
      .li-r {
        display: flex;
        align-items: center;
        .gray {
          color: #999;
          font-size: 28rpx;
        }
        .red {
          font-size: 28rpx;
          color: #fc0609;
        }
        .more {
          width: 12rpx;
          height: 21rpx;
          margin-left: 20rpx;
        }
      }
    }
  }
}
</style>