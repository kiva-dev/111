<template>
  <view class="nick-page">
    <view class="nick-head">
      <view class="head-img">
        <image class="img" v-if="avatar" :src="avatar"></image>
        <image class="img" v-else src="/static/userimg.png"></image>
      </view>
      <view class="head-name">{{nickname?nickname: $t('user.nick.nhmysznc') }}</view>
    </view>
    <view class="nick-box">
      <view class="box-radius">
        <input class="input" v-model="nickname" maxlength="24" :placeholder="$t('user.nick.qcrnc')" @input="descInput" placeholder-class="" />
        <button class="nick-btn" @click="onNickname">{{$t('user.nick.wancheng')}}</button>
      </view>
      <view class="box-tip">
        <text>{{$t('user.nick.zczywsz')}}</text>
        <text>{{num}}/24</text>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data () {
    return {
      nickname: '',
      avatar: '',
      num: 0
    }
  },
  onShow () {
    // 获取个人信息
    this.$http.post(this.$apiObj.MineInfo).then(res => {
      if (res.code == 1) {
        this.nickname = res.data.nickname
        this.avatar = res.data.avatar
      }
    })
  },
  methods: {
    //字数
    descInput () {
      var txtVal = this.nickname.length ? this.nickname.length : 0;
      if (txtVal > 24) {
        return;
      }
      this.num = txtVal;
    },
    onNickname () {
      if (!this.nickname) return uni.showToast({ title: this.$t('user.nick.qcrnc'), icon: 'none' })
      if (this.nickname.length < 2 || this.nickname.length > 24) return uni.showToast({ title: this.$t('user.nick.nccdw'), icon: 'none' })
      this.$http.post(this.$apiObj.MineChangeNickname, { nickname: this.nickname }).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: this.$t('user.nick.xgcg'), icon: 'none' })
          setTimeout(() => {
            uni.navigateBack({ delta: 1 })
          }, 1000);
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.nick-page {
  .nick-head {
    padding: 90rpx 30rpx 30rpx 30rpx;
    .head-name {
      font-size: 32rpx;
      text-align: center;
      line-height: 1;
      margin-top: 30rpx;
    }
    .head-img {
      width: 148rpx;
      height: 148rpx;
      border-radius: 100%;
      overflow: hidden;
      margin: 0 auto;
    }
  }
  .nick-box {
    margin: 30rpx;
    .box-radius {
      height: 100rpx;
      background: #f5f5f5;
      border-radius: 20rpx;
      padding: 0 30rpx 0 40rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .nick-btn {
        font-size: 28rpx;
        color: #fa1d1d;
        padding: 0;
      }
      .input {
        flex: 1;
        font-size: 28rpx;
        height: 100rpx;
      }
    }
    .box-tip {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 24rpx;
      color: #999;
      margin-top: 20rpx;
    }
  }
}
</style>