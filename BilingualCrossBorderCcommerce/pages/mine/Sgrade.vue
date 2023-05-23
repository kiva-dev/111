<template>
  <view class="grade-page">
    <view class="box">
      <view class="success-img">
        <image class="img" src="../../static/images/mine/grade10.png"></image>
      </view>
      <view class="success-t">{{$t('user.upgrade.tjcg')}}</view>
      <view class="success-c">{{$t('user.upgrade.qddkflx')}}~</view>
    </view>
  </view>
</template>

<script> 
export default {
  data () {
    return {};
  },
  onBackPress (options) {
    if (options.from === 'navigateBack') {
      return false;
    }
    this.back();
    return true;
  },
  methods: {
    back () {
      uni.navigateBack({
        delta: 2
      });
    }
  },
}
</script>

<style lang="less" scoped>
.grade-page {
  .box {
    padding: 200rpx 30rpx;
    text-align: center;
    .success-img {
      width: 440rpx;
      height: 344rpx;
      margin: 0 auto;
    }
    .success-c {
      font-size: 28rpx;
      color: #999;
    }
    .success-t {
      font-size: 36rpx;
      margin-top: 20rpx;
      margin-bottom: 10rpx;
      color: #fc0609;
    }
  }
}
</style>