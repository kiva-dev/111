<template>
  <view class="success-page">
    <view class="success-box">
      <view class="success-icon">
        <image class="img" src="../../static/images/wallet11.png"></image>
      </view>
      <view class="success-con">
        <view class="t">
          <block v-if="isShopCont">The withdrawal application has been submitted and will be received within 1 working day</block>
          <block v-else>提现申请已提交，将于1个工作日内到账</block>
        </view>
        <view class="c">{{daytime}}</view>
      </view>
      <view class="success-bot">
        <button class="public-btn" @click="onclick">
          <block v-if="isShopCont">complete</block>
          <block v-else>完成</block>
        </button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      isShopCont: false,// 商品详情显示中文还是英文
      daytime: ''
    }
  },
  onShow () {
    this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
    var date = new Date();
    var sign2 = ":";
    var year = date.getFullYear() // 年
    var month = date.getMonth() + 1; // 月
    var day = date.getDate(); // 日
    var hour = date.getHours(); // 时
    var minutes = date.getMinutes(); // 分
    var seconds = date.getSeconds() //秒
    // var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
    // var week = weekArr[date.getDay()];
    // 给一位数的数据前面加 “0”
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (day >= 0 && day <= 9) {
      day = "0" + day;
    }
    if (hour >= 0 && hour <= 9) {
      hour = "0" + hour;
    }
    if (minutes >= 0 && minutes <= 9) {
      minutes = "0" + minutes;
    }
    if (seconds >= 0 && seconds <= 9) {
      seconds = "0" + seconds;
    }
    this.daytime = year + "-" + month + "-" + day + " " + hour + sign2 + minutes + sign2 + seconds;
  },
  methods: {
    onclick () {
      uni.navigateBack({ delta: 2 })
    }
  }
}
</script>

<style lang="less" scoped>
.success-page {
  .success-box {
    padding: 50rpx;
    .success-icon {
      width: 227rpx;
      height: 192rpx;
      margin: 60rpx auto;
    }
    .success-con {
      text-align: center;
      .t {
        font-size: 32rpx;
        font-weight: 550;
      }
      .c {
        font-size: 26rpx;
        color: #666;
        margin-top: 20rpx;
      }
    }
    .success-bot {
      margin: 150rpx auto;
      width: 460rpx;
    }
  }
}
</style>